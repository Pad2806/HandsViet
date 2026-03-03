import { PrismaService } from '../prisma/prisma.service';
export declare class StaffsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByClinic(clinicId: string): Promise<({
        user: {
            name: string | null;
            phone: string | null;
            avatar: string | null;
        };
        schedules: {
            id: string;
            staffId: string;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            isOff: boolean;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        position: import("@prisma/client").$Enums.StaffPosition;
        bio: string | null;
        rating: number;
        totalReviews: number;
        userId: string;
        clinicId: string;
    })[]>;
    findOne(id: string): Promise<{
        user: {
            name: string | null;
            phone: string | null;
            avatar: string | null;
        };
        clinic: {
            id: string;
            name: string;
            openTime: string;
            closeTime: string;
        };
        schedules: {
            id: string;
            staffId: string;
            dayOfWeek: number;
            startTime: string;
            endTime: string;
            isOff: boolean;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        position: import("@prisma/client").$Enums.StaffPosition;
        bio: string | null;
        rating: number;
        totalReviews: number;
        userId: string;
        clinicId: string;
    }>;
    getAvailableSlots(staffId: string, date: string): Promise<{
        available: boolean;
        slots: never[];
        message: string;
    } | {
        available: boolean;
        slots: string[];
        message?: undefined;
    }>;
    private generateTimeSlots;
}
