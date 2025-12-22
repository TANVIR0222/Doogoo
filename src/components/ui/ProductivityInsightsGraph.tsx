import tw from '@/src/lib/tailwind';
import { useGetAllSayNoBarChartQuery } from '@/src/redux/advanceFeaturesApi/advanceFeaturesApi';
import React from 'react';
import { Text, View } from 'react-native';
import { BarChart } from 'react-native-gifted-charts';

const ProductivityInsightsGraph = () => {
    const { data: chartData } = useGetAllSayNoBarChartQuery();
    // console.log(chartData);


    const progressColors = [
        '#4ABFF4',
        '#79C3DB',
        '#28B2B3',
        '#4ADDBA',
        '#91E3E3',
    ];

    const barData = chartData?.data?.data?.map((item, index) => ({
        value: item.total_say_no || 0, // default to 0
        label: item.month?.slice(0, 3),
        frontColor: progressColors[index % progressColors.length],
    })) || [];

    return (
        <View style={tw`flex-1 px-2`}>
            <View>
                <Text style={tw`text-lg font-montserrat-700 text-blackText mb-2 text-center`}>
                    Say No
                </Text>
                {/* <Text style={tw`text-sm font-montserrat-600 text-blackText mb-4 text-center`}>
                    Your most say no times this yearly
                </Text> */}
            </View>
            <BarChart
                showYAxisIndices
                noOfSections={Math.round((chartData?.data?.max_total_say_no || 10) / 4)}
                maxValue={chartData?.data?.max_total_say_no + 5 || 10}
                data={barData}
                height={250}
                isAnimated
                animationDuration={1500}
                yAxisColor={tw.color('gray')}
                xAxisColor={tw.color('gray')}
                yAxisTextStyle={tw`text-blackish`}
                xAxisLabelTextStyle={tw`text-blackish text-xs`}
                spacing={20}
                barWidth={15}
                roundedTop
                initialSpacing={10}
                yAxisOffset={0}
                renderTooltip={(item: any) => (
                    <View style={tw`bg-gray px-2 py-1 rounded`}>
                        <Text style={tw`text-white text-xs`}>{item?.value}</Text>
                    </View>
                )}
            />
        </View>
    );
};

export default ProductivityInsightsGraph;
