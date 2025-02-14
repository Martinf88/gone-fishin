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
    bait: string;
    length: number;
    weight: number;
    location: string;
    method: string;
    speciesId: string;
    date?: Timestamp | null;
    createdAt: Timestamp;
}

export interface Badge {
    id: string;
    description: string;
    badgeId: string;
    category: string;
    imageUrl: string;
    unLockCriteria: string;
}
