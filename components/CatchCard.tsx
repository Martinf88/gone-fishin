import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useAuthStore } from "@/store/useAuthStore";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/Colors";
//TODO:  Display catch data

const CatchCard = () => {
    const { firestoreUser } = useAuthStore();
    return (
        <View style={styles.card}>
            <View style={styles.imageWrapper}>
                {/* {catchData && (
                    <Image source={{ uri: firestoreUser.imageUrl }} />
                )} */}

                <Text>{firestoreUser?.userName ?? "Användarnamn saknas"}</Text>
            </View>
            <View>
                <Text>Art:</Text>
                <Text>Vikt:</Text>
                <Text>Längd:</Text>
            </View>
            <View>
                <Text>Bete:</Text>
                <Text>Metod:</Text>
            </View>
            <View>
                <Text>Fångstdatum:</Text>
                <Text>Plats:</Text>
            </View>
            <View>
                <Text>Berättelse:</Text>
            </View>
        </View>
    );
};

export default CatchCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.blueGray,
        borderRadius: 12,
        padding: 15,
        marginBottom: 10,
        flexDirection: "row",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    imageWrapper: {
        width: 100,
        height: 100,
        borderRadius: 10,
        overflow: "hidden",
        backgroundColor: COLORS.darkBlue,
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    detailsWrapper: {
        flex: 1,
        marginLeft: 15,
    },
    title: {
        fontSize: 18,
        fontWeight: "bold",
        color: COLORS.pewter,
        marginBottom: 5,
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 4,
    },
    label: {
        fontSize: 14,
        color: COLORS.darkBlue,
        fontWeight: "600",
    },
    value: {
        fontSize: 14,
        color: COLORS.pewter,
    },
    storyWrapper: {
        marginTop: 10,
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: COLORS.darkBlue,
    },
    storyTitle: {
        fontSize: 16,
        fontWeight: "bold",
        color: COLORS.darkBlue,
    },
    storyText: {
        fontSize: 14,
        color: COLORS.pewter,
    },
});
