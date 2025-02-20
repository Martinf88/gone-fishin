import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/Colors";
import { useAuthStore } from "@/store/useStore";

const UserCard = () => {
    const { totalCatches, uniqueSpeciesCount } = useAuthStore();

    return (
        <View style={styles.container}>
            {/* Left Side (Profile Picture + Username) */}

            <View style={styles.imageWrapper}>
                <Ionicons name="person-circle" size={80} color={COLORS.cyan} />
                <TouchableOpacity
                    style={{
                        position: "absolute",
                        backgroundColor: COLORS.cyan,
                        borderColor: COLORS.mistyBlue,
                        borderWidth: 2,
                        borderRadius: 999,
                        left: 50,
                        top: 45,
                        padding: 5,
                    }}
                >
                    <Ionicons
                        name="pencil-outline"
                        size={32}
                        color={COLORS.mistyBlue}
                    />
                </TouchableOpacity>
            </View>

            {/* Right Side (Fångster & Unika arter) */}
            <View style={styles.textWrapper}>
                <Text style={styles.statText}>Fångster: {totalCatches}</Text>
                <Text style={styles.statText}>Arter: {uniqueSpeciesCount}</Text>
            </View>
        </View>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: COLORS.mistyBlue,
        paddingHorizontal: 25,
        height: 150,
    },
    imageWrapper: {
        borderColor: COLORS.cyan,
        borderWidth: 10,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
    },
    textWrapper: {
        flex: 1,
        justifyContent: "center",
        paddingLeft: 20,
        marginLeft: 40,
    },
    statText: {
        fontSize: 18,
        fontFamily: "Kurale-Regular",
        color: COLORS.ebony,
    },
});
