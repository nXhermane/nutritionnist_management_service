import { prisma } from "../lib/prisma";
import { NotFoundError, ConflictError } from "../lib/errors";
import { PrismaClientKnownRequestError } from "../generated/prisma/internal/prismaNamespace";
import { CreateSpecializationDto, SpecializationDto } from "./dtos";
import { NutritionistDto } from "../nutritionist/dtos";


export interface ISpecializationService {
  create(data: CreateSpecializationDto): Promise<SpecializationDto>;
  getById(id: string): Promise<SpecializationDto>
  getAll(): Promise<SpecializationDto[]>
  update(id: string, data: Partial<CreateSpecializationDto>): Promise<SpecializationDto>
  delete(id: string): Promise<void>
  getNutritionists(specializationId: string): Promise<{ id: string, nutritionists: NutritionistDto[] }>
}

export class SpecializationService implements ISpecializationService {
  async create(data: CreateSpecializationDto): Promise<SpecializationDto> {
    try {
      return await prisma.specialization.create({ data });
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
  async getById(id: string): Promise<SpecializationDto> {
    const specialization = await prisma.specialization.findFirst({ where: { id } });
    if (!specialization) {
      throw new NotFoundError(`Specialization with id ${id} not found.`);
    }
    return specialization;
  }
  async getAll(): Promise<SpecializationDto[]> {
    return await prisma.specialization.findMany();
  }
  async update(id: string, data: Partial<SpecializationDto>): Promise<SpecializationDto> {
    try {
      return await prisma.specialization.update({ where: { id }, data });
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
  async delete(id: string): Promise<void> {
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
  async getNutritionists(specializationId: string): Promise<{ id: string; nutritionists: NutritionistDto[]; }> {
    const nutritionists = await prisma.nutritionistSpecialization.findMany({
      where: { specializationId },
      select: { nutritionist: true },
    });
    return { id: specializationId, nutritionists: nutritionists.map(nt => nt.nutritionist) };
  }

}
