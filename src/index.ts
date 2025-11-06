import { Elysia } from "elysia";
import { NutritionistController, SpecializationController } from "./controller";
import { NutritionistSchema, SpecializationSchema } from "./schema";
import { PrismaClient } from "./generated/prisma/client";


function bootstrap() {

  const prisma = new PrismaClient()
  const nutritionistController = new NutritionistController(prisma);
  const specializationController = new SpecializationController(prisma);

  const nutritionistRoute = new Elysia({ prefix: "/nutritionists" })
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
    .post("/:id/specialization", context => nutritionistController.asignSpecializationToNutritionist(context), {
      params: NutritionistSchema.identifySchema,
      body: NutritionistSchema.specializationSchema
    })
    .delete("/:id/specialization", context => nutritionistController.removeSpecializationFromNutritionist(context), {
      params: NutritionistSchema.identifySchema,
      body: NutritionistSchema.specializationSchema
    })
    .get("/:id/specializations", context => nutritionistController.getSpecializationsOfNutritionist(context), {
      params: NutritionistSchema.identifySchema
    })

  const specializationRoute = new Elysia({ prefix: "/specializations" })
    .get("/", (context) => specializationController.getAllSpecializations(context))
    .post("/", (context) => specializationController.createSpecialization(context), {
      body: SpecializationSchema.createSpecializationSchema
    })
    .put("/:id", (context) => specializationController.updateSpecialization(context), {
      params: SpecializationSchema.identifySchema,
      body: SpecializationSchema.updateSpecializationSchema
    })
    .get("/:id", (context) => specializationController.getSpecialization(context), {
      params: SpecializationSchema.identifySchema
    })
    .get("/:id/nutritionists", (context) => specializationController.getNutritionistsOfSpecialization(context), {
      params: SpecializationSchema.identifySchema
    })

  const app = new Elysia()
    .use(nutritionistRoute)
    .use(specializationRoute)
    .listen(3000);

  console.log(
    `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
  );
}

bootstrap();

