import React from 'react'
import { ActivityIndicator, Text, TouchableOpacity, View } from 'react-native'
import tw from '../lib/tailwind'

interface ButtonProps {
    handleNavigate: () => void,
    isLoading: boolean,
    title: string
}

const MainButton = ({
    handleNavigate,
    isLoading,
    title
}: ButtonProps) => {
    return (
        <View style={tw``}>
            <TouchableOpacity
                style={tw`h-12 ${isLoading ? "bg-yellowGreen/80" : "bg-yellowGreen"} rounded-[18px] justify-center items-center my-4`}
                onPress={handleNavigate}
                disabled={isLoading}
            >
                {isLoading ? (
                    <View style={tw`flex-row items-center justify-center  gap-3`} >
                        <ActivityIndicator size="small" color="#000" />
                        <Text style={tw`text-[#3E3E3F] text-[16px] font-montserrat-700`}>
                            {title}
                        </Text>
                    </View>
                ) : (
                    <Text style={tw`text-[#3E3E3F] text-[16px] font-montserrat-700`}>
                        {title}
                    </Text>
                )}
            </TouchableOpacity>
        </View>
    )
}

export default MainButton