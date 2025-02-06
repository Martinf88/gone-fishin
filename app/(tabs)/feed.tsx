import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { COLORS } from "@/constants/Colors";

const Feed = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Feed</Text>
        </View>
    );
};

export default Feed;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
    },
    text: {
        color: COLORS.pewter,
    },
});
