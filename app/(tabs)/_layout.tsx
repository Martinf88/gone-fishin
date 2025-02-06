import { View } from "react-native";
import React from "react";
import { Tabs, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

const TabsLayout = () => {
    return (
        <>
            <Tabs
                screenOptions={{
                    tabBarStyle: {
                        backgroundColor: COLORS.darkBlue,
                        height: 60,
                        paddingTop: 0,
                    },
                    tabBarIconStyle: { height: 48, width: 48 },
                    tabBarActiveTintColor: COLORS.pewter,
                    tabBarInactiveTintColor: COLORS.blueGray,
                }}
            >
                <Tabs.Screen
                    name="feed"
                    options={{
                        title: "Fångster",
                        headerShown: false,
                        tabBarIconStyle: {
                            height: 24,
                            width: 24,
                            marginTop: 6,
                        },
                        tabBarIcon: ({ color, focused }) => (
                            <Ionicons
                                name="fish-outline"
                                size={24}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="create"
                    options={{
                        title: "Create",
                        tabBarLabel: "",
                        headerShown: false,
                        tabBarIcon: () => (
                            <Ionicons
                                name="add-circle-outline"
                                size={48}
                                color={COLORS.yellow}
                            />
                        ),
                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profil",
                        headerShown: false,
                        tabBarIconStyle: {
                            height: 24,
                            width: 24,
                            marginTop: 6,
                        },
                        tabBarIcon: ({ color, focused }) => (
                            <AntDesign
                                name="user"
                                size={24}
                                color={color}
                                focused={focused}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
};

export default TabsLayout;
