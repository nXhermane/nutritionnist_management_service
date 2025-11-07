export interface CreateNutritionistDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber?: string;
    address?: string;
}
export interface NutritionistDto {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    address: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
}
