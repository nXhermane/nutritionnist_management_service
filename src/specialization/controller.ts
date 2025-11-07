import { Context, ElysiaCustomStatusResponse } from "elysia";
import { handleError } from "../lib/errors";
import specializationSchema from "./schema";
import { SpecializationDto } from "./dtos";
import { NutritionistDto } from "../nutritionist/dtos";
import { ISpecializationService } from "./service";

export interface ISpecializationController {
  create(context: Context<{ body: typeof specializationSchema.create.static }>): Promise<ElysiaCustomStatusResponse<201, SpecializationDto> | ElysiaCustomStatusResponse<number, { error: string }>>;
  getById(context: Context<{ params: typeof specializationSchema.params.static }>): Promise<ElysiaCustomStatusResponse<200, SpecializationDto> | ElysiaCustomStatusResponse<number, { error: string }>>;
  getAll(context: Context<{}>): Promise<ElysiaCustomStatusResponse<200, SpecializationDto[]> | ElysiaCustomStatusResponse<number, { error: string }>>;
  update(context: Context<{ params: typeof specializationSchema.params.static, body: typeof specializationSchema.update.static }>): Promise<ElysiaCustomStatusResponse<200, SpecializationDto> | ElysiaCustomStatusResponse<number, { error: string }>>;
  delete(context: Context<{ params: typeof specializationSchema.params.static }>): Promise<ElysiaCustomStatusResponse<200, {message: string}> | ElysiaCustomStatusResponse<number, { error: string }>>;
  getNutritionists(context: Context<{ params: typeof specializationSchema.params.static }>): Promise<ElysiaCustomStatusResponse<200, { id: string, nutritionists: NutritionistDto[] }> | ElysiaCustomStatusResponse<number, { error: string }>>;

}

export class SpecializationController implements ISpecializationController {
  constructor(private readonly service: ISpecializationService) { }
  async create(context: Context<{ body: typeof specializationSchema.create.static; }>): Promise<ElysiaCustomStatusResponse<201, SpecializationDto> | ElysiaCustomStatusResponse<number, { error: string; }>> {
    try {
      const specialization = await this.service.create(context.body as any);
      return context.status(201, specialization);
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }
 async getById(context: Context<{ params: typeof specializationSchema.params.static; }>): Promise<ElysiaCustomStatusResponse<200, SpecializationDto> | ElysiaCustomStatusResponse<number, { error: string; }>> {
      try {
      const specialization = await this.service.getById((context.params as any).id);
      return context.status(200, specialization);
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }
  async getAll(context: Context<{}>): Promise<ElysiaCustomStatusResponse<200, SpecializationDto[]> | ElysiaCustomStatusResponse<number, { error: string; }>> {
       try {
      const specializations = await this.service.getAll();
      return context.status(200, specializations);
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }
  async update(context: Context<{ params: typeof specializationSchema.params.static; body: typeof specializationSchema.update.static; }>): Promise<ElysiaCustomStatusResponse<200, SpecializationDto> | ElysiaCustomStatusResponse<number, { error: string; }>> {
     try {
      const specialization = await this.service.update((context.params as any).id, context.body as any);
      return context.status(200, specialization);
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }
 async delete(context: Context<{ params: typeof specializationSchema.params.static; }>): Promise<ElysiaCustomStatusResponse<200, {message: string}> | ElysiaCustomStatusResponse<number, { error: string; }>> {
    try {
      await this.service.delete((context.params as any).id);
      return context.status(200, { message: "Specialization deleted successfully." });
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }
  async getNutritionists(context: Context<{ params: typeof specializationSchema.params.static; }>): Promise<ElysiaCustomStatusResponse<200, { id: string; nutritionists: NutritionistDto[]; }> | ElysiaCustomStatusResponse<number, { error: string; }>> {
       try {
      const result = await this.service.getNutritionists((context.params as any).id);
      return context.status(200, result);
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }

  private _handleError(error: any, status: Context["status"]) {
    const handled = handleError(error);
    return status(handled.code, { error: handled.error });
  }

}