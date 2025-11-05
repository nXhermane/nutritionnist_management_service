import { Context } from "elysia";
import { NutritionistSchema } from "../schema";


export class NutritionistController {
   

    async createNutritionist(ctx: Context<{body: typeof NutritionistSchema.createNutritionistSchema.static}>) { 
        // TODO: add implementation
    }
     async getNutritionist(ctx: Context<{ params:  typeof NutritionistSchema.identifySchema.static }>) {
        // TODO: add implementation
     }
    async getAllNutritionists(ctx: Context) { 
        // TODO: add implementation
    }
    async updateNutritionist(ctx: Context<{body: typeof NutritionistSchema.updateNutritionistSchema, params: typeof NutritionistSchema.identifySchema.static}>) { 
        // TODO: add implementation
    }
    async deleteNutritionist(ctx: Context<{params: typeof NutritionistSchema.identifySchema}>) { 
        // TODO: add implementation
    }
}