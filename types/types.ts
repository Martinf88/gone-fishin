import { Timestamp } from "firebase/firestore";

export interface User {
    uid: string;
    userName: string;
    email: string;
    createdAt: Timestamp;
    imageUrl: string;
}

export interface Catch {
    catchId: string;
    userId: string;
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
}
