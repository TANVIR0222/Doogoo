import { IconDate } from '@/assets/icons';
import tw from '@/src/lib/tailwind';
import { useGetDailyGroupOverallProgreesQuery } from '@/src/redux/groupApi/groupApi';
import { _width, formatDateConvertToStringDate } from '@/src/utils/utils';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';
import { SvgXml } from 'react-native-svg';
import GlobalLoading from '../GlobalLoading';
import ProgressBar from './ProgressBar';

const OverallProgressCard = ({ id }: { id: string }) => {


    const { data, isLoading } = useGetDailyGroupOverallProgreesQuery({ id: id })

    // Progress color helper
    const getProgressColor = (progress: number) => {
        if (progress >= 80) return '#22C55E';   // Green
        if (progress >= 60) return '#BBF7D0';   // Light Green
        if (progress >= 40) return '#FDBA74';   // Light Orange
        if (progress >= 20) return '#FFA500';   // Orange
        if (progress > 0) return '#EF4444';     // Red (1-19%)
        return '#EF4444';                       // Red (0%)
    };

    // Bar data mapping
    const barData =
        data?.data?.summaries?.map((item: any) => ({
            value: item?.progress || 0,
            label: formatDateConvertToStringDate(item?.date),
            frontColor: getProgressColor(item?.progress || 0),
        })) || [];

    const font = _width < 375 ? 10 : 12

    return isLoading ? <GlobalLoading /> : (
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{
            paddingHorizontal: 16,
            paddingBottom: 8,
        }} >

            {/*  */}
            <View style={tw`bg-primaryBg rounded-xl p-5 shadow-lg shadow-blackish my-2 `}>
                {/* Header Row */}
                <View style={tw`flex-col justify-between  gap-3 `}>
                    <View style={tw`flex-row justify-between items-center `}>
                        <Text style={tw`text-blackish font-montserrat-500 text-sm`}>
                            Overall Progress
                        </Text>

                    </View>

                    <View style={tw`flex-col gap-4`}>
                        <View style={tw`flex-col gap-2`}>
                            <View style={tw`flex-row  items-center justify-between`}>
                                <Text style={tw`text-blackish font-montserrat-700 text-sm  `}>Completion Rate</Text>
                                <Text style={tw`text-blackish font-montserrat-700 text-sm `}>{data?.data?.overall_progress}%</Text>
                            </View>
                            <ProgressBar height={6} progress={data?.data?.overall_progress} color={'#D6DF22'} />
                        </View>
                    </View>

                    <View style={tw`flex-col justify-between  gap-1 `}>
                        {/* Bottom Hint */}
                        <View style={tw`flex-row items-center mt-1`}>
                            <SvgXml xml={IconDate} width={14} height={14} />
                            <Text style={tw`text-xs text-blackish ml-1 font-montserrat-400`}>
                                Day {data?.data?.current_day} of {data?.data?.total_day - 1}
                            </Text>
                        </View>
                    </View>
                </View>
            </View>


            {/* graph */}
            {/* <DailyCompletionRatesChart /> */}
            <View style={tw`bg-white shadow-lg p-4  rounded-xl  my-2`}>
                <Text style={[tw`text-blackish  font-montserrat-600 mb-4`, { fontSize: _width < 375 ? 14 : 15 }]}>
                    Parsonal Completion Rates
                </Text>

                {/* Legend */}
                <View style={tw`flex-row flex-wrap mb-4`}>
                    {[
                        { label: '80-100%', color: '#22C55E' },
                        { label: '60-70%', color: '#BBF7D0' },
                        { label: '40-50%', color: '#FDBA74' },
                        { label: '20-30%', color: '#FFA500' },
                        { label: '0-10%', color: '#EF4444' },
                    ].map((item, index) => (
                        <View key={index} style={tw`flex-row gap-1 items-center mr-2 mb-2`}>
                            <View style={[tw`w-3 h-3 `, { backgroundColor: item.color }]} />
                            <Text style={tw`text-gray text-xs`}>{item.label}</Text>
                        </View>
                    ))}
                </View>

                {/* Bar Chart */}

                <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                >
                    <BarChart
                        barWidth={25}
                        noOfSections={5}
                        maxValue={100}
                        data={barData}
                        barBorderRadius={12}
                        isAnimated
                        yAxisThickness={0}
                        xAxisThickness={0}
                        hideRules

                        // spacing adds equal left/right gap so text stays centered
                        spacing={_width < 375 ? 30 : 40}

                        // Center text + responsive width
                        xAxisLabelTextStyle={[
                            tw`  text-black text-center`,
                            { width: _width < 375 ? 40 : 50, fontSize: _width < 375 ? 10 : 12 },
                        ]}

                        yAxisTextStyle={tw`text-xs`}
                    />
                </ScrollView>





            </View>

        </ScrollView>
    );
};

export default OverallProgressCard;
