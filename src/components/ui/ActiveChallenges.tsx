import tw from '@/src/lib/tailwind'
import { useGetAllJointGroupQuery, useLazyGetAllGroupsQuery, useUserJoinGroupMutation, useUserLogProgressGroupMutation } from '@/src/redux/groupApi/groupApi'
import { makeImage } from '@/src/utils/image_converter'
import { Group } from '@/src/utils/rtkType'
import { useIsFocused } from '@react-navigation/native'
import { router, useFocusEffect } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useDebounce } from 'use-debounce'
import ConModal from './ConModal'
import JoinChallengeModal from './JoinChallengeModal'
import ProgressBar from './ProgressBar'
import SearchHabite from './SearchHabite'

const extractJoinedPostIds = (posts: Group[], joinGroupIds: number[] = []) => {
    return posts
        .filter((post: Group) => joinGroupIds.includes(post.id))
        .map(item => item.id);
};

const ActiveChallenges = () => {
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [visible, setVisible] = useState<boolean>(false)
    // pagination
    const [posts, setPosts] = useState<Group[]>([])
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)
    const [search, setSearch] = useState<string>("")
    const [debouncedSearch] = useDebounce(search, 1000) // 1 sec debounce
    const [postId, setPostId] = useState<number[]>();
    const [userId, setUserId] = useState<number>();
    const isFocused = useIsFocused();

    // pagination
    const [fetchPosts, { isLoading }] = useLazyGetAllGroupsQuery()
    const [joinGroup, { isLoading: isLoadingJoin }] = useUserJoinGroupMutation()
    const [logProgress, { isLoading: isLoadingPress }] = useUserLogProgressGroupMutation()
    const { data } = useGetAllJointGroupQuery()


    const handleJoin = async (groupId: number) => {
        try {
            await joinGroup(groupId).unwrap();
            // await logProgress(groupId).unwrap();
        } catch (err: any) {
            console.log("Join Error:", err);
        }
    };

    const handleLogProgress = async (groupId: number) => {
        try {
            await logProgress(groupId).unwrap();
            router.push({
                pathname: "/view-details/view-details-log-progress",
                params: { id: groupId }
            });
        } catch (err: any) {
            console.log("Join Error:", err);

        }
    };



    const loadPosts = async (pageNum = 1, isRefresh = false, searchValue = "") => {
        try {
            const res = await fetchPosts({ page: pageNum, per_page: 10, search: searchValue }).unwrap();
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
        loadPosts(1, true, debouncedSearch);
    };

    // Load more handler
    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true);
            loadPosts(page, false, debouncedSearch);
        }
    };

    // Initial load & search change
    useEffect(() => {
        if (isFocused) {
            setRefreshing(true);
            loadPosts(1, true, debouncedSearch);
        }
    }, [debouncedSearch, isFocused]);

    // Sync joined posts → postIds
    useEffect(() => {
        if (posts.length > 0 && data?.join_group_ids) {
            const joinedIds = extractJoinedPostIds(posts, data.join_group_ids);
            setPostId(joinedIds);
        }
    }, [posts, data?.join_group_ids]);





    return isLoading ? '' : (
        <View style={tw`flex-1 bg-primaryBg`}>
            <ScrollView nestedScrollEnabled={true} showsVerticalScrollIndicator={false} >
                <SearchHabite title='Group Challenges' addHeading='Create New Group' search={search} setSearch={setSearch} />

                <FlatList
                    data={posts}
                    keyExtractor={(_, index) => String(index)}
                    renderItem={({ item }) => {
                        const alreadyJoined = postId?.includes(item.id);
                        return (
                            <View style={tw`bg-white border-l-4 h-60 border-[#BCBDC0] rounded-lg p-3 shadow-md mb-4`}>
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
                                                    My Daily Progress
                                                </Text>
                                                <Text style={tw`text-blackish font-montserrat-600 text-sm`}>
                                                    {item?.my_daily_progress}%
                                                </Text>
                                            </View>
                                            <ProgressBar height={6} progress={item?.my_daily_progress} color={"#D6DF22"} />
                                        </View>

                                        <View style={tw`flex-col gap-2`}>
                                            <View style={tw`flex-row items-center justify-between`}>
                                                <Text style={tw`text-blackish font-montserrat-700 text-sm`}>
                                                    Group Daily Progress
                                                </Text>
                                                <Text style={tw`text-blackish font-montserrat-600 text-sm`}>
                                                    {item?.group_daily_progress}%
                                                </Text>
                                            </View>
                                            <ProgressBar height={6} progress={item?.group_daily_progress} color={"#3E3E3F"} />
                                        </View>
                                    </View>

                                    {/* Participants */}
                                    <View style={tw`flex-row items-center gap-1`}>
                                        <Text style={tw`text-blackish text-xs font-semibold font-montserrat-600`}>
                                            Participants:
                                        </Text>
                                        <View style={tw`flex-row items-center`}>
                                            {item?.member_lists?.map((item, index) => (
                                                <TouchableOpacity
                                                    key={index}
                                                    onPress={() => { setVisible(!visible); setUserId(item?.user?.id) }}
                                                    style={tw`${index !== 0 ? '-ml-2' : ''}`} // overlap effect
                                                >
                                                    <Image
                                                        style={tw`h-6 w-6 rounded-full border border-white`}
                                                        source={{ uri: makeImage(item?.user?.avatar_url) }}
                                                    />
                                                </TouchableOpacity>
                                            ))}
                                        </View>

                                        <View style={tw`flex-1 flex-row items-center justify-between`}>
                                            <Text style={tw`text-blackish text-xs font-semibold font-montserrat-600`}>
                                                {item?.member_lists?.length > 5 ? '+5' : item?.member_lists?.length}
                                            </Text>
                                            <Text style={tw`text-blackish text-xs font-semibold font-montserrat-600`}>
                                                {item?.members_count}/{item?.max_count}
                                            </Text>
                                        </View>
                                    </View>

                                    {/* Actions */}
                                    <View style={tw`flex-row ${alreadyJoined ? 'items-center justify-between' : 'items-end justify-end'} `}>
                                        {alreadyJoined && <TouchableOpacity
                                            onPress={() => handleLogProgress(item?.id)}
                                            style={tw`px-2.4 py-2 border rounded-lg flex-row justify-center items-center gap-2.5`}
                                        >
                                            <Text style={tw`text-blackish text-xs font-semibold font-montserrat-700`}>
                                                Log Progress
                                            </Text>
                                        </TouchableOpacity>}

                                        <View style={tw`flex-row self-end items-center gap-3`}>
                                            {/*  Join button only if not already joined */}
                                            {!alreadyJoined && (
                                                <TouchableOpacity
                                                    onPress={() => handleJoin(item?.id)}
                                                    disabled={isLoadingJoin || isLoadingPress}
                                                    style={tw`px-2 py-1 ${isLoadingJoin || isLoadingPress ? 'bg-blackish/80' : 'bg-blackish'}  rounded-lg flex-row justify-center items-center gap-2.5`}
                                                >
                                                    <Text style={tw`text-base text-white font-montserrat-600`}>Join</Text>
                                                </TouchableOpacity>
                                            )}

                                            <TouchableOpacity
                                                onPress={() => router.push({
                                                    pathname: '/(common)/friendView',
                                                    params: {
                                                        id: item?.id,
                                                    },
                                                })}
                                                style={tw`px-2 py-1 bg-blackish rounded-lg flex-row justify-center items-center gap-2.5`}
                                            >
                                                <Text style={tw`text-base text-white font-montserrat-600`}>Invite</Text>
                                            </TouchableOpacity>
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
                    nestedScrollEnabled={true}
                />

                {/* Modals */}
                <JoinChallengeModal
                    modalVisible={modalVisible}
                    setModalVisible={() => setModalVisible(!modalVisible)}
                />
                <ConModal
                    prors="ativeChallange"
                    visible={visible}
                    onClose={() => setVisible(!visible)}
                    userId={userId}
                />
            </ScrollView>
        </View>

    )
}


export default ActiveChallenges