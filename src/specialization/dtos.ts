export interface CreateSpecializationDto {
    title: string;
    description?: string 
}

export interface SpecializationDto {
       id: string;
    createdAt: Date;
    updatedAt: Date;
    title: string;
    description: string | null;
}