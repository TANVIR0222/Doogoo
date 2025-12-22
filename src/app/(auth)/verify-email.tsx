import { IconsLeftArrowBlack } from '@/assets/icons';
import KeyboardAvoidingComponent from '@/src/components/KeyboardAvoidingComponent';
import MainButton from '@/src/components/MainButton';
import Wrapper from '@/src/components/Wrapper';
import { VerifyEmailSchema } from '@/src/lib/auth_Schema';
import { OTPValue } from '@/src/lib/authType';
import tw from '@/src/lib/tailwind';
import { useResendOTPMutation } from '@/src/redux/authApi/authApiSlice';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';


export default function EmailVarificationScreen() {

    const [resed_otp_email, { isLoading }] = useResendOTPMutation();


    const handleRestOTP = async (values: OTPValue, { resetForm }: { resetForm: () => void }) => {
        try {
            const res = await resed_otp_email({ email: values?.email }).unwrap()
            if (res?.status) {
                router.push({
                    pathname: "/(auth)/verification-opt",
                    params: { from: 'reset-password' }
                })
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <View style={tw`flex-1 relative bg-blackish `}>

            <KeyboardAvoidingComponent>
                <Wrapper>
                    <View style={tw`flex-1 bg-blackish justify-center items-center `}>
                        {/* -------------- back button---------------------- */}
                        <View style={tw` absolute  top-14 left-0 `}>
                            <TouchableOpacity style={tw` `} onPress={() => router.back()} >
                                <SvgXml xml={IconsLeftArrowBlack} />
                            </TouchableOpacity>
                        </View>
                        {/* ------------------- heading------------------------- */}
                        <View style={tw`w-full  `}>
                            {/* Header */}
                            <View style={tw`flex-row items-center justify-center mb-8`}>
                                <Text style={tw` text-yellowGreen text-[25px] font-montserrat-600`}>
                                    Reset Your Password
                                </Text>
                            </View>
                            {/* ---------------- form------------------------------ */}
                            <Formik
                                initialValues={{ email: '', }}
                                validationSchema={VerifyEmailSchema}
                                onSubmit={handleRestOTP}
                            >
                                {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                                    <View style={tw` flex-col gap-10`} >
                                        {/* Email/Phone Input */}
                                        <View >
                                            <Text style={tw` text-yellowGreen  text-sm font-montserrat-600 mb-2`}>
                                                Email
                                            </Text>
                                            <View style={tw`border border-gray rounded-[18px]`}>
                                                <TextInput
                                                    placeholder="Enter your email"
                                                    placeholderTextColor={'#d6df22'}
                                                    style={tw`px-4   h-12  text-yellowGreen  text-xs font-montserrat-600`}
                                                    onChangeText={handleChange('email')}
                                                    onBlur={handleBlur('email')}
                                                    value={values.email}
                                                    keyboardType="email-address"
                                                    autoCapitalize="none"
                                                />
                                            </View>

                                            {touched.email && errors.email && (
                                                <Text style={tw`text-red-500 text-xs mt-1`}>{errors.email}</Text>
                                            )}

                                        </View>


                                        {/* --------------------- submit button -------------------------- */}

                                        <MainButton handleNavigate={() => handleSubmit()} isLoading={isLoading} title='Submit' />

                                    </View>
                                )}
                            </Formik>
                        </View>
                    </View>
                </Wrapper>
            </KeyboardAvoidingComponent>
        </View>
    )
}