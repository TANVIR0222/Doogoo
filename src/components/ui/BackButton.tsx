import { IconsLeftArrowBlack } from '@/assets/icons'
import tw from '@/src/lib/tailwind'
import { router } from 'expo-router'
import React from 'react'
import { TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const BackButton = () => {
    return (
        <View style={tw`relative`}>
            <TouchableOpacity style={tw`absolute top-14`} onPress={() => router.back()} >
                <SvgXml xml={IconsLeftArrowBlack} />
            </TouchableOpacity>
        </View>
    )
}

export default BackButton