import tw from "@/src/lib/tailwind";
import { useGetAllHabitTrackingBarChartQuery } from "@/src/redux/advanceFeaturesApi/advanceFeaturesApi";
import React, { useMemo } from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";

const HabitCompletionRateGraph = () => {
    const { data: monthsData } = useGetAllHabitTrackingBarChartQuery();

    console.log('-------------', monthsData);

    const spacingValue = 40;


    const data = useMemo(() => {
        return monthsData?.data?.data.map((data) => {
            const value = data?.completed_count ?? 0;
            // console.log(value);


            return {
                value,
                labelComponent: () => (
                    <Text style={{ color: "gray", fontSize: 10, marginLeft: 15 }}>
                        {data?.month.slice(0, 3)}
                    </Text>
                ),
                // dataPointText: `${value}`,
            };
        }) || [];
    }, [monthsData]);

    return (
        <View style={{ backgroundColor: "#fff", paddingVertical: 10, }}>
            <View>
                <Text
                    style={tw`text-lg font-montserrat-700 text-blackText mb-2 text-center`}
                >
                    Monthly Habit Tracking
                </Text>
                {/* <Text
                    style={[tw`text-sm font-montserrat-600 text-blackText mb-4 text-center`]}
                >
                    Your yearly habit track over the last month
                </Text> */}
            </View>

            <LineChart
                data={data}
                areaChart
                height={250}
                thickness={2}
                showVerticalLines
                initialSpacing={0}
                spacing={spacingValue}
                xAxisLength={data?.length * spacingValue}

                noOfSections={Math.ceil(((monthsData?.data?.max_completed_count || 10)) / 5)}
                maxValue={monthsData?.data?.max_completed_count + 5 || 10}
                // dataPointsHeight={6}
                // dataPointsWidth={6}
                color="#07BAD1"
                startOpacity={0.8}
                endOpacity={0.3}
                startFillColor1="skyblue"
                startFillColor2="orange"

                xAxisColor="lightgray"
                yAxisColor="lightgray"
            // hideDataPoints
            />


            {/* </ScrollView> */}
        </View>
    );
};

export default HabitCompletionRateGraph;