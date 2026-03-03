import { IsString, IsOptional, IsArray, ValidateNested, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

export class BookingServiceDto {
    @IsString()
    serviceId: string;
}

export class CreateBookingDto {
    /** ID của khách hàng (UUID or guest-xxx) */
    @IsString()
    customerId: string;

    /** Tên khách hàng (cho guest) */
    @IsOptional()
    @IsString()
    customerName?: string;

    /** SĐT khách hàng */
    @IsOptional()
    @IsString()
    customerPhone?: string;

    /** Email khách hàng */
    @IsOptional()
    @IsString()
    customerEmail?: string;

    /** ID phòng khám */
    @IsString()
    clinicId: string;

    /** ID nhân viên (có thể không chọn) */
    @IsOptional()
    @IsString()
    staffId?: string;

    /** Ngày đặt lịch (YYYY-MM-DD) */
    @IsDateString()
    date: string;

    /** Giờ bắt đầu (HH:mm) */
    @IsString()
    timeSlot: string;

    /** Danh sách dịch vụ đặt */
    @IsArray()
    @ValidateNested({ each: true })
    @Type(() => BookingServiceDto)
    services: BookingServiceDto[];

    /** Mô tả bệnh lý */
    @IsOptional()
    @IsString()
    medicalDescription?: string;

    /** Ảnh X-quang / y tế (URLs) */
    @IsOptional()
    @IsArray()
    medicalImages?: string[];

    /** Ghi chú */
    @IsOptional()
    @IsString()
    note?: string;

    /** Phương thức thanh toán */
    @IsOptional()
    @IsString()
    paymentMethod?: string;
}

