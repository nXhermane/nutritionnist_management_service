import { Elysia, t } from "elysia";
import * as NutritionistController from "./controller";
import { createNutritionistSchema, getNutritionistParams as createNutritionistResponse, nutritionistResponse, getNutritionistParams, updateNutritionistSchema, nutritionistSpecializationSchema, getNutritionistSpecializationResponse } from "./dtos";


export const nutritionistRoute = new Elysia({ prefix: "/nutritionists" })
  .get("/", () => NutritionistController.getAllNutritionists(), { response: t.Array(nutritionistResponse) })
  .post("/", ({ body }) => NutritionistController.createNutritionist(body), {
    body: createNutritionistSchema,
    response: createNutritionistResponse
  })
  .get("/:id", ({ params }) => NutritionistController.getNutritionistById(params), {
    params: getNutritionistParams,
    response: nutritionistResponse
  })
  .put("/:id", ({ params, body }) => NutritionistController.updateNutritionist(params, body), {
    params: getNutritionistParams,
    body: updateNutritionistSchema,
    response: t.Void()
  })
  .delete("/:id", ({ params }) => NutritionistController.deleteNutritionist(params), {
    params: getNutritionistParams,
  })
  .post(
    "/:id/specialization",
    ({ params, body }) => NutritionistController.assignSpecializationToNutritionist(params, body),
    {
      params: getNutritionistParams,
      body: nutritionistSpecializationSchema,
      response: t.Void()
    }
  )
  .delete(
    "/:id/specialization",
    ({ params, body }) => NutritionistController.removeNutritionistSpecialization(params, body),
    {
      params: getNutritionistParams,
      body: nutritionistSpecializationSchema,
      response: t.Void()
    }
  )
  .get(
    "/:id/specializations",
    ({ params }) => NutritionistController.getNutritionistSpecialization(params),
    {
      params: getNutritionistParams,
      response: getNutritionistSpecializationResponse
    }
  );