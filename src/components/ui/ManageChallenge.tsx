import { GROUP } from '@/src/constants/tabs';
import tw from '@/src/lib/tailwind';
import { _width } from '@/src/utils/utils';
import React, { useState } from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import ActiveChallenges from './ActiveChallenges';
import CompletedChallenges from './CompletedChallenges';

export default function ManageChallenge() {
    const [activeTab, setActiveTab] = useState<string>('my');

    return (
        <View style={tw`flex-1 bg-primaryBg`}>
            {/* --------------- top heading --------------- */}
            {/* <Button
                title='Show toast'
                onPress={() => showToast()}
            /> */}
            {/* -------------- tabs -------------------------- */}
            <View style={tw`flex-row mb-2`}>
                {GROUP.map((tab) => {
                    const isActive = activeTab === tab?.key;
                    return (
                        <TouchableOpacity
                            key={tab.key}
                            onPress={() => setActiveTab(tab?.key)}
                            style={[
                                tw`flex-1 py-3 items-center border-b-2`,
                                isActive ? tw`border-[#d6df22]` : tw`border-transparent`,
                            ]}
                        >
                            <Text
                                style={[
                                    tw`text-sm font-montserrat-400`,
                                    isActive ? tw`text-[#d6df22] font-montserrat-600` : tw`text-blackText`,
                                    {
                                        fontSize: _width < 375 ? 13 : 14,
                                    }
                                ]}
                            >
                                {tab.label}
                            </Text>
                        </TouchableOpacity>
                    );
                })}
            </View>

            {/* Content placeholder */}
            <View style={tw` flex-1`}>
                {
                    activeTab === 'my' ? <ActiveChallenges /> : <CompletedChallenges />
                }

            </View>
        </View>
    )
}