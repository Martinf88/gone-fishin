import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants/Colors";
import { Catch } from "@/types/types";
import { Entypo, Ionicons } from "@expo/vector-icons";
import LocationMap from "./LocationMap";

interface CatchDetailsProps {
    catchData: Catch;
}

const CatchDetails = ({ catchData }: CatchDetailsProps) => {
    const [modalVisible, setModalVisible] = useState(false);

    const details = [
        catchData.length ? `${catchData.length}cm` : null,
        catchData.weight ? `${catchData.weight}kg` : null,
    ].filter(Boolean);

    return (
        <View style={styles.detailsContainer}>
            <View style={{ flexDirection: "row" }}>
                {details.map((item, index) => (
                    <Text key={index} style={styles.text}>
                        {item}
                        {index < details.length - 1 && " - "}
                    </Text>
                ))}
            </View>
            {/*Description */}
            {catchData.description && (
                <Text style={styles.text}>{catchData.description}</Text>
            )}
            <View
                style={{
                    flexDirection: "row",
                    justifyContent: "space-between",
                    width: "100%",
                }}
            >
                {catchData.date && (
                    <View
                        style={{
                            flexDirection: "row",
                            gap: 4,
                            alignItems: "center",
                        }}
                    >
                        <Ionicons
                            name="calendar"
                            size={21}
                            color={COLORS.white}
                        />
                        <Text style={styles.mapButtonText}>
                            {catchData.date
                                ? catchData.date
                                      .toDate()
                                      .toLocaleString("sv-SE", {
                                          dateStyle: "short",
                                      })
                                : "No Date Available"}
                        </Text>
                    </View>
                )}
                {catchData.location && (
                    <TouchableOpacity
                        style={styles.mapButton}
                        onPress={() => setModalVisible(true)}
                    >
                        <Entypo
                            name="location-pin"
                            size={24}
                            color={COLORS.white}
                        />
                        <Text style={styles.mapButtonText}>Se fångstplats</Text>
                    </TouchableOpacity>
                )}
                <LocationMap
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    catchData={catchData}
                />
            </View>
        </View>
    );
};

export default CatchDetails;

const styles = StyleSheet.create({
    detailsContainer: {
        padding: 8,
        minHeight: 150,
        justifyContent: "space-between",
    },
    title: {
        fontSize: 20,
        color: COLORS.white,
    },
    text: {
        fontSize: 16,
        color: COLORS.white,
    },
    mapButton: {
        flexDirection: "row",
    },
    mapButtonText: {
        color: COLORS.white,
        fontSize: 16,
        marginLeft: 4,
        fontFamily: "Kurale-Regular",
    },
});
