import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBookingDto): Promise<{
        clinic: {
            name: string;
            phone: string;
            address: string;
        };
        staff: ({
            user: {
                name: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clinicId: string;
            isActive: boolean;
            position: import("@prisma/client").$Enums.StaffPosition;
            bio: string | null;
            rating: number;
            totalReviews: number;
            userId: string;
        }) | null;
        services: ({
            service: {
                name: string;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            duration: number;
            serviceId: string;
            bookingId: string;
        })[];
    } & {
        id: string;
        bookingCode: string;
        date: Date;
        timeSlot: string;
        endTime: string;
        totalDuration: number;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.BookingStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        note: string | null;
        cancelReason: string | null;
        cancelledAt: Date | null;
        cancelledBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        clinicId: string;
        staffId: string | null;
    }>;
    findOne(id: string): Promise<{
        clinic: {
            name: string;
            phone: string;
            address: string;
        };
        staff: ({
            user: {
                name: string | null;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clinicId: string;
            isActive: boolean;
            position: import("@prisma/client").$Enums.StaffPosition;
            bio: string | null;
            rating: number;
            totalReviews: number;
            userId: string;
        }) | null;
        customer: {
            name: string | null;
            email: string | null;
            phone: string | null;
        };
        services: ({
            service: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                clinicId: string;
                name: string;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                duration: number;
                category: import("@prisma/client").$Enums.TreatmentCategory;
                image: string | null;
                isActive: boolean;
                order: number;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            duration: number;
            serviceId: string;
            bookingId: string;
        })[];
        payments: {
            id: string;
            status: import("@prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            bankCode: string | null;
            bankAccount: string | null;
            bookingId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            type: import("@prisma/client").$Enums.PaymentType;
            qrCode: string | null;
            qrContent: string | null;
            sepayTransId: string | null;
            sepayRef: string | null;
            paidAt: Date | null;
        }[];
    } & {
        id: string;
        bookingCode: string;
        date: Date;
        timeSlot: string;
        endTime: string;
        totalDuration: number;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.BookingStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        note: string | null;
        cancelReason: string | null;
        cancelledAt: Date | null;
        cancelledBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        clinicId: string;
        staffId: string | null;
    }>;
    findByCode(code: string): Promise<{
        clinic: {
            name: string;
            phone: string;
            address: string;
        };
        staff: ({
            user: {
                name: string | null;
                avatar: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clinicId: string;
            isActive: boolean;
            position: import("@prisma/client").$Enums.StaffPosition;
            bio: string | null;
            rating: number;
            totalReviews: number;
            userId: string;
        }) | null;
        customer: {
            name: string | null;
            email: string | null;
            phone: string | null;
        };
        services: ({
            service: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                clinicId: string;
                name: string;
                description: string | null;
                price: import("@prisma/client-runtime-utils").Decimal;
                duration: number;
                category: import("@prisma/client").$Enums.TreatmentCategory;
                image: string | null;
                isActive: boolean;
                order: number;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            duration: number;
            serviceId: string;
            bookingId: string;
        })[];
        payments: {
            id: string;
            status: import("@prisma/client").$Enums.PaymentStatus;
            createdAt: Date;
            updatedAt: Date;
            bankCode: string | null;
            bankAccount: string | null;
            bookingId: string;
            amount: import("@prisma/client-runtime-utils").Decimal;
            method: import("@prisma/client").$Enums.PaymentMethod;
            type: import("@prisma/client").$Enums.PaymentType;
            qrCode: string | null;
            qrContent: string | null;
            sepayTransId: string | null;
            sepayRef: string | null;
            paidAt: Date | null;
        }[];
    } & {
        id: string;
        bookingCode: string;
        date: Date;
        timeSlot: string;
        endTime: string;
        totalDuration: number;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.BookingStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        note: string | null;
        cancelReason: string | null;
        cancelledAt: Date | null;
        cancelledBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        clinicId: string;
        staffId: string | null;
    }>;
    findByCustomer(customerId: string): Promise<({
        clinic: {
            name: string;
        };
        staff: ({
            user: {
                name: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            clinicId: string;
            isActive: boolean;
            position: import("@prisma/client").$Enums.StaffPosition;
            bio: string | null;
            rating: number;
            totalReviews: number;
            userId: string;
        }) | null;
        services: ({
            service: {
                name: string;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            duration: number;
            serviceId: string;
            bookingId: string;
        })[];
    } & {
        id: string;
        bookingCode: string;
        date: Date;
        timeSlot: string;
        endTime: string;
        totalDuration: number;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.BookingStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        note: string | null;
        cancelReason: string | null;
        cancelledAt: Date | null;
        cancelledBy: string | null;
        createdAt: Date;
        updatedAt: Date;
        customerId: string;
        clinicId: string;
        staffId: string | null;
    })[]>;
    private calculateEndTime;
    private generateBookingCode;
    private generateUuid;
    handleSepayWebhook(data: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
