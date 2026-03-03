import { PrismaService } from '../prisma/prisma.service';
export declare class ServicesService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(clinicId?: string): Promise<({
        clinic: {
            id: string;
            name: string;
            slug: string;
        };
    } & {
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
    })[]>;
    findOne(id: string): Promise<{
        clinic: {
            id: string;
            name: string;
            slug: string;
        };
    } & {
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
    }>;
    findByClinic(clinicId: string): Promise<{
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
    }[]>;
}
