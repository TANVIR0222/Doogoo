import { ProgressProps } from '@/src/constants/type';
import tw from '@/src/lib/tailwind';
import React from 'react';
import { View } from 'react-native';

const ProgressBar = ({ progress, color, height }: ProgressProps) => {
    return (
        <View style={tw` w-full bg-[#f2f2f2] rounded-full overflow-hidden`}>
            <View
                style={[
                    tw`h-full rounded-full`,
                    {
                        width: `${progress}%`,
                        backgroundColor: color, // ✅ use color directly
                        height: height
                    },
                ]}
            />
        </View>
    );
};

export default ProgressBar;
