import { Controller, Get, Param } from '@nestjs/common';
import { ClinicsService } from './clinics.service';

@Controller('clinics')
export class ClinicsController {
    constructor(private readonly clinicsService: ClinicsService) { }

    /** GET /clinics - Danh sách tất cả phòng khám */
    @Get()
    findAll() {
        return this.clinicsService.findAll();
    }

    /** GET /clinics/:id - Chi tiết phòng khám (kèm services + staff) */
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.clinicsService.findOne(id);
    }

    /** GET /clinics/slug/:slug - Tìm phòng khám theo slug */
    @Get('slug/:slug')
    findBySlug(@Param('slug') slug: string) {
        return this.clinicsService.findBySlug(slug);
    }
}
