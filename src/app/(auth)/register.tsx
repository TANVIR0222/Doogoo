import { IconsDownArrow, IconsGreenTick, IconsLeftArrowBlack } from '@/assets/icons';
import KeyboardAvoidingComponent from '@/src/components/KeyboardAvoidingComponent';
import MainButton from '@/src/components/MainButton';
import Wrapper from '@/src/components/Wrapper';
import { RegisterSchema } from '@/src/lib/auth_Schema';
import { RegisterValue } from '@/src/lib/authType';
import { storage } from '@/src/lib/mmkv_store';
import tw from '@/src/lib/tailwind';
import { useUserRegisterMutation } from '@/src/redux/authApi/authApiSlice';
import { countries } from '@/src/utils/countrydata';
import { Link, router } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import { Dimensions, FlatList, Modal, Pressable, ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';


export default function RegisterScreen() {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [user_register, { isLoading }] = useUserRegisterMutation()
    const user_role = storage.getString('role');
    const [selectedCountry, setSelectedCountry] = useState(countries[1]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [filteredCountries, setFilteredCountries] = useState(countries);


    const handleRegister = async (values: RegisterValue) => {
        console.log(values);

        const data = {
            ...values,
            country_code: selectedCountry.dial_code,
        }


        try {
            const res = await user_register(data).unwrap();
            if (res?.status) {
                // resetForm();
                router.push({
                    pathname: '/(auth)/verification-opt',
                    params: { email: values?.email, from: 'register' }
                })
            }
        } catch (error: any) {
            alert(error?.message || 'Something went wrong');
        }
    };

    const handleSearch = (query: string) => {
        setSearchQuery(query);
        setFilteredCountries(
            query.trim() === ""
                ? countries
                : countries.filter(
                    (country) =>
                        country.name.toLowerCase().includes(query.toLowerCase()) ||
                        country.dial_code.includes(query)
                )
        );
    };

    // console.log(weidth);
    const { height, width } = Dimensions.get('window');
    // console.log(height, width);




    return (
        <View style={tw`flex-1 relative bg-blackish`}>
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
                flexGrow: 1,
                paddingBottom: 20
            }}>
                <Wrapper>
                    <KeyboardAvoidingComponent>
                        <View style={tw`flex-1 bg-blackish justify-center items-center`}>
                            {/* Back Button */}
                            <View style={tw`absolute top-14 left-0`}>
                                <TouchableOpacity onPress={() => router.back()}>
                                    <SvgXml xml={IconsLeftArrowBlack} />
                                </TouchableOpacity>
                            </View>

                            <View style={tw`w-full`}>
                                {/* Header */}
                                <View style={tw`flex-row items-center justify-center mb-8 ${width > 400 ? 'mt-0' : 'mt-10'}`}>
                                    <Text style={tw`text-yellowGreen text-[25px] font-montserrat-600`}>
                                        Create Account
                                    </Text>
                                </View>

                                <Formik<RegisterValue>
                                    initialValues={{
                                        full_name: '',
                                        email: '',
                                        password: '',
                                        password_confirmation: '',
                                        phone_number: '',
                                        role: user_role,
                                        country_code: selectedCountry.dial_code
                                    }}
                                    validationSchema={RegisterSchema}
                                    onSubmit={handleRegister}
                                >
                                    {({ handleChange, handleBlur, handleSubmit, values, errors, touched, isSubmitting }) => (
                                        <View style={tw`${width > 400 ? 'flex-col gap-3' : 'flex-col gap-3'}`} >
                                            {/* Name */}
                                            <View >
                                                <Text style={tw`text-yellowGreen text-sm font-montserrat-600 mb-2`}>
                                                    Name
                                                </Text>
                                                <View style={tw`border border-gray rounded-[18px] opacity-90`}>
                                                    <TextInput
                                                        placeholder="Enter your name"
                                                        placeholderTextColor={'#d6df22'}
                                                        style={tw`px-4   h-12  text-yellowGreen  text-xs font-montserrat-600`}
                                                        onChangeText={handleChange('full_name')}
                                                        onBlur={handleBlur('full_name')}
                                                        value={values.full_name}
                                                    />
                                                </View>
                                                {touched.full_name && errors.full_name && (
                                                    <Text style={tw`text-red-500 text-xs mt-1`}>{errors.full_name}</Text>
                                                )}
                                            </View>

                                            {/* Email/Phone */}
                                            <View >
                                                <Text style={tw`text-yellowGreen text-sm font-montserrat-600 mb-2`}>
                                                    Email
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


                                            {/* Phone Number Input */}
                                            <View>
                                                <Text style={tw`text-yellowGreen text-sm font-montserrat-600 mb-2`}>
                                                    Phone Number
                                                </Text>
                                                <View
                                                    style={tw`flex-row items-center   h-12 border border-gray/60 rounded-[18px] overflow-hidden`}
                                                >
                                                    {/* Country Code Selector */}
                                                    <TouchableOpacity
                                                        onPress={() => setModalVisible(true)}
                                                        style={tw`flex-row gap-1.5 items-center px-2 h-12 border-r border-gray/60`}
                                                    >
                                                        <Text style={tw`text-sm text-gray `}>
                                                            {selectedCountry.flag}
                                                        </Text>
                                                        <Text style={tw`text-sm text-[#d6df22] font-montserrat-500`}>
                                                            {selectedCountry.dial_code}
                                                        </Text>
                                                        <SvgXml xml={IconsDownArrow} height={18} width={18} />
                                                    </TouchableOpacity>
                                                    <TextInput
                                                        style={tw`px-4   h-12  text-yellowGreen  text-xs font-montserrat-600`}
                                                        keyboardType="phone-pad"
                                                        placeholderTextColor="#d6df22"
                                                        onChangeText={handleChange('phone_number')}
                                                        onBlur={handleBlur('phone_number')}
                                                        value={values.phone_number}
                                                        placeholder={
                                                            "Enter your Phone Number"
                                                        }
                                                        maxLength={15}

                                                    />

                                                </View>
                                                {touched.phone_number && errors.phone_number && (
                                                    <Text style={tw`text-red-500 text-xs mt-1`}>{errors.phone_number}</Text>
                                                )}
                                            </View>


                                            <Modal
                                                visible={modalVisible}
                                                animationType="fade"
                                                transparent={true}
                                                onRequestClose={() => setModalVisible(false)}
                                            >
                                                <Pressable
                                                    onPress={() => setModalVisible(false)}
                                                    style={tw`flex-1 justify-center bg-black/50 p-4`}
                                                >
                                                    <View
                                                        style={tw`bg-white rounded-2xl max-h-[70%] overflow-hidden`}
                                                    >
                                                        <View style={tw`p-4 border-b border-gray`}>
                                                            <View
                                                                style={tw`flex-row justify-between items-center mb-3`}
                                                            >
                                                                <Text style={tw`text-xl font-montserrat-600 text-blackish`}>
                                                                    Select Country
                                                                </Text>
                                                                <Pressable onPress={() => setModalVisible(false)}>
                                                                    <Text style={tw`text-2xl `}>×</Text>
                                                                </Pressable>
                                                            </View>
                                                            <TextInput
                                                                style={tw`border border-gray/60 rounded-lg px-4 py-3 text-blackish`}
                                                                placeholder="Search countries..."
                                                                placeholderTextColor="#888"
                                                                selectionColor="#888"
                                                                value={searchQuery}
                                                                onChangeText={handleSearch}
                                                            />
                                                        </View>
                                                        <FlatList
                                                            data={filteredCountries}
                                                            keyExtractor={(item, index) => String(index)}
                                                            showsVerticalScrollIndicator={false}
                                                            contentContainerStyle={tw`pb-4`}
                                                            renderItem={({ item }) => (
                                                                <Pressable
                                                                    style={tw`flex-row items-center px-4 py-3 active:bg-gray`}
                                                                    onPress={() => {
                                                                        setSelectedCountry(item);
                                                                        setModalVisible(false);
                                                                    }}
                                                                >
                                                                    <Text style={tw`text-2xl mr-3`}>{item.flag}</Text>
                                                                    <View style={tw`flex-1`}>
                                                                        <Text
                                                                            style={tw`text-base font-montserrat-400 text-blackish`}
                                                                        >
                                                                            {item.name}
                                                                        </Text>
                                                                        <Text style={tw`text-sm text-blackish`}>
                                                                            {item.dial_code}
                                                                        </Text>
                                                                    </View>
                                                                    {selectedCountry.code === item.code && (
                                                                        <SvgXml xml={IconsGreenTick} />
                                                                    )}
                                                                </Pressable>
                                                            )}
                                                            ItemSeparatorComponent={() => (
                                                                <View style={tw`border-b border-[#d9d9d9] mx-4`} />
                                                            )}
                                                            ListEmptyComponent={
                                                                <Text style={tw`text-center py-6 text-blackish`}>
                                                                    No countries found
                                                                </Text>
                                                            }
                                                        />
                                                    </View>
                                                </Pressable>
                                            </Modal>

                                            {/* Password */}
                                            <View >
                                                <Text style={tw`text-yellowGreen text-sm font-montserrat-600 mb-2`}>
                                                    Password
                                                </Text>
                                                <View style={tw`border border-gray rounded-[18px] opacity-90 flex-row items-center`}>
                                                    <TextInput
                                                        placeholder="Enter password"
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

                                            {/* Confirm Password */}
                                            <View >
                                                <Text style={tw`text-yellowGreen text-sm font-montserrat-600 mb-2`}>
                                                    Confirm Password
                                                </Text>
                                                <View style={tw`border border-gray rounded-[18px] opacity-90 flex-row items-center`}>
                                                    <TextInput
                                                        placeholder="Confirm password"
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
                                            <MainButton handleNavigate={() => handleSubmit()} isLoading={isLoading} title='Register' />

                                            {/* Already have an account */}
                                            <Text style={tw`text-yellowGreen flex-row items-center justify-center text-base text-center font-montserrat-400`}>
                                                Already have an account?{' '}
                                                {/* /(auth)/loging' */}
                                                <Link href={'/(auth)'}  >
                                                    <Text style={tw`text-yellowGreen font-montserrat-700`}>Log In</Text>
                                                </Link>
                                            </Text>
                                        </View>
                                    )}
                                </Formik>
                            </View>
                        </View>
                    </KeyboardAvoidingComponent>
                </Wrapper>
            </ScrollView>
        </View>
    );
}
