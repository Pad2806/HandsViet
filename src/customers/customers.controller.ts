import { Controller, Get, Param, Query } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Controller('customers')
export class CustomersController {
    constructor(private readonly prisma: PrismaService) { }

    /** GET /customers/phone/:phone - Lookup customer by phone, return booking history */
    @Get('phone/:phone')
    async findByPhone(@Param('phone') phone: string) {
        const user = await this.prisma.user.findFirst({
            where: {
                phone,
                role: 'CUSTOMER',
            },
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                avatar: true,
                bookings: {
                    orderBy: { createdAt: 'desc' },
                    take: 20,
                    include: {
                        services: {
                            include: {
                                service: {
                                    select: {
                                        id: true,
                                        name: true,
                                        category: true,
                                        price: true,
                                        duration: true,
                                    },
                                },
                            },
                        },
                        clinic: { select: { id: true, name: true } },
                        staff: {
                            include: {
                                user: { select: { name: true } },
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            return { found: false, user: null, previousServices: [] };
        }

        // Extract unique service IDs from previous bookings
        const serviceMap = new Map<string, {
            serviceId: string;
            serviceName: string;
            category: string;
            lastBookedAt: Date;
            bookingStatus: string;
            timesBooked: number;
        }>();

        for (const booking of user.bookings) {
            for (const bs of booking.services) {
                const existing = serviceMap.get(bs.service.id);
                if (!existing) {
                    serviceMap.set(bs.service.id, {
                        serviceId: bs.service.id,
                        serviceName: bs.service.name,
                        category: bs.service.category,
                        lastBookedAt: booking.createdAt,
                        bookingStatus: booking.status,
                        timesBooked: 1,
                    });
                } else {
                    existing.timesBooked++;
                }
            }
        }

        return {
            found: true,
            user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
            },
            previousServices: Array.from(serviceMap.values()),
        };
    }
}
