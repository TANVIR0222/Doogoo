import { usePlanFeatures } from '@/src/hooks/useCheckPreminum';
import tw from '@/src/lib/tailwind';
import {
    useGetAllJointGroupQuery,
    useLazyGetAllChallengeGroupsQuery,
    useUserJoinGroupMutation,
    useUserLogProgressGroupMutation,
} from '@/src/redux/groupApi/groupApi';
import { makeImage } from '@/src/utils/image_converter';
import { Group } from '@/src/utils/rtkType';
import { useIsFocused } from '@react-navigation/native';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { useDebounce } from 'use-debounce';
import ConModal from './ConModal';
import Friendsuggestions from './Friendsuggestions';
import ProgressBar from './ProgressBar';
import SearchHabite from './SearchHabite';

const AllChallange = () => {
    const [visible, setVisible] = useState(false);
    const [userId, setUserId] = useState<number | undefined>();
    const [newPost, setNewPost] = useState<boolean>(false);
    // pagination & search
    const [posts, setPosts] = useState<Group[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [search, setSearch] = useState('');
    const [debouncedSearch] = useDebounce(search, 500);
    const [loadingId, setLoadingId] = useState(null);
    const [joind, setJoindId] = useState(null);

    const [fetchPosts, { isLoading }] = useLazyGetAllChallengeGroupsQuery();
    const [joinGroup, { isLoading: isLoadingJoin }] = useUserJoinGroupMutation();
    const [logProgress, { isLoading: isLoadingPress }] = useUserLogProgressGroupMutation();
    const { data } = useGetAllJointGroupQuery();


    const isFocused = useIsFocused();


    // ------------------ chack subcription ------------------
    const { unlimitedHabitsTracking } = usePlanFeatures();

    const isPremiumUser = React.useMemo(() => {
        // Use optional chaining (?) for safety, in case 
        // unlimitedHabitsTracking might be null or undefined initially
        return unlimitedHabitsTracking?.includes('Creating a challenge group');
    }, [unlimitedHabitsTracking])



    const joinedIds = data?.join_group_ids ?? [];

    // -------------------- Load Posts --------------------
    const loadPosts = useCallback(
        async (pageNum = 1, isRefresh = false, searchValue = '') => {
            try {
                const res = await fetchPosts({ page: pageNum, per_page: 10, search: searchValue }).unwrap();
                const newPosts = res?.data?.data ?? [];

                if (isRefresh || pageNum === 1) {
                    setPosts(newPosts);
                } else {
                    setPosts((prev) => [...prev, ...newPosts]);
                }

                setHasMore(res?.data?.current_page < res?.data?.last_page);
                setPage(res?.data?.current_page + 1);
            } catch (err) {
                console.log('Fetch Error:', err);
            } finally {
                setRefreshing(false);
                setLoadingMore(false);
            }
        },
        [fetchPosts]
    );

    // -------------------- Handlers --------------------
    const handleRefresh = () => {
        setRefreshing(true);
        loadPosts(1, true, debouncedSearch);
    };

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true);
            loadPosts(page, false, debouncedSearch);
        }
    };

    const handleJoin = useCallback(
        async (groupId: number) => {
            try {
                setJoindId(groupId);
                await joinGroup(groupId).unwrap();
                setJoindId(null);
            } catch (err) {
                console.log('Join Error:', err);
            }
        },
        [joinGroup]
    );

    const handleLogProgress = useCallback(
        async (groupId: number) => {
            try {
                setLoadingId(groupId);
                await logProgress(groupId).unwrap();
                router.push({ pathname: '/view-details/view-details-log-progress', params: { id: groupId } });
                setLoadingId(null);
            } catch (err) {
                console.log('Log Progress Error:', err);
            }
        },
        [logProgress]
    );

    // -------------------- Effects --------------------
    useFocusEffect(
        useCallback(() => {
            setRefreshing(true);
            loadPosts(1, true, debouncedSearch);
        }, [])
    );

    // useEffect(() => {
    //     if (isFocused) {
    //         setRefreshing(true);
    //         loadPosts(1, true, debouncedSearch);
    //     }
    // }, [debouncedSearch, loadPosts, isFocused, newPost]);
    // Effect: screen focus, search, and newPost trigger
    useEffect(() => {
        if (isFocused) {
            setRefreshing(true);
            loadPosts(1, true, debouncedSearch);

            if (newPost) {
                setNewPost(false);
            }
        }
    }, [debouncedSearch, loadPosts, isFocused, newPost]);


    // -------------------- Render Item --------------------
    const renderItem = useCallback(
        ({ item }: { item: Group }) => {
            const alreadyJoined = joinedIds.includes(item.id);
            return (
                <View style={tw`bg-white border-l-4 h-56 border-[#BCBDC0] rounded-lg p-3 shadow-md mb-4`}>
                    {/* Header */}
                    <View style={tw`flex-row items-center justify-between border-b-[1px] border-gray py-2`}>
                        <Text style={tw`text-blackish font-montserrat-700 text-sm`}>{item.group_name}</Text>
                        <View style={tw`px-2.4 py-1 bg-neutral-700 rounded flex-row justify-center items-center gap-2.5`}>
                            <Text style={tw`text-white text-xs font-semibold font-montserrat-400`}>{item.status}</Text>
                        </View>
                    </View>

                    {/* Progress Bars */}
                    <View style={tw`flex-col gap-4 mt-2`}>
                        <View>
                            <View style={tw`flex-row items-center justify-between`}>
                                <Text style={tw`text-blackish font-montserrat-700 text-sm`}>My Daily Progress</Text>
                                <Text style={tw`text-blackish font-montserrat-600 text-sm`}>{item.my_daily_progress}%</Text>
                            </View>
                            <ProgressBar height={6} progress={item.my_daily_progress} color="#D6DF22" />
                        </View>

                        <View>
                            <View style={tw`flex-row items-center justify-between`}>
                                <Text style={tw`text-blackish font-montserrat-700 text-sm`}>Group Daily Progress</Text>
                                <Text style={tw`text-blackish font-montserrat-600 text-sm`}>{item.group_daily_progress}%</Text>
                            </View>
                            <ProgressBar height={6} progress={item.group_daily_progress} color="#3E3E3F" />
                        </View>
                    </View>

                    {/* Participants */}
                    <View style={tw`flex-row items-center gap-1 mt-2`}>
                        <Text style={tw`text-blackish text-xs font-semibold font-montserrat-600`}>Participants:</Text>
                        <View style={tw`flex-row items-center`}>
                            {item?.member_lists?.map((m, idx) => (
                                <TouchableOpacity
                                    key={idx}
                                    onPress={() => {
                                        setVisible(true);
                                        setUserId(m?.user?.id);
                                    }}
                                    style={tw`${idx !== 0 ? '-ml-2' : ''}`}
                                >
                                    <Image
                                        style={tw`h-6 w-6 rounded-full border border-white`}
                                        source={{ uri: makeImage(m?.user?.avatar_url) }}
                                    />
                                </TouchableOpacity>
                            ))}
                        </View>
                        <View style={tw`flex-1 flex-row items-center justify-between`}>
                            <Text style={tw`text-blackish text-xs font-semibold font-montserrat-600`}>
                                {item?.member_lists?.length > 5 ? '+5' : item.member_lists?.length}
                            </Text>
                            <Text style={tw`text-blackish text-xs font-semibold font-montserrat-600`}>
                                {item?.members_count}/{item?.max_count}
                            </Text>
                        </View>
                    </View>

                    {/* Actions */}
                    <View style={tw`flex-row ${alreadyJoined ? 'items-center justify-between' : 'items-end justify-end'} mt-2`}>
                        {alreadyJoined && (
                            <TouchableOpacity
                                onPress={() => isPremiumUser ? handleLogProgress(item?.id) : router.push('/subcription-modal')}
                                style={tw`px-2.4 py-2 border rounded-lg flex-row justify-center items-center gap-2.5`}
                            >
                                <Text style={tw`text-blackish text-xs font-semibold font-montserrat-700`}>{loadingId === item?.id ? 'Loading...' : 'Log Progress'}</Text>
                            </TouchableOpacity>
                        )}

                        <View style={tw`flex-row self-end items-center gap-3`}>
                            {!alreadyJoined && (
                                <TouchableOpacity
                                    onPress={() => isPremiumUser ? handleJoin(item.id) : router.push('/subcription-modal')}
                                    disabled={isLoadingJoin || isLoadingPress}
                                    style={tw`px-2 py-1 ${isLoadingJoin || isLoadingPress ? 'bg-blackish/80' : 'bg-blackish'} rounded-lg flex-row justify-center items-center gap-2.5`}
                                >
                                    <Text style={tw`text-base text-white font-montserrat-600`}>{joind === item.id ? 'Loading...' : 'Join'}</Text>
                                </TouchableOpacity>
                            )}

                            <TouchableOpacity
                                // onPress={() => router.push('/invite-modal')}
                                onPress={() => router.push({
                                    pathname: '/invite-modal',
                                    params: {
                                        id: item?.id,
                                    },
                                })}
                                disabled={!isPremiumUser}
                                style={tw`px-2 py-1 bg-blackish rounded-lg flex-row justify-center items-center gap-2.5`}
                            >
                                <Text style={tw`text-base text-white font-montserrat-600`}>Invite</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            );
        },
        [joinedIds, handleJoin, handleLogProgress, isLoadingPress, isLoadingJoin, isPremiumUser, loadingId]
    );

    return (
        <View style={tw`flex-1 bg-primaryBg`}>
            <SearchHabite setNewPost={setNewPost} title="Group Challenges" addHeading="Create New Group" search={search} setSearch={setSearch} />

            <FlatList
                data={posts}
                keyExtractor={(_, index) => String(index)}
                renderItem={renderItem}
                contentContainerStyle={{ paddingHorizontal: 12, paddingTop: 10 }}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                // refreshControl={
                //     posts.length > 0 && <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#D6DF22" colors={['#D6DF22']} />
                // }
                ListHeaderComponent={<Friendsuggestions />}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews={true}
            />

            {/* Modals */}
            {/* <JoinChallengeModal modalVisible={modalVisible} setModalVisible={() => setModalVisible(!modalVisible)} /> */}
            <ConModal prors="ativeChallange" visible={visible} onClose={() => setVisible(!visible)} userId={userId} />
        </View>
    );
};

export default AllChallange;

