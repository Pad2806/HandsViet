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
exports.StaffsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let StaffsService = class StaffsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByClinic(clinicId) {
        return this.prisma.staff.findMany({
            where: { clinicId, isActive: true },
            include: {
                user: {
                    select: { name: true, avatar: true, phone: true },
                },
                schedules: {
                    orderBy: { dayOfWeek: 'asc' },
                },
            },
        });
    }
    async findOne(id) {
        const staff = await this.prisma.staff.findUnique({
            where: { id },
            include: {
                user: {
                    select: { name: true, avatar: true, phone: true },
                },
                schedules: {
                    orderBy: { dayOfWeek: 'asc' },
                },
                clinic: {
                    select: { id: true, name: true, openTime: true, closeTime: true },
                },
            },
        });
        if (!staff) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID: ${id}`);
        }
        return staff;
    }
    async getAvailableSlots(staffId, date) {
        const staff = await this.prisma.staff.findUnique({
            where: { id: staffId },
            include: {
                schedules: true,
                clinic: { select: { openTime: true, closeTime: true } },
            },
        });
        if (!staff) {
            throw new common_1.NotFoundException(`Không tìm thấy nhân viên với ID: ${staffId}`);
        }
        const targetDate = new Date(date);
        const dayOfWeek = targetDate.getDay();
        const schedule = staff.schedules.find((s) => s.dayOfWeek === dayOfWeek);
        if (!schedule || schedule.isOff) {
            return { available: false, slots: [], message: 'Nhân viên nghỉ ngày này' };
        }
        const existingBookings = await this.prisma.booking.findMany({
            where: {
                staffId,
                date: targetDate,
                status: { notIn: ['CANCELLED', 'NO_SHOW'] },
            },
            select: { timeSlot: true, endTime: true },
        });
        const slots = this.generateTimeSlots(schedule.startTime, schedule.endTime, 30);
        const availableSlots = slots.filter((slot) => {
            return !existingBookings.some((booking) => slot >= booking.timeSlot && slot < booking.endTime);
        });
        return { available: availableSlots.length > 0, slots: availableSlots };
    }
    generateTimeSlots(startTime, endTime, intervalMinutes) {
        const slots = [];
        const [startH, startM] = startTime.split(':').map(Number);
        const [endH, endM] = endTime.split(':').map(Number);
        let currentMinutes = startH * 60 + startM;
        const endMinutes = endH * 60 + endM;
        while (currentMinutes < endMinutes) {
            const h = Math.floor(currentMinutes / 60);
            const m = currentMinutes % 60;
            slots.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
            currentMinutes += intervalMinutes;
        }
        return slots;
    }
};
exports.StaffsService = StaffsService;
exports.StaffsService = StaffsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], StaffsService);
//# sourceMappingURL=staffs.service.js.map