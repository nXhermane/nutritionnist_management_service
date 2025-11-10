import { t } from "elysia";

export const createNutritionistSchema = t.Object({
    firstName: t.String({ minLength: 2 }),
    lastName: t.String({ minLength: 2 }),
    email: t.String({ format: "email" }),
    phoneNumber: t.Optional(t.String({ minLength: 10 })),
    address: t.Optional(t.String({ minLength: 5 })),
})

export const updateNutritionistSchema = t.Object({
    firstName: t.Optional(t.String({ minLength: 2 })),
    lastName: t.Optional(t.String({ minLength: 2 })),
    email: t.Optional(t.String({ format: "email" })),
    phoneNumber: t.Optional(t.String({ minLength: 10 })),
})

export const getNutritionistParams = t.Object({
    id: t.String({ format: "uuid" }),
})

export const nutritionistSpecializationSchema = t.Object({
    specializationId: t.String({ format: "uuid" }),
})

export const nutritionistResponse = t.Object({
    id: t.String({ format: "uuid" }),
    firstName: t.String({ minLength: 2 }),
    lastName: t.String({ minLength: 2 }),
    email: t.String({ format: "email" }),
    phoneNumber: t.Nullable(t.String({ minLength: 10 })),
    address: t.Nullable(t.String({ minLength: 5 })),
    createdAt: t.Date(),
    updatedAt: t.Date()
})
export const getNutritionistSpecializationResponse = t.Object({
    id: t.String({ format: "uuid" }),
    specializations: t.Array(t.Object({
        id: t.String({ format: 'uuid' }),
        title: t.String({ minLength: 2}),
        description: t.Nullable(t.String({ minLength: 5})),
        createdAt: t.Date(),
        updatedAt: t.Date()
    }))
})
export type CreateNutritionistDto = typeof createNutritionistSchema.static
export type NutritionistDto = typeof nutritionistResponse.static
export type GetNutritionistDto = typeof getNutritionistParams.static
export type UpdateNutritionistDto = typeof updateNutritionistSchema.static
export type NutritionistSpecializationDto = typeof nutritionistSpecializationSchema.static
export type GetNutritionistSpecializationResponseDto = typeof getNutritionistSpecializationResponse.static;