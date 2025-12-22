import {
    IconsAbout,
    IconsChangePassword,
    IconsDataPrivacy,
    IconsNotification,
    IconsProfile,
    IconsTermsConditionsy,
} from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import React, { useEffect, useRef } from "react";
import {
    Animated,
    Dimensions,
    Pressable,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SvgXml } from "react-native-svg";

const { width } = Dimensions.get("window");
const DRAWER_WIDTH = width * 0.6;

type SideBarModalProps = {
    visible: boolean;
    onClose: () => void;
};

const menuItems = [
    { icon: IconsProfile, label: "My Profile", route: "/(common)" },
    { icon: IconsChangePassword, label: "Change Password", route: "/(common)/change-password" },
    { icon: IconsNotification, label: "Notification", route: "/(common)/notification" },
    { icon: IconsAbout, label: "About Us", route: "/(common)/about" },
    { icon: IconsDataPrivacy, label: "Data Privacy", route: "/(common)/privacy" },
    { icon: IconsTermsConditionsy, label: "Terms & Conditions", route: "/(common)/terms" },
];

export default function SideBarModal({ visible, onClose }: SideBarModalProps) {
    const slideAnim = useRef(new Animated.Value(DRAWER_WIDTH)).current;

    useEffect(() => {
        if (visible) {
            Animated.timing(slideAnim, {
                toValue: 0,
                duration: 300,
                useNativeDriver: true,
            }).start();
        } else {
            Animated.timing(slideAnim, {
                toValue: DRAWER_WIDTH,
                duration: 300,
                useNativeDriver: true,
            }).start();
        }
    }, [visible, slideAnim]);

    if (!visible) return null;

    return (
        <Pressable
            onPress={onClose}
            style={tw`absolute inset-0 bg-black/30 `}
        >

            <Animated.View
                style={[
                    tw`absolute top-0 right-0 h-96 bg-white rounded-l-xl p-6 z-50`,
                    { width: DRAWER_WIDTH, transform: [{ translateX: slideAnim }] },
                ]}
            >
                <View style={tw`gap-3 flex-1 justify-between`}>
                    <View>
                        {menuItems.map(({ icon, label, route }) => (
                            <View
                                key={label}
                                style={tw`flex-row items-center gap-3 w-full py-2`}
                            >
                                <SvgXml xml={icon} />
                                <TouchableOpacity
                                //   onPress={() => {
                                //     onClose();
                                //     router.push(route);
                                //   }}
                                >
                                    <Text style={tw`text-blackish text-base font-montserrat-600`}>
                                        {label}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        ))}
                    </View>

                    {/* <Logout /> */}
                </View>
            </Animated.View>
        </Pressable>
    );
}
