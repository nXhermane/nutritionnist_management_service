import { Elysia } from "elysia";
import { nutritionistRoute } from "./nutritionist";
import { specializationRoute } from "./specialization";
import { handleError } from "./lib/errors";



function bootstrap() {
  const app = new Elysia()
    .onError(({ error, status }) => {
      const handled = handleError(error)
      return status(handled.code, { error: handled.error })
    })
    .use(nutritionistRoute)
    .use(specializationRoute)
    .listen(3000);
  console.log(`🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`);
}

bootstrap();

