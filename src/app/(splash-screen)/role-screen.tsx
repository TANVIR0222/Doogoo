import { IconsLeftSArrowBlack } from '@/assets/icons'
import { storage } from '@/src/lib/mmkv_store'
import tw from '@/src/lib/tailwind'
import { router } from 'expo-router'
import React, { useEffect, useState } from 'react'
import { Image, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

export default function RoleScreen() {
    const [selectedRole, setSelectedRole] = useState<'USER' | 'PARTNER' | null>(null);

    // local storage set role and navigate to auth screen
    useEffect(() => {
        if (selectedRole) {
            storage.set('role', selectedRole);
            router.push('/(auth)');
        }
    }, [selectedRole]);

    return (

        <View style={tw`flex-1 bg-yellowGreen justify-center items-center px-5`}>

            {/* ----------------- back botton------------------------- */}
            <View style={tw` absolute  top-14 left-8 `}>
                <TouchableOpacity style={tw` `} onPress={() => router.replace('/(splash-screen)/splash-screen-one')} >
                    <SvgXml xml={IconsLeftSArrowBlack} />
                </TouchableOpacity>
            </View>

            <Text style={tw`text-center text-blackish text-3xl font-montserrat-700 mb-12`}>
                Select Your Role
            </Text>

            <View style={tw`w-full`}>
                {/* === USER CARD === */}
                <Pressable
                    onPress={() => setSelectedRole('USER')}
                    style={tw`flex-row items-center  h-32 p-4 mb-4 rounded-xl bg-[#AAAE52] border-2 ${selectedRole === 'USER' ? 'border-black' : 'border-transparent'
                        }`}
                >
                    <View style={tw` rounded-full justify-center items-center mr-4`}>
                        <Image source={require('@/assets/images/user-1.png')} style={tw`w-17 h-17`} />
                    </View>
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-blackish text-xl font-montserrat-700`}>User</Text>
                        <Text style={tw`font-montserrat-500 text-sm text-[#2C2C2C]`}>
                            Track your habits, join group challenges, earn points, and redeem them for rewards.
                        </Text>
                    </View>
                </Pressable>

                {/* === REWARD PARTNER CARD === */}
                <Pressable
                    onPress={() => setSelectedRole('PARTNER')}
                    style={tw`flex-row items-center h-32 p-4 mb-4 rounded-xl bg-[#AAAE52] border-2 ${selectedRole === 'PARTNER' ? 'border-black' : 'border-transparent'
                        }`}
                >
                    <View style={tw`  justify-center items-center mr-4`}>
                        <Image source={require('@/assets/images/user-2.png')} style={tw`w-17 h-17`} />
                    </View>
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-blackish text-xl font-montserrat-700`}>Reward Partner</Text>
                        <Text style={tw`font-montserrat-500 text-sm text-[#2C2C2C]`}>
                            Advertise your business for free. Offer rewards.
                        </Text>
                    </View>
                </Pressable>
            </View>

        </View>
    )
}
