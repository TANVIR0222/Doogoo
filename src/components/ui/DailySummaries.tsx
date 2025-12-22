import { IconsGreenTick, IconsRounded } from '@/assets/icons';
import tw from '@/src/lib/tailwind';
import { useGetDailyGroupSammaryQuery } from '@/src/redux/groupApi/groupApi';
import { _width, formatDateConvertToDat } from '@/src/utils/utils';
import { router } from 'expo-router';
import React from 'react';
import { RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import GlobalLoading from '../GlobalLoading';

interface DailySummariesProps {
    id: string;
}

const DailySummaries: React.FC<DailySummariesProps> = ({ id }) => {

    const { data, isLoading, refetch: handleRefresh, isFetching: refreshing } = useGetDailyGroupSammaryQuery({ id: id });



    return isLoading ? <GlobalLoading /> : (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
                paddingHorizontal: 10,
                paddingTop: 15,
                paddingBottom: 20,
            }}
            refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#D6DF22" colors={['#D6DF22']} />
            }
        >
            {/* Total Points */}
            <View style={tw`flex-row pb-3 items-center justify-between`}>
                <Text style={[tw` text-blackText font-montserrat-500`, { fontSize: _width < 375 ? 14 : 16 }]}>
                    Total Points Achieved: {data?.data?.my_achieved_point}
                </Text>
            </View>

            {/* Daily Summaries */}
            {data?.data?.summaries.map((item: any, index: number) => (
                <View
                    key={index}
                    style={tw`bg-white rounded-xl px-3 py-3.5 mb-4 shadow-md shadow-blackish`}
                >
                    {/* Header */}
                    <View style={tw`flex-row justify-between items-center mb-2`}>
                        <View style={tw`flex-1`}>
                            <Text style={[tw`text-blackish font-montserrat-600`, { fontSize: _width < 375 ? 13 : 16 }]}>
                                {formatDateConvertToDat(item?.date)}
                            </Text>
                            <Text style={[tw`text-gray font-montserrat-400`, { fontSize: _width < 375 ? 11 : 12 }]}>
                                Day {item?.day}
                            </Text>
                        </View>
                        <Text style={[tw`text-gray text-sm font-montserrat-400`, { fontSize: _width < 375 ? 12 : 16 }]}>
                            Group Completion{' '}
                            <Text style={tw`font-montserrat-700  text-blackish`}>
                                {item?.group_completion}%
                            </Text>
                        </Text>
                    </View>

                    {/* Members */}
                    {item?.members
                        ?.filter((_: any, memIndex: number) => memIndex < 2)
                        .map((member: any, memIndex: number) => (
                            <View
                                key={memIndex}
                                style={tw`${memIndex > 0 ? 'border-t border-gray' : ''} py-2`}
                            >
                                <View style={tw`flex-row justify-between items-center`}>
                                    <Text style={[tw`text-blackish font-montserrat-500`, { fontSize: _width < 375 ? 12 : 16 }]}>
                                        {member?.user_name}
                                        {memIndex === 0 ? ' (You)' : ''}
                                    </Text>
                                    <View style={tw`flex-row items-center`}>
                                        {member?.status
                                            ?.slice(-5)
                                            .map((s: string, i: number) => renderCheck(s === 'Completed'))}
                                        <Text style={tw`ml-2 text-blackish font-montserrat-700`}>
                                            {member?.progress}%
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        ))}


                    {/* See More Button */}
                    <TouchableOpacity
                        style={tw`bg-blackish px-3 py-1.5 rounded self-end mt-1`}
                        onPress={() => router.push({
                            pathname: '/group-completion',
                            params: { id: id, day: item?.day },
                        })}
                    >
                        <Text style={tw`text-white font-montserrat-400 text-sm`}>
                            See more
                        </Text>
                    </TouchableOpacity>
                </View>
            ))}
        </ScrollView>

    );
};

const renderCheck = (completed: boolean) => (
    <View style={tw`mx-0.5`}>
        {completed ? (
            <SvgXml xml={IconsGreenTick} />
        ) : (
            <SvgXml xml={IconsRounded} />
        )}
    </View>
);

export default DailySummaries;
