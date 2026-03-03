export declare class BookingServiceDto {
    serviceId: string;
}
export declare class CreateBookingDto {
    customerId: string;
    customerName?: string;
    customerPhone?: string;
    customerEmail?: string;
    clinicId: string;
    staffId?: string;
    date: string;
    timeSlot: string;
    services: BookingServiceDto[];
    medicalDescription?: string;
    medicalImages?: string[];
    note?: string;
    paymentMethod?: string;
}
