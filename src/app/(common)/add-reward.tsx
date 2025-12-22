
import DoogooLocation from '@/src/components/ui/DoogooLocation';
import { RewardSchema } from '@/src/lib/auth_Schema';
import { formatDateReword } from '@/src/lib/formatDate';
import tw from '@/src/lib/tailwind';
import { useGetAllChalangesQuery } from '@/src/redux/groupApi/groupApi';
import { useCheckAlldataFilledOrNotQuery, useSingleRewardPostMutation } from '@/src/redux/rewardsPartnerApi/rewardsPartnerApi';
import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { Formik } from 'formik';
import React, { useState } from 'react';
import {
    Alert,
    Image,
    KeyboardAvoidingView,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from 'react-native-toast-message';

const AddReward = () => {
    const { data: allChalange } = useGetAllChalangesQuery();
    const [createReward, { isLoading }] = useSingleRewardPostMutation();
    const [image, setImage] = useState<any>();
    const { data } = useCheckAlldataFilledOrNotQuery();
    const defaultChallenge = allChalange?.data?.[0] || "";

    // console.log(defaultChallenge);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [address, setAddress] = useState<string>("");
    const [isEmpty, setIsEmpty] = useState<boolean>(false);



    const openImagePicker = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result);
        }
    };


    return (
        <KeyboardAvoidingView
            style={{ flex: 1, backgroundColor: 'white' }}
            behavior={Platform.OS === 'ios' ? 'padding' : "height"}
        >
            <ScrollView
                contentContainerStyle={{ paddingHorizontal: '4%', paddingBottom: 50, backgroundColor: 'white' }}
                keyboardShouldPersistTaps="handled"
                showsHorizontalScrollIndicator={false}
            >
                <Text style={tw`text-xl font-montserrat-700 py-4`}>Add Reward</Text>

                <Formik
                    initialValues={{
                        title: '',
                        challengeType: defaultChallenge,
                        description: '',
                        expirationDate: new Date(),
                        purchasePoint: '',
                        showDatePicker: false,
                    }}
                    validationSchema={RewardSchema}
                    onSubmit={async (values, { resetForm }) => {
                        const formData = new FormData();

                        // Image add kora jodi thake
                        if (image?.assets?.[0]?.uri) {
                            const file = image.assets[0];

                            formData.append("image", {
                                uri: file.uri,
                                name: file.fileName || "avatar.jpg",
                                type: file.mimeType || "image/jpeg",
                            } as any);
                        }

                        // Onno fields add kora
                        formData.append("title", values.title.trim());
                        // formData.append("challenge_type", values.challengeType || defaultChallenge);
                        formData.append("description", values.description.trim());
                        formData.append("expiration_date", formatDateReword(values.expirationDate));
                        formData.append("purchase_point", String(values.purchasePoint));
                        formData.append("latitude", String(selectedLocation?.geometry?.location?.lat));
                        formData.append("longitude", String(selectedLocation?.geometry?.location?.lng));
                        formData.append("location", String(selectedLocation?.formatted_address));
                        //             latitude:  || user?.latitude,
                        // longitude:  || user?.longitude,

                        // Profile check
                        if (data?.data?.is_complete === false) {
                            Alert.alert("Profile Incomplete", "Please complete your profile.", [
                                {
                                    text: "OK",
                                    onPress: () => router.push({
                                        pathname: '/(common)/update-profile',
                                        params: {
                                            location: "add-reward"
                                        }
                                    }),
                                }
                            ]);
                            return;
                        }

                        try {
                            const result = await createReward(formData).unwrap(); // Ensure API supports multipart/form-data



                            if (result?.status) {
                                Toast.show({
                                    type: "success",
                                    text2: "Reward added successfully 🎉",
                                    visibilityTime: 2000,
                                });
                                resetForm();
                                router.push('/store-manager/(tab)');
                            }
                        } catch (error) {
                            console.error("Error creating reward:", error);
                        }
                    }}

                >
                    {({ handleChange, handleSubmit, values, setFieldValue, errors, touched }) => (
                        <>
                            <View style={tw`flex-col justify-between `}>
                                <View style={tw` flex-col  gap-4`}>
                                    <View style={tw`items-center mb-2`}>
                                        <Pressable
                                            onPress={() => openImagePicker()} // image picker function
                                            style={tw`w-40 h-24 border border-blackish border-dashed items-center justify-center rounded`}
                                        >
                                            {image?.assets?.[0]?.uri ? (
                                                <Image
                                                    source={{ uri: image.assets[0].uri }}
                                                    style={tw`w-full h-full rounded`}
                                                />
                                            ) : (
                                                <Text style={tw`text-xs text-blackish`}>Select Image</Text>
                                            )}
                                        </Pressable>
                                    </View>



                                    {/* Title */}
                                    <View >
                                        <Text style={tw`text-sm font-montserrat-600 mb-1`}>Reward Title</Text>
                                        <TextInput
                                            style={tw`border border-blackish rounded px-3 py-2`}
                                            value={values.title}
                                            onChangeText={handleChange('title')}
                                            placeholder="Enter reward title"
                                        />
                                        {touched.title && errors.title && (
                                            <Text style={tw`text-red-500 text-xs`}>{errors.title}</Text>
                                        )}
                                    </View>

                                    {/* Challenge Type */}
                                    {/* <View>
                                        <Text style={tw`text-sm font-montserrat-600 mb-2`}>Challenge Type</Text>
                                        <View style={tw`border border-blackish/40 rounded px-2`}>
                                            <Picker
                                                selectedValue={values.challengeType}
                                                onValueChange={val => setFieldValue('challengeType', val)}
                                                style={[tw`text-black`, { backgroundColor: 'white', color: 'black' }]}
                                                dropdownIconColor="black" // optional, for Android icon color
                                            >
                                                {allChalange?.data?.length ? (
                                                    allChalange.data.map((type: any, index: number) => (
                                                        <Picker.Item key={index} label={type} value={type} />
                                                    ))
                                                ) : (
                                                    <Picker.Item label="No Challenges Found" value="" />
                                                )}
                                            </Picker>
                                        </View>
                                    </View> */}

                                    <DoogooLocation
                                        setSelectedLocation={setSelectedLocation}
                                        setAddress={setAddress}
                                        isEmpty={isEmpty}
                                    // address={user?.address || ""}
                                    />

                                    {/* Description */}
                                    <View>
                                        <Text style={tw`text-sm font-montserrat-600 mb-1`}>Description</Text>
                                        <TextInput
                                            style={tw`border h-32 border-blackish rounded px-3 py-2`}
                                            value={values.description}
                                            onChangeText={handleChange('description')}
                                            multiline
                                            textAlignVertical="top"
                                            placeholder="Write description..."
                                        />
                                        {touched.description && errors.description && (
                                            <Text style={tw`text-red-500 text-xs`}>{errors.description}</Text>
                                        )}
                                    </View>

                                    {/* Expiration Date */}
                                    <View>
                                        <Text style={tw`text-sm font-montserrat-600 mb-1`}>Expiration Date</Text>
                                        <Pressable onPress={() => setFieldValue('showDatePicker', true)}>
                                            <TextInput
                                                style={tw`border border-blackish rounded px-3 py-2 bg-white`}
                                                value={values.expirationDate.toLocaleDateString()}
                                                editable={false}
                                            />
                                        </Pressable>

                                        {values.showDatePicker && Platform.OS === 'android' && (
                                            <DateTimePicker
                                                value={values.expirationDate}
                                                mode="date"
                                                display="default"
                                                onChange={(_, selectedDate) => {
                                                    if (selectedDate) setFieldValue('expirationDate', selectedDate);
                                                    setFieldValue('showDatePicker', false);
                                                }}
                                            />
                                        )}
                                    </View>

                                    {/* Purchase Point */}
                                    <View>
                                        <Text style={tw`text-sm font-montserrat-600 mb-1`}>Purchase Point</Text>
                                        <TextInput
                                            style={tw`border border-blackish rounded px-3 py-2`}
                                            value={values.purchasePoint}
                                            onChangeText={handleChange('purchasePoint')}
                                            keyboardType="numeric"
                                            placeholder="Amount (e.g., 50)"
                                        />
                                        {touched.purchasePoint && errors.purchasePoint && (
                                            <Text style={tw`text-red-500 text-xs`}>{errors.purchasePoint}</Text>
                                        )}
                                    </View>
                                </View>

                                {/* Submit Button */}
                                <TouchableOpacity
                                    style={tw`bg-blackish px-4 py-3 mt-4 rounded items-center`}
                                    disabled={isLoading}
                                    onPress={() => handleSubmit()}
                                >
                                    <Text style={tw`text-white font-montserrat-500 text-base`}>
                                        {isLoading ? 'Saving reward...' : 'Add Reward'}
                                    </Text>
                                </TouchableOpacity>
                            </View>
                        </>
                    )}
                </Formik>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

export default AddReward;
