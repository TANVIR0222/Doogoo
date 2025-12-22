
import { IconsLeftArrowBlack, IconsRightArrowBlack, ImageTow } from '@/assets/icons';
import Wrapper from '@/src/components/Wrapper';
import tw from '@/src/lib/tailwind';
import { router } from 'expo-router';
import React from 'react';
import { ImageBackground, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

export default function SplashScreenTow() {
    return (
        <ImageBackground
            source={require('@/assets/images/splash-screen-2.png')}
            style={tw`w-full h-full`}
        >
            <View style={tw`flex-1`}>
                <Wrapper>
                    <View style={tw`flex-1 flex-col justify-around items-center p-[4%]`}>
                        {/* ----------------- back botton------------------------- */}
                        <View style={tw` absolute  top-14 left-0 `}>
                            <TouchableOpacity style={tw` `} onPress={() => router.back()} >
                                <SvgXml xml={IconsLeftArrowBlack} />
                            </TouchableOpacity>
                        </View>
                        <View>
                            <SvgXml xml={ImageTow} />
                        </View>

                        <View style={tw` w-full flex-col gap-10 justify-center items-center`}>
                            {/* Main quote */}
                            <Text style={[
                                tw`text-center text-yellowGreen text-3xl font-montserrat-700`,
                                {
                                    textShadowColor: '#000',
                                    textShadowOffset: { width: -1, height: 1 },
                                    textShadowRadius: 10,
                                },
                            ]}>
                                Group challenges graduate your dreams
                            </Text>

                            {/* Progress Dots */}
                            <View style={tw`flex-row gap-2`}>
                                <View style={tw`w-3 h-2 bg-[#D9D9D9] rounded-full`} />
                                <View style={tw`w-4 h-2 bg-yellowGreen rounded-[17px]`} />
                                <View style={tw`w-3 h-2 bg-[#D9D9D9] rounded-full`} />
                            </View>

                            <View style={tw`  w-[100%] `} >
                                {/* Get Started Button */}
                                <TouchableOpacity
                                    style={tw` w-[100%] flex-row items-center gap-3 justify-center py-3 bg-yellowGreen rounded-2xl `}
                                    onPress={() => router.push('/(splash-screen)/splash-screen-three')}
                                >
                                    <Text style={tw`text-blackish  text-base font-montserrat-700 `}>
                                        Join a Challenge
                                    </Text>
                                    <SvgXml xml={IconsRightArrowBlack} />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Wrapper>
            </View>
        </ImageBackground>
    );
}