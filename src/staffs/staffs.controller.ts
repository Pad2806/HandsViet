import { Controller, Get, Param, Query } from '@nestjs/common';
import { StaffsService } from './staffs.service';

@Controller('staffs')
export class StaffsController {
    constructor(private readonly staffsService: StaffsService) { }

    /** GET /staffs?clinicId=xxx - Danh sách nhân viên theo clinic */
    @Get()
    findByClinic(@Query('clinicId') clinicId: string) {
        return this.staffsService.findByClinic(clinicId);
    }

    /** GET /staffs/:id - Chi tiết nhân viên */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.staffsService.findOne(id);
    }

    /** GET /staffs/:id/slots?date=2026-03-05 - Lấy slot trống của nhân viên */
    @Get(':id/slots')
    getAvailableSlots(
        @Param('id') id: string,
        @Query('date') date: string,
    ) {
        return this.staffsService.getAvailableSlots(id, date);
    }
}
