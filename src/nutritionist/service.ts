import { prisma } from "../lib/prisma";
import { NotFoundError, ConflictError } from "../lib/errors";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";
import { CreateNutritionistDto, NutritionistDto } from "./dtos";
import { SpecializationDto } from "../specialization/dtos";
export interface INutritionistService {
  create(data: CreateNutritionistDto): Promise<NutritionistDto>;
  getById(id: string): Promise<NutritionistDto>;
  getAll(): Promise<NutritionistDto[]>;
  update(id: string, data: Partial<CreateNutritionistDto>): Promise<NutritionistDto>;
  delete(id: string): Promise<void>;
  assignSpecialization(nutritionistId: string, specializationId: string): Promise<void>;
  removeSpecialization(nutritionistId: string, specializationId: string): Promise<void>;
  getSpecializations(nutritionistId: string): Promise<{ id: string; specializations: SpecializationDto[] }>;
}
export class NutritionistService implements INutritionistService {
  async create(data: CreateNutritionistDto) {
    try {
      return await prisma.nutritionist.create({ data });
    } catch (error: any) {
      if (
        error instanceof PrismaClientKnownRequestError &&
        error.code === "P2002"
      ) {
        throw new ConflictError("Email already in use.");
      }
      throw error;
    }
  }
  async getById(id: string) {
    const nutritionist = await prisma.nutritionist.findUnique({ where: { id } });
    if (!nutritionist) {
      throw new NotFoundError(`Nutritionist with id ${id} not found.`);
    }
    return nutritionist;
  }
  async getAll() {
    return await prisma.nutritionist.findMany();
  }
  async update(
    id: string,
    data: Partial<CreateNutritionistDto>
  ) {
    try {
      return await prisma.nutritionist.update({
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
  async delete(id: string) {
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
  async assignSpecialization(nutritionistId: string, specializationId: string) {
    try {
      await prisma.nutritionistSpecialization.create({
        data: { nutritionistId, specializationId },
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
  async removeSpecialization(nutritionistId: string, specializationId: string) {
    await prisma.nutritionistSpecialization.deleteMany({
      where: { nutritionistId, specializationId },
    });
  }
  async getSpecializations(nutritionistId: string) {
    const specializations = await prisma.nutritionistSpecialization.findMany({
      where: { nutritionistId },
      select: { specialization: true },
    });
    return { id: nutritionistId, specializations: specializations.map(sp => sp.specialization) };
  }
}