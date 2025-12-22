import { router, useLocalSearchParams } from "expo-router";
import React from "react";
import { Alert, Share, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import tw from "../lib/tailwind";

export default function InviteModal() {
    const { bottom } = useSafeAreaInsets();
    const { id } = useLocalSearchParams<{ id: string }>();

    // Share function
    const onShare = async () => {
        try {
            const result = await Share.share({
                message:
                    `https://dashboard.doogoohabits.com/challenge/${id}`,
            });

            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    console.log("Shared with activity type:", result.activityType);
                } else {
                    console.log("Shared successfully");
                }
            } else if (result.action === Share.dismissedAction) {
                console.log("Share dismissed");
            }
        } catch (error: any) {
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View style={[tw`p-4  bg-white`, { marginBottom: bottom }]}>
            {/* Title */}
            <View style={tw`flex-col gap-1 pb-2 justify-center items-center`}>
                <View style={tw` w-16 h-1 bg-yellowGreen rounded-full mb-2`} />
                <Text style={tw`text-2xl font-bold  text-center text-gray`}>
                    🤝 Invite & Share
                </Text>
            </View>


            {/* Share to Social Media Card */}
            <TouchableOpacity
                style={tw`bg-indigo-50 p-4 rounded-xl mb-4 flex-row items-center active:bg-indigo-100`}
                activeOpacity={0.8}
                onPress={onShare}
            >
                {/* Icon */}
                <View
                    style={tw`p-3 bg-indigo-500 rounded-lg mr-4 shadow-md shadow-indigo-300`}
                >
                    <Text style={tw`text-white text-xl`}>🔗</Text>
                </View>

                {/* Text */}
                <View style={tw`flex-1`}>
                    <Text style={tw`text-xl font-semibold text-indigo-900`}>
                        Share to Social Media
                    </Text>
                    <Text style={tw`text-gray-600 text-sm mt-1`}>
                        WhatsApp, Messenger, and more.
                    </Text>
                </View>

            </TouchableOpacity>

            {/* Invite Friends Card */}
            <TouchableOpacity
                style={tw`bg-teal-50 p-4 rounded-xl flex-row items-center justify-between active:bg-teal-100`}
                activeOpacity={0.8}
                onPress={() => router.push({
                    pathname: '/(common)/friendView',
                    params: {
                        id: id,
                    },
                })}
            >
                <View style={tw`flex-row items-center`}>
                    <Text style={tw`text-teal-700 text-xl mr-3`}>👥</Text>
                    <Text style={tw`text-xl font-semibold text-teal-900`}>
                        Invite Friends
                    </Text>
                </View>
            </TouchableOpacity>
        </View>
    );
}
