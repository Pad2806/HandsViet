import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class StaffsService {
    constructor(private readonly prisma: PrismaService) { }

    /** Lấy danh sách nhân viên theo clinicId */
    async findByClinic(clinicId: string) {
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

    /** Lấy chi tiết nhân viên kèm lịch trình */
    async findOne(id: string) {
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
            throw new NotFoundException(`Không tìm thấy nhân viên với ID: ${id}`);
        }

        return staff;
    }

    /** Lấy các slot trống của nhân viên cho một ngày cụ thể */
    async getAvailableSlots(staffId: string, date: string) {
        const staff = await this.prisma.staff.findUnique({
            where: { id: staffId },
            include: {
                schedules: true,
                clinic: { select: { openTime: true, closeTime: true } },
            },
        });

        if (!staff) {
            throw new NotFoundException(`Không tìm thấy nhân viên với ID: ${staffId}`);
        }

        // Lấy dayOfWeek (0=CN, 1=T2, ... 6=T7)
        const targetDate = new Date(date);
        const dayOfWeek = targetDate.getDay();

        // Kiểm tra schedule cho ngày đó
        const schedule = staff.schedules.find((s) => s.dayOfWeek === dayOfWeek);
        if (!schedule || schedule.isOff) {
            return { available: false, slots: [], message: 'Nhân viên nghỉ ngày này' };
        }

        // Lấy bookings đã tồn tại cho ngày đó
        const existingBookings = await this.prisma.booking.findMany({
            where: {
                staffId,
                date: targetDate,
                status: { notIn: ['CANCELLED', 'NO_SHOW'] },
            },
            select: { timeSlot: true, endTime: true },
        });

        // Sinh các slot 30 phút từ startTime → endTime
        const slots = this.generateTimeSlots(
            schedule.startTime,
            schedule.endTime,
            30, // 30 phút mỗi slot
        );

        // Lọc bỏ slot đã bị book
        const availableSlots = slots.filter((slot) => {
            return !existingBookings.some(
                (booking) => slot >= booking.timeSlot && slot < booking.endTime,
            );
        });

        return { available: availableSlots.length > 0, slots: availableSlots };
    }

    /** Helper: Sinh danh sách time slots */
    private generateTimeSlots(
        startTime: string,
        endTime: string,
        intervalMinutes: number,
    ): string[] {
        const slots: string[] = [];
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
}
