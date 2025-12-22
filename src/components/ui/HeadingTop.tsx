import { IconsBackArrow } from '@/assets/icons'
import tw from '@/src/lib/tailwind'
import { useGetAdvanceUserDataQuery } from '@/src/redux/advanceFeaturesApi/advanceFeaturesApi'
import { router, usePathname } from 'expo-router'
import React from 'react'
import { Image, Platform, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const HeadingTop = () => {

    const { data: advanceData } = useGetAdvanceUserDataQuery();
    const pathname = usePathname();

    return (
        <View style={[tw`relative flex-row justify-center items-center pb-3 ${Platform.OS === 'ios' ? 'pt-12' : 'pt-7'} bg-yellowGreen`]}>
            {/* Back Icon - Left Side */}
            <TouchableOpacity
                style={tw`absolute bottom-1/2  z-30 left-4`}
                onPress={() =>
                    router.back()
                }
            >
                {pathname === '/' ? "" : <SvgXml xml={IconsBackArrow} />}
            </TouchableOpacity>

            {/* Centered Content */}
            <View style={tw`items-center`}>
                {/* Logo + App name */}
                <View style={tw`flex-row items-center justify-center`}>
                    <Image
                        style={tw`w-10 h-10`}
                        source={require('@/assets/images/splash-icon.png')}
                    />
                    <Text style={tw`text-blackish font-montserrat-600 text-3xl`}>
                        DooGoo
                    </Text>
                </View>

                {/* Points */}
                {advanceData?.data?.remaining_points && <Text style={tw`text-blackish font-montserrat-600 text-xs`}>
                    {advanceData?.data?.remaining_points} points
                </Text>}
            </View>
        </View>


    )
}

export default HeadingTop