import {
    Injectable,
    NotFoundException,
    BadRequestException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
    constructor(private readonly prisma: PrismaService) { }

    /** Tạo booking mới */
    async create(dto: CreateBookingDto) {
        // 1. Validate: Lấy thông tin các dịch vụ
        const serviceIds = dto.services.map((s) => s.serviceId);
        const dbServices = await this.prisma.service.findMany({
            where: { id: { in: serviceIds }, isActive: true },
        });

        if (dbServices.length !== serviceIds.length) {
            throw new BadRequestException('Một hoặc nhiều dịch vụ không hợp lệ.');
        }

        // 2. Tính tổng thời gian và tổng giá
        const totalDuration = dbServices.reduce((sum, s) => sum + s.duration, 0);
        const totalAmount = dbServices.reduce(
            (sum, s) => sum + Number(s.price),
            0,
        );

        // 3. Tính endTime
        const endTime = this.calculateEndTime(dto.timeSlot, totalDuration);

        // 4. Kiểm tra trùng lịch nhân viên (nếu chọn staff)
        if (dto.staffId) {
            const conflict = await this.prisma.booking.findFirst({
                where: {
                    staffId: dto.staffId,
                    date: new Date(dto.date),
                    status: { notIn: ['CANCELLED', 'NO_SHOW'] },
                    OR: [
                        {
                            timeSlot: { lte: dto.timeSlot },
                            endTime: { gt: dto.timeSlot },
                        },
                        {
                            timeSlot: { lt: endTime },
                            endTime: { gte: endTime },
                        },
                        {
                            timeSlot: { gte: dto.timeSlot },
                            endTime: { lte: endTime },
                        },
                    ],
                },
            });

            if (conflict) {
                throw new BadRequestException(
                    'Nhân viên này đã có lịch hẹn trong khung giờ đã chọn.',
                );
            }
        }

        // 5. Sinh booking code
        const bookingCode = this.generateBookingCode();

        // 5.1. Resolve customerId — tạo guest user nếu chưa có
        let resolvedCustomerId = dto.customerId;
        if (resolvedCustomerId.startsWith('guest-') || !resolvedCustomerId) {
            // Tìm user theo phone trước
            let existingUser = dto.customerPhone
                ? await this.prisma.user.findFirst({ where: { phone: dto.customerPhone } })
                : null;

            if (!existingUser) {
                // Tạo guest user mới
                existingUser = await this.prisma.user.create({
                    data: {
                        id: this.generateUuid(),
                        name: dto.customerName || `Khách ${dto.customerPhone || 'vãng lai'}`,
                        phone: dto.customerPhone || null,
                        email: dto.customerEmail || null,
                        role: 'CUSTOMER',
                        authProvider: 'LOCAL',
                        password: '',
                    },
                });
            }
            resolvedCustomerId = existingUser.id;
        }

        // 6. Build note from medicalDescription
        const noteLines: string[] = [];
        if (dto.medicalDescription) {
            noteLines.push(`[Mô tả bệnh lý]: ${dto.medicalDescription}`);
        }
        if (dto.medicalImages && dto.medicalImages.length > 0) {
            noteLines.push(`[Ảnh y tế]: ${dto.medicalImages.join(', ')}`);
        }
        if (dto.note) {
            noteLines.push(dto.note);
        }
        const finalNote = noteLines.length > 0 ? noteLines.join('\n') : null;

        // 7. Create booking + deposit payment với transaction
        const booking = await this.prisma.$transaction(async (tx) => {
            const newBooking = await tx.booking.create({
                data: {
                    bookingCode,
                    customerId: resolvedCustomerId,
                    clinicId: dto.clinicId,
                    staffId: dto.staffId || null,
                    date: new Date(dto.date),
                    timeSlot: dto.timeSlot,
                    endTime,
                    totalDuration,
                    totalAmount: totalAmount,
                    note: finalNote,
                    paymentMethod: 'VIETQR',
                    paymentStatus: 'PENDING',
                    services: {
                        create: dbServices.map((s) => ({
                            id: this.generateUuid(),
                            serviceId: s.id,
                            price: s.price,
                            duration: s.duration,
                        })),
                    },
                },
                include: {
                    services: {
                        include: {
                            service: { select: { name: true } },
                        },
                    },
                    staff: {
                        include: {
                            user: { select: { name: true } },
                        },
                    },
                    clinic: { select: { name: true, address: true, phone: true } },
                },
            });

            // Create deposit payment record (100.000 VND)
            await tx.payment.create({
                data: {
                    id: this.generateUuid(),
                    bookingId: newBooking.id,
                    amount: 100000,
                    method: 'VIETQR',
                    type: 'DEPOSIT',
                    status: 'PENDING',
                    bankCode: process.env.BANK_CODE || '970422',
                    bankAccount: process.env.BANK_ACCOUNT || '0123456789',
                },
            });

            return newBooking;
        });

        return booking;
    }

    /** Lấy chi tiết booking theo ID */
    async findOne(id: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { id },
            include: {
                services: {
                    include: { service: true },
                },
                staff: {
                    include: {
                        user: { select: { name: true, avatar: true } },
                    },
                },
                clinic: { select: { name: true, address: true, phone: true } },
                customer: { select: { name: true, phone: true, email: true } },
                payments: true,
            },
        });

        if (!booking) {
            throw new NotFoundException(`Không tìm thấy lịch hẹn với ID: ${id}`);
        }

        return booking;
    }

    /** Lấy booking theo booking code */
    async findByCode(code: string) {
        const booking = await this.prisma.booking.findUnique({
            where: { bookingCode: code },
            include: {
                services: {
                    include: { service: true },
                },
                staff: {
                    include: {
                        user: { select: { name: true, avatar: true } },
                    },
                },
                clinic: { select: { name: true, address: true, phone: true } },
                customer: { select: { name: true, phone: true, email: true } },
                payments: true,
            },
        });

        if (!booking) {
            throw new NotFoundException(`Không tìm thấy lịch hẹn: ${code}`);
        }

        return booking;
    }

    /** Lấy danh sách booking của một khách hàng */
    async findByCustomer(customerId: string) {
        return this.prisma.booking.findMany({
            where: { customerId },
            include: {
                services: {
                    include: { service: { select: { name: true } } },
                },
                clinic: { select: { name: true } },
                staff: {
                    include: {
                        user: { select: { name: true } },
                    },
                },
            },
            orderBy: { createdAt: 'desc' },
        });
    }

    // ============ HELPERS ============

    /** Tính endTime dựa vào timeSlot và duration */
    private calculateEndTime(timeSlot: string, durationMinutes: number): string {
        const [h, m] = timeSlot.split(':').map(Number);
        const totalMinutes = h * 60 + m + durationMinutes;
        const endH = Math.floor(totalMinutes / 60);
        const endM = totalMinutes % 60;
        return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
    }

    /** Sinh booking code ngẫu nhiên: HV-XXXXXX */
    private generateBookingCode(): string {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'HV-';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }

    /** Sinh UUID đơn giản */
    private generateUuid(): string {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
            /[xy]/g,
            function (c) {
                const r = (Math.random() * 16) | 0;
                const v = c === 'x' ? r : (r & 0x3) | 0x8;
                return v.toString(16);
            },
        );
    }

    /** Xử lý webhook từ SePay */
    async handleSepayWebhook(data: any) {
        console.log('Received SePay Webhook:', data);

        // Đảm bảo payload hợp lệ
        if (!data || !data.content) {
            return { success: false, message: 'Invalid payload' };
        }

        const content = typeof data.content === 'string' ? data.content.toUpperCase() : '';
        // Trích xuất mã booking code dạng HV-XXXXXX
        const match = content.match(/HV-[A-Z0-9]{6}/);
        if (!match) {
            return { success: false, message: 'No booking code found in content' };
        }

        const bookingCode = match[0];

        // Tìm booking tương ứng
        const booking = await this.prisma.booking.findUnique({
            where: { bookingCode },
            include: { payments: true }
        });

        if (!booking) {
            return { success: false, message: `Booking ${bookingCode} not found` };
        }

        // Tìm khoản cọc đang chờ
        const depositPayment = booking.payments.find(p => p.type === 'DEPOSIT' && p.status === 'PENDING');

        if (depositPayment) {
            // Update trạng thái payment và booking
            await this.prisma.$transaction([
                this.prisma.payment.update({
                    where: { id: depositPayment.id },
                    data: {
                        status: 'PAID',
                        amount: Number(data.transferAmount) || depositPayment.amount,
                        sepayRef: data.referenceCode,
                        sepayTransId: data.id?.toString(),
                        paidAt: new Date()
                    }
                }),
                this.prisma.booking.update({
                    where: { id: booking.id },
                    data: {
                        paymentStatus: 'DEPOSIT_PAID' // Đã đóng cọc
                    }
                })
            ]);
            console.log(`Successfully updated payment for booking ${bookingCode}`);
            return { success: true, message: `Payment updated for ${bookingCode}` };
        } else {
            console.log(`No pending deposit found for booking ${bookingCode}`);
            return { success: true, message: `No pending deposit found, maybe already paid` };
        }
    }
}
