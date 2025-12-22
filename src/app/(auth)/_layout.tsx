import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";

export default function AuthRootLayout() {

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'} />

            <Stack
                screenOptions={{
                    headerShown: false,
                }}
            >
                <Stack.Screen name="index" options={{
                    animation: 'slide_from_right'
                }} />
                <Stack.Screen name="register" options={{
                    animation: 'slide_from_right'
                }} />
                <Stack.Screen name="verification-opt" options={{
                    animation: 'slide_from_right'
                }} />
                <Stack.Screen name="created-new-password" options={{
                    animation: 'slide_from_right'
                }} />
                <Stack.Screen name="verify-email" options={{
                    animation: 'slide_from_right'
                }} />

            </Stack>
        </View>
    );
}
