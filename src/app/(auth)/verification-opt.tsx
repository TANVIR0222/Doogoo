import { IconsLeftArrowBlack } from '@/assets/icons';
import KeyboardAvoidingComponent from '@/src/components/KeyboardAvoidingComponent';
import MainButton from '@/src/components/MainButton';
import Wrapper from '@/src/components/Wrapper';
import { storage } from '@/src/lib/mmkv_store';
import tw from '@/src/lib/tailwind';
import { useResendOTPMutation, useUserVerifyOTPMutation } from '@/src/redux/authApi/authApiSlice';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { OtpInput } from "react-native-otp-entry";
import { SvgXml } from 'react-native-svg';

export default function VerificationScreen() {
    const { email, from } = useLocalSearchParams<{ email: string; from: string }>()
    const [otpVerify, setOtpVerify] = useState<string>("");
    const [verify_otp_verify, { isLoading }] = useUserVerifyOTPMutation();
    const [resed_otp_email] = useResendOTPMutation();
    const user_role = storage.getString('role')


    const handleRestOTP = async () => {
        try {
            const res = await resed_otp_email({ email: email }).unwrap()
            if (res?.status) {
                Alert.alert(
                    "Success",
                    "OTP has been sent successfully, check your email"
                );
                setOtpVerify("")
            }
        } catch (error: any) {
            console.log(error?.message);
        }
    }



    const handleNavigate = async () => {



        if (otpVerify.length === 6) {

            try {
                const res = await verify_otp_verify({ otp: otpVerify }).unwrap();

                if (res?.status) {

                    // Save token
                    storage.set("token", res?.data?.token);

                    // Determine destination based on role or source

                    if (from === "reset-password") {
                        router.push('/change-password');
                    } else if (user_role === "USER") {
                        router.push('/(tab)');
                    } else {
                        router.push("/store-manager/(tab)")
                    }

                    // Navigate to destination
                    // router.push(destination);
                }

            } catch (error: any) {
                alert(error?.message)
            }
        } else {
            Alert.alert("OTP Error", "Please enter a valid 6-digit OTP code.");
        }
    };
    return (
        <View style={tw`flex-1 relative  bg-blackish `}>

            <KeyboardAvoidingComponent>

                <Wrapper>
                    {/* ----------------- back botton------------------------- */}

                    {/* <BackButton /> */}
                    <View style={tw`flex-1 bg-blackish justify-center items-center `}>
                        <View style={tw` absolute  top-14 left-0 `}>
                            <TouchableOpacity style={tw` `} onPress={() => router.back()} >
                                <SvgXml xml={IconsLeftArrowBlack} />
                            </TouchableOpacity>
                        </View>
                        <View style={tw`w-full  `}>
                            {/* Header */}
                            {/* ----------- heading-------------------------- */}

                            <View style={tw`flex-col gap-2 items-center justify-center pb-16`}>
                                <Text style={tw` text-yellowGreen text-2xl font-montserrat-600`}>
                                    Verification Code
                                </Text>
                                <Text style={tw` text-center text-yellowGreen text-sm font-montserrat-600`}>
                                    {` We sent a reset link to ${email} enter 6 digit code that is mentioned in the email`}
                                </Text>
                            </View>
                            {/* ------------------ otp-------------------- */}
                            <View style={tw`flex flex-col gap-5`}>
                                {/* Email/Phone Input */}

                                <View style={tw`flex flex-col gap-2 justify-end items-end`}>
                                    <OtpInput
                                        focusColor="#D6DF22"
                                        placeholder="000000"

                                        autoFocus={false}
                                        numberOfDigits={6}
                                        type="numeric"
                                        onFilled={(text: string) => setOtpVerify(text)}
                                        textInputProps={{
                                            accessibilityLabel: "One-Time Password",
                                        }}
                                        textProps={{
                                            accessibilityRole: "text",
                                            accessibilityLabel: "OTP digit",
                                            allowFontScaling: false,

                                        }}
                                        theme={{
                                            pinCodeTextStyle: {
                                                color: '#D6DF22',
                                                fontSize: 20,
                                            },
                                            pinCodeContainerStyle: {
                                                borderColor: '#D6DF22',
                                                borderWidth: 1,
                                                borderRadius: 8,
                                            }

                                        }}
                                    />
                                    {/* -------------- resend ----------- */}
                                    <TouchableOpacity
                                        style={tw`items-end`}
                                        onPress={() => handleRestOTP()}
                                    >
                                        <Text style={tw` text-yellowGreen text-lg  font-montserrat-700`}>
                                            Resend
                                        </Text>
                                    </TouchableOpacity>
                                </View>

                                {/* ----------------- button--------------- */}

                                <MainButton handleNavigate={() => handleNavigate()} isLoading={isLoading} title='Verify Code' />

                            </View>
                        </View>
                    </View>
                </Wrapper>
            </KeyboardAvoidingComponent>
        </View>
    )
}