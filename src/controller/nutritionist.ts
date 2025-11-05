import { Context } from "elysia";
import { NutritionistSchema } from "../schema";
import { PrismaClient } from "../generated/prisma/client";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";



export class NutritionistController {
    private readonly prisma: PrismaClient
    constructor() {
        this.prisma = new PrismaClient()
    }
    async createNutritionist({ body, status }: Context<{ body: typeof NutritionistSchema.createNutritionistSchema.static }>) {
        try {
            const nutritonist = await this.prisma.nutritionist.create({
                data: {
                    email: body.email,
                    firstName: body.firstName,
                    lastName: body.lastName,
                    phoneNumber: body.phoneNumber,
                    address: body.address,
                    specializations: {
                        connect: body.specializationIds?.map(id => ({ id })),
                        create: body.specializations
                    }
                }
            })
            return status("Created", nutritonist)
        } catch (error: any) {
            if (error instanceof PrismaClientKnownRequestError && error.code === 'P2002') {
                return status(409, { error: error.message });
            }
            return this.handleError(error, status)
        }
    }
    async getNutritionist({ params, status }: Context<{ params: typeof NutritionistSchema.identifySchema.static }>) {
        try {
            const nutritionist = await this.prisma.nutritionist.findFirst({
                where: {
                    id: params.id
                }
            })
            if (nutritionist === null) {
                return status("Not Found", { error: `Nutritionist with id ${params.id} not found.` })
            }
            return status("OK", nutritionist)
        } catch (error) {
            return this.handleError(error, status)
        }
    }
    async getNutritionistWithSpecialization({ params, status }: Context<{ params: typeof NutritionistSchema.identifySchema.static }>) {
        try {
            const nutritionistWithSpecialization = await this.prisma.nutritionist.findFirst({
                where: {
                    id: params.id,
                },
                include: {
                    specializations: true,
                }
            })
            if (nutritionistWithSpecialization === null) {
                return status("Not Found", { error: `Nutritionist with id ${params.id} not found.` })
            }
            return status("OK", nutritionistWithSpecialization)
        } catch (error) {
            return this.handleError(error, status)
        }
    }
    async getAllNutritionists({ status }: Context) {
        try {
            const nutritionists = await this.prisma.nutritionist.findMany()
            return status("OK", nutritionists)
        } catch (error) {
            return this.handleError(error, status)
        }
    }
    async updateNutritionist({ params, body, status }: Context<{ body: typeof NutritionistSchema.updateNutritionistSchema.static, params: typeof NutritionistSchema.identifySchema.static }>) {
        try {
            const nutritionist = await this.prisma.nutritionist.update({
                where: {
                    id: params.id
                },
                data: body
            })
            return status("OK", nutritionist)
        } catch (error) {
            return this.handleError(error, status)
        }
    }
    async deleteNutritionist({ params, status }: Context<{ params: typeof NutritionistSchema.identifySchema }>) {
        try {
            await this.prisma.nutritionist.delete({
                where: {
                    id: params.id
                }
            })
            return status("OK", { message: "Nutritionsit is sucessful delete." })
        } catch (error) {
            return this.handleError(error, status)
        }
    }
    async getAllSpecialization({ status }: Context) {
        try {
            const specializations = await this.prisma.specialization.findMany()
            return status("OK", specializations)
        } catch (error) {
            return this.handleError(error, status)
        }
    }
    private handleError(error: any, status: Context['status']) {
        return status(500, { error: error['message'] || JSON.stringify(error) })
    }
}