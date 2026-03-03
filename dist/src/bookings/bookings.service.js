"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let BookingsService = class BookingsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        const serviceIds = dto.services.map((s) => s.serviceId);
        const dbServices = await this.prisma.service.findMany({
            where: { id: { in: serviceIds }, isActive: true },
        });
        if (dbServices.length !== serviceIds.length) {
            throw new common_1.BadRequestException('Một hoặc nhiều dịch vụ không hợp lệ.');
        }
        const totalDuration = dbServices.reduce((sum, s) => sum + s.duration, 0);
        const totalAmount = dbServices.reduce((sum, s) => sum + Number(s.price), 0);
        const endTime = this.calculateEndTime(dto.timeSlot, totalDuration);
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
                throw new common_1.BadRequestException('Nhân viên này đã có lịch hẹn trong khung giờ đã chọn.');
            }
        }
        const bookingCode = this.generateBookingCode();
        let resolvedCustomerId = dto.customerId;
        if (resolvedCustomerId.startsWith('guest-') || !resolvedCustomerId) {
            let existingUser = dto.customerPhone
                ? await this.prisma.user.findFirst({ where: { phone: dto.customerPhone } })
                : null;
            if (!existingUser) {
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
        const noteLines = [];
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
    async findOne(id) {
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
            throw new common_1.NotFoundException(`Không tìm thấy lịch hẹn với ID: ${id}`);
        }
        return booking;
    }
    async findByCode(code) {
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
            throw new common_1.NotFoundException(`Không tìm thấy lịch hẹn: ${code}`);
        }
        return booking;
    }
    async findByCustomer(customerId) {
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
    calculateEndTime(timeSlot, durationMinutes) {
        const [h, m] = timeSlot.split(':').map(Number);
        const totalMinutes = h * 60 + m + durationMinutes;
        const endH = Math.floor(totalMinutes / 60);
        const endM = totalMinutes % 60;
        return `${String(endH).padStart(2, '0')}:${String(endM).padStart(2, '0')}`;
    }
    generateBookingCode() {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let code = 'HV-';
        for (let i = 0; i < 6; i++) {
            code += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return code;
    }
    generateUuid() {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = (Math.random() * 16) | 0;
            const v = c === 'x' ? r : (r & 0x3) | 0x8;
            return v.toString(16);
        });
    }
    async handleSepayWebhook(data) {
        console.log('Received SePay Webhook:', data);
        if (!data || !data.content) {
            return { success: false, message: 'Invalid payload' };
        }
        const content = typeof data.content === 'string' ? data.content.toUpperCase() : '';
        const match = content.match(/HV-[A-Z0-9]{6}/);
        if (!match) {
            return { success: false, message: 'No booking code found in content' };
        }
        const bookingCode = match[0];
        const booking = await this.prisma.booking.findUnique({
            where: { bookingCode },
            include: { payments: true }
        });
        if (!booking) {
            return { success: false, message: `Booking ${bookingCode} not found` };
        }
        const depositPayment = booking.payments.find(p => p.type === 'DEPOSIT' && p.status === 'PENDING');
        if (depositPayment) {
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
                        paymentStatus: 'DEPOSIT_PAID'
                    }
                })
            ]);
            console.log(`Successfully updated payment for booking ${bookingCode}`);
            return { success: true, message: `Payment updated for ${bookingCode}` };
        }
        else {
            console.log(`No pending deposit found for booking ${bookingCode}`);
            return { success: true, message: `No pending deposit found, maybe already paid` };
        }
    }
};
exports.BookingsService = BookingsService;
exports.BookingsService = BookingsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], BookingsService);
//# sourceMappingURL=bookings.service.js.map