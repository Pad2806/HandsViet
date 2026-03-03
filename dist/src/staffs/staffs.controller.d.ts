import { StaffsService } from './staffs.service';
export declare class StaffsController {
    private readonly staffsService;
    constructor(staffsService: StaffsService);
    findByClinic(clinicId: string): Promise<({
        user: {
            name: string | null;
            phone: string | null;
            avatar: string | null;
        };
        schedules: {
            id: string;
            dayOfWeek: number;
            staffId: string;
            startTime: string;
            endTime: string;
            isOff: boolean;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        clinicId: string;
        position: import("@prisma/client").$Enums.StaffPosition;
        bio: string | null;
        rating: number;
        totalReviews: number;
        userId: string;
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
            dayOfWeek: number;
            staffId: string;
            startTime: string;
            endTime: string;
            isOff: boolean;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        clinicId: string;
        position: import("@prisma/client").$Enums.StaffPosition;
        bio: string | null;
        rating: number;
        totalReviews: number;
        userId: string;
    }>;
    getAvailableSlots(id: string, date: string): Promise<{
        available: boolean;
        slots: never[];
        message: string;
    } | {
        available: boolean;
        slots: string[];
        message?: undefined;
    }>;
}
