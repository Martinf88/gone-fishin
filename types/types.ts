import { Timestamp } from "firebase/firestore";

export interface User {
    uid: string;
    userName: string;
    email: string;
    createdAt: Timestamp;
    imageUrl: string;
    totalCatches: number;
    uniqueSpeciesCount: number;
}

export interface Catch {
    catchId: string;
    user: {
        userId: string;
        username: string;
    };
    imageUrl: string;
    bait: string;
    length: number;
    weight: number;
    location: {
        latitude: string;
        longitude: string;
    };
    method: string;
    speciesName: string;
    date: Timestamp;
    time: Timestamp;
    createdAt: Timestamp;
    description: string;
    likes: [
        {
            userId: string;
            username: string;
        },
    ];
}
