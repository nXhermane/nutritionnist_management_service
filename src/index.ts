import { Elysia } from "elysia";
import { createNutritionistRoute } from "./nutritionist";
import { NutritionistController } from "./nutritionist/controller";
import { NutritionistService } from "./nutritionist/service";
import { createSpecializationRoute } from "./specialization";
import { SpecializationController } from "./specialization/controller";
import { SpecializationService } from "./specialization/service";


function bootstrap() {
  const app = new Elysia()
    .use(createNutritionistRoute(new NutritionistController(new NutritionistService())))
    .use(createSpecializationRoute(new SpecializationController(new SpecializationService())))
    .listen(3000);
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
}

bootstrap();

