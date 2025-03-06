import { ActivityIndicator, FlatList, StyleSheet } from "react-native";
import React from "react";
import { Catch } from "@/types/types";
import CatchCard from "../../catch-card/CatchCard";
import { COLORS } from "@/constants/Colors";

interface CatchListProps {
    catches: Catch[];
    loading: boolean;
    fetchMoreCatches: () => void;
    headerComponent?: React.ReactElement;
    refreshControl: JSX.Element;
}

const CatchList = ({
    catches,
    loading,
    fetchMoreCatches,
    headerComponent,
    refreshControl,
}: CatchListProps) => {
    return (
        <FlatList
            data={catches}
            keyExtractor={(item) => String(item.catchId)}
            renderItem={({ item, index }) => (
                <CatchCard catchData={item} index={index} />
            )}
            refreshControl={refreshControl}
            onEndReached={fetchMoreCatches}
            onEndReachedThreshold={0.5}
            ListFooterComponent={
                loading ? (
                    <ActivityIndicator size="large" color={COLORS.secondary} />
                ) : null
            }
            ListHeaderComponent={headerComponent}
        />
    );
};

export default CatchList;
