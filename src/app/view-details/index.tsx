import DailySummaries from '@/src/components/ui/DailySummaries';
import HeadingTop from '@/src/components/ui/HeadingTop';
import OverallProgressCard from '@/src/components/ui/OverallProgress';
import { ViewTABS } from '@/src/constants/tabs';
import tw from '@/src/lib/tailwind';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';

export default function ViewPage() {
    const [activeTab, setActiveTab] = useState<string>('all');

    return (
        <View style={tw`bg-primaryBg flex-1`} >
            <HeadingTop />

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
                                    tw`text-sm font-montserrat-400`,
                                    isActive ? tw`text-blackish  font-montserrat-700` : tw`text-blackText`,
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
                    activeTab === 'all' ? <DailySummaries /> : <OverallProgressCard />
                }
            </View>

        </View>
    )
}