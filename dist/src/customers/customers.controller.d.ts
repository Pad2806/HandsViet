import { PrismaService } from '../prisma/prisma.service';
export declare class CustomersController {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findByPhone(phone: string): Promise<{
        found: boolean;
        user: null;
        previousServices: never[];
    } | {
        found: boolean;
        user: {
            id: string;
            name: string | null;
            phone: string | null;
            email: string | null;
        };
        previousServices: {
            serviceId: string;
            serviceName: string;
            category: string;
            lastBookedAt: Date;
            bookingStatus: string;
            timesBooked: number;
        }[];
    }>;
}
