import { Context, t } from "elysia";
import { NutritionistSpecializationSchema } from "../schema";
import { PrismaClient } from "../generated/prisma/client";

export class NutritionistSpecializationController {
    constructor(private readonly prisma: PrismaClient) { }
    async asignSpecializationToNutritionist({ body, status }: Context<{ body: typeof NutritionistSpecializationSchema.specializationSchema.static }>) {
        try {
            const assignment = await this.prisma.nutritionistSpecialization.create({
                data: {
                    nutritionistId: body.nutritionistId,
                    specializationId: body.specializationId
                }
            });
            return assignment;
        } catch (error) {
            this.handleError(error, status);
        }
    }
    async removeSpecializationFromNutritionist({ body, status }: Context<{ body: typeof NutritionistSpecializationSchema.specializationSchema.static }>) {
        try {
            const deletion = await this.prisma.nutritionistSpecialization.deleteMany({
                where: {
                    nutritionistId: body.nutritionistId,
                    specializationId: body.specializationId
                }
            });
            return deletion;
        } catch (error) {
            this.handleError(error, status);
        }
    }

    async getSpecializationsForNutritionist({ params, status }: Context<{ params: typeof NutritionistSpecializationSchema.identifyNutritionistSchema.static }>) {
        try {
            const specializations = await this.prisma.nutritionistSpecialization.findMany({
                where: {
                    nutritionistId: params.nutritionistId
                },
                select: { specializationId: true }
            });
            return status("OK", specializations.map(sp => sp.specializationId))
        } catch (error) {
            this.handleError(error, status);
        }
    }
    async getNutritionistsForSpecialization({ params, query, status }: Context<{ params: typeof NutritionistSpecializationSchema.identifySpecializationSchema.static }>) {
        try {
            const nutritionists = await this.prisma.nutritionistSpecialization.findMany({
                where: { specializationId: params.specializationId },
                select: {
                    nutritionistId: true
                }
            });
            return status("OK", nutritionists.map(ns => ns.nutritionistId));
        } catch (error) {
            this.handleError(error, status);
        }
    }

    async removeAllNutritionistsFromSpecialization({ params, status }: Context<{ params: typeof NutritionistSpecializationSchema.identifySpecializationSchema.static }>) {
        try {
            const deletion = await this.prisma.nutritionistSpecialization.deleteMany({
                where: {
                    specializationId: params.specializationId
                }
            });
            return status("OK", {
                message: `All nutritionists removed from specialization ${params.specializationId} successfully.`,
                count: deletion.count
            })
        } catch (error) {
            this.handleError(error, status);
        }
    }


    private handleError(error: any, status: Context["status"]) {
        console.error(error);
        return status(500, { error: "Internal Server Error" });
    }
}