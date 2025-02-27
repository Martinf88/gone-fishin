import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";
import { Catch } from "@/types/types";

interface CatchDetailsProps {
    catchData: Catch;
}

const CatchDetails = ({ catchData }: CatchDetailsProps) => {
    return (
        <View style={styles.detailsContainer}>
            {catchData.weight && (
                <Text style={styles.largeText}>Vikt: {catchData.weight}kg</Text>
            )}
            {catchData.length && (
                <Text style={styles.largeText}>
                    Längd: {catchData.length}cm
                </Text>
            )}
            {catchData.method && (
                <Text style={styles.largeText}>Metod: {catchData.method}</Text>
            )}
            {catchData.bait && (
                <Text style={styles.largeText}>Bete: {catchData.bait}</Text>
            )}
            {catchData.date && (
                <Text style={styles.largeText}>
                    Datum:{" "}
                    {catchData.date
                        ? catchData.date.toDate().toLocaleString("sv-SE", {
                              dateStyle: "short",
                          })
                        : "No Date Available"}
                </Text>
            )}
            {catchData.location && (
                <Text style={styles.largeText}>
                    Plats: Visa plats med karta via länk!!!
                </Text>
            )}
            {catchData.description && (
                <Text style={styles.largeText}>
                    Berättelse: {catchData.description}
                </Text>
            )}
        </View>
    );
};

export default CatchDetails;

const styles = StyleSheet.create({
    largeText: {
        fontSize: 18,
        color: COLORS.white,
        fontFamily: "Kurale-Regular",
    },
    detailsContainer: {
        padding: 8,
        borderWidth: 1,
        borderColor: COLORS.lightGray,
        margin: 10,
    },
});
