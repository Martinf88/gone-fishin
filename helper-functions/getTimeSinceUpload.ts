import { Timestamp } from "firebase/firestore";

export const getTimeSinceUpload = (createdAt: Timestamp) => {
    if (!createdAt) return "Okänd tid";

    const createdDate = createdAt.toDate();
    const now = new Date();

    const diffMs = now.getTime() - createdDate.getTime();
    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMinutes < 1) return "Nu";
    if (diffMinutes < 60) return `${diffMinutes} min sedan`;
    if (diffHours < 24) return `${diffHours}h sedan`;
    if (diffDays < 7) return `${diffDays} dagar sedan`;

    return createdDate.toLocaleDateString("sv-SE");
};
