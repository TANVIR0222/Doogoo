import Report from '@/src/components/ui/Report'
import { LogProgressTab } from '@/src/constants/tabs'
import tw from '@/src/lib/tailwind'
import { useLocalSearchParams } from 'expo-router'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import HabitGrid from '../../components/ui/MembersView'

const LogProgress = () => {
    const [activeTab, setActiveTab] = useState<string>('all')
    const { id } = useLocalSearchParams<{ id: string }>()


    return (
        <View style={tw`flex-1 bg-white  pt-4`}>

            {/* Tabs */}
            <View style={tw`flex-row `}>
                {LogProgressTab.map((tab) => {
                    const isActive = activeTab === tab?.key
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
                                    tw`text-sm font-montserrat-400`,
                                    isActive ? tw`text-blackText font-montserrat-600` : tw`text-blackText`,
                                ]}
                            >
                                {tab?.label}
                            </Text>
                        </TouchableOpacity>
                    )
                })}
            </View>

            {/* Content */}
            <View style={tw`flex-1`}>
                {activeTab === 'all' ? <HabitGrid id={id} /> : <Report id={id} />}
            </View>
        </View>
    )
}

export default LogProgress
