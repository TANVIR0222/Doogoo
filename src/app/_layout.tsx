import { StripeProvider } from "@stripe/stripe-react-native";
import { Stack } from "expo-router";
import { useEffect } from "react";
import { Appearance, StatusBar } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Toast from "react-native-toast-message";
import { Provider } from "react-redux";
import { useDeviceContext } from "twrnc";
import GlobalErrorBoundary from "../lib/error/ErrorBoundary";
import tw from "../lib/tailwind";
import store from "../redux/store/store";



export default function RootLayout() {
  useDeviceContext(tw)
  useEffect(() => {
    Appearance.setColorScheme('light');
  }, []);

  // const isConnected = useNetworkStatus();
  // console.log(isConnected);



  return (
    <GlobalErrorBoundary>
      <StripeProvider publishableKey={process.env.EXPO_PUBLIC_STRIPE_PUBLISHABLE_KEY || ''}>

        <Provider store={store}>
          <GestureHandlerRootView style={{ flex: 1, }}>

            <StatusBar barStyle={"dark-content"} translucent />
            <Stack
              screenOptions={{
                headerShown: false, // Hides header for all screens
                animation: 'fade', // Smooth transition animation
              }}
            >
              {/* Initial screens */}
              <Stack.Screen name="index" />
              <Stack.Screen name="+not-found" />

              {/* Grouped screens */}
              <Stack.Screen
                name="(splash-screen)"
                options={{
                  gestureEnabled: false // Disable swipe back on splash screens
                }}
              />
              <Stack.Screen
                name='(auth)'
                options={{
                  gestureEnabled: false // Disable swipe back on splash screens
                }}
              />
              <Stack.Screen
                name='(tab)'
                options={{
                  gestureEnabled: false // Disable swipe back on splash screens
                }}
              />
              <Stack.Screen
                name='view-details'
                options={{
                  gestureEnabled: false // Disable swipe back on splash screens
                }}
              />
              <Stack.Screen
                name='payment-procedure'
                options={{
                  gestureEnabled: false // Disable swipe back on splash screens
                }}
              />
              <Stack.Screen
                name='group-completion'
                options={{
                  gestureEnabled: false // Disable swipe back on splash screens
                }}
              />
              <Stack.Screen
                name='store-manager/(tab)'
                options={{
                  gestureEnabled: false // Disable swipe back on splash screens
                }}
              />
              <Stack.Screen
                name='(common)'
                options={{
                  gestureEnabled: false // Disable swipe back on splash screens
                }}
              />
              <Stack.Screen
                name='archived'
                options={{
                  gestureEnabled: false // Disable swipe back on splash screens
                }}
              />
              <Stack.Screen
                name='reward-edit'
                options={{
                  gestureEnabled: false // Disable swipe back on splash screens
                }}
              />
              <Stack.Screen
                name='challenge/[id]'
                options={(props) => {
                  console.log('--------layout---------------------');

                  console.log(props);

                  // const productId = props?.route?.params?.products;
                  // console.log(productId);


                  return { presentation: "modal" };
                }}
              />
              <Stack.Screen
                name='subcription-modal'
                options={{
                  presentation: 'transparentModal',
                  headerShown: false,
                  animation: 'slide_from_bottom'
                }}
              />
              <Stack.Screen
                name="invite-modal"
                options={{
                  presentation: 'formSheet',
                  sheetAllowedDetents: 'fitToContents',
                  headerShown: false
                }}
              />

              {/* Add more groups as needed */}
              {/* <Stack.Screen name="(app)" /> */}
              {/* <Stack.Screen name="(onboarding)" /> */}
            </Stack>
            <Toast />

          </GestureHandlerRootView>
        </Provider>
      </StripeProvider>
    </GlobalErrorBoundary>
  );
}