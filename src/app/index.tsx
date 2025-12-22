import * as Font from "expo-font";
import { router, SplashScreen } from "expo-router";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, Image, View } from "react-native";
import tw from "../lib/tailwind";
import { useUserGetProfileQuery } from "../redux/authApi/authApiSlice";

// Prevent auto-hiding the splash screen
SplashScreen.preventAutoHideAsync();

export default function Home() {
  const { data, isLoading } = useUserGetProfileQuery();
  const user = data?.data?.user?.role;

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    let timeout: number;

    const prepareApp = async () => {
      try {
        // Load fonts
        await Font.loadAsync({
          montserratBlack: require("@/assets/fonts/Montserrat-Black.ttf"),
          montserratBold: require("@/assets/fonts/Montserrat-Bold.ttf"),
          montserratSemiBold: require("@/assets/fonts/Montserrat-SemiBold.ttf"),
          montserratMedium: require("@/assets/fonts/Montserrat-Medium.ttf"),
          montserratRegular: require("@/assets/fonts/Montserrat-Regular.ttf"),
          montserratLight: require("@/assets/fonts/Montserrat-Light.ttf"),
        });

        setFontsLoaded(true);

        // Redirect only when data + fonts are ready
        if (!isLoading) {
          timeout = setTimeout(() => {
            SplashScreen.hideAsync();

            if (user === "USER") {
              router.replace("/(tab)");
            } else if (user === "PARTNER") {
              router.replace("/store-manager/(tab)");
            } else {
              router.replace("/(splash-screen)");
            }
          }, 800);
        }
      } catch (e) {
        console.warn("Font loading failed:", e);
        SplashScreen.hideAsync();
      }
    };

    prepareApp();

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [user, isLoading]);

  // Show splash screen until fonts + profile are loaded
  if (!fontsLoaded || isLoading) {
    return (
      <View style={tw`flex-1 justify-center items-center bg-yellowGreen`}>
        <Image
          source={require("@/assets/images/splash-icon.png")}
          style={tw`w-48 h-48 rounded-2xl`}
          resizeMode="contain"
        />
        <View style={tw`absolute bottom-20`}>
          <ActivityIndicator size="large" color="#3E3E3F" />
        </View>
      </View>
    );
  }

  return null;
}
