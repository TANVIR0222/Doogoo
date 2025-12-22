import { IconFire, IconsStar, IconsTick } from '@/assets/icons'
import tw from '@/src/lib/tailwind'
import { router } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import JoinChallengeModal from './JoinChallengeModal'
import ProgressBar from './ProgressBar'

const AllHAbits = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);

    return (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
            paddingHorizontal: 12,
            paddingTop: 10
        }} >
            {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                // TODO 
                <TouchableOpacity onPress={() => item % 2 === 0 && router.push('/payment-procedure')} key={item} style={tw`bg-white border-l-4 border-[#BCBDC0] rounded-lg p-3 shadow-md mb-4`} >
                    <View style={tw`flex-col gap-2`}>
                        <View style={tw`flex-col gap-1`}>
                            <View style={tw`flex-row items-center justify-between`}>
                                <View style={tw`flex-row items-center gap-2`}>
                                    <Text style={tw`text-blackish font-montserrat-700 text-base`}>Morning Run</Text>
                                    {
                                        item % 2 === 0 && <SvgXml xml={IconsStar} />
                                    }
                                </View>
                                <View style={tw`flex-row items-center gap-3`}>
                                    <View style={tw`px-2.4 py-1 bg-yellowGreen rounded flex-row justify-center items-center gap-2.5`}>
                                        <Text style={tw`text-blackish text-xs font-semibold font-montserrat-600`}>Health</Text>
                                    </View>
                                    <View style={tw`px-2.4 py-1 bg-[#716557] rounded flex-row justify-center items-center gap-2.5`}>
                                        <Text style={tw`text-white text-xs font-semibold font-montserrat-400`}>+15 pts</Text>
                                    </View>

                                </View>
                            </View>
                            <View style={tw`flex-col gap-2`}>
                                <View style={tw`flex-col gap-1`}>
                                    <Text style={tw`text-xs font-montserrat-400`}>(Sunshine Cafe)</Text>
                                    <Text style={tw`text-xs font-montserrat-400`}>Enjoy a free coffee when you redeem your reward points.</Text>
                                </View>
                                <View style={tw`flex-row items-center`}>
                                    <SvgXml xml={IconFire} />
                                    <Text style={tw`text-xs font-montserrat-300`}>7 days streak</Text>
                                </View>
                            </View>
                        </View>

                        <View style={tw`flex-col gap-3`}>
                            <ProgressBar height={7} progress={item * 10} color={'#D6DF22'} />
                            <View style={tw`flex-row items-center justify-between`}>
                                {
                                    item % 2 === 0 ? <View style={tw` px-2.4 py-1 bg-blackish rounded flex-row justify-center items-center gap-2.5`}>
                                        <Text style={tw`text-white text-xs font-semibold font-montserrat-400`}>Processing</Text>
                                    </View>
                                        : <TouchableOpacity onPress={() => setModalVisible(!modalVisible)} style={tw` px-2.4 py-1 bg-blackish rounded flex-row justify-center items-center gap-2.5`}>
                                            <Text style={tw`text-white text-xs font-semibold font-montserrat-400`}>join Challenge</Text>
                                        </TouchableOpacity>
                                }
                                <View style={tw`flex-row items-center gap-1`}>
                                    <View style={tw`flex-row items-center gap-1`}>
                                        <Text><SvgXml xml={IconsTick} /></Text>
                                        <Text style={tw`text-xs font-montserrat-300 text-neutral-700`}>9 / 9</Text>
                                    </View>
                                    <Text style={tw`text-xs font-montserrat-300 text-neutral-700`}>%</Text>
                                    <Text style={tw`text-xs font-montserrat-300 text-neutral-700`}>100%</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            <JoinChallengeModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

        </ScrollView>

    )
}



export default AllHAbits