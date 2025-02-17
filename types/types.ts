import { Timestamp } from "firebase/firestore";

export interface User {
    uid: string;
    userName: string;
    email: string;
    createdAt: Timestamp;
    imageUrl: string;
}
//TODO: change speciesname to speciesId
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

export interface Species {
    id: string;
    name: string;
    description: string;
    imageUrl: string;
    waterType: string;
}

export interface Badge {
    id: string;
    description: string;
    badgeId: string;
    category: string;
    imageUrl: string;
    unLockCriteria: string;
}
