import { IconsLogout } from '@/assets/icons';
import tw from '@/src/lib/tailwind';
import { useUserLogoutMutation } from '@/src/redux/authApi/authApiSlice';
import { router } from 'expo-router';
import React from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

type LogoutProps = {
    setSettingView: (visible: boolean) => void;
};

const Logout = ({ setSettingView }: LogoutProps) => {



    const [logout, { isLoading, isSuccess, isError }] = useUserLogoutMutation();

    const handleLogout = async () => {
        try {


            Alert.alert("Confirm Logout", "Are you sure you want to logout?", [
                {
                    text: "Cancel",
                    style: "cancel",
                },
                {
                    text: "OK",
                    onPress: async () => {
                        try {
                            await logout().unwrap();
                            router.replace("/(splash-screen)");
                        } catch (error) {
                            console.log("Logout failed:", error);
                            Alert.alert("Logout Failed", "Something went wrong. Please try again.");
                        }
                    },
                },
            ]);


        } catch (error) {
            console.log("Logout failed:", error);
        }
    };

    return (
        <View>
            <TouchableOpacity
                style={tw` flex-row gap-1 px-6 py-4`}
                onPress={handleLogout}
            >
                <SvgXml xml={IconsLogout} />
                <Text style={tw`text-red-500 text-base font-montserrat-600`}>
                    Log Out
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default Logout;
