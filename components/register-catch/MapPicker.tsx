import React, { useState, useEffect, useRef } from "react";
import {
    StyleSheet,
    Text,
    View,
    Modal,
    TouchableOpacity,
    ActivityIndicator,
} from "react-native";
import MapView, { Marker, MapPressEvent } from "react-native-maps";
import * as Location from "expo-location";
import { COLORS } from "@/constants/Colors";
import CustomButton from "../common/CustomButton";
import { useAuthStore } from "@/store/useStore";
import { Octicons, Entypo } from "@expo/vector-icons";

//TODO: When the screen is touched and then released place pin in the center of the map after a short delay

interface MapPickerProps {
    isVisible: boolean;
    onClose: () => void;
}

const MapPicker = ({ isVisible, onClose }: MapPickerProps) => {
    const { setCatchLocation } = useAuthStore((state) => state);
    const [location, setLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [selectedLocation, setSelectedLocation] = useState<{
        latitude: number;
        longitude: number;
    } | null>(null);
    const [isPressed, setIsPressed] = useState(false);
    const [showDot, setShowDot] = useState(true);
    const [loading, setLoading] = useState<boolean>(true);

    const mapRef = useRef<MapView>(null);

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

    const handleMapPressIn = () => {
        setShowDot(true);
        setIsPressed(true);
    };

    const handleMapPressOut = () => {
        setTimeout(async () => {
            if (isPressed && mapRef.current) {
                const camera = await mapRef.current.getCamera();
                const newLocation = {
                    latitude: camera.center.latitude,
                    longitude: camera.center.longitude,
                };

                setSelectedLocation(newLocation);
                setShowDot(false);
            }
        }, 800);
        setIsPressed(false);
    };

    const handleConfirm = () => {
        if (!selectedLocation) return;
        setCatchLocation(selectedLocation.latitude, selectedLocation.longitude);
        onClose();
    };

    const handleCancel = () => {
        setSelectedLocation(null);
        setShowDot(true);
        onClose();
    };

    const handleCenterOnPin = () => {
        if (!selectedLocation) {
            return;
        }
        setLocation({
            latitude: selectedLocation?.latitude,
            longitude: selectedLocation?.longitude,
        });
    };

    return (
        <Modal
            animationType="slide"
            visible={isVisible}
            onRequestClose={onClose}
        >
            {/* Header with Search Input */}
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={handleCancel}
                    style={styles.cancelButton}
                >
                    <Text style={styles.text}>Avbryt</Text>
                </TouchableOpacity>
            </View>

            {/* Loading Indicator */}
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={COLORS.primary} />
                </View>
            ) : (
                <View style={styles.mapContainer}>
                    {showDot && (
                        <View style={styles.dotWrapper}>
                            <Octicons name="dot" size={16} color="red" />
                        </View>
                    )}

                    <TouchableOpacity
                        onPress={handleCenterOnPin}
                        style={styles.centerOnPinButton}
                    >
                        <Entypo
                            name="location-pin"
                            size={24}
                            color={COLORS.lightGray}
                        />
                    </TouchableOpacity>
                    <MapView
                        ref={mapRef}
                        style={styles.map}
                        region={
                            location
                                ? {
                                      latitude: location.latitude,
                                      longitude: location.longitude,
                                      latitudeDelta: 0.05,
                                      longitudeDelta: 0.05,
                                  }
                                : undefined
                        }
                        showsUserLocation
                        showsMyLocationButton
                        onTouchStart={handleMapPressIn}
                        onTouchEnd={handleMapPressOut}
                    >
                        {selectedLocation && (
                            <Marker
                                pinColor="red"
                                coordinate={selectedLocation}
                                anchor={{ x: 0.65, y: 0.8 }}
                            />
                        )}
                    </MapView>
                </View>
            )}

            {/* Footer */}

            <View style={styles.footer}>
                <CustomButton title="Bekräfta" handlePress={handleConfirm} />
            </View>
        </Modal>
    );
};

export default MapPicker;

const styles = StyleSheet.create({
    container: { flex: 1 },
    mapContainer: {
        flex: 1,
        position: "relative",
    },
    map: { flex: 1 },
    loaderContainer: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    dotWrapper: {
        position: "absolute",
        top: "50%",
        right: "50%",
        justifyContent: "center",
        alignItems: "center",
        zIndex: 50,
    },
    header: {
        flexDirection: "row",
        width: "100%",
        paddingVertical: 10,
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
    centerOnPinButton: {
        position: "absolute",
        bottom: 10,
        right: 10,
        zIndex: 50,

        backgroundColor: "rgba(255,255,255,0.8)",
        width: 50,
        height: 50,
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        elevation: 5,
    },

    cancelButton: {
        padding: 8,
    },
    footer: {
        paddingVertical: 10,
        paddingHorizontal: 50,
        backgroundColor: COLORS.primary,
        // alignItems: "center",
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
