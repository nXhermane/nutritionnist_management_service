import { t } from "elysia";

export const SpecializationSchema = {
    createSpecializationSchema: t.Object({
        title: t.String({ minLength: 2, error: "Title is required and must be at least 2 characters long" }),
        description: t.Optional(t.String({ minLength: 5, error: "Description must be at least 5 characters long" }))
    }),
    updateSpecializationSchema: t.Object({
        title: t.Optional(t.String({ minLength: 2, error: "Title must be at least 2 characters long" })),
        description: t.Optional(t.String({ minLength: 5, error: "Description must be at least 5 characters long" }))
    }),
    identifySchema: t.Object({
        id: t.String({ format: "uuid", error: "A valid UUID is required for id" })
    }),
}