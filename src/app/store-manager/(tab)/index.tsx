import { IconsAdd, IconsDeleted, IconsEdite } from '@/assets/icons'
import GlobalLoading from '@/src/components/GlobalLoading'
import Wrapper from '@/src/components/Wrapper'
import { formatDate } from '@/src/lib/formatDate'
import tw from '@/src/lib/tailwind'
import { useDeleteRewardMutation, useLazyGetAllRewardHistoryQuery, useServicesEnableDisableMutation } from '@/src/redux/rewardsPartnerApi/rewardsPartnerApi'
import { makeImage } from '@/src/utils/image_converter'
import { RewardPartner } from '@/src/utils/rtkType'
import { router, useFocusEffect } from 'expo-router'
import React, { useCallback, useEffect, useState } from 'react'
import { Alert, FlatList, Image, RefreshControl, Switch, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

export default function RewardsScreen() {
    const [posts, setPosts] = useState<RewardPartner[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)

    const [servicesEnableDisable] = useServicesEnableDisableMutation()
    const [fetchPosts, { isLoading, reset }] = useLazyGetAllRewardHistoryQuery()
    const [deleteRewardQuery] = useDeleteRewardMutation();
    // delete reward function
    const deleteReward = useCallback(async (id: number) => {
        // console.log(id);

        try {
            Alert.alert(
                "Delete Reward",
                "Are you sure you want to delete this reward?",
                [
                    { text: "Cancel", style: "cancel" },
                    {
                        text: "Delete", style: "destructive", onPress: async () => {
                            const res = await deleteRewardQuery({ id }).unwrap();
                            // Refresh the list after deletion
                            reset();
                            // Immediately reload fresh data
                            loadPosts(1, true);
                            console.log(res);

                        }
                    },
                ]
            );
        }
        catch (error) {
            console.error("Delete Error:", error);
        }
    }, [deleteRewardQuery, reset]);
    // 🔹 Reset query on screen focus
    useFocusEffect(
        useCallback(() => {
            reset(); // Clear cached data
            loadPosts(1, true); // Optional: fetch fresh data
        }, [reset])
    );



    // 🔹 Fetch Data with Pagination
    const loadPosts = useCallback(
        async (pageNum = 1, isRefresh = false) => {
            try {
                const res = await fetchPosts({ page: pageNum, per_page: 10 }).unwrap();
                const newData: RewardPartner[] = res?.data?.data ?? [];

                // Merge old + new data and remove duplicates by id
                setPosts(prev => {
                    const combined = isRefresh ? newData : [...prev, ...newData];
                    return Array.from(new Map(combined.map(item => [item.id, item])).values());
                });

                const current = res?.data?.current_page ?? pageNum;
                const last = res?.data?.last_page ?? 1;

                setPage(current + 1);
                setHasMore(current < last);
            } catch (error) {
                console.error("Fetch Error:", error);
            } finally {
                setRefreshing(false);
                setLoadingMore(false);
            }
        },
        [fetchPosts]
    );

    // 🔹 Pull-to-refresh
    const handleRefresh = () => {
        setRefreshing(true);
        setHasMore(true);
        loadPosts(1, true); // Reset to page 1
    };

    // 🔹 Load More (infinite scroll)
    const handleLoadMore = () => {
        if (!loadingMore && hasMore && !refreshing) {
            setLoadingMore(true);
            loadPosts(page);
        }
    };

    // 🔹 Initial Load
    useEffect(() => {
        setRefreshing(true);
        loadPosts(1, true);
    }, []);


    return isLoading ? (
        <GlobalLoading />
    ) : (
        <View style={tw`flex-1 bg-primaryBg`}>


            <Wrapper>
                <FlatList
                    data={posts}
                    keyExtractor={item => String(Math.random())}
                    renderItem={({ item }) => (
                        <View style={tw`bg-primaryBg rounded-lg border-l-4 border-[#d9d9d9] p-3 shadow-md mb-4 mr-1`}>
                            <View style={tw`flex-row items-center gap-2`}>
                                <View style={tw` h-14 w-14 items-center  justify-center rounded-lg`}>
                                    <Image source={{ uri: makeImage(item?.image || item?.image_url) }} style={tw`h-full rounded w-full`} />
                                </View>

                                <View style={tw`flex-col gap-1 flex-1`}>
                                    <Text style={tw`text-blackish font-montserrat-700 text-sm`}>
                                        {item?.title?.slice(0, 20)}
                                    </Text>
                                    <Text numberOfLines={2} style={tw`text-blackish font-montserrat-600 text-xs`}>
                                        {item?.description}
                                    </Text>

                                    <View style={tw`flex-row gap-2`}>
                                        <Text style={tw`text-blackish font-montserrat-500 text-xs`}>
                                            {item?.purchase_point} points
                                        </Text>
                                        <Text style={tw`text-blackish font-montserrat-600 text-xs`}>
                                            Expires: {formatDate(item?.expiration_date)}
                                        </Text>
                                    </View>

                                    <Text style={tw`text-blackish font-montserrat-600 text-xs`}>
                                        Purchase point {item?.purchase_point}
                                    </Text>
                                </View>
                                <View style={tw` flex-col items-center  `}>
                                    <View style={tw`flex-row mb-2 gap-2`}>
                                        <TouchableOpacity onPress={() => router.push({ pathname: `/reward-edit/[id]`, params: { id: item?.id } })}>
                                            <SvgXml xml={IconsEdite} />
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() => deleteReward(item?.id)}>
                                            <SvgXml xml={IconsDeleted} />
                                        </TouchableOpacity>
                                    </View>
                                    <Switch
                                        trackColor={{ false: '#767577', true: '#1a8b03' }}
                                        thumbColor="#fff"
                                        ios_backgroundColor="#c2c2c2"
                                        value={item.status === 'Enable'}
                                        onValueChange={async newValue => {
                                            const updatedStatus = newValue ? 'Enable' : 'Disable'
                                            try {
                                                await servicesEnableDisable({ id: item.id }).unwrap()
                                                setPosts(prev =>
                                                    prev.map(p =>
                                                        p.id === item.id ? { ...p, status: updatedStatus } : p
                                                    )
                                                )
                                            } catch (error) {
                                                console.error("Status Update Error:", error)
                                            }
                                        }}
                                    />
                                </View>

                            </View>
                        </View>
                    )}
                    showsVerticalScrollIndicator={false}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    refreshControl={
                        <RefreshControl
                            refreshing={refreshing}
                            onRefresh={handleRefresh}
                            tintColor="#D6DF22"
                            colors={['#D6DF22']}
                        />
                    }
                    ListFooterComponent={() =>
                        loadingMore && posts.length > 0 ? <GlobalLoading /> : null
                    }
                    windowSize={5}
                    initialNumToRender={10}
                    maxToRenderPerBatch={5}
                    ListHeaderComponent={<View style={tw`  py-3`}>
                        <View style={tw`flex-row items-center justify-between `}>
                            <Text style={tw`text-blackish font-montserrat-600 text-xl`}>
                                Rewards
                            </Text>
                            <TouchableOpacity onPress={() => router.push('/(common)/add-reward')} >
                                <SvgXml xml={IconsAdd} />
                            </TouchableOpacity>
                        </View>
                    </View>}
                />
            </Wrapper>
        </View>
    )
}
