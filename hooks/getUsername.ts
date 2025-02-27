import { useAuthStore } from "@/store/useStore";

export const useGetUserName = (userId: string) => {
    const { allUsers } = useAuthStore((state) => state);

    const user = allUsers.find((user) => user.uid === userId);
    return user?.userName ?? "Okänd användare";
};
