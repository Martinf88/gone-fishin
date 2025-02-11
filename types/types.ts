import { Timestamp } from "firebase/firestore";

export interface User {
    userName: string;
    email: string;
    createdAt: Timestamp;
    badges: Badge[];
    avatarId: string;
}

export interface Badge {
    description: string;
    badgeId: string;
    category: string;
    imageUrl: string;
    unLockCriteria: string;
}
