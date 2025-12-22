import tw from '@/src/lib/tailwind';
import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import RedemptionDetailsModal from './RedemptionDetailsModal';

const RedemptionsView = () => {
    const [viewModal, setViewModal] = React.useState<boolean>(false);
    return (
        <View>
            <ScrollView showsVerticalScrollIndicator={false} >
                <View>
                    {[1, 2, 3, 4, 5, 6, 7].map((item) => (
                        <View key={item} style={tw`bg-primaryBg rounded-lg border-l-4 border-[#d9d9d9] p-4 shadow-md mb-4`}>
                            <View style={tw`flex-row flex-1 gap-5`}>

                                <View style={tw`bg-[#d9d9d9] h-14 w-14 items-center p-4 justify-center  rounded-lg`} >
                                    <Image source={require('@/assets/images/splash-icon.png')} style={{ width: 30, height: 30 }} />
                                </View>

                                <View style={tw`flex-col   flex-1`}>
                                    <View style={tw`flex-col   justify-between gap-2`}>
                                        <View style={tw`flex-col gap-1  flex-1`}>
                                            <Text style={tw`text-blackish font-montserrat-700 text-sm  `}>Cristiano Ronaldo</Text>
                                            <Text style={tw`text-blackish font-montserrat-600 text-xs  `}>Free Coffee with Purchase</Text>
                                        </View>
                                        <View style={tw`flex-row gap-3  flex-1`}>
                                            <Text style={tw`text-blackish font-montserrat-600 text-xs  `}> 12/30/2025</Text>
                                        </View>
                                    </View>
                                    {/*  */}
                                </View>

                                <View style={tw`flex-col justify-between  `}>
                                    <Text style={tw`text-blackish font-montserrat-600 text-xs bg-blackish/20 px-2 py-1 rounded`}>
                                        Redeemed
                                    </Text>
                                    <TouchableOpacity onPress={() => setViewModal(!viewModal)} style={tw` px-2 py-1 bg-blackish rounded-lg flex-row justify-center items-center gap-2.5`}>
                                        <Text style={tw`text-primaryBg text-xs  font-montserrat-700`}>Details</Text>
                                    </TouchableOpacity>
                                </View>

                            </View>
                        </View>
                    ))}
                    <RedemptionDetailsModal props={'stor'} viewModal={viewModal} setViewModal={setViewModal} />
                </View>
            </ScrollView>
        </View>
    )
}

export default RedemptionsView