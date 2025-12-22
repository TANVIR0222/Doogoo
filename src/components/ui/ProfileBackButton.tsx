import { IconsProfileBack } from '@/assets/icons'
import { BackProfileProps } from '@/src/constants/type'
import tw from '@/src/lib/tailwind'
import { router } from 'expo-router'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'



const ProfileBackButton = ({ title }: BackProfileProps) => {
    return (
        <View style={tw`pt-4 pb-7 px-4`}>
            <TouchableOpacity style={tw` flex-row gap-2.5 items-center`} onPress={() => router.back()} >
                <SvgXml xml={IconsProfileBack} />
                <Text style={tw`text-xl font-montserrat-700 text-blackish `} >{title}</Text>
            </TouchableOpacity>
        </View>
    )
}

export default ProfileBackButton