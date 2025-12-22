import { IconsRightArrow } from '@/assets/icons';
import Wrapper from '@/src/components/Wrapper';
import tw from '@/src/lib/tailwind';
import { router } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

export default function SplashScreen() {
    return (
        <View style={tw`flex-1 bg-yellowGreen`}>
            <Wrapper>
                <View style={tw`flex-1 items-center justify-center`}>
                    {/* Logo */}
                    <Image
                        source={require('@/assets/images/splash-icon.png')}
                        style={tw`w-48 h-48 rounded-2xl mt-[25%]`}
                    />

                    {/* Heading */}
                    <Text style={tw`mt-10 text-2xl  text-blackish font-montserrat-700 `}>
                        Welcome to DooGoo
                    </Text>

                    {/* Subheading */}
                    <Text style={tw`mt-3 text-center  text-blackish text-sm font-montserrat-600 `}>
                        Build better habits and transform your life one day at a time
                    </Text>

                    {/* Get Started Button */}
                    <TouchableOpacity
                        style={tw`mt-10 w-full h-12 bg-blackish rounded-2xl flex-row items-center justify-center`}
                        onPress={() => router.push('/(splash-screen)/splash-screen-one')}
                    >
                        <Text style={tw`text-yellowGreen text-base mr-2 font-semibold`}>
                            Get Started
                        </Text>
                        <SvgXml xml={IconsRightArrow} />
                    </TouchableOpacity>
                </View>
            </Wrapper>
        </View>
    );
}
