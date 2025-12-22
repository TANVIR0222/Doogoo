import { Stack } from "expo-router";
import { StatusBar, View } from "react-native";

export default function SplashScreenRootLayout() {

    return (
        <View style={{ flex: 1 }}>
            <StatusBar barStyle={'light-content'} />
            <Stack
                screenOptions={{
                    headerShown: false,
                }}


            >
                <Stack.Screen name="index" options={{}} />
                <Stack.Screen name="splash-screen-one" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="splash-screen-tow" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="splash-screen-three" options={{ animation: 'slide_from_right' }} />
                <Stack.Screen name="role-screen" options={{ animation: 'slide_from_right' }} />
                {/* Add other screens here */}
            </Stack>
        </View>
    );
}
