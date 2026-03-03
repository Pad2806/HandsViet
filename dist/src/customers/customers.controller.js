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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomersController = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CustomersController = class CustomersController {
    prisma;
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findByPhone(phone) {
        const user = await this.prisma.user.findFirst({
            where: {
                phone,
                role: 'CUSTOMER',
            },
            select: {
                id: true,
                name: true,
                phone: true,
                email: true,
                avatar: true,
                bookings: {
                    orderBy: { createdAt: 'desc' },
                    take: 20,
                    include: {
                        services: {
                            include: {
                                service: {
                                    select: {
                                        id: true,
                                        name: true,
                                        category: true,
                                        price: true,
                                        duration: true,
                                    },
                                },
                            },
                        },
                        clinic: { select: { id: true, name: true } },
                        staff: {
                            include: {
                                user: { select: { name: true } },
                            },
                        },
                    },
                },
            },
        });
        if (!user) {
            return { found: false, user: null, previousServices: [] };
        }
        const serviceMap = new Map();
        for (const booking of user.bookings) {
            for (const bs of booking.services) {
                const existing = serviceMap.get(bs.service.id);
                if (!existing) {
                    serviceMap.set(bs.service.id, {
                        serviceId: bs.service.id,
                        serviceName: bs.service.name,
                        category: bs.service.category,
                        lastBookedAt: booking.createdAt,
                        bookingStatus: booking.status,
                        timesBooked: 1,
                    });
                }
                else {
                    existing.timesBooked++;
                }
            }
        }
        return {
            found: true,
            user: {
                id: user.id,
                name: user.name,
                phone: user.phone,
                email: user.email,
            },
            previousServices: Array.from(serviceMap.values()),
        };
    }
};
exports.CustomersController = CustomersController;
__decorate([
    (0, common_1.Get)('phone/:phone'),
    __param(0, (0, common_1.Param)('phone')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CustomersController.prototype, "findByPhone", null);
exports.CustomersController = CustomersController = __decorate([
    (0, common_1.Controller)('customers'),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CustomersController);
//# sourceMappingURL=customers.controller.js.map