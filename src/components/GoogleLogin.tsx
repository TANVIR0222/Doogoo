import { IconsGoogleICons } from '@/assets/icons'
import { GoogleSignin } from "@react-native-google-signin/google-signin"
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import { storage } from '../lib/mmkv_store'
import tw from '../lib/tailwind'
import { useSocialLoginMutation } from '../redux/authApi/authApiSlice'

export default function GoogleLogin() {

    const [socialLogin] = useSocialLoginMutation()
    const user_role = storage.getString('role');


    // sign in google
    React.useEffect(() => {
        GoogleSignin.configure({
            webClientId:
                "196554728462-4uvv2ah0q4gv73j3e79ob72c5sm90ulm.apps.googleusercontent.com",
            iosClientId: "196554728462-47803v9paijrep38a45992s1cau1cdqv.apps.googleusercontent.com",
            offlineAccess: true,
        });
    }, []);

    const signIn = async () => {
        try {
            await GoogleSignin.hasPlayServices();
            const response = await GoogleSignin.signIn();
            // Original data
            const data = {
                google_id: response?.data?.user?.id,
                email: response?.data?.user?.email,
                full_name: response?.data?.user?.name,
                avatar: response?.data?.user?.photo, // uri
                role: user_role,
            };

            // Create FormData
            const formData = new FormData();
            Object.keys(data).forEach((key) => {
                if (key === "avatar" && data.avatar) {
                    // avatar is a uri, so we need name and type
                    formData.append("avatar", {
                        uri: data.avatar,
                        name: "avatar.jpg",
                        type: "image/jpeg",
                    });
                } else {
                    formData.append(key, data[key]);
                }
            });

            // RTK Query call with FormData
            const res = await socialLogin(formData).unwrap();
            console.log(res);


            if (res?.status) {
                storage.set('token', res?.token);
                (() => res?.data?.role === 'USER'
                    ? router.replace('/(tab)')
                    : router.replace('/store-manager/(tab)'))();

            }


        } catch (error) {

            console.log(error);

        }
    };


    return (
        <View>
            <TouchableOpacity
                style={tw`h-12 flex-row items-center gap-2 border-[1px] border-yellowGreen rounded-[18px] justify-center  mb-4`}
                onPress={() => signIn()}
            >
                <SvgXml xml={IconsGoogleICons} width={22} height={22} />
                <Text style={tw`text-yellowGreen text-[16px] items-center justify-center   font-montserrat-700`}>
                    Continue with Google
                </Text>
            </TouchableOpacity>
        </View>
    )
}