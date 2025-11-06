import { t } from "elysia";

export const NutritionistSpecializationSchema = {
    specializationSchema: t.Object({
        nutritionistId: t.String({ format: "uuid", error: "A valid UUID is required for nutritionistId" }),
        specializationId: t.String({ format: "uuid", error: "A valid UUID is required for specializationId" })
    }),
    identifyNutritionistSchema: t.Object({
        nutritionistId: t.String({ format: "uuid", error: "A valid UUID is required for nutritionistId" })
    }),
    identifySpecializationSchema: t.Object({
        specializationId: t.String({ format: "uuid", error: "A valid UUID is required for specializationId" })
    }),
    // expandQuerySchema: t.Object({
    //     expand: t.Optional(t.Boolean( { default: false }))
    // })

}