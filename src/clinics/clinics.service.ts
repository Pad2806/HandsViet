import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ClinicsService {
    constructor(private readonly prisma: PrismaService) { }

    /** Lấy danh sách tất cả clinic đang hoạt động */
    async findAll() {
        return this.prisma.clinic.findMany({
            where: { isActive: true },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                address: true,
                city: true,
                district: true,
                phone: true,
                openTime: true,
                closeTime: true,
                workingDays: true,
                logo: true,
                coverImage: true,
            },
            orderBy: { name: 'asc' },
        });
    }

    /** Lấy chi tiết một clinic kèm danh sách services và staff */
    async findOne(id: string) {
        const clinic = await this.prisma.clinic.findUnique({
            where: { id },
            include: {
                services: {
                    where: { isActive: true },
                    orderBy: { order: 'asc' },
                },
                staff: {
                    where: { isActive: true },
                    include: {
                        user: {
                            select: { name: true, avatar: true },
                        },
                        schedules: true,
                    },
                },
            },
        });

        if (!clinic) {
            throw new NotFoundException(`Không tìm thấy phòng khám với ID: ${id}`);
        }

        return clinic;
    }

    /** Lấy clinic theo slug */
    async findBySlug(slug: string) {
        const clinic = await this.prisma.clinic.findUnique({
            where: { slug },
            include: {
                services: {
                    where: { isActive: true },
                    orderBy: { order: 'asc' },
                },
                staff: {
                    where: { isActive: true },
                    include: {
                        user: {
                            select: { name: true, avatar: true },
                        },
                        schedules: true,
                    },
                },
            },
        });

        if (!clinic) {
            throw new NotFoundException(`Không tìm thấy phòng khám: ${slug}`);
        }

        return clinic;
    }
}
