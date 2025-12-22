import AvailableRewardsCard from '@/src/components/ui/AvailableRewardsCard'
import RedeemHistory from '@/src/components/ui/RedeemHistory'
import { GROUPTABSReward } from '@/src/constants/tabs'
import tw from '@/src/lib/tailwind'
import { _width } from '@/src/utils/utils'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'

export default function RewardsScreen() {
    const [activeTab, setActiveTab] = useState<string>('all');

    return (
        <View style={tw`flex-1 bg-primaryBg`}>

            <View style={tw`flex-row mb-2`}>
                {GROUPTABSReward?.map((tab) => {
                    const isActive = activeTab === tab?.key;
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            onPress={() => setActiveTab(tab?.key)}
                            style={[
                                tw`flex-1 py-3 items-center border-b-2`,
                                isActive ? tw`border-blackText` : tw`border-transparent`,
                            ]}
                        >
                            <Text
                                style={[
                                    tw` font-montserrat-400`,
                                    isActive ? tw`text-blackText font-montserrat-500` : tw`text-blackText`,
                                    {
                                        fontSize: _width < 375 ? 13 : 14,
                                    }
                                ]}
                            >
                                {tab?.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* {activeTab === 'all' ? : <SearchHabite title='Redemption History ' addHeading='Rewards' />} */}

            {/* View  */}
            <View style={tw` `}>
                {activeTab === 'all' ? <AvailableRewardsCard /> : <RedeemHistory />}
            </View>
        </View>
    )
}