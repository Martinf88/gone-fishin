import { View, Text } from "react-native";
import { Tabs, Redirect } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/Colors";
import AntDesign from "@expo/vector-icons/AntDesign";

interface TabIconProps {
    icon:
        | React.ComponentProps<typeof Ionicons>["name"]
        | React.ComponentProps<typeof AntDesign>["name"];
    focused: boolean;
    color: string;
    label?: string;
    isAntDesign?: boolean;
    size: number;
}

const TabIcon = ({
    icon,
    focused,
    color,
    label,
    isAntDesign,
    size,
}: TabIconProps) => {
    const IconComponent = isAntDesign ? AntDesign : Ionicons;

    return (
        <View style={{ alignItems: "center", justifyContent: "center" }}>
            <IconComponent name={icon as any} size={size} color={color} />
            {label && focused && (
                <Text
                    style={{
                        color,
                        marginTop: isAntDesign ? 0 : -4,
                    }}
                >
                    {label}
                </Text>
            )}
        </View>
    );
};

const TabsLayout = () => {
    return (
        <Tabs
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: COLORS.cyan,
                    height: 60,
                    paddingTop: 0,
                },
                tabBarShowLabel: false,
                tabBarIconStyle: { height: 48, width: 64 },
                tabBarActiveTintColor: COLORS.pewter,
                tabBarInactiveTintColor: COLORS.mistyBlue,
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="feed"
                options={{
                    title: "Flöde",

                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon="fish-outline"
                            focused={focused}
                            color={color}
                            label="Flöde"
                            size={32}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="register-catch"
                options={{
                    title: "Registera Fångst",
                    tabBarStyle: { display: "none" },
                    tabBarIcon: () => (
                        <TabIcon
                            icon="add-circle-outline"
                            focused={false}
                            color={COLORS.yellow}
                            size={48}
                        />
                    ),
                }}
            />
            <Tabs.Screen
                name="profile"
                options={{
                    title: "Profil",

                    tabBarIcon: ({ color, focused }) => (
                        <TabIcon
                            icon="user"
                            focused={focused}
                            color={color}
                            label="Profil"
                            isAntDesign
                            size={32}
                        />
                    ),
                }}
            />
        </Tabs>
    );
};

export default TabsLayout;
