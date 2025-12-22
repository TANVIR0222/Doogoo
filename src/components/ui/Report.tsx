import { ViewTABS } from '@/src/constants/tabs';
import tw from '@/src/lib/tailwind';
import { _width } from '@/src/utils/utils';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import DailySummaries from './DailySummaries';
import OverallProgressCard from './OverallProgress';

const Report = ({ id }: { id: string }) => {
    const [activeTab, setActiveTab] = useState<string>('all');

    return (
        <View style={tw`bg-primaryBg flex-1`} >
            <View style={tw`bg-primaryBg flex-1`} >

                {/* -------  */}
                <View style={tw`flex-row py-2`}>
                    {ViewTABS.map((tab) => {
                        const isActive = activeTab === tab?.key;
                        return (
                            <TouchableOpacity
                                key={tab.key}
                                onPress={() => setActiveTab(tab?.key)}
                                style={[
                                    tw`flex-1 py-3 items-center border-b-2`,
                                    isActive ? tw`border-blackish` : tw`border-transparent`,
                                ]}
                            >
                                <Text
                                    style={[
                                        tw` font-montserrat-400`,
                                        isActive ? tw`text-blackish    font-montserrat-700` : tw`text-blackText`, {
                                            fontSize: _width < 375 ? 12 : 14,
                                        }
                                    ]}
                                >
                                    {tab.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>




                <View style={tw`flex-1`}>
                    {
                        activeTab === 'all' ? <DailySummaries id={id} /> : <OverallProgressCard id={id} />
                    }
                </View>

            </View>
        </View>
    )
}

export default Report