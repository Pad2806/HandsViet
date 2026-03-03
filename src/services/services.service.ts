import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ServicesService {
    constructor(private readonly prisma: PrismaService) { }

    /** Lấy tất cả services đang hoạt động (có thể filter theo clinicId) */
    async findAll(clinicId?: string) {
        return this.prisma.service.findMany({
            where: {
                isActive: true,
                ...(clinicId && { clinicId }),
            },
            include: {
                clinic: {
                    select: { id: true, name: true, slug: true },
                },
            },
            orderBy: [{ category: 'asc' }, { order: 'asc' }],
        });
    }

    /** Lấy chi tiết một service */
    async findOne(id: string) {
        const service = await this.prisma.service.findUnique({
            where: { id },
            include: {
                clinic: {
                    select: { id: true, name: true, slug: true },
                },
            },
        });

        if (!service) {
            throw new NotFoundException(`Không tìm thấy dịch vụ với ID: ${id}`);
        }

        return service;
    }

    /** Lấy danh sách dịch vụ theo clinicId */
    async findByClinic(clinicId: string) {
        return this.prisma.service.findMany({
            where: { clinicId, isActive: true },
            orderBy: [{ category: 'asc' }, { order: 'asc' }],
        });
    }
}
