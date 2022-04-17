import { Mission } from "../models/mission";

let missions: Mission[] = [
    {
        id: 1,
        name: "Casa Loma",
        location: {
            latitude: 43.678041,
            longitude: -79.4116326
        },
        tasks: "Look for professor Pawluk and give him an apple",
        tags: ['easy','fun'],
        rating: 5
    },
    {
        id: 2,
        name: "St. James",
        location: {
            latitude: 43.6513016,
            longitude: -79.3724301
        },
        tasks: "Go to St. Lawrence Market",
        tags: ['medium','fun'],
        rating: 4
    },
    {
        id: 3,
        name: "Waterfront",
        location: {
            latitude: 43.6439664,
            longitude: -79.367664
        },
        tasks: "Take a picture of the lake",
        tags: ['easy','fun'],
        rating: 3
    }
]

export default missions