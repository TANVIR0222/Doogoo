import { IconIickWhite, IconsMan } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import { useGetTodayLogsAllUserdataGroupQuery, useGroupTaskCompletedMutation } from "@/src/redux/groupApi/groupApi";
import { makeImage } from "@/src/utils/image_converter";
import React, { useState } from "react";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";
import ConModal from "./ConModal";
const HabitGrid = ({ id }: { id: number | string }) => {

  const { data, isLoading: loading } = useGetTodayLogsAllUserdataGroupQuery({ id: id });
  const [groupTaskCompleted, { isLoading }] = useGroupTaskCompletedMutation();
  const [visivale, setvisivale] = useState<boolean>(false);
  const [con_user_id, setSetcon_user_id] = useState<number>();


  // console.log(data?.data?.habit_count);








  const handleGroupTaskCompleted = async (id: number | string) => {
    try {
      const res = await groupTaskCompleted({ id }).unwrap();
      if (res?.status) {
        (() => {
          Toast.show({
            type: "success",
            text2: " You completed the habit 🎉",
            visibilityTime: 2000,
          });
        })();

      }
    } catch (error) {

    }
  }


  return loading ? <View style={tw`flex-1 justify-center  items-center`} >
    <ActivityIndicator size="large" color="#D6DF22" />
  </View> : (
    <View style={tw`flex-1 bg-[#F9F9F9] px-[4%] `}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} >
        <View style={tw`flex-row `}>
          {/* Right Grid - Habits */}
          <ScrollView showsVerticalScrollIndicator={false}>
            < >
              {/* Habit Header Row */}
              <View
                style={tw`flex-row bg-white rounded-bl-xl rounded-br-xl  ml-32 mb-3  `}
              >
                {data?.data?.group_habits?.map((habit: any, index: number) => (
                  <View
                    key={index}
                    style={tw`w-28   items-center justify-center px-2 py-2`}
                  >
                    <SvgXml xml={IconsMan} />
                    <Text style={tw`text-sm font-bold text-black text-center`}>
                      {habit?.habit_name}
                    </Text>
                  </View>
                ))}
              </View>

              <View style={tw`flex-row  gap-4`}>
                {/* Habit Rows per Member */}
                <View style={tw`w-32   `}>
                  <View style={tw`flex-col gap-4`}>
                    {data?.data?.group_members?.map((item: any, index: number) => {

                      return (
                        <View key={index} style={tw`flex-row  items-center gap-3`}>
                          {/* Member Info */}
                          <TouchableOpacity
                            onPress={() => {
                              if (item.is_celebrate && index !== 0) {
                                setvisivale(true);
                                setSetcon_user_id(item?.user?.id);
                              }
                            }}
                            style={tw`w-32 rounded-md px-3 py-2 flex-row gap-2 items-center ${index === 0 ? "bg-[#D6DF221A]" : "bg-[#D6DF221A]"
                              }`}
                          >
                            <Image
                              source={{ uri: makeImage(item?.user?.avatar_url) }}
                              style={tw`w-8 h-8 rounded-full border bg-[#D9D9D9]`}
                            />
                            <Text style={tw`text-blackText font-bold text-xs mt-1`}>
                              {index === 0 ? "You" : item?.user?.full_name.split(" ")[0]}
                            </Text>
                          </TouchableOpacity>

                          {/* Challenge Logs */}
                          <View style={tw`flex-row gap-4 flex-1`}>
                            {item?.challenge_logs?.map((log: any, logIndex: number) => (
                              <TouchableOpacity
                                key={logIndex}
                                disabled={log?.status === "Completed" || isLoading}
                                onPress={() => handleGroupTaskCompleted(log?.id)}
                                style={tw`w-24 rounded py-2 items-center justify-center ${log?.status === "Completed" ? "bg-[#1A8B03]" : "bg-blackish"}`}
                              >
                                {log?.status === "Completed" ?
                                  <View style={tw`flex-row items-center gap-1`}>
                                    <SvgXml xml={IconIickWhite} />
                                    <Text style={tw`text-white text-xs font-montserrat-600`}>
                                      {log?.status}
                                    </Text>
                                  </View>
                                  :
                                  <Text style={tw`text-white text-xs font-montserrat-600`}>
                                    {log?.status}
                                  </Text>
                                }
                              </TouchableOpacity>
                            ))}
                          </View>
                        </View>
                      )
                    })}
                  </View>
                </View>
              </View>
            </>
          </ScrollView>
        </View>
      </ScrollView>
      <ConModal prors={'celebrate'} visible={visivale} onClose={() => setvisivale(!visivale)} con_user_id={con_user_id} chalange_id={id} />

    </View>
  );
};

export default HabitGrid;
