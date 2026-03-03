import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Controller('bookings')
export class BookingsController {
    constructor(private readonly bookingsService: BookingsService) { }

    /** POST /bookings - Tạo lịch hẹn mới */
    @Post()
    create(@Body() createBookingDto: CreateBookingDto) {
        return this.bookingsService.create(createBookingDto);
    }

    /** GET /bookings/:id - Lấy chi tiết lịch hẹn */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.bookingsService.findOne(id);
    }

    /** GET /bookings/code/:code - Lấy booking theo mã */
    @Get('code/:code')
    findByCode(@Param('code') code: string) {
        return this.bookingsService.findByCode(code);
    }

    /** GET /bookings?customerId=xxx - Lịch sử đặt lịch */
    @Get()
    findByCustomer(@Query('customerId') customerId: string) {
        return this.bookingsService.findByCustomer(customerId);
    }

    /** POST /bookings/sepay-webhook - Xử lý webhook từ SePay */
    @Post('sepay-webhook')
    async handleSepayWebhook(@Body() data: any) {
        return this.bookingsService.handleSepayWebhook(data);
    }
}
