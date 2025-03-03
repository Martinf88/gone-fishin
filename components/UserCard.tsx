import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import { COLORS } from "@/constants/Colors";

interface UserCardProps {
    totalCatches: number | null;
}

const UserCard = ({ totalCatches }: UserCardProps) => {
    // TODO:set totalCatches and uniqueSpeciesCount

    return (
        <View style={styles.container}>
            {/* Left Side (Profile Picture) */}
            <TouchableOpacity style={styles.imageWrapper}>
                <Ionicons
                    name="camera-outline"
                    size={80}
                    color={COLORS.white}
                />
            </TouchableOpacity>

            {/* Right Side (Fångster & Unika arter) */}
            <View style={styles.statsWrapper}>
                <View style={styles.statItem}>
                    <Text style={styles.numberDisplay}>{totalCatches}</Text>
                    <Text style={styles.statText}>Totala fångster</Text>
                </View>
            </View>
        </View>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        // alignSelf: "center",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        padding: 20,
        flexShrink: 1,
    },
    imageWrapper: {
        borderColor: COLORS.white,
        backgroundColor: COLORS.secondary,
        borderWidth: 1,
        borderRadius: 50,
        justifyContent: "center",
        alignItems: "center",
        width: 100,
        height: 100,
    },
    statsWrapper: {
        flexDirection: "row",
    },
    statItem: {
        alignItems: "center",
        marginHorizontal: 10,
    },
    numberDisplay: {
        fontSize: 30,
        color: COLORS.white,
        fontFamily: "Kurale-Regular",
    },
    statText: {
        fontSize: 16,
        fontFamily: "Kurale-Regular",
        color: COLORS.white,
    },
});
