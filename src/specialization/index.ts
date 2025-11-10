import { Elysia, t } from "elysia";
import * as SpecializationController from './controller';
import { createSpecializationSchema, getNutritionistBySpecializationResponse, getSpecializationResponse, getSpecializationSchema, updateSpecializationSchema } from "./dtos";

export const specializationRoute = new Elysia({ prefix: "/specializations" })
  .get("/", ({ }) => SpecializationController.getAllSpecializations(), { response: t.Array(getSpecializationResponse) })
  .post("/", ({ body }) => SpecializationController.createSpecialization(body), {
    body: createSpecializationSchema,
    response: getSpecializationSchema
  })
  .put("/:id", ({ params, body }) => SpecializationController.updateSpecialization(params, body), {
    params: getSpecializationSchema,
    body: updateSpecializationSchema,
    response: t.Void()
  })
  .get("/:id", ({ params }) => SpecializationController.getSpecializationById(params), {
    params: getSpecializationSchema,
    response: getSpecializationResponse
  })
  .get("/:id/nutritionists", ({ params }) => SpecializationController.getNutritionistBySpecialization(params), {
    params: getSpecializationSchema,
    response: getNutritionistBySpecializationResponse
  })
  .delete("/:id", ({ params }) => SpecializationController.deleteSpecialization(params), {
    params: getSpecializationSchema,
    response: t.Void()
  });