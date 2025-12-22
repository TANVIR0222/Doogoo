import KeyboardAvoidingComponent from '@/src/components/KeyboardAvoidingComponent';
import MainButton from '@/src/components/MainButton';
import BackButton from '@/src/components/ui/BackButton';
import Wrapper from '@/src/components/Wrapper';
import { ConfirmationdSchema } from '@/src/lib/auth_Schema';
import { ConfirmationValue } from '@/src/lib/authType';
import tw from '@/src/lib/tailwind';
import { useChangePasswordMutation } from '@/src/redux/authApi/authApiSlice';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View } from 'react-native';


export default function CreatedNewPasswordScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [change_pass, { isLoading }] = useChangePasswordMutation()

    const handleSubmit = async (values: ConfirmationValue) => {
        try {
            const res = await change_pass(values).unwrap();
            if (res?.status) {
                router.push('/(tab)')
            }

        } catch (error) {
            Alert.alert('Error', 'Password change failed. Please try again.');
        }
    };

    return (
        <View style={tw`flex-1 bg-blackish`}>
            <KeyboardAvoidingComponent>
                <Wrapper>
                    {/* ------------ back button ------------------------- */}
                    <BackButton />

                    {/* -----------------header--------------- */}
                    <View style={tw`flex-1  flex-col gap-10 justify-center`}>
                        {/* Header */}
                        <View style={tw``}>
                            <Text style={tw`text-yellowGreen text-2xl font-montserrat-600 text-center`}>
                                Create New Password
                            </Text>
                        </View>
                        {/* ----------------- form --------------------------- */}
                        <Formik
                            initialValues={{ password: '', password_confirmation: '' }}
                            validationSchema={ConfirmationdSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                                <View>
                                    {/* New Password Input */}
                                    <View style={tw`mb-6`}>
                                        <Text style={tw`text-yellowGreen text-sm font-montserrat-600 mb-2`}>
                                            New Password
                                        </Text>
                                        <View style={tw`border border-gray rounded-[18px] opacity-90 flex-row items-center`}>
                                            <TextInput
                                                placeholder="Enter new password"
                                                placeholderTextColor="#d6df22"
                                                style={tw`px-4   h-12 flex-1 text-yellowGreen  text-xs font-montserrat-600`}
                                                onChangeText={handleChange('password')}
                                                onBlur={handleBlur('password')}
                                                value={values.password}
                                                secureTextEntry={!showPassword}
                                            />
                                            <TouchableOpacity
                                                style={tw`px-4`}
                                                onPress={() => setShowPassword(!showPassword)}
                                            >
                                                <Text style={tw`text-yellowGreen text-xs font-montserrat-600`}>
                                                    {showPassword ? 'Hide' : 'Show'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {touched.password && errors.password && (
                                            <Text style={tw`text-red-500 text-xs mt-1`}>{errors.password}</Text>
                                        )}
                                    </View>

                                    {/* Confirm Password Input */}
                                    <View style={tw`mb-8`}>
                                        <Text style={tw`text-yellowGreen text-sm font-montserrat-600 mb-2`}>
                                            Confirm Password
                                        </Text>
                                        <View style={tw`border border-gray rounded-[18px] opacity-90 flex-row items-center`}>
                                            <TextInput
                                                placeholder="Confirm new password"
                                                placeholderTextColor="#d6df22"
                                                style={tw`px-4   h-12 flex-1 text-yellowGreen  text-xs font-montserrat-600`}
                                                onChangeText={handleChange('password_confirmation')}
                                                onBlur={handleBlur('password_confirmation')}
                                                value={values.password_confirmation}
                                                secureTextEntry={!showConfirmPassword}
                                            />
                                            <TouchableOpacity
                                                style={tw`px-4`}
                                                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                                            >
                                                <Text style={tw`text-yellowGreen text-xs font-montserrat-600`}>
                                                    {showConfirmPassword ? 'Hide' : 'Show'}
                                                </Text>
                                            </TouchableOpacity>
                                        </View>
                                        {touched.password_confirmation && errors.password_confirmation && (
                                            <Text style={tw`text-red-500 text-xs mt-1`}>{errors.password_confirmation}</Text>
                                        )}
                                    </View>

                                    {/*------------------ Submit Button ---------------------- */}

                                    <MainButton handleNavigate={() => handleSubmit()} isLoading={isLoading} title='Change Password' />
                                </View>
                            )}
                        </Formik>
                    </View>
                </Wrapper>
            </KeyboardAvoidingComponent>
        </View>
    );
}