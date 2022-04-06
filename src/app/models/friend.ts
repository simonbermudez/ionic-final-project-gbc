import { Achievement } from "./achievement";

export interface Friend {
    id: number;
    name: string;
    achievements: Achievement[];
    email: string;
    phone_number: string;
    level: number;
}