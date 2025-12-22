import { IconLooc, IconSubcriptionsTick } from '@/assets/icons';
import { router } from 'expo-router';
import React from 'react';
import { Platform, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import tw from '../lib/tailwind';


const PremiumUnlockModal: React.FC = () => {

    const features = [
        'Access all exclusive habits',
        'Enjoy an Add-Free experience ',
        'Unlimited habits tracking',
        'Premium rewards (earn point 2x)',
    ];

    // Helper component for the checkmark list item
    const FeatureItem = ({ text }: { text: string }) => (
        <View style={tw`flex-row items-center my-1`}>
            {/* Re-added the check icon style based on the image's appearance */}
            <View style={tw`mr-3`}>
                <SvgXml xml={IconSubcriptionsTick} />
            </View>

            {/* Changed color from generic 'text-gray' to 'text-gray-700' for better contrast */}
            <Text style={tw`text-base text-black`}>{text}</Text>
        </View>
    );

    const handleGoPremium = () => {
        //  Navigate to the subscription screen
        router.push('/(tab)/profile');

        //  Conditionally go back on iOS only
        if (Platform.OS === 'ios') {
            // This is typically done if the modal/paywall was opened 
            // as a layer over the profile tab, and you want to close that layer.
            router.back();
        }
    };

    const handleMaybeLater = () => {
        router.back();
    };



    return (
        <Pressable
            onPress={handleMaybeLater}
            style={tw`flex-1 bg-black/50 items-center justify-center`}
        >
            <View
                style={tw`w-[90%] bg-white rounded-3xl overflow-hidden p-6 shadow-xl`}
            >

                <TouchableOpacity
                    onPress={handleMaybeLater}
                    style={tw`absolute top-4 right-4 z-10 p-2`}
                >

                    <Text style={tw`text-gray text-2xl`}>✕</Text>
                </TouchableOpacity>

                <View style={tw`items-center mb-6 mt-4`}>
                    <View style={tw`bg-gray p-4 rounded-full w-16 h-16 justify-center items-center`}>
                        <SvgXml xml={IconLooc} />
                    </View>
                </View>

                {/* Header Text */}
                <Text style={tw`text-xl font-montserrat-700 text-black text-center mb-2`}>
                    Unlock This Habit
                </Text>
                <Text style={tw`text-sm text-blackish text-center mb-6 px-2`}>
                    Want this? This exclusive event is part of our Premium plan.
                </Text>

                <View style={tw`mb-8 self-center w-full max-w-xs`}>
                    {features.map((feature, index) => (
                        <FeatureItem key={index} text={feature} />
                    ))}
                </View>

                <TouchableOpacity
                    onPress={handleGoPremium}
                    style={tw`bg-blackish py-3 rounded-xl mb-4 w-full`}
                >
                    <Text style={tw`text-white text-sm font-montserrat-600 text-center`}>
                        Go Premium
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    onPress={handleMaybeLater}
                    style={tw`py-2 w-full`}
                >
                    <Text style={tw`text-gray text-sm font-montserrat-600 text-center`}>
                        Maybe Later
                    </Text>
                </TouchableOpacity>

            </View>
        </Pressable>
    );
};

export default PremiumUnlockModal;