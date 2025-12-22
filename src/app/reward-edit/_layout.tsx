import HeadingTop from '@/src/components/ui/HeadingTop'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function Layout() {
    const { bottom } = useSafeAreaInsets()

    return (
        <View style={{ flex: 1, paddingBottom: bottom }}>
            {/* --------------- heading top ---------------- */}
            <HeadingTop />
            <Stack screenOptions={{ headerShown: false }}>
                <Stack.Screen name="[id]" />
            </Stack>
        </View>
    )
}