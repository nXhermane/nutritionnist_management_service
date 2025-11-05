import { Elysia } from "elysia";
import { NutritionistController } from "./controller";
import { NutritionistSchema } from "./schema";

function bootstrap() {
  const nutritionistController = new NutritionistController();
  const app = new Elysia()
    .get("/", (context) => nutritionistController.getAllNutritionists(context))
    .post("/", (context) => nutritionistController.createNutritionist(context), {
      body: NutritionistSchema.createNutritionistSchema
    })
    .get("/:id", (context) => nutritionistController.getNutritionist(context), {
      params: NutritionistSchema.identifySchema
    }).
    put("/:id", context => nutritionistController.updateNutritionist(context), {
      params: NutritionistSchema.identifySchema,
      body: NutritionistSchema.updateNutritionistSchema
    })
    .delete("/:id", context => nutritionistController.deleteNutritionist(context), {
      params: NutritionistSchema.identifySchema
    })
    .get('/specializations', (context) => nutritionistController.getAllSpecialization(context))
    .listen(3000);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}

bootstrap();

