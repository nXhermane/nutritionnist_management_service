import { t } from "elysia";

export const specializationSchema = {
  create: t.Object({
    title: t.String({ minLength: 2, error: "Title is required and must be at least 2 characters long" }),
    description: t.Optional(t.String({ minLength: 5, error: "Description must be at least 5 characters long" })),
  }),

  update: t.Object({
    title: t.Optional(t.String({ minLength: 2, error: "Title must be at least 2 characters long" })),
    description: t.Optional(t.String({ minLength: 5, error: "Description must be at least 5 characters long" })),
  }),

  params: t.Object({
    id: t.String({ format: "uuid", error: "A valid UUID is required for id" }),
  }),
};

export default specializationSchema;
