import Wrapper from '@/src/components/Wrapper'
import GetImageGallary from '@/src/components/ui/GetImageGallary'
import Location from '@/src/components/ui/Locations'
import ProfileBackButton from '@/src/components/ui/ProfileBackButton'
import tw from '@/src/lib/tailwind'
import { useUserGetProfileQuery } from '@/src/redux/authApi/authApiSlice'
import { useUserProfileUpdateMutation } from '@/src/redux/profileApi/profileApi'
import { countries } from '@/src/utils/countrydata'
import { MaterialIcons } from '@expo/vector-icons'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import {
    FlatList,
    Image,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native'


export default function UpdateProfileScreen() {
    const [image, setImage] = useState()
    const { data: userData } = useUserGetProfileQuery();
    const user_role = userData?.data?.user?.role
    const [userProfileUpdate, { isLoading }] = useUserProfileUpdateMutation();
    const [selectedCountry, setSelectedCountry] = useState(countries[1]);
    const [modalVisible, setModalVisible] = useState(false);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [filteredCountries, setFilteredCountries] = useState(countries);
    const [selectedLocation, setSelectedLocation] = useState<string | null>(null);
    const [address, setAddress] = useState<string>("");
    const [isEmpty, setIsEmpty] = useState<boolean>(false);







    const user = userData?.data?.user;



    // Track form data separately
    const [formData, setFormData] = useState({
        full_name: user?.full_name || "",
        user_name: user?.full_name || "",
        business_name: user?.profile?.business_name || "",
        category: user?.profile?.category || "",
        description: user?.profile?.description || "",
        address: user?.address || "",
        location: user?.address || "",
        phone_number: user?.phone_number || "",
        business_hours: user?.profile?.business_hours || "",

    });



    //  Auto Update Latitude, Longitude & Address
    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            address: address || user?.address,
            location: address || user?.address,
            latitude: selectedLocation?.geometry?.location?.lat || user?.latitude,
            longitude: selectedLocation?.geometry?.location?.lng || user?.longitude,
        }));
    }, [address, selectedLocation, user?.latitude, userData?.data?.longitude, user?.address, user?.longitude]);

    const handleChange = (key: string, value: string) => {
        setFormData((prev) => ({ ...prev, [key]: value }));
    };

    // submit handler
    const handleSubmit = async () => {
        try {
            const form = new FormData();

            // append all text fields
            Object.entries(formData).forEach(([key, value]) => {
                form.append(key, value);
            });

            // append image if exists
            if (image?.assets[0]?.uri) {
                const file = image.assets[0];
                form.append("avatar", {
                    uri: file.uri,
                    name: file.fileName || "avatar.jpg",
                    type: file.mimeType || "image/jpeg",
                } as any);
            }
            // send to API
            const res = await userProfileUpdate(form).unwrap();


            if (res?.status) {
                router.replace(
                    user_role === "USER"
                        ? "/(tab)/profile"
                        : "/store-manager/(tab)/profile"
                );
            }
        } catch (error) {
            console.error(" Profile update failed:", error);
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




    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{ flex: 1, backgroundColor: '#ffffff' }}
        >
            <ScrollView
                contentContainerStyle={{ flexGrow: 1, paddingBottom: user_role === 'USER' ? 10 : 100, backgroundColor: '#ffffff' }}
                keyboardShouldPersistTaps="handled"
                showsVerticalScrollIndicator={false}
            >
                {/* Header */}
                <ProfileBackButton title="Edit Profile" />

                <Wrapper>
                    <View style={tw`justify-between gap-5 py-2 flex-1`}>
                        {/* Top Section: Image & Form */}
                        <View style={tw`pb-4 flex-1`}>
                            {/* Profile Image */}
                            <View style={tw`items-center mb-6`}>
                                <View style={tw`w-20 h-20 rounded-full items-center justify-center`}>
                                    <Image
                                        source={
                                            image
                                                ? { uri: image?.assets[0].uri }
                                                : { uri: user?.avatar_url }
                                        }
                                        style={tw`w-24 h-24  bg-[#D9D9D9] rounded-full`}
                                    />

                                    <TouchableOpacity>
                                        <View
                                            style={tw`absolute bottom-0 left-2 bg-[#edd500] p-1.5 rounded-full`}
                                        >
                                            <GetImageGallary setImage={setImage} />
                                        </View>
                                    </TouchableOpacity>
                                </View>
                            </View>

                            <View style={tw`flex-col flex-1 `}>
                                {/* Form Section */}
                                {user_role === 'USER' ? (
                                    // ---------- Normal User Form ----------
                                    <View style={tw`flex-col gap-4`}>
                                        {/* Full Name Field */}
                                        <View>
                                            <Text style={tw`text-base text-[#000] font-montserrat-500 mb-2`}>
                                                Full Name
                                            </Text>
                                            <View
                                                style={tw`border-[1px] border-gray/60 px-2 py-1 flex-row items-center rounded`}
                                            >
                                                <TextInput
                                                    value={formData.full_name}
                                                    onChangeText={(text) => handleChange("full_name", text)}
                                                    placeholder={user?.full_name || "Enter your Full Name"}
                                                    placeholderTextColor="#3e3e3f"
                                                    style={tw`flex-1 h-12  mr-1`}
                                                />
                                            </View>
                                        </View>

                                        {/* Location Field */}
                                        <View>
                                            <Text style={tw`text-base text-[#000] font-montserrat-500 mb-2`}>
                                                Location
                                            </Text>
                                            <View
                                                style={tw`border border-gray/60 px-2 py-1 flex-row items-center rounded`}
                                            >
                                                <TextInput
                                                    value={formData.address}
                                                    onChangeText={(text) => handleChange("address", text)}
                                                    placeholder={user?.address || "Enter your Address"}
                                                    placeholderTextColor="#3e3e3f"
                                                    style={tw`flex-1 h-12  mr-1`}
                                                />
                                            </View>
                                        </View>
                                    </View>
                                ) : (
                                    // ---------- Business User Form ----------
                                    <View style={tw`flex-col gap-4`}>
                                        {/* Full Name */}
                                        <View>
                                            <Text style={tw`text-base text-[#000] font-montserrat-500 mb-2`}>
                                                Full Name
                                            </Text>
                                            <View
                                                style={tw`border border-gray/60 px-2 py-1 flex-row items-center rounded`}
                                            >
                                                <TextInput
                                                    value={formData.full_name}
                                                    onChangeText={(text) => handleChange("full_name", text)}
                                                    placeholder={user?.full_name || "Enter your Full Name"}
                                                    placeholderTextColor="#3e3e3f"
                                                    style={tw`flex-1 h-12 mr-1`}
                                                />
                                            </View>
                                        </View>

                                        {/* Business Name */}
                                        <View>
                                            <Text style={tw`text-base text-[#000] font-montserrat-500 mb-2`}>
                                                Business Name
                                            </Text>
                                            <View
                                                style={tw`border border-gray/60 px-2 py-1 flex-row items-center rounded`}
                                            >
                                                <TextInput
                                                    value={formData.business_name}
                                                    onChangeText={(text) => handleChange("business_name", text)}
                                                    placeholder={user?.profile?.business_name || "Enter your Business Name"}
                                                    placeholderTextColor="#3e3e3f"
                                                    style={tw`flex-1 h-12 mr-1`}
                                                />
                                            </View>
                                        </View>

                                        {/* Category */}
                                        <View>
                                            <Text style={tw`text-base text-[#000] font-montserrat-500 mb-2`}>
                                                Category
                                            </Text>
                                            <View
                                                style={tw`border border-gray/60 px-2 py-1 flex-row items-center rounded`}
                                            >
                                                <TextInput
                                                    value={formData.category}
                                                    onChangeText={(text) => handleChange("category", text)}
                                                    placeholder={user?.profile?.category || "Enter your Category"}
                                                    placeholderTextColor="#3e3e3f"
                                                    style={tw`flex-1 h-12 mr-1`}
                                                />
                                            </View>
                                        </View>

                                        {/* Description */}
                                        <View>
                                            <Text style={tw`text-base text-[#000] font-montserrat-500 mb-2`}>
                                                Description
                                            </Text>
                                            <View
                                                style={tw`border border-gray/60 px-2 py-1 flex-row items-center rounded`}
                                            >
                                                <TextInput
                                                    value={formData.description}
                                                    onChangeText={(text) => handleChange("description", text)}
                                                    placeholder={user?.profile?.description || "Enter your Description"}
                                                    placeholderTextColor="#3e3e3f"
                                                    style={tw`flex-1 h-30 mr-1`}
                                                    textAlign="left"
                                                    multiline
                                                    textAlignVertical="top"
                                                />
                                            </View>
                                        </View>

                                        {/* Location */}
                                        <Location
                                            setSelectedLocation={setSelectedLocation}
                                            setAddress={setAddress}
                                            isEmpty={isEmpty}
                                            address={user?.address || ""}
                                        />


                                        {/* Phone Number Input */}
                                        <View style={tw``}>
                                            <Text
                                                style={tw`text-base text-[#000] font-montserrat-500 mb-2`}
                                            >
                                                Phone Number
                                            </Text>
                                            <View
                                                style={tw`flex-row items-center h-14 border border-gray/60 rounded-md overflow-hidden`}
                                            >
                                                {/* Country Code Selector */}
                                                <Pressable
                                                    onPress={() => setModalVisible(true)}
                                                    style={tw`flex-row items-center px-2 h-12 border-r border-gray/60`}
                                                >
                                                    <Text
                                                        style={tw`text-base text-[#3e3e3f] font-montserrat-500`}
                                                    >
                                                        {selectedCountry?.dial_code}
                                                    </Text>
                                                    <MaterialIcons
                                                        name="arrow-drop-down"
                                                        size={20}
                                                        color="#6b7280"
                                                        style={tw`ml-1`}
                                                    />
                                                </Pressable>

                                                {/* Phone Input */}
                                                <TextInput
                                                    style={tw`flex-1 px-4 text-blackish h-12`}
                                                    keyboardType="phone-pad"
                                                    placeholderTextColor="#3e3e3f"
                                                    value={formData.phone_number}
                                                    onChangeText={(text) => handleChange("phone_number", text)}
                                                    placeholder={
                                                        user?.phone_number || "Enter your Phone Number"
                                                    }
                                                    maxLength={15}
                                                />
                                            </View>

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
                                                            <Text style={tw`text-xl font-bold text-blackish`}>
                                                                Select Country
                                                            </Text>
                                                            <Pressable onPress={() => setModalVisible(false)}>
                                                                <MaterialIcons
                                                                    name="close"
                                                                    size={24}
                                                                    color="#6b7280"
                                                                />
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
                                                        keyExtractor={(item) => item.code}
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
                                                                    <MaterialIcons
                                                                        name="check"
                                                                        size={20}
                                                                        color="#3b82f6"
                                                                    />
                                                                )}
                                                            </Pressable>
                                                        )}
                                                        ItemSeparatorComponent={() => (
                                                            <View style={tw`border-b border-gray mx-4`} />
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

                                        {/* Business Hours */}
                                        <View>
                                            <Text style={tw`text-base text-[#000] font-montserrat-500 mb-2`}>
                                                Business Hours
                                            </Text>
                                            <View
                                                style={tw`border border-gray/60 px-2 py-1 flex-row items-center rounded`}
                                            >
                                                <TextInput
                                                    value={formData.business_hours}
                                                    onChangeText={(text) => handleChange("business_hours", text)}
                                                    placeholder={user?.profile?.business_hours || "Enter your Business Hours"}
                                                    placeholderTextColor="#3e3e3f"
                                                    style={tw`flex-1 h-12 mr-1`}
                                                />
                                            </View>
                                        </View>

                                        {/* Submit Button */}
                                        {/* <TouchableOpacity
                                            onPress={handleSubmit}
                                            style={tw`bg-blackish w-full p-2 rounded flex-row justify-center items-center mt-4`}
                                        >
                                            <Text style={tw`text-white text-center`}>Save Changes</Text>
                                        </TouchableOpacity> */}
                                    </View>
                                )}
                            </View>
                        </View>

                        {/* Bottom Button */}
                        <View>
                            <TouchableOpacity
                                onPress={() => handleSubmit()}
                                disabled={isLoading}
                                style={tw`bg-blackish w-full p-2 rounded flex-row justify-center items-center gap-2`}
                            >
                                <Text style={tw`text-center text-white`}>{isLoading ? "Updating..." : "Save Changes"}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Wrapper>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}
