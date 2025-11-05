import { t } from "elysia";
export const NutritionistSchema = {
    createNutritionistSchema: t.Object({
        firstName: t.String({ minLength: 2, error: "First name is required and must be at least 2 characters long" }),
        lastName: t.String({ minLength: 2, error: "Last name is required and must be at least 2 characters long" }),
        email: t.String({ format: "email", error: "A valid email address is required" }),
        phoneNumber: t.Optional(t.String({ minLength: 10, error: "Phone number must be at least 10 characters long" })),
        address: t.Optional(t.String({ minLength: 5, error: "Address must be at least 5 characters long" })),
        specializationIds: t.Optional(t.Array(t.String({ format: "uuid" }))),
        specializations: t.Optional(t.Array(t.Object({
            title: t.String({ minLength: 2, error: "Title is required and must be at least 2 characters long" }),
            description: t.Optional(t.String({ minLength: 5, error: "Description must be at least 5 characters long" }))
        })))
    }),
    updateNutritionistSchema: t.Object({
        firstName: t.Optional(t.String({ minLength: 2, error: "First name must be at least 2 characters long" })),
        lastName: t.Optional(t.String({ minLength: 2, error: "Last name must be at least 2 characters long" })),
        email: t.Optional(t.String({ format: "email", error: "A valid email address is required" })),
        phoneNumber: t.Optional(t.String({ minLength: 10, error: "Phone number must be at least 10 characters long" })),
    }),
    identifySchema: t.Object({
        id: t.String({ format: "uuid", error: "A valid UUID is required for id" })
    })
}