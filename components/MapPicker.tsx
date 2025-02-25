import React, { useState, useEffect } from "react";
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    TextInput,
    ActivityIndicator,
    KeyboardAvoidingView,
    Platform,
} from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import * as Location from "expo-location";
import { COLORS } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import CustomButton from "./CustomButton";
import FormNav from "./FormNav";
import { useAuthStore } from "@/store/useStore";

interface MapPickerProps {
    isVisible: boolean;
    onClose: () => void;
}

const MapPicker = ({ isVisible, onClose }: MapPickerProps) => {
    const { catchForm } = useAuthStore((state) => state);
    const { setCatchLocation } = useAuthStore((state) => state);

    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const getCurrentLocation = async () => {
            try {
                let { status } =
                    await Location.requestForegroundPermissionsAsync();
                if (status !== "granted") {
                    setLoading(false);
                    return;
                }

                let loc = await Location.getCurrentPositionAsync({});
                setLocation({
                    latitude: loc.coords.latitude,
                    longitude: loc.coords.longitude,
                });
            } catch (error) {
                console.error("Error fetching location: ", error);
            } finally {
                setLoading(false);
            }
        };

        getCurrentLocation();
    }, []);

    const handleConfirm = () => {
        if (!selectedLocation) return;

        setCatchLocation(selectedLocation.latitude, selectedLocation.longitude);
        onClose();
    };

    const handleMapPress = (event: MapPressEvent) => {
        const { latitude, longitude } = event.nativeEvent.coordinate;
        setSelectedLocation({ latitude, longitude });
        console.log("Map pressed:", latitude, longitude);
    };

    return (
        <Modal
            animationType="slide"
            visible={isVisible}
            onRequestClose={onClose}
        >
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : undefined}
                style={styles.container}
            >
                {/* Header with Search Input */}
                <View style={styles.header}>
                    <TouchableOpacity
                        onPress={onClose}
                        style={styles.cancelButton}
                    >
                        <Text style={styles.text}>Avbryt</Text>
                    </TouchableOpacity>
                    <TextInput
                        placeholderTextColor={COLORS.white}
                        placeholder="Search"
                        style={styles.searchInput}
                    />
                </View>

                {/* Loading Indicator */}
                {loading ? (
                    <View style={styles.loaderContainer}>
                        <ActivityIndicator
                            size="large"
                            color={COLORS.primary}
                        />
                    </View>
                ) : (
                    <MapView
                        style={styles.map}
                        region={
                            location
                                ? {
                                      latitude: location.latitude,
                                      longitude: location.longitude,
                                      latitudeDelta: 0.03,
                                      longitudeDelta: 0.03,
                                  }
                                : undefined
                        }
                        showsUserLocation
                        showsMyLocationButton
                        onPress={handleMapPress}
                    >
                        {selectedLocation && (
                            <Marker
                                pinColor="red"
                                coordinate={{
                                    latitude: selectedLocation.latitude,
                                    longitude: selectedLocation.longitude,
                                }}
                            />
                        )}
                    </MapView>
                )}

                {/* Footer */}
                <View style={styles.footer}>
                    {selectedLocation && (
                        <Text style={styles.footerText}>
                            {`Lat: ${selectedLocation.latitude.toFixed(5)}, Long: ${selectedLocation.longitude.toFixed(5)}`}
                        </Text>
                    )}

                    <CustomButton
                        title="Bekräfta"
                        handlePress={handleConfirm}
                    />
                </View>
            </KeyboardAvoidingView>
        </Modal>
    );
};

export default MapPicker;

const styles = StyleSheet.create({
    container: { flex: 1 },
    map: { flex: 1 },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    header: {
        flexDirection: "row",
        width: "100%",
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: COLORS.primary,
        justifyContent: "space-between",
        alignItems: "center",
    },
    text: {
        color: COLORS.white,
        fontSize: 18,
        fontFamily: "Kurale-Regular",
    },
    searchInput: {
        flex: 1,
        backgroundColor: COLORS.white,
        borderRadius: 5,
        padding: 8,
        marginLeft: 10,
    },
    cancelButton: {
        padding: 8,
    },
    footer: {
        paddingVertical: 20,
        paddingHorizontal: 50,
        backgroundColor: COLORS.primary,
        alignItems: "center",
    },
    footerText: {
        color: COLORS.white,
        fontSize: 16,
        fontFamily: "Kurale-Regular",
        marginBottom: 10,
    },
    buttonText: {
        color: COLORS.primary,
        fontSize: 16,
    },
});
