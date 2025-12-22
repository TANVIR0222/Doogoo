import HeadingTop from '@/src/components/ui/HeadingTop'
import ProgressBar from '@/src/components/ui/ProgressBar'
import Wrapper from '@/src/components/Wrapper'
import tw from '@/src/lib/tailwind'
import { useGetDailyGroupSammaryQuery } from '@/src/redux/groupApi/groupApi'
import { formatDateConvertToDat } from '@/src/utils/utils'
import { useLocalSearchParams } from 'expo-router'
import React from 'react'
import { ScrollView, Text, TouchableOpacity, View } from 'react-native'

export default function GroupCompletion() {

    const { id, day } = useLocalSearchParams<{ id: string, day: string }>();

    // create rtk post data 


    const { data, isLoading } = useGetDailyGroupSammaryQuery({ id: id, day });

    console.log(data);







    return (
        <View style={tw`bg-primaryBg flex-1`}>
            <HeadingTop />

            {/*  */}
            <Wrapper>
                <View style={tw`flex-row justify-between items-center py-2`}>
                    <View style={tw`flex-1`}>
                        <Text style={tw`text-blackish font-montserrat-600 text-base`}>
                            {formatDateConvertToDat(data?.data?.summaries[0].date)}
                        </Text>
                        <Text style={tw`text-gray text-xs font-montserrat-400`}>
                            Day {data?.data?.summaries[0].day}
                        </Text>
                    </View>
                    <Text style={tw`text-gray text-sm font-montserrat-400`}>
                        Group Completion{' '}
                        <Text style={tw`font-montserrat-700 text-blackish`}>{data?.data?.summaries[0]?.group_completion}%</Text>
                    </Text>

                </View>
                <View style={tw`flex-col gap-1 border-b border-[#A5A5A5] pb-3`} />

                {/* User: Lara Croft */}
                <View style={tw` flex-row justify-between `}>
                    <View style={tw`  `} >
                        <Text style={tw`text-blackish font-montserrat-700 py-5 text-base`}>
                            Name
                        </Text>
                        {/* Name  */}

                    </View>
                    <View style={tw`  `}>
                        <Text style={tw`text-blackish font-montserrat-700 py-5 text-base`}>
                            Progress
                        </Text>

                    </View>
                    <View style={tw`  `}>
                        <Text style={tw`text-blackish font-montserrat-700 py-5 text-base`}>
                            Rate
                        </Text>

                    </View>
                </View>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={tw`pb-8`}
                >

                    {data?.data?.summaries?.map((summary: any, summaryIndex: any) => (
                        summary?.members?.map((member: any, memberIndex: any) => (
                            <TouchableOpacity
                                key={`${summaryIndex}-${memberIndex}`}
                                style={tw`flex-row justify-between items-center py-2`}
                            >
                                {/* Left Side: Name */}
                                <View style={tw`w-[20%]`}>
                                    <Text style={tw`text-blackish font-montserrat-600 text-base`}>
                                        {memberIndex === 0 ? "You" : member?.user_name.split(" ")[0]}
                                    </Text>
                                </View>

                                {/* Middle: Progress Bar */}
                                <View style={tw`w-[65%]`}>
                                    <ProgressBar
                                        progress={member?.progress}
                                        height={8}
                                        color={'#D6DF22'}
                                    />
                                </View>

                                {/* Right Side: Percentage */}
                                <View style={tw`w-[15%] items-end`}>
                                    <Text style={tw`text-blackish font-montserrat-600 text-base`}>
                                        {member?.progress}%
                                    </Text>
                                </View>
                            </TouchableOpacity>
                        ))
                    ))}

                </ScrollView>


            </Wrapper>
        </View>
    )
}