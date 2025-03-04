import { StyleSheet, Text, View } from "react-native";
import { COLORS } from "@/constants/Colors";
import ProfileImgPicker from "./ProfileImgPicker";
import { useAuthStore } from "@/store/useStore";
//TODO: ask for permission of using images and camera

interface UserCardProps {
    totalCatches: number | null;
}

const UserCard = ({ totalCatches }: UserCardProps) => {
    const { firestoreUser } = useAuthStore((state) => state);

    return (
        <View style={styles.container}>
            {/* Left Side (Profile Picture) */}

            <ProfileImgPicker />

            {/* Right Side (Fångster & Unika arter) */}

            <View style={styles.statItem}>
                <Text style={styles.numberDisplay}>{totalCatches}</Text>
                <Text style={styles.statText}>Totala fångster</Text>
            </View>
        </View>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: COLORS.primary,
        padding: 40,
        flexShrink: 1,
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
