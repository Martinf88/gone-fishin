import { Image, StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import { Catch } from "@/types/types";
import { Ionicons } from "@expo/vector-icons";
//TODO: Fetch species name from speciesId
interface CatchCardProps {
    catchData: Catch;
    username: string;
}

const CatchCard: React.FC<CatchCardProps> = ({ catchData, username }) => {
    return (
        <View style={styles.card}>
            <View style={styles.headerWrapper}>
                <Ionicons
                    name="person-circle-outline"
                    size={48}
                    color={COLORS.pewter}
                />
                <View>
                    <Text style={styles.usernameText}>{username}</Text>
                    <View>
                        <Text style={styles.headerDetails}>
                            17h" - <Text>{catchData.location}</Text>
                            <Text> - {catchData.speciesName}</Text>
                        </Text>
                    </View>
                </View>
            </View>
            {/* Image (if available) */}
            {catchData.imageUrl !== "" ? (
                <View style={styles.imageWrapper}>
                    <Image
                        source={{ uri: catchData.imageUrl }}
                        style={styles.image}
                    />
                </View>
            ) : (
                <View style={styles.imageWrapper}></View>
            )}

            {/* Catch Details */}
            <View style={styles.detailsWrapper}>
                <View
                    style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        marginRight: 50,
                    }}
                >
                    <View>
                        <Text style={styles.text}>{catchData.weight}kg</Text>
                        <Text style={styles.text}>{catchData.length}cm</Text>
                    </View>
                    <View>
                        <Text style={styles.text}>{catchData.method}</Text>
                        <Text style={styles.text}>{catchData.bait}</Text>
                    </View>
                </View>

                <Text style={styles.text}>
                    {catchData.date.toDate().toLocaleString("sv-SE", {
                        dateStyle: "short",
                        timeStyle: "short",
                    })}
                </Text>
                {catchData.story && (
                    <View style={styles.storyWrapper}>
                        <Text style={styles.storyText}>{catchData.story}</Text>
                    </View>
                )}
            </View>
        </View>
    );
};

export default CatchCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.ebony,
        marginBottom: 10,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
    imageWrapper: {
        width: "100%",
        maxHeight: 200,
        borderRadius: 12,
        overflow: "hidden",
        position: "relative",
        backgroundColor: COLORS.cyan,
    },
    image: {
        width: "100%",
        height: "100%",
        resizeMode: "cover",
    },
    headerWrapper: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.cyan,
        padding: 4,
        gap: 4,
        flexWrap: "wrap",
    },
    usernameText: {
        fontSize: 18,
        fontFamily: "Kurale-Regular",
        color: COLORS.pewter,
    },
    headerDetails: {
        fontSize: 15,
        color: COLORS.pewter,
        fontFamily: "Kurale-Regular",
    },
    detailsWrapper: {
        padding: 8,
    },
    text: {
        fontSize: 18,
        color: COLORS.mistyBlue,
        marginBottom: 5,
        fontFamily: "Kurale-Regular",
    },
    storyWrapper: {
        paddingTop: 8,
        borderTopWidth: 1,
        borderTopColor: COLORS.mistyBlue,
    },
    storyText: {
        fontSize: 18,
        color: COLORS.pewter,
        fontFamily: "Kurale-Regular",
    },
});
