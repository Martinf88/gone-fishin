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
    location: string;
    method: string;
    speciesName: string;
    date: Timestamp;
    createdAt: Timestamp;
    story: string;
}
