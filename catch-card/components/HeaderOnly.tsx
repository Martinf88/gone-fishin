import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { Ionicons } from "@expo/vector-icons";
import { getTimeSinceUpload } from "@/helper-functions/getTimeSinceUpload";
import { COLORS } from "@/constants/Colors";
import { Catch } from "@/types/types";
import { useAuthStore } from "@/store/useStore";

interface HeaderOnlyProps {
    catchData: Catch;
}

const HeaderOnly = ({ catchData }: HeaderOnlyProps) => {
    const { firestoreUser } = useAuthStore((state) => state);
    return (
        <View style={styles.headerOnly}>
            <View style={styles.ProfileImageWrapper}>
                {firestoreUser?.imageUrl ? (
                    <Image
                        source={{ uri: firestoreUser.imageUrl }}
                        style={styles.profileImage}
                    />
                ) : (
                    <Ionicons
                        name="person-circle-outline"
                        size={48}
                        color={COLORS.white}
                    />
                )}
            </View>
            <View>
                <Text style={styles.largeText}>{catchData.user.username}</Text>
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
        backgroundColor: COLORS.secondary,
    },
    ProfileImageWrapper: {
        width: 50,
        height: 50,
    },
    profileImage: {
        width: "100%",
        height: "100%",
        borderRadius: 999,
    },
    smallText: {
        fontSize: 16,
        color: COLORS.white,
        // fontFamily: "Kurale-Regular",
    },
    largeText: {
        fontSize: 18,
        color: COLORS.white,
        // fontFamily: "Kurale-Regular",
    },
});
