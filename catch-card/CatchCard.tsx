import { StyleSheet, View } from "react-native";
import React, { useState } from "react";
import { COLORS } from "@/constants/Colors";
import { Catch } from "@/types/types";
import SocialContainer from "./components/SocialContainer";
import CatchDetails from "./components/CatchDetails";
import ImageAndHeader from "./components/ImageAndHeader";
import HeaderOnly from "./components/HeaderOnly";

interface CatchCardProps {
    catchData: Catch;
    index: number;
}

const CatchCard: React.FC<CatchCardProps> = ({ catchData, index }) => {
    const hasImage = Boolean(catchData.imageUrl);
    const [showDetails, setShowDetails] = useState(!hasImage);
    return (
        <View style={[styles.card, index !== 0 && { marginTop: 10 }]}>
            {/* Render Image + Header if Image Exists */}
            {hasImage ? (
                <ImageAndHeader
                    catchData={catchData}
                    onPress={() => setShowDetails(!showDetails)}
                />
            ) : (
                /* Render Only Header if No Image */
                <HeaderOnly catchData={catchData} />
            )}

            {/* Catch Details */}
            {(showDetails || !hasImage) && (
                <CatchDetails catchData={catchData} />
            )}
            <SocialContainer catchData={catchData} />
        </View>
    );
};

export default CatchCard;

const styles = StyleSheet.create({
    card: {
        backgroundColor: COLORS.darkGray,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 3,
    },
});
