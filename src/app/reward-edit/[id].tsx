import DoogooLocation from '@/src/components/ui/DoogooLocation';
import { formatDateReword } from '@/src/lib/formatDate';
import tw from '@/src/lib/tailwind';
import { useGetAllChalangesQuery } from '@/src/redux/groupApi/groupApi';
import {
    useCheckAlldataFilledOrNotQuery,
    useUpdateSingleRewardPostMutation,
    useViewRewardQuery
} from '@/src/redux/rewardsPartnerApi/rewardsPartnerApi';

import DateTimePicker from '@react-native-community/datetimepicker';
import * as ImagePicker from 'expo-image-picker';
import { router, useLocalSearchParams } from 'expo-router';

import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
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
    const { id } = useLocalSearchParams();
    const rewardId = Number(id);

    const { data: profileCheck } = useCheckAlldataFilledOrNotQuery();
    const { data: rewardData, isLoading: loadingReward } = useViewRewardQuery({ id: rewardId });
    const { data: allChalange } = useGetAllChalangesQuery();

    const defaultChallenge = allChalange?.data?.[0];

    const [updateReward, { isLoading }] = useUpdateSingleRewardPostMutation();

    const [image, setImage] = useState<any>(null);
    const [selectedLocation, setSelectedLocation] = useState<any>(null);
    const [address, setAddress] = useState("");

    // ------------------------------
    // FORM DATA STATE (NO FORMIK)
    // ------------------------------
    const [formData, setFormData] = useState({
        title: "",
        challengeType: "",
        description: "",
        expirationDate: new Date(),
        purchasePoint: "",
        latitude: "",
        longitude: "",
        location: ""
    });

    // ------------------------------
    // LOAD OLD DATA INTO STATE
    // ------------------------------
    useEffect(() => {
        if (rewardData?.data) {
            setFormData({
                title: rewardData.data.title || "",
                challengeType: defaultChallenge || "",
                description: rewardData.data.description || "",
                expirationDate: rewardData.data.expiration_date
                    ? new Date(rewardData.data.expiration_date)
                    : new Date(),
                purchasePoint: rewardData.data.purchase_point?.toString() || "",
                latitude: rewardData.data.latitude || "",
                longitude: rewardData.data.longitude || "",
                location: rewardData.data.location || ""
            });

            setAddress(rewardData.data.location);
        }
    }, [rewardData?.data, defaultChallenge]);

    // -----------------------------------------
    // AUTO UPDATE LAT / LNG / ADDRESS
    // -----------------------------------------
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            address: address || rewardData?.data?.location,
            location: address || rewardData?.data?.location,
            latitude: selectedLocation?.geometry?.location?.lat || rewardData?.data?.latitude,
            longitude: selectedLocation?.geometry?.location?.lng || rewardData?.data?.longitude,
        }));
    }, [address, selectedLocation]);

    // ------------------------------
    // IMAGE PICKER
    // ------------------------------
    const openImagePicker = async () => {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });

        if (!result.canceled) setImage(result);
    };

    // ------------------------------
    // SUBMIT HANDLER
    // ------------------------------
    const handleSubmit = async () => {
        if (profileCheck?.data?.is_complete === false) {
            Alert.alert("Profile Incomplete", "Please complete your profile.", [
                {
                    text: "OK",
                    onPress: () =>
                        router.push({
                            pathname: "/(common)/update-profile",
                            params: { location: "add-reward" },
                        }),
                },
            ]);
            return;
        }

        const fd = new FormData();

        if (image?.assets?.[0]?.uri) {
            const file = image.assets[0];
            fd.append("image", {
                uri: file.uri,
                name: file.fileName || "reward.jpg",
                type: file.mimeType || "image/jpeg",
            } as any);
        }

        fd.append("title", formData.title.trim());
        fd.append("description", formData.description.trim());
        fd.append("expiration_date", formatDateReword(formData?.expirationDate));
        // fd.append("expiration_date", formatDateReword(values.expirationDate));
        fd.append("purchase_point", formData.purchasePoint);
        fd.append("latitude", String(formData.latitude));
        fd.append("longitude", String(formData.longitude));
        fd.append("location", String(formData.location));

        // console.log(fd);


        try {
            const res = await updateReward({ formData: fd, id: Number(id) }).unwrap();
            console.log(res);

            if (res?.status) {
                Toast.show({ type: "success", text2: "Reward updated successfully 🎉" });
                router.push("/store-manager/(tab)");
            }
        } catch (error) {
            console.error("Reward Update Error:", error);
        }
    };

    if (loadingReward) {
        return (
            <View style={tw`flex-1 justify-center items-center`}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    return (
        <View style={tw`flex-1 bg-white`}>
            <KeyboardAvoidingView
                style={{ flex: 1, backgroundColor: "white" }}
                behavior={Platform.OS === "ios" ? "padding" : "height"}
            >
                <ScrollView
                    contentContainerStyle={{ paddingHorizontal: "4%", paddingBottom: 50 }}
                    keyboardShouldPersistTaps="handled"
                >
                    <Text style={tw`text-xl font-montserrat-700 py-4`}>Edit Reward</Text>

                    {/* Image */}
                    <View style={tw` items-center`} >
                        <Pressable
                            onPress={openImagePicker}
                            style={tw`w-40 h-24 border border-blackish border-dashed items-center justify-center rounded`}
                        >
                            {image?.assets?.[0]?.uri || rewardData?.data?.image_url ? (
                                <Image
                                    source={{ uri: image?.assets?.[0]?.uri || rewardData.data.image_url }}
                                    style={tw`w-full h-full rounded`}
                                />
                            ) : (
                                <Text style={tw`text-xs text-blackish`}>Select Image</Text>
                            )}
                        </Pressable>
                    </View>

                    {/* Title */}
                    <Text style={tw`mt-4 font-montserrat-600`}>Reward Title</Text>
                    <TextInput
                        style={tw`border border-blackish rounded px-3 py-2`}
                        value={formData.title}
                        onChangeText={(text) => setFormData({ ...formData, title: text })}
                    />

                    {/* Location */}
                    <View style={tw`mt-4 `}>
                        <DoogooLocation
                            setSelectedLocation={setSelectedLocation}
                            setAddress={setAddress}
                            isEmpty={false}
                        />
                    </View>

                    {/* Description */}
                    <Text style={tw`mt-4 font-montserrat-600`}>Description</Text>
                    <TextInput
                        style={tw`border h-32 border-blackish rounded px-3 py-2`}
                        value={formData.description}
                        multiline
                        textAlignVertical="top"
                        onChangeText={(text) => setFormData({ ...formData, description: text })}
                    />

                    {/* Expiration Date */}
                    <Text style={tw`mt-4 font-montserrat-600`}>Expiration Date</Text>
                    <Pressable onPress={() => setFormData({ ...formData, showDatePicker: true })}>
                        <TextInput
                            style={tw`border border-blackish rounded px-3 py-2 bg-white`}
                            value={formData.expirationDate.toLocaleDateString()}
                            editable={false}
                        />
                    </Pressable>

                    {formData.showDatePicker && (
                        <DateTimePicker
                            value={formData.expirationDate}
                            mode="date"
                            display="default"
                            onChange={(e, date) =>
                                setFormData({
                                    ...formData,
                                    expirationDate: date || new Date(),
                                    showDatePicker: false
                                })
                            }
                        />
                    )}

                    {/* Purchase Point */}
                    <Text style={tw`mt-4 font-montserrat-600`}>Purchase Point</Text>
                    <TextInput
                        style={tw`border border-blackish rounded px-3 py-2`}
                        value={formData.purchasePoint}
                        keyboardType="numeric"
                        onChangeText={(text) => setFormData({ ...formData, purchasePoint: text })}
                    />



                    {/* Submit */}
                    <TouchableOpacity
                        style={tw`bg-blackish px-4 py-3 mt-6 rounded items-center`}
                        onPress={handleSubmit}
                        disabled={isLoading}
                    >
                        <Text style={tw`text-white font-montserrat-500`}>
                            {isLoading ? "Saving..." : "Save Reward"}
                        </Text>
                    </TouchableOpacity>
                </ScrollView>
            </KeyboardAvoidingView>
        </View>
    );
};

export default AddReward;
