import React from "react";
import { Text, View } from "react-native";
import { LineChart } from "react-native-gifted-charts";
import tw from "twrnc";

const MoodTrackingGraph = () => {
    const months = [
        "Jan", "Feb", "Mar", "Apr", "May", "Jun",
        "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];

    const data = months.map((month) => ({
        value: Math.floor(Math.random() * 70),
        label: month,
    }));

    return (
        <View>
            {/* Title and Subtitle */}
            <View>
                <Text style={tw`text-lg font-montserrat-700 text-blackText mb-2 text-center`}>
                    Monthly Mood Track
                </Text>
                {/* <Text style={tw`text-sm font-montserrat-600 text-blackText mb-4 text-center`}>
                    Your mood patterns over the year
                </Text> */}
            </View>

            {/* Chart */}
            <View style={tw`py-5`}>
                <LineChart
                    data={data}
                    height={200}
                    width={350}
                    yAxisLabelPrefix=""
                    yAxisLabelSuffix=""
                    xAxisLabelTextStyle={{ color: "#000", fontSize: 12, fontWeight: "600" }}
                    yAxisTextStyle={{ color: "#000", fontSize: 12, fontWeight: "600" }}
                    color="#1E90FF"
                    thickness={3}
                    yAxisRange={{ min: 0, max: 100, step: 20 }}
                    showGridLines
                    curved
                    dataPointsColor="#1E90FF"
                    dataPointsRadius={5}
                    startFillColor="rgba(30,144,255,0.1)"
                    endFillColor="rgba(30,144,255,0)"
                    noOfSections={5}
                    maxValue={100}
                    initialSpacing={20}
                    spacing={30}
                    endSpacing={10}
                    renderTooltip={(item: any) => (
                        <View style={tw`bg-[#1E90FF] px-2 py-1 rounded-md`}>
                            <Text style={tw`text-white text-xs font-semibold`}>
                                {item.label}: {item.value}%
                            </Text>
                        </View>
                    )}
                />
            </View>
        </View>
    );
};

export default MoodTrackingGraph;
