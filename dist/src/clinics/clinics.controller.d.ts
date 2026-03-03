import { ClinicsService } from './clinics.service';
export declare class ClinicsController {
    private readonly clinicsService;
    constructor(clinicsService: ClinicsService);
    findAll(): Promise<{
        id: string;
        name: string;
        slug: string;
        description: string | null;
        address: string;
        city: string;
        district: string;
        phone: string;
        openTime: string;
        closeTime: string;
        workingDays: string[];
        logo: string | null;
        coverImage: string | null;
    }[]>;
    findOne(id: string): Promise<{
        staff: ({
            user: {
                name: string | null;
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
        })[];
        services: {
            id: string;
            name: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            duration: number;
            category: import("@prisma/client").$Enums.TreatmentCategory;
            image: string | null;
            clinicId: string;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        address: string;
        city: string;
        district: string;
        ward: string | null;
        latitude: number | null;
        longitude: number | null;
        phone: string;
        email: string | null;
        openTime: string;
        closeTime: string;
        workingDays: string[];
        logo: string | null;
        coverImage: string | null;
        images: string[];
        isActive: boolean;
        ownerId: string;
        bankCode: string | null;
        bankAccount: string | null;
        bankName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findBySlug(slug: string): Promise<{
        staff: ({
            user: {
                name: string | null;
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
        })[];
        services: {
            id: string;
            name: string;
            description: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            order: number;
            price: import("@prisma/client-runtime-utils").Decimal;
            duration: number;
            category: import("@prisma/client").$Enums.TreatmentCategory;
            image: string | null;
            clinicId: string;
        }[];
    } & {
        id: string;
        name: string;
        slug: string;
        description: string | null;
        address: string;
        city: string;
        district: string;
        ward: string | null;
        latitude: number | null;
        longitude: number | null;
        phone: string;
        email: string | null;
        openTime: string;
        closeTime: string;
        workingDays: string[];
        logo: string | null;
        coverImage: string | null;
        images: string[];
        isActive: boolean;
        ownerId: string;
        bankCode: string | null;
        bankAccount: string | null;
        bankName: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
