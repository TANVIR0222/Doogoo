import HeadingTop from '@/src/components/ui/HeadingTop';
import { Stack } from 'expo-router';
import React from 'react';
import { View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DetailsViewLayout() {
    const { bottom } = useSafeAreaInsets()

    return (
        <View style={{ flex: 1, paddingBottom: bottom }} >
            <HeadingTop />
            <Stack>
                <Stack.Screen
                    name="index"
                    options={{
                        animation: 'slide_from_right',
                        headerShown: false, //
                    }}
                />
                <Stack.Screen
                    name="view-details-log-progress"
                    options={{
                        animation: 'slide_from_right',
                        headerShown: false, //
                    }}
                />

            </Stack>
        </View>
    );
}
