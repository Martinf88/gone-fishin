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
            <Text style={styles.userName}>{firestoreUser?.userName}</Text>
            <View style={styles.statsWrapper}>
                <View
                    style={[
                        styles.statItem,
                        { flex: 1, alignSelf: "flex-start" },
                    ]}
                >
                    <Text style={styles.numberDisplay}>{totalCatches}</Text>
                    <Text style={styles.statText}>Fångster</Text>
                </View>
                <View
                    style={[
                        styles.statItem,
                        {
                            flex: 1,
                            alignSelf: "center",
                        },
                    ]}
                >
                    <Text style={styles.numberDisplay}>0</Text>
                    <Text style={styles.statText}>Följer</Text>
                </View>
                <View
                    style={[
                        styles.statItem,
                        { flex: 1, alignSelf: "flex-end" },
                    ]}
                >
                    <Text style={styles.numberDisplay}>0</Text>
                    <Text style={styles.statText}>Följare</Text>
                </View>
            </View>
        </View>
    );
};

export default UserCard;

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        paddingTop: 10,
    },
    userName: {
        color: COLORS.white,
        fontSize: 28,
        fontFamily: "Kurale-Regular",
        marginTop: 10,
    },
    statsWrapper: {
        flexDirection: "row",
        width: "100%",
        alignItems: "center",
        paddingBottom: 10,
    },

    statItem: {
        alignItems: "center",
    },
    numberDisplay: {
        fontSize: 24,
        color: COLORS.white,
        fontFamily: "Kurale-Regular",
    },
    statText: {
        fontSize: 16,
        fontFamily: "Kurale-Regular",
        color: COLORS.white,
    },
});
