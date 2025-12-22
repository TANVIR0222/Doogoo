import { IconsArchived, IconsStart } from '@/assets/icons'
import GlobalLoading from '@/src/components/GlobalLoading'
import tw from '@/src/lib/tailwind'
import { useDeleteArchivedHabitMutation, useGetArchivedAddHabitQuery } from '@/src/redux/habitsApi/habitsApi'
import React, { useState } from 'react'
import { Alert, FlatList, Pressable, RefreshControl, Text, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

export default function Archived() {
    const { data, isLoading, refetch } = useGetArchivedAddHabitQuery({ isArchived: 1 });
    const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
    const [deleteArchivedHabit, { isLoading: isLoadingDeleteArchivedHabit }] = useDeleteArchivedHabitMutation();

    const handleRefresh = async () => {
        setIsRefreshing(true);
        await refetch(); // RTK Query
        setIsRefreshing(false);
    };






    const handleArchived = (habit_id: number) => {
        Alert.alert(
            "Archive Item",
            "Are you sure you want to archive this item?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Archive",
                    style: "destructive",
                    onPress: () => {

                        try {
                            deleteArchivedHabit({ habit_id }).unwrap();
                        } catch (error) {
                            console.log(error);
                        }
                    }
                }
            ]
        );
    };


    return isLoading ? <GlobalLoading /> : (
        <View style={tw`flex-1 bg-primaryBg`}>
            <View style={tw` border-b py-5 border-gray/50 `}>
                <View style={tw`px-[4%] flex-row items-center gap-2 `}>
                    <SvgXml xml={IconsArchived} />
                    <Text style={tw`  text-sm font-montserrat-600`}>Archived</Text>
                </View>
            </View>

            {data?.data?.length &&
                (<View style={tw`p-4`}>
                    <View style={tw`bg-white border-gray border-[1px] rounded-lg mt-5 overflow-hidden`}>
                        <FlatList
                            data={data?.data}
                            keyExtractor={(item) => item.id?.toString()}
                            renderItem={({ item }) => (
                                <View style={tw`p-4 border-gray/60 border-b-[1px]`}>
                                    <View style={tw`flex-row justify-between items-center`}>
                                        <View style={tw`flex-row gap-3 items-center mb-2`}>
                                            <View style={tw`flex-col gap-1`}>
                                                <Text style={tw`text-base`}>{item.habit_name}</Text>
                                                <View style={tw`flex-row items-center gap-1`}>
                                                    <SvgXml xml={IconsStart} />
                                                    <Text style={tw`text-gray`}>{item.logs?.length} item</Text>
                                                </View>
                                            </View>
                                        </View>

                                        <View style={tw`justify-end items-end`}>
                                            <Pressable onPress={() => handleArchived(item?.id)}>
                                                <Text style={tw`text-white text-sm bg-blackish px-2 py-1 rounded font-montserrat-600`}>
                                                    Unarchive
                                                </Text>
                                            </Pressable>
                                        </View>
                                    </View>
                                </View>
                            )}
                            ItemSeparatorComponent={() => <View style={tw`border-b border-gray/30`} />}
                            showsVerticalScrollIndicator={false}
                            refreshControl={
                                <RefreshControl refreshing={isRefreshing} onRefresh={handleRefresh} tintColor="#D6DF22" colors={["#D6DF22"]} />
                            }
                        />
                    </View>
                </View>)
            }
        </View>
    )
}