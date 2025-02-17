import { FlatList, StyleSheet, Text, View } from "react-native";
import React from "react";
import { Catch } from "@/types/types";
import CatchCard from "./CatchCard";
import { useAuthStore } from "@/store/useAuthStore";

interface CatchListProps {
    catches: Catch[];
}

const CatchList = ({ catches }: CatchListProps) => {
    const { allUsers } = useAuthStore((state) => state);

    const getUserName = (userId: string) => {
        const user = allUsers.find((user) => user.uid === userId);
        return user?.userName ?? "Okänd användare";
    };
    return (
        <FlatList
            data={catches}
            keyExtractor={(item) => item.catchId}
            renderItem={({ item }) => (
                <CatchCard
                    catchData={item}
                    username={getUserName(item.userId)}
                />
            )}
            contentContainerStyle={styles.listContainer}
        />
    );
};

export default CatchList;

const styles = StyleSheet.create({
    listContainer: {
        paddingBottom: 20,
    },
});
