export class AppError extends Error {
  constructor(
    public statusCode: number,
    message: string
  ) {
    super(message);
    this.name = this.constructor.name;
  }
}

export class NotFoundError extends AppError {
  constructor(message: string) {
    super(404, message);
  }
}

export class ConflictError extends AppError {
  constructor(message: string) {
    super(409, message);
  }
}

export function handleError(error: any) {
  if (error instanceof AppError) {
    return { code: error.statusCode, error: error.message };
  }
  console.error("Unexpected error:", error);
  return { code: 500, error: "Internal Server Error" };
}