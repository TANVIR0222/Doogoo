import tw from "@/src/lib/tailwind";
import { useGetAllhabitsCalanderQuery } from "@/src/redux/advanceFeaturesApi/advanceFeaturesApi";
import { getDaysInMonth } from "@/src/utils/getDaysInMonth";
import { months } from "@/src/utils/HabitInfo";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useRef, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

const HabitTracker = () => {
  const today = new Date();
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());

  const days = getDaysInMonth(selectedYear, selectedMonth);
  const { data, refetch } = useGetAllhabitsCalanderQuery();
  const formattedDate = new Intl.DateTimeFormat("en-CA").format(today);

  // 🔹 Today day number (1-31)
  const currentDay = today.getDate();

  // 🔹 ScrollView ref for auto-scroll
  const scrollRef = useRef<ScrollView>(null);

  // 🔹 Auto-scroll to today's date whenever month/year/data changes
  useEffect(() => {
    const dayBoxSize = 34; // width (32px) + margin
    const xPosition = (currentDay - 1) * dayBoxSize;

    scrollRef.current?.scrollTo({
      x: xPosition,
      animated: true,
    });
  }, [selectedMonth, selectedYear, data]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch])
  );

  return (
    <View style={tw`flex-1`}>
      {/* Year Selector */}
      <View style={tw`flex-row justify-between items-center mb-4`}>
        <Pressable onPress={() => setSelectedYear((prev) => prev - 1)}>
          <Text style={tw`text-yellowGreen text-lg`}>◀</Text>
        </Pressable>
        <Text style={tw`text-lg font-montserrat-700`}>{selectedYear}</Text>
        <Pressable onPress={() => setSelectedYear((prev) => prev + 1)}>
          <Text style={tw`text-yellowGreen text-lg`}>▶</Text>
        </Pressable>
      </View>

      {/* Month Selector */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={tw`mb-4`}
      >
        {months.map((month, i) => (
          <Pressable
            key={i}
            onPress={() => setSelectedMonth(i)}
            style={tw`px-2 py-2 rounded-full mx-1 ${selectedMonth === i ? "bg-yellowGreen" : "bg-[#E5E7EB]"
              }`}
          >
            <Text
              style={tw`${selectedMonth === i ? "text-white" : "text-blackText"
                } text-sm font-montserrat-600`}
            >
              {month}
            </Text>
          </Pressable>
        ))}
      </ScrollView>

      <View style={tw`flex-row`}>
        {/* LEFT FIXED COLUMN */}
        <View>
          {/* Empty top space */}
          <View style={tw`w-24 h-8`} />

          {/* Habit names */}
          {data?.data?.result?.map((habit, index) => (
            <View key={index} style={tw`w-24 h-8 justify-center mb-2`}>
              <Text style={tw`text-xs text-black font-montserrat-600`}>
                {habit?.habit_name || "Habit"}
              </Text>
            </View>
          ))}
        </View>

        {/* RIGHT SIDE SCROLLABLE DAYS */}
        <ScrollView
          horizontal
          ref={scrollRef} //  Auto-scroll attached
          showsHorizontalScrollIndicator={false}
        >
          <View style={tw`flex-col`}>
            {/* Day Header */}
            <View style={tw`flex-row mb-2`}>
              {days.map((day, index) => (
                <View
                  key={index}
                  style={tw`w-8 h-8 mx-[1.2px] items-center justify-center`}
                >
                  <Text style={tw`text-xs text-black font-montserrat-600`}>
                    {day}
                  </Text>
                </View>
              ))}
            </View>

            {/* Habit Rows */}
            {data?.data?.result?.map((habit, habitIndex) => (
              <View key={habitIndex} style={tw`flex-row mb-2`}>
                {days.map((_, dayIndex) => {
                  const dayData = habit?.calendar?.[dayIndex];

                  if (!dayData)
                    return (
                      <View
                        key={dayIndex}
                        style={tw`w-8 h-8 mx-[1px] rounded-md bg-[#E5E7EB]`}
                      />
                    );

                  const dayDate = new Date(dayData.date);
                  const todayDate = new Date(formattedDate);

                  const isSameMonth =
                    dayDate.getFullYear() === selectedYear &&
                    dayDate.getMonth() === selectedMonth;

                  const filled =
                    isSameMonth &&
                    dayData.completed === true &&
                    dayDate.getTime() <= todayDate.getTime();

                  return (
                    <View
                      key={dayIndex}
                      style={tw.style(
                        "w-8 h-8 mx-[1px] rounded-md",
                        filled ? "bg-yellowGreen" : "bg-[#E5E7EB]"
                      )}
                    />
                  );
                })}
              </View>
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default HabitTracker;
