import React from 'react'
import { ActivityIndicator, View } from 'react-native'
import tw from '../lib/tailwind'

const GlobalLoading = () => {
    return (
        <View style={tw`flex-1 bg-primaryBg items-center justify-center `}>
            <ActivityIndicator size="large" color="#D6DF22" />
        </View>

    )
}

export default GlobalLoading