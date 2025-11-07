import { Elysia } from "elysia";
import { specializationSchema } from "./schema";
import { ISpecializationController } from "./controller";


export function createSpecializationRoute(controller: ISpecializationController) {
 return new Elysia({ prefix: "/specializations" })
  .get("/", (context) => controller.getAll(context))
  .post("/", (context) => controller.create(context), {
    body: specializationSchema.create,
  })
  .put("/:id", (context) => controller.update(context), {
    params: specializationSchema.params,
    body: specializationSchema.update,
  })
  .get("/:id", (context) => controller.getById(context), {
    params: specializationSchema.params,
  })
  .get("/:id/nutritionists", (context) => controller.getNutritionists(context), {
    params: specializationSchema.params,
  })
  .delete("/:id", (context) => controller.delete(context), {
    params: specializationSchema.params,
  });
}