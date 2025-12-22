import HeadingTop from '@/src/components/ui/HeadingTop'
import { Stack } from 'expo-router'
import React from 'react'
import { StatusBar, View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ProfileRootLayout() {
    const { bottom } = useSafeAreaInsets()



    return (
        <View style={{ flex: 1, paddingBottom: bottom }}>
            {/* --------------- heading top ---------------- */}
            <HeadingTop />

            {/* ----------- status bar ------------------ */}
            <StatusBar
                translucent={false}
                backgroundColor={'#000'}
                barStyle={'dark-content'}
            />
            <Stack screenOptions={{ headerShown: false, statusBarStyle: 'dark' }}>
                <Stack.Screen
                    name="index"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="change-password"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="update-profile"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="notification"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="termsandconditions"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="about-us"
                    options={{
                        headerShown: false,
                    }}
                />
                <Stack.Screen
                    name="dataprivacy"
                    options={{
                        headerShown: false,
                    }}
                />
            </Stack>
        </View>
    )
}