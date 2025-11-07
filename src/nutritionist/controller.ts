import { Context, ElysiaCustomStatusResponse } from "elysia";
import { INutritionistService } from "./service";
import { nutritionistSchema } from "./schema";
import { handleError } from "../lib/errors";
import { NutritionistDto } from "./dtos";
import { SpecializationDto } from "../specialization/dtos";


export interface INutritionistController {
  create(
    context: Context<{ body: typeof nutritionistSchema.create.static }>
  ): Promise<ElysiaCustomStatusResponse<201, NutritionistDto> | ElysiaCustomStatusResponse<number, { error: string }>>;
  getById(
    context: Context<{ params: typeof nutritionistSchema.params.static }>
  ): Promise<ElysiaCustomStatusResponse<200, NutritionistDto> | ElysiaCustomStatusResponse<number, { error: string }>>;
  getAll(
    context: Context
  ): Promise<ElysiaCustomStatusResponse<200, NutritionistDto[]> | ElysiaCustomStatusResponse<number, { error: string }>>;
  update(
    context: Context<{
      params: typeof nutritionistSchema.params.static;
      body: typeof nutritionistSchema.update.static;
    }>
  ): Promise<ElysiaCustomStatusResponse<200, NutritionistDto> | ElysiaCustomStatusResponse<number, { error: string }>>;
  delete(
    context: Context<{ params: typeof nutritionistSchema.params.static }>
  ): Promise<ElysiaCustomStatusResponse<200, { message: string }> | ElysiaCustomStatusResponse<number, { error: string }>>;
  assignSpecialization(
    context: Context<{
      params: typeof nutritionistSchema.params.static;
      body: typeof nutritionistSchema.specialization.static;
    }>
  ): Promise<ElysiaCustomStatusResponse<200, { message: string }> | ElysiaCustomStatusResponse<number, { error: string }>>;
  removeSpecialization(
    context: Context<{
      params: typeof nutritionistSchema.params.static;
      body: typeof nutritionistSchema.specialization.static;
    }>
  ): Promise<ElysiaCustomStatusResponse<200, { message: string }> | ElysiaCustomStatusResponse<number, { error: string }>>;
  getSpecializations(
    context: Context<{ params: typeof nutritionistSchema.params.static }>
  ): Promise<ElysiaCustomStatusResponse<200, {
    id: string; specializations: SpecializationDto[]
  }> | ElysiaCustomStatusResponse<number, { error: string }>>;
}


export class NutritionistController implements INutritionistController {
  constructor(private readonly nutritionistService: INutritionistService) { }

  async create(context: Context<{ body: typeof nutritionistSchema.create.static }>) {
    try {
      const nutritionist = await this.nutritionistService.create(context.body);
      return context.status(201, nutritionist);
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }

  async getById(context: Context<{ params: typeof nutritionistSchema.params.static }>) {
    try {
      const nutritionist = await this.nutritionistService.getById(
        context.params.id
      );
      return context.status(200, nutritionist);
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }

  async getAll(context: Context) {
    try {
      const nutritionists = await this.nutritionistService.getAll();
      return context.status(200, nutritionists);
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }

  async update(context: Context<{ params: typeof nutritionistSchema.params.static; body: typeof nutritionistSchema.update.static }>) {
    try {
      const nutritionist = await this.nutritionistService.update(
        context.params.id,
        context.body
      );
      return context.status(200, nutritionist);
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }

  async delete(context: Context<{ params: typeof nutritionistSchema.params.static }>) {
    try {
      await this.nutritionistService.delete(context.params.id);
      return context.status(200, {
        message: "Nutritionist deleted successfully.",
      });
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }

  async assignSpecialization(context: Context<{ params: typeof nutritionistSchema.params.static; body: typeof nutritionistSchema.specialization.static }>) {
    try {
      await this.nutritionistService.assignSpecialization(
        context.params.id,
        context.body.specializationId
      );
      return context.status(200, {
        message: "Specialization assigned successfully.",
      });
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }

  async removeSpecialization(context: Context<{ params: typeof nutritionistSchema.params.static; body: typeof nutritionistSchema.specialization.static }>) {
    try {
      await this.nutritionistService.removeSpecialization(
        context.params.id,
        context.body.specializationId
      );
      return context.status(200, {
        message: "Specialization removed successfully.",
      });
    } catch (error) {
      return this._handleError(error, context.status);
    }
  }

  async getSpecializations(context: Context<{ params: typeof nutritionistSchema.params.static }>) {
    try {
      const result = await this.nutritionistService.getSpecializations(
        context.params.id
      );
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