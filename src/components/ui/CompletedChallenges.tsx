
import tw from '@/src/lib/tailwind'
import { useLazyGetAllCOmpletedGroupsQuery } from '@/src/redux/groupApi/groupApi'
import { CompletedData } from '@/src/utils/rtkType'
import { useFocusEffect } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Text, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import GlobalLoading from '../GlobalLoading'
import ProgressBar from './ProgressBar'



const CompletedChallenges = () => {
    const [visible, setVisible] = useState<boolean>(false)
    // pagination
    const [posts, setPosts] = useState<CompletedData[]>([])
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)

    // pagination
    const [fetchPosts, { isLoading }] = useLazyGetAllCOmpletedGroupsQuery()

    const loadPosts = async (pageNum = 1, isRefresh = false,) => {
        try {
            const res = await fetchPosts({ page: pageNum, per_page: 10 }).unwrap();
            const newPosts = res?.data?.data ?? [];

            // CHANGE HERE: Use replacement logic if it's page 1 OR an explicit refresh
            if (isRefresh || pageNum === 1) {
                setPosts(newPosts); //  Replace the existing posts
            } else {
                setPosts((prev) => [...prev, ...newPosts]); // Append new posts
            }

            setHasMore(res?.data?.current_page < res?.data?.last_page);
            setPage(res?.data?.current_page + 1);
        } catch (err) {
            console.log("Fetch Error:", err);
        } finally {
            setRefreshing(false);
            setLoadingMore(false);
        }
    };

    // Focus  reload 
    useFocusEffect(
        useCallback(() => {
            setRefreshing(true);
            loadPosts(1, true);
        }, [])
    );

    // Pull-to-refresh handler
    const handleRefresh = () => {
        setRefreshing(true);
        loadPosts(1, true);

    };

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true);
            loadPosts(page, false);
        }
    };

    // Initial load & search change
    useEffect(() => {
        loadPosts(1, true);
    }, []);






    return isLoading ? <GlobalLoading /> : (
        <View style={tw`flex-1 bg-primaryBg`}>

            <>
                <FlatList
                    data={posts}
                    keyExtractor={(_, index) => String(index)}
                    renderItem={({ item }) => {
                        return (
                            <View style={tw`bg-white h-52 border-l-4 border-[#BCBDC0] rounded-lg p-3 shadow-md mb-4`}>
                                <View style={tw`flex-col gap-2`}>

                                    {/* Header */}
                                    <View style={tw`flex-row items-center justify-between border-b-[1px] border-gray py-2`}>
                                        <Text style={tw`text-blackish font-montserrat-700 text-sm`}>
                                            {item?.group_name}
                                        </Text>
                                        <View style={tw`px-2.4 py-1 bg-neutral-700 rounded flex-row justify-center items-center gap-2.5`}>
                                            <Text style={tw`text-white text-xs font-semibold font-montserrat-400`}>
                                                {item?.status}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Progress Bars */}
                                    <View style={tw`flex-col gap-4`}>
                                        <View style={tw`flex-col gap-2`}>
                                            <View style={tw`flex-row items-center justify-between`}>
                                                <Text style={tw`text-blackish font-montserrat-700 text-sm`}>
                                                    MY Progress
                                                </Text>
                                                <Text style={tw`text-blackish font-montserrat-600 text-sm`}>
                                                    {item?.my_progress}%
                                                </Text>
                                            </View>
                                            <ProgressBar height={6} progress={item?.my_progress} color={"#D6DF22"} />
                                        </View>

                                        <View style={tw`flex-col gap-2`}>
                                            <View style={tw`flex-row items-center justify-between`}>
                                                <Text style={tw`text-blackish font-montserrat-700 text-sm`}>
                                                    Group Progress
                                                </Text>
                                                <Text style={tw`text-blackish font-montserrat-600 text-sm`}>
                                                    {item?.group_progress}%
                                                </Text>
                                            </View>
                                            <ProgressBar height={6} progress={item?.group_progress} color={"#3E3E3F"} />
                                        </View>
                                    </View>

                                    {/* Participants */}
                                    <View style={tw`flex-row items-center gap-2.5`}>
                                        <Text style={tw`text-blackish text-xs font-semibold font-montserrat-600`}>
                                            Participants:
                                        </Text>

                                        <View style={tw`flex-1 flex-row items-center justify-between`}>
                                            <Text style={tw`text-blackish text-xs font-semibold font-montserrat-600`}>
                                                {item?.members_count > 5 ? '+5 more' : ''}
                                            </Text>
                                            <Text style={tw`text-blackish text-xs font-semibold font-montserrat-600`}>
                                                {item?.members_count}/{item?.max_count}
                                            </Text>
                                        </View>
                                    </View>
                                </View>
                            </View>

                        )
                    }

                    }
                    // ListHeaderComponent={<Friendsuggestions />}
                    contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 10 }}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#D6DF22" colors={["#D6DF22"]} />
                    }
                // ListFooterComponent={() => (loadingMore || posts.length > 0 && <GlobalLoading />)}
                />


            </>
        </View>

    )
}


export default CompletedChallenges