import { t } from "elysia";
export const NutritionistSchema = {
    createNutritionistSchema: t.Object({
        firstName: t.String({ format: "string", minLength: 2, error: "First name is required and must be at least 2 characters long" }),
        lastName: t.String({ format: "string", minLength: 2, error: "Last name is required and must be at least 2 characters long" }),
        email: t.String({ format: "email", error: "A valid email address is required" }),
        phoneNumber: t.Optional(t.String({ format: "string", minLength: 10, error: "Phone number must be at least 7 characters long" })),
        specializationIds: t.Optional(t.Array(t.String({ format: "uuid" }))),
        specializations: t.Optional(t.Array(t.Object({
            title: t.String({ format: "string", minLength: 2, error: "Title is required and must be at least 2 characters long" }),
            description: t.Optional(t.String({ format: "string", minLength: 5, error: "Description must be at least 5 characters long" }))
        })))
    }, { error: "Payload must be an object with valid nutritionist properties" }),
    updateNutritionistSchema: t.Object({
        firstName: t.Optional(t.String({ format: "string", minLength: 2, error: "First name is required and must be at least 2 characters long" })),
        lastName: t.Optional(t.String({ format: "string", minLength: 2, error: "Last name is required and must be at least 2 characters long" })),
        email: t.Optional(t.String({ format: "email", error: "A valid email address is required" })),
        phoneNumber: t.Optional(t.String({ format: "string", minLength: 10, error: "Phone number must be at least 7 characters long" })),
    }),
    identifySchema: t.Object({
        id: t.String({ format: "uuid" })
    })
}