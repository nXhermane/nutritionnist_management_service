import { PrismaClientKnownRequestError } from "../../generated/prisma/internal/prismaNamespace";
import { ConflictError, NotFoundError } from "../../lib/errors";
import { prisma } from "../../lib/prisma";
import { CreateSpecializationDto, GetNutritionistsBySpecializationDto, GetSpecializationDto, SpecializationDto, UpdateSpecializationDto } from "../dtos";

export async function createSpecialization(input: CreateSpecializationDto) {
    try {
        return await prisma.specialization.create({ data: input });
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2002"
        ) {
            throw new ConflictError("Specialization title already in use.");
        }
        throw error;
    }
}
export async function getSpecializationById({ id }: GetSpecializationDto): Promise<SpecializationDto> {
    const specialization = await prisma.specialization.findFirst({ where: { id } });
    if (!specialization) {
        throw new NotFoundError(`Specialization with id ${id} not found.`);
    }
    return specialization;
}

export async function getAllSpecializations(): Promise<SpecializationDto[]> {
    return await prisma.specialization.findMany();
}

export async function updateSpecialization({ id }: GetSpecializationDto, data: UpdateSpecializationDto): Promise<void> {
    try {
        await prisma.specialization.update({ where: { id }, data });
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new NotFoundError(`Specialization with id ${id} not found.`);
        }
        throw error;
    }
}

export async function deleteSpecialization({ id }: GetSpecializationDto): Promise<void> {
    try {
        await prisma.specialization.delete({ where: { id } });
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new NotFoundError(`Specialization with id ${id} not found.`);
        }
        throw error;
    }
}

export async function getNutritionistBySpecialization({ id }: GetSpecializationDto): Promise<GetNutritionistsBySpecializationDto> {
    try {
        const nutritionists = await prisma.nutritionistSpecialization.findMany({
            where: { specializationId: id },
            select: { nutritionist: true },
        });
        return { id, nutritionists: nutritionists.map(nt => nt.nutritionist) };
    } catch (error: any) {
        if (
            error instanceof PrismaClientKnownRequestError &&
            error.code === "P2025"
        ) {
            throw new NotFoundError(`Specialization with id ${id} not found.`);
        }
        throw error;
    }
}