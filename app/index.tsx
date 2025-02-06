import { View, Text } from "react-native";
import React from "react";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";

const App = () => {
    return (
        <View
            style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
            <Text style={{ fontFamily: "Kurale-Regular" }}>Gone Fishin'</Text>
            <StatusBar style="auto" />
            <Link href="/feed">Feed</Link>
        </View>
    );
};

export default App;
