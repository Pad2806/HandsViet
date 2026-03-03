import { Controller, Get, Param, Query } from '@nestjs/common';
import { ServicesService } from './services.service';

@Controller('services')
export class ServicesController {
    constructor(private readonly servicesService: ServicesService) { }

    /** GET /services?clinicId=xxx - Danh sách dịch vụ (có thể filter theo clinic) */
    @Get()
    findAll(@Query('clinicId') clinicId?: string) {
        return this.servicesService.findAll(clinicId);
    }

    /** GET /services/:id - Chi tiết một dịch vụ */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.servicesService.findOne(id);
    }
}
