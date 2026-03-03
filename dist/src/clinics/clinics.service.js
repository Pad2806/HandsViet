"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClinicsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let ClinicsService = class ClinicsService {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.clinic.findMany({
            where: { isActive: true },
            select: {
                id: true,
                name: true,
                slug: true,
                description: true,
                address: true,
                city: true,
                district: true,
                phone: true,
                openTime: true,
                closeTime: true,
                workingDays: true,
                logo: true,
                coverImage: true,
            },
            orderBy: { name: 'asc' },
        });
    }
    async findOne(id) {
        const clinic = await this.prisma.clinic.findUnique({
            where: { id },
            include: {
                services: {
                    where: { isActive: true },
                    orderBy: { order: 'asc' },
                },
                staff: {
                    where: { isActive: true },
                    include: {
                        user: {
                            select: { name: true, avatar: true },
                        },
                        schedules: true,
                    },
                },
            },
        });
        if (!clinic) {
            throw new common_1.NotFoundException(`Không tìm thấy phòng khám với ID: ${id}`);
        }
        return clinic;
    }
    async findBySlug(slug) {
        const clinic = await this.prisma.clinic.findUnique({
            where: { slug },
            include: {
                services: {
                    where: { isActive: true },
                    orderBy: { order: 'asc' },
                },
                staff: {
                    where: { isActive: true },
                    include: {
                        user: {
                            select: { name: true, avatar: true },
                        },
                        schedules: true,
                    },
                },
            },
        });
        if (!clinic) {
            throw new common_1.NotFoundException(`Không tìm thấy phòng khám: ${slug}`);
        }
        return clinic;
    }
};
exports.ClinicsService = ClinicsService;
exports.ClinicsService = ClinicsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClinicsService);
//# sourceMappingURL=clinics.service.js.map