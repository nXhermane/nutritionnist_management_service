import { t } from "elysia";

export const nutritionistSchema = {
  create: t.Object({
    firstName: t.String({ minLength: 2 }),
    lastName: t.String({ minLength: 2 }),
    email: t.String({ format: "email" }),
    phoneNumber: t.Optional(t.String({ minLength: 10 })),
    address: t.Optional(t.String({ minLength: 5 })),
  }),

  update: t.Object({
    firstName: t.Optional(t.String({ minLength: 2 })),
    lastName: t.Optional(t.String({ minLength: 2 })),
    email: t.Optional(t.String({ format: "email" })),
    phoneNumber: t.Optional(t.String({ minLength: 10 })),
  }),

  params: t.Object({
    id: t.String({ format: "uuid" }),
  }),

  specialization: t.Object({
    specializationId: t.String({ format: "uuid" }),
  }),
};
