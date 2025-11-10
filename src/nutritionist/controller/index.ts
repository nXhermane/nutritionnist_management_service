import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace";
import { ConflictError, NotFoundError } from "../../lib/errors";
import { prisma } from "../../lib/prisma";
import { CreateNutritionistDto, GetNutritionistDto, UpdateNutritionistDto, NutritionistDto, NutritionistSpecializationDto, GetNutritionistSpecializationResponseDto } from "../dtos";

export async function createNutritionist(input: CreateNutritionistDto): Promise<{ id: string }> {
    try {
        const nutritionist = await prisma.nutritionist.create({ data: input });
        return { id: nutritionist.id }
    } catch (error) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new ConflictError("Email already in use.");
        }
        throw error;
    }
}

export async function getNutritionistById({ id }: GetNutritionistDto): Promise<NutritionistDto> {
    const nutritionist = await prisma.nutritionist.findUnique({ where: { id } });
    if (!nutritionist) {
        throw new NotFoundError(`Nutritionist with id ${id} not found.`);
    }
    return nutritionist;
}

export async function getAllNutritionists(): Promise<NutritionistDto[]> {
    return await prisma.nutritionist.findMany();
}
export async function updateNutritionist({ id }: GetNutritionistDto, data: UpdateNutritionistDto): Promise<void> {
    try {
        await prisma.nutritionist.update({
            where: { id },
            data,
        });
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new NotFoundError(`Nutritionist with id ${id} not found.`);
        }
        throw error;
    }
}

export async function deleteNutritionist({ id }: GetNutritionistDto): Promise<void> {
    try {
        await prisma.nutritionist.delete({ where: { id } });
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new NotFoundError(`Nutritionist with id ${id} not found.`);
        }
        throw error;
    }
}
export async function assignSpecializationToNutritionist({ id }: GetNutritionistDto, { specializationId }: NutritionistSpecializationDto): Promise<void> {
    try {
        await prisma.nutritionistSpecialization.create({
            data: { nutritionistId: id, specializationId },
        });
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2003"
        ) {
            throw new NotFoundError("Nutritionist or Specialization not found.");
        }
        throw error;
    }
}

export async function removeNutritionistSpecialization({ id }: GetNutritionistDto, { specializationId }: NutritionistSpecializationDto): Promise<void> {
    try {
        await prisma.nutritionistSpecialization.deleteMany({
            where: { nutritionistId: id, specializationId },
        });
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2003"
        ) {
            throw new NotFoundError("Nutritionist or Specialization not found.");
        }
        throw error;
    }
}

export async function getNutritionistSpecialization({ id }: GetNutritionistDto): Promise<GetNutritionistSpecializationResponseDto> {
    try {
        const specializations = await prisma.nutritionistSpecialization.findMany({
            where: { nutritionistId: id },
            select: { specialization: true },
        });
        return { id, specializations: specializations.map(sp => sp.specialization) };
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new NotFoundError(`Nutritionist with id ${id} not found.`);
        }
        throw error;
    }
}