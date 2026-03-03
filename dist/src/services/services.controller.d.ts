import { ServicesService } from './services.service';
export declare class ServicesController {
    private readonly servicesService;
    constructor(servicesService: ServicesService);
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
}
