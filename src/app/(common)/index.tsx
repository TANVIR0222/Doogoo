import ProfileBackButton from '@/src/components/ui/ProfileBackButton'
import Wrapper from '@/src/components/Wrapper'
import tw from '@/src/lib/tailwind'
import { useUserGetProfileQuery } from '@/src/redux/authApi/authApiSlice'
import { router } from 'expo-router'
import React from 'react'
import { Dimensions, Image, Text, TouchableOpacity, View } from 'react-native'

type InfoItem = {
    label: string;
    value: string;
};




export default function MyProfile() {
    const { width } = Dimensions.get('window');


    const { data, isLoading } = useUserGetProfileQuery();

    const user_role = data?.data?.user?.role;









    return (
        <View style={tw` flex-1 bg-primaryBg  `} >
            <ProfileBackButton title='My Profile' />
            <Wrapper>
                <View style={tw` flex-1 bg-primaryBg  flex-col justify-between pb-2 `}>
                    <View style={tw`  `}>
                        <View style={tw`items-center `}>
                            {/* Profile Image */}
                            <Image
                                source={{ uri: data?.data?.user?.avatar_url }}
                                style={tw`w-24 h-24  bg-[#D9D9D9] rounded-full`}
                            />
                            {/* Custom Modal for options */}
                            {
                                user_role === 'USER' ? (

                                    <View style={tw` w-full flex-row  justify-between mt-6 `}>
                                        {/* fd */}
                                        <View style={tw` flex-col gap-2 `}>
                                            <Text
                                                style={tw` text-blackish  font-montserrat-600  text-base `}
                                            >
                                                Full Name :
                                            </Text>
                                            <Text
                                                style={tw` text-blackish  font-montserrat-600  text-base `}
                                            >
                                                Email:
                                            </Text>
                                            <Text
                                                style={tw` text-blackish   font-montserrat-600 text-base `}
                                            >
                                                Location:
                                            </Text>
                                        </View>
                                        {/* fd */}
                                        <View style={tw` flex-col gap-2 `}>
                                            <Text style={tw` text-blackish  font-montserrat-700  text-base `}>
                                                {data?.data?.user?.full_name}
                                            </Text>
                                            <Text style={tw` text-blackish  font-montserrat-700  text-base `}>
                                                {data?.data?.user?.email}
                                            </Text>
                                            <Text style={tw` text-blackish  font-montserrat-700  text-base `}>
                                                {data?.data?.user?.address || 'N/A'}
                                            </Text>
                                        </View>
                                    </View>
                                ) : (
                                    <View style={tw`w-full flex-col gap-3 mt-6`}>
                                        <View style={tw`w-full flex-row justify-start gap-2 mt-6`}>

                                            {/* Labels Section */}
                                            <View style={tw`flex-col gap-2`}>
                                                <Text style={tw`text-blackish font-montserrat-600 text-base`}>Business Name:</Text>
                                                <Text style={tw`text-blackish font-montserrat-600 text-base`}>User Name:</Text>
                                                <Text style={tw`text-blackish font-montserrat-600 text-base`}>Category:</Text>
                                                <Text style={tw`text-blackish font-montserrat-600 text-base`}>Address:</Text>
                                                <Text style={tw`text-blackish font-montserrat-600 text-base`}>Phone Number:</Text>
                                                <Text style={tw`text-blackish font-montserrat-600 text-base`}>Business Hours:</Text>
                                                <Text style={tw`text-blackish font-montserrat-600 text-base`}>Description:</Text>

                                            </View>

                                            {/* Data Section */}
                                            <View style={tw`flex-col gap-2`}>
                                                <Text style={tw`text-blackish font-montserrat-700 text-base`}>
                                                    {data?.data?.user?.profile?.business_name || 'N/A'}
                                                </Text>
                                                <Text style={tw`text-blackish font-montserrat-700 text-base`}>
                                                    {data?.data?.user?.full_name}
                                                </Text>
                                                <Text style={tw`text-blackish font-montserrat-700 text-base`}>
                                                    {data?.data?.user?.profile?.category || 'N/A'}
                                                </Text>

                                                {/* Description with dynamic height */}


                                                <Text style={tw`text-blackish font-montserrat-700 text-base`}>
                                                    {data?.data?.user?.address
                                                        ? data?.data?.user?.address.length > 30
                                                            ? data?.data?.user?.address.slice(0, 30) + "..."
                                                            : data?.data?.user?.address
                                                        : "N/A"}
                                                </Text>

                                                <Text style={tw`text-blackish font-montserrat-700 text-base`}>
                                                    {data?.data?.user?.phone_number || 'N/A'}
                                                </Text>
                                                <Text style={tw`text-blackish font-montserrat-700 text-base`}>
                                                    {data?.data?.user?.profile?.business_hours || 'N/A'}
                                                </Text>
                                                <View style={tw`w-full max-w-full`}>
                                                    <Text
                                                        style={[tw`text-blackish font-montserrat-700 text-base`, { width: width - 150 }]}
                                                        ellipsizeMode="tail"

                                                    >
                                                        {data?.data?.user?.profile?.description || 'N/A'}
                                                    </Text>
                                                </View>

                                            </View>

                                        </View>
                                    </View>


                                )
                            }

                        </View>
                    </View>
                    <View style={tw``}>
                        <TouchableOpacity
                            onPress={() =>
                                router.push('/(common)/update-profile')
                            }
                            style={tw`bg-blackish w-full p-2 rounded flex-row justify-center items-center gap-2`}
                        >
                            {/* <SvgXml xml={IconsEdit} /> */}
                            <Text style={tw`text-center text-white `}>
                                Edit Profile
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Wrapper>
        </View>
    )
}