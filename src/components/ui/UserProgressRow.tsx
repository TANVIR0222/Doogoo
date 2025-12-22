import tw from '@/src/lib/tailwind';
import React from 'react';
import { Text, View } from 'react-native';
import ProgressBar from './ProgressBar';

const UserProgressRow = ({ name, progressPercent }: { name: string; progressPercent: number }) => {
    return (
        <View style={tw`flex-row justify-between items-center py-2`}>
            <View style={tw`w-[20%]`}>
                <Text style={tw`text-blackish font-montserrat-600 text-base`}>{name.substring(0, 5)}</Text>
            </View>
            <View style={tw`w-[65%]`}>
                <ProgressBar progress={progressPercent} height={8} color={'#D6DF22'} />
            </View>
            <View style={tw`w-[15%] items-end`}>
                <Text style={tw`text-blackish font-montserrat-600 text-base`}>{progressPercent}%</Text>
            </View>
        </View>
    )
}

export default UserProgressRow