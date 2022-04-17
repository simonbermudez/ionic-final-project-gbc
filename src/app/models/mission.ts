import { Location } from "./location";

export interface Mission {
    id: number;
    name: string;
    location: Location;
    tasks: string;
    tags: string[];
    rating: number;
}