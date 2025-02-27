import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { getTimeSinceUpload } from "@/helper-functions/getTimeSinceUpload";
import { useGetUserName } from "@/helper-functions/getUsername";
import { COLORS } from "@/constants/Colors";
import { Catch } from "@/types/types";

interface HeaderOnlyProps {
    catchData: Catch;
}

const HeaderOnly = ({ catchData }: HeaderOnlyProps) => {
    const username = useGetUserName(catchData.userId);
    return (
        <View style={styles.headerOnly}>
            <Ionicons
                name="person-circle-outline"
                size={48}
                color={COLORS.white}
            />
            <View>
                <Text style={styles.largeText}>{username}</Text>
                <Text style={styles.smallText}>
                    {getTimeSinceUpload(catchData.createdAt)} -{" "}
                    {catchData.speciesName}
                </Text>
            </View>
        </View>
    );
};

export default HeaderOnly;

const styles = StyleSheet.create({
    headerOnly: {
        flexDirection: "row",
        gap: 8,
        padding: 10,
    },
    smallText: {
        fontSize: 16,
        color: COLORS.white,
        fontFamily: "Kurale-Regular",
    },
    largeText: {
        fontSize: 18,
        color: COLORS.white,
        fontFamily: "Kurale-Regular",
    },
});
