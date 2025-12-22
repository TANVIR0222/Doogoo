import HeadingTop from '@/src/components/ui/HeadingTop'
import { Stack } from 'expo-router'
import React from 'react'
import { View } from 'react-native'
import { useSafeAreaInsets } from 'react-native-safe-area-context'

export default function ArchivedRootlayout() {
    const { bottom } = useSafeAreaInsets()
    return <View style={{ paddingBottom: bottom, flex: 1 }} >
        <HeadingTop />

        <Stack screenOptions={{ headerShown: false }}>
            <Stack.Screen name='index' />
        </Stack>
    </View>
}