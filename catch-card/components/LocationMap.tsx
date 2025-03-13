import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    FlatList,
} from "react-native";
import MapView, { Marker } from "react-native-maps";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import { Catch } from "@/types/types";
import * as Location from "expo-location";

interface LocationMapProps {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    catchData: Catch;
}

const DEFAULT_REGION = {
    latitude: 59.3293, // Stockholm fallback
    longitude: 18.0686,
    latitudeDelta: 0.05,
    longitudeDelta: 0.05,
};

const LocationMap = ({
    modalVisible,
    setModalVisible,
    catchData,
}: LocationMapProps) => {
    const region = {
        latitude:
            parseFloat(catchData.location?.latitude) || DEFAULT_REGION.latitude,
        longitude:
            parseFloat(catchData.location?.longitude) ||
            DEFAULT_REGION.longitude,
        latitudeDelta: 0.05,
        longitudeDelta: 0.05,
    };
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <View style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={() => setModalVisible(!modalVisible)}
                    >
                        <Feather
                            name="arrow-left"
                            size={24}
                            color={COLORS.white}
                        />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Fångstplats</Text>
                </View>
                <MapView style={styles.map} region={region}>
                    <Marker coordinate={region} />
                </MapView>
                <View style={styles.footer}>
                    {/* <FlatList/> */}
                    <Text style={[styles.footerText, { borderBottomWidth: 1 }]}>
                        <Text style={styles.highLightedText}>Fiskart</Text>{" "}
                        {catchData.speciesName}
                    </Text>
                    <Text style={[styles.footerText, { borderBottomWidth: 1 }]}>
                        {" "}
                        <Text style={styles.highLightedText}>Längd</Text>{" "}
                        {catchData.length} cm
                    </Text>
                    <Text style={[styles.footerText, { borderBottomWidth: 1 }]}>
                        {" "}
                        <Text style={styles.highLightedText}>Vikt</Text>{" "}
                        {catchData.weight} kg
                    </Text>
                    <Text style={[styles.footerText, { borderBottomWidth: 1 }]}>
                        {" "}
                        <Text style={styles.highLightedText}>
                            Fångstmetod
                        </Text>{" "}
                        {catchData.method}
                    </Text>
                    <Text style={[styles.footerText, { borderBottomWidth: 1 }]}>
                        {" "}
                        <Text style={styles.highLightedText}>Bete</Text>{" "}
                        {catchData.bait}
                    </Text>
                    <Text style={styles.footerText}>
                        <Text style={styles.highLightedText}>Datum</Text>{" "}
                        {catchData.date
                            ? catchData.date.toDate().toLocaleString("sv-SE", {
                                  dateStyle: "short",
                              })
                            : "No Date Available"}
                        {/* TODO: show time as well */}
                    </Text>
                </View>
            </View>
        </Modal>
    );
};

export default LocationMap;

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: "100%",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 15,
        paddingVertical: 15,
        backgroundColor: COLORS.primary,
        gap: 20,
    },
    headerText: {
        fontFamily: "Roboto-Bold",
        fontSize: 18,
        color: COLORS.white,
    },
    footer: {
        alignItems: "center",
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: COLORS.primary,
        // gap: 10,
    },
    highLightedText: {
        color: COLORS.action,
        fontSize: 14,
        fontFamily: "Roboto-Bold",
    },
    footerText: {
        fontFamily: "Roboto-Bold",
        fontSize: 14,
        color: COLORS.white,
        borderColor: COLORS.placeholder,
        width: "100%",
        textAlign: "center",
        padding: 10,
    },
    map: {
        flex: 1,
    },
});
