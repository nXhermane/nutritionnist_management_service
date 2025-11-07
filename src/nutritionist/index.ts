import { Elysia } from "elysia";
import { INutritionistController } from "./controller";
import { nutritionistSchema } from "./schema";


export function createNutritionistRoute(controller: INutritionistController) {
  return new Elysia({ prefix: "/nutritionists" })
    .get("/", (context) => controller.getAll(context))
    .post("/", (context) => controller.create(context), {
      body: nutritionistSchema.create,
    })
    .get("/:id", (context) => controller.getById(context), {
      params: nutritionistSchema.params,
    })
    .put("/:id", (context) => controller.update(context), {
      params: nutritionistSchema.params,
      body: nutritionistSchema.update,
    })
    .delete("/:id", (context) => controller.delete(context), {
      params: nutritionistSchema.params,
    })
    .post(
      "/:id/specialization",
      (context) => controller.assignSpecialization(context),
      {
        params: nutritionistSchema.params,
        body: nutritionistSchema.specialization,
      }
    )
    .delete(
      "/:id/specialization",
      (context) => controller.removeSpecialization(context),
      {
        params: nutritionistSchema.params,
        body: nutritionistSchema.specialization,
      }
    )
    .get(
      "/:id/specializations",
      (context) => controller.getSpecializations(context),
      {
        params: nutritionistSchema.params,
      }
    );

}