import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
export declare class BookingsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: CreateBookingDto): Promise<{
        clinic: {
            name: string;
            address: string;
            phone: string;
        };
        staff: ({
            user: {
                name: string | null;
            };
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
        createdAt: Date;
        updatedAt: Date;
        clinicId: string;
        staffId: string | null;
        endTime: string;
        bookingCode: string;
        customerId: string;
        date: Date;
        timeSlot: string;
        totalDuration: number;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.BookingStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        note: string | null;
        cancelReason: string | null;
        cancelledAt: Date | null;
        cancelledBy: string | null;
    }>;
    findOne(id: string): Promise<{
        clinic: {
            name: string;
            address: string;
            phone: string;
        };
        staff: ({
            user: {
                name: string | null;
                avatar: string | null;
            };
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
        }) | null;
        services: ({
            service: {
                id: string;
                name: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                clinicId: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                duration: number;
                category: import("@prisma/client").$Enums.TreatmentCategory;
                image: string | null;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            duration: number;
            serviceId: string;
            bookingId: string;
        })[];
        customer: {
            name: string | null;
            phone: string | null;
            email: string | null;
        };
        payments: {
            id: string;
            bankCode: string | null;
            bankAccount: string | null;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
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
        createdAt: Date;
        updatedAt: Date;
        clinicId: string;
        staffId: string | null;
        endTime: string;
        bookingCode: string;
        customerId: string;
        date: Date;
        timeSlot: string;
        totalDuration: number;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.BookingStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        note: string | null;
        cancelReason: string | null;
        cancelledAt: Date | null;
        cancelledBy: string | null;
    }>;
    findByCode(code: string): Promise<{
        clinic: {
            name: string;
            address: string;
            phone: string;
        };
        staff: ({
            user: {
                name: string | null;
                avatar: string | null;
            };
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
        }) | null;
        services: ({
            service: {
                id: string;
                name: string;
                description: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                order: number;
                clinicId: string;
                price: import("@prisma/client-runtime-utils").Decimal;
                duration: number;
                category: import("@prisma/client").$Enums.TreatmentCategory;
                image: string | null;
            };
        } & {
            id: string;
            price: import("@prisma/client-runtime-utils").Decimal;
            duration: number;
            serviceId: string;
            bookingId: string;
        })[];
        customer: {
            name: string | null;
            phone: string | null;
            email: string | null;
        };
        payments: {
            id: string;
            bankCode: string | null;
            bankAccount: string | null;
            createdAt: Date;
            updatedAt: Date;
            status: import("@prisma/client").$Enums.PaymentStatus;
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
        createdAt: Date;
        updatedAt: Date;
        clinicId: string;
        staffId: string | null;
        endTime: string;
        bookingCode: string;
        customerId: string;
        date: Date;
        timeSlot: string;
        totalDuration: number;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.BookingStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        note: string | null;
        cancelReason: string | null;
        cancelledAt: Date | null;
        cancelledBy: string | null;
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
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            position: import("@prisma/client").$Enums.StaffPosition;
            bio: string | null;
            rating: number;
            totalReviews: number;
            userId: string;
            clinicId: string;
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
        createdAt: Date;
        updatedAt: Date;
        clinicId: string;
        staffId: string | null;
        endTime: string;
        bookingCode: string;
        customerId: string;
        date: Date;
        timeSlot: string;
        totalDuration: number;
        totalAmount: import("@prisma/client-runtime-utils").Decimal;
        status: import("@prisma/client").$Enums.BookingStatus;
        paymentStatus: import("@prisma/client").$Enums.PaymentStatus;
        paymentMethod: import("@prisma/client").$Enums.PaymentMethod | null;
        note: string | null;
        cancelReason: string | null;
        cancelledAt: Date | null;
        cancelledBy: string | null;
    })[]>;
    private calculateEndTime;
    private generateBookingCode;
    private generateUuid;
    handleSepayWebhook(data: any): Promise<{
        success: boolean;
        message: string;
    }>;
}
