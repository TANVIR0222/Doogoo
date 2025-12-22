import { IconsLeftArrowBlack } from '@/assets/icons';
import GoogleLogin from '@/src/components/GoogleLogin';
import KeyboardAvoidingComponent from '@/src/components/KeyboardAvoidingComponent';
import Wrapper from '@/src/components/Wrapper';
import { LoginSchema } from '@/src/lib/auth_Schema';
import { storage } from '@/src/lib/mmkv_store';
import tw from '@/src/lib/tailwind';
import { useUserLoginMutation } from '@/src/redux/authApi/authApiSlice';
import { Link, router } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';
import { TextInput } from 'react-native-gesture-handler';
import { SvgXml } from 'react-native-svg';

export default function LoginScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [user_login, { isLoading }] = useUserLoginMutation();

    const handleLogin = async (values: { email: string; password: string }) => {
        try {
            const res = await user_login(values).unwrap();

            if (res?.status) {
                storage.set('token', res?.data?.token);
                (() => res?.data?.user?.role === 'USER'
                    ? router.replace('/(tab)')
                    : router.replace('/store-manager/(tab)'))();

            }
        } catch (error: any) {
            console.log(error);
            Alert.alert('Failed', error?.message);
        }
    };


    return (
        <View style={tw`flex-1`}>
            <View style={tw`flex-1 relative bg-blackish `}>

                <Wrapper>
                    <KeyboardAvoidingComponent>
                        <View style={tw`flex-1 bg-blackish justify-center items-center `}>
                            {/* ----------------- back botton------------------------- */}
                            <View style={tw` absolute  top-14 left-0 `}>
                                <TouchableOpacity style={tw` `} onPress={() => router.replace('/(splash-screen)/role-screen')} >
                                    <SvgXml xml={IconsLeftArrowBlack} />
                                </TouchableOpacity>
                            </View>
                            {/* ----------- heading-------------------------- */}
                            <View style={tw`w-full`}>
                                {/* Header */}
                                <View style={tw`flex-row items-center justify-center mb-8`}>
                                    <Text style={tw` text-yellowGreen text-[25px] font-montserrat-600`}>
                                        Welcome back!
                                    </Text>
                                </View>
                                {/* ----------------------- form --------------------- */}
                                <Formik
                                    initialValues={{ email: '', password: '' }}
                                    validationSchema={LoginSchema}
                                    onSubmit={handleLogin}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                                        <View>
                                            {/* Email/Phone Input */}
                                            <View style={tw`mb-6`}>
                                                <Text style={tw` text-yellowGreen  text-sm font-montserrat-600 mb-2`}>
                                                    Email or Phone
                                                </Text>
                                                <View style={tw`border border-gray rounded-[18px] opacity-90`}>
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

                                            {/* Password Input */}
                                            <View style={tw`mb-6`}>
                                                <Text style={tw` text-yellowGreen  text-sm font-montserrat-600 mb-2`}>
                                                    Password
                                                </Text>
                                                <View style={tw`border border-gray rounded-[18px] opacity-90 flex-row items-center`}>
                                                    <TextInput
                                                        placeholder="Enter your password"
                                                        placeholderTextColor={'#d6df22'}
                                                        style={tw`flex-1 px-4  h-12   text-yellowGreen  text-xs font-montserrat-600`}
                                                        onChangeText={handleChange('password')}
                                                        onBlur={handleBlur('password')}
                                                        value={values.password}
                                                        secureTextEntry={!showPassword}
                                                    />
                                                    <TouchableOpacity
                                                        style={tw`px-4`}
                                                        onPress={() => setShowPassword(!showPassword)}
                                                    >
                                                        <Text style={tw` text-yellowGreen  text-xs font-montserrat-600`}>
                                                            {showPassword ? 'Hide' : 'Show'}
                                                        </Text>
                                                    </TouchableOpacity>
                                                </View>
                                                <TouchableOpacity
                                                    style={tw`items-end py-1`}
                                                    onPress={() => router.push('/(auth)/verify-email')}
                                                >
                                                    <Text style={tw` text-yellowGreen text-base  font-montserrat-700`}>
                                                        Forgot Password?
                                                    </Text>
                                                </TouchableOpacity>
                                                {touched.password && errors.password && (
                                                    <Text style={tw`text-red-500 text-xs mt-1`}>{errors.password}</Text>
                                                )}
                                            </View>
                                            {/* ------------------------- submit buttom----------------------------- */}
                                            {/* Footer */}
                                            <View style={tw`mb-8`}>
                                                <TouchableOpacity
                                                    style={tw`h-12 bg-yellowGreen rounded-[18px] justify-center items-center mb-4`}
                                                    onPress={() => handleSubmit()}
                                                    disabled={isSubmitting}
                                                >
                                                    <Text style={tw`text-[#3E3E3F] text-[16px]  font-montserrat-700`}>
                                                        {isSubmitting ? 'Logging in...' : 'Log In'}
                                                    </Text>
                                                </TouchableOpacity>
                                                <Text style={tw` text-yellowGreen text-center text-base  my-4 font-montserrat-700`}>
                                                    or
                                                </Text>
                                                {/* ------------------------ google login ------------------------ */}
                                                <GoogleLogin />
                                                {/* ------------------------ forget pass ------------------------ */}
                                                {/* <TouchableOpacity
                                                style={tw`items-end`}
                                                onPress={() => router.push('/(auth)/verify-email')}
                                            > */}

                                            </View>
                                            <Text style={tw` text-yellowGreen text-base text-center   font-montserrat-400`}>
                                                You don’t have an account? <Link href={'/(auth)/register'}><Text style={tw` text-yellowGreen text-base  font-montserrat-700`}>Register</Text></Link>
                                            </Text>
                                        </View>
                                    )}
                                </Formik>
                            </View>
                        </View>
                    </KeyboardAvoidingComponent>
                </Wrapper>
            </View>
        </View>
    )
}