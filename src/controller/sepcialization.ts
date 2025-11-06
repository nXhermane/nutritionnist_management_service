import { Context } from "elysia";
import { PrismaClient } from "../generated/prisma/client";
import { SpecializationSchema } from "../schema";

export class SpecializationController {
    constructor(private readonly prisma: PrismaClient) { }

    async createSpecialization({ body, status }: Context<{ body: typeof SpecializationSchema.createSpecializationSchema.static }>) {
        try {
            const specialization = await this.prisma.specialization.create({
                data: {
                    title: body.title,
                    description: body.description
                }
            });
            return status("Created", specialization);
        } catch (error) {
            return this.handleError(error, status);
        }
    }
    async updateSpecialization({ params, body, status }: Context<{ body: typeof SpecializationSchema.updateSpecializationSchema.static, params: typeof SpecializationSchema.identifySchema.static }>) {
        try {
            const specialization = await this.prisma.specialization.update({
                where: {
                    id: params.id
                },
                data: body
            });
            return status("OK", specialization);
        } catch (error) {
            return this.handleError(error, status);
        }
    }

    async getSpecialization({ params, status }: Context<{ params: typeof SpecializationSchema.identifySchema.static }>) {
        try {
            const specialization = await this.prisma.specialization.findFirst({
                where: {
                    id: params.id
                }
            });
            if (specialization === null) {
                return status("Not Found", { error: `Specialization with id ${params.id} not found.` });
            }
            return status("OK", specialization);
        } catch (error) {
            return this.handleError(error, status);
        }
    }

    async getAllSpecializations({ status }: Context) {
        try {
            const specializations = await this.prisma.specialization.findMany();
            return status("OK", specializations);
        } catch (error) {
            return this.handleError(error, status);
        }
    }
    
    async getNutritionistsOfSpecialization({ params, status }: Context<{ params: typeof SpecializationSchema.identifySchema.static }>) {
        try {
            const nutritionists = await this.prisma.nutritionistSpecialization.findMany({
                where: { specializationId: params.id },
                select: {
                    nutritionist: true
                }
            });
            return status("OK", {
                id: params.id,
                nutritionists: nutritionists
            });
        } catch (error) {
            this.handleError(error, status);
        }
    }
   

    private handleError(error: any, status: Context["status"]) {
        console.error(error);
        return status(500, { error: "Internal Server Error" });
    }
}