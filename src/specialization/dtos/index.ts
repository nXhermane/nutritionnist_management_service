import { t } from "elysia";

export const createSpecializationSchema = t.Object({
    title: t.String({ minLength: 2, error: "Title is required and must be at least 2 characters long" }),
    description: t.Optional(t.String({ minLength: 5, error: "Description must be at least 5 characters long" })),
})
export const updateSpecializationSchema = t.Object({
    title: t.Optional(t.String({ minLength: 2, error: "Title must be at least 2 characters long" })),
    description: t.Optional(t.String({ minLength: 5, error: "Description must be at least 5 characters long" })),
})
export const getSpecializationSchema = t.Object({
    id: t.String({ format: "uuid", error: "A valid UUID is required for id" }),
})

export const getSpecializationResponse = t.Object({
    id: t.String({ format: 'uuid' }),
    title: t.String({ minLength: 2 }),
    description: t.Nullable(t.String({ minLength: 5 })),
    createdAt: t.Date(),
    updatedAt: t.Date()
})
export const getNutritionistBySpecializationResponse = t.Object({
    id: t.String({ format: 'uuid' }),
    nutritionists: t.Array(t.Object({
        id: t.String({ format: "uuid" }),
        firstName: t.String({ minLength: 2 }),
        lastName: t.String({ minLength: 2 }),
        email: t.String({ format: "email" }),
        phoneNumber: t.Nullable(t.String({ minLength: 10 })),
        address: t.Nullable(t.String({ minLength: 5 })),
        createdAt: t.Date(),
        updatedAt: t.Date()
    }))
})

export type CreateSpecializationDto = typeof createSpecializationSchema.static
export type UpdateSpecializationDto = typeof updateSpecializationSchema.static
export type GetSpecializationDto = typeof getSpecializationSchema.static
export type SpecializationDto = typeof getSpecializationResponse.static
export type GetNutritionistsBySpecializationDto = typeof getNutritionistBySpecializationResponse.static 