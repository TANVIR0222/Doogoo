import { IconsProfile, IconsProfileActive, IconsRedemptions, IconsRedemptionsActive, IconsRewardsActives, IconsRewardsInActive } from '@/assets/icons';
import HeadingTop from '@/src/components/ui/HeadingTop';
import { Tabs } from 'expo-router';
import React from 'react';
import { Platform, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { SvgXml } from 'react-native-svg';

export default function StoreManagerRootLayout() {
    const { bottom } = useSafeAreaInsets()

    return (
        <View style={{ flex: 1, paddingBottom: bottom }}>
            {/* --------------- heading top ---------------- */}
            <HeadingTop />

            {/* ----------- status bar ------------------ */}


            {/* ----------------------- main ------------------ */}
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: '#000',

                    tabBarStyle: {
                        height: 60,
                        paddingTop: 5,
                        paddingBottom: Platform.OS === "ios" ? 25 : 10,
                        alignItems: "center",
                        justifyContent: "center",
                        backgroundColor: '#d9d9d9'
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: 'Rewards',
                        tabBarIcon: ({ focused }) => (
                            <SvgXml xml={focused ? IconsRewardsActives : IconsRewardsInActive} />
                        ),
                        animation: 'none'

                    }}
                />
                <Tabs.Screen
                    name="redemptions"
                    options={{
                        title: 'Redemptions',
                        tabBarIcon: ({ focused }) => (
                            <SvgXml xml={focused ? IconsRedemptionsActive : IconsRedemptions} />
                        ),
                        animation: 'none'

                    }}
                />
                <Tabs.Screen
                    name="profile"
                    options={{
                        title: 'Profile',
                        tabBarIcon: ({ focused }) => (
                            <SvgXml xml={focused ? IconsProfileActive : IconsProfile} />
                        ),
                        animation: 'none'

                    }}
                />

            </Tabs>
        </View>
    );
}