import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { Feather, FontAwesome } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";

//TODO: add like functionality
// Add like field to catches and store userId in an array
// create a setDoc function that updates a catch when like button is pressed
// Check if user allready liked the catch
// remove like if user already liked the catch

interface SocialContainerProps {
    likes: string[];
}

const SocialContainer = ({ likes }: SocialContainerProps) => {
    const handleAddLike = () => {
        // call update function
    };
    return (
        <View style={styles.socialContainer}>
            <View style={styles.wrapper}>
                <TouchableOpacity onPress={handleAddLike}>
                    <Feather name="thumbs-up" size={24} color={COLORS.white} />
                </TouchableOpacity>
                <Text style={styles.largeText}>
                    {likes ? likes.length : 0} likes
                </Text>
            </View>
            {/* TODO: Add comments <TouchableOpacity>
                <FontAwesome
                    name="commenting-o"
                    size={24}
                    color={COLORS.white}
                />
            </TouchableOpacity> */}
        </View>
    );
};

export default SocialContainer;

const styles = StyleSheet.create({
    socialContainer: {
        flexDirection: "row",
        padding: 10,
    },
    wrapper: {
        flexDirection: "row",
        marginLeft: 5,
        gap: 10,
    },
    smallText: {
        fontSize: 16,
        color: COLORS.white,
        fontFamily: "Kurale-Regular",
    },
    largeText: {
        fontSize: 18,
        color: COLORS.white,
        fontFamily: "Kurale-Regular",
    },
});
