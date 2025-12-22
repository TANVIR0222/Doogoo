import GlobalLoading from "@/src/components/GlobalLoading";
import tw from "@/src/lib/tailwind";
import { useUserJoinGroupMutation } from "@/src/redux/groupApi/groupApi";
import { useLazyGetAllNotificationsQuery } from "@/src/redux/notificationsApi/notificationsApi";
import { Notification } from "@/src/utils/rtkType";
import { timeFormateInstragram } from "@/src/utils/utils";
import { router } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from "react-native";
import Toast from "react-native-toast-message";


const NotificationsScreen = () => {
    // ---------------state -------------------
    const [posts, setPosts] = useState<Notification[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);


    // ---------------api -------------------
    const [fetchPosts, { isLoading }] = useLazyGetAllNotificationsQuery();
    const [joinGroup, { isLoading: isLoadingJoin }] = useUserJoinGroupMutation()


    // Load posts function
    const loadPosts = async (pageNum = 1, isRefresh = false,) => {
        try {
            const res = await fetchPosts({ page: pageNum, per_page: 10 }).unwrap();
            const newPosts = res?.data?.data ?? [];

            if (isRefresh) {
                setPosts(newPosts);
            } else {
                setPosts(prev => [...prev, ...newPosts]);
            }

            const currentPage = res?.data?.current_page ?? 0;
            const lastPage = res?.data?.last_page ?? 0;

            setHasMore(currentPage < lastPage);
            setPage(currentPage + 1);
        } catch (err) {
            console.log("Fetch Error:", err);
        } finally {
            setRefreshing(false);
            setLoadingMore(false);
        }
    };

    //---------------------- join challenge -----------
    const handleJoin = useCallback(
        async (groupId: number) => {
            const showToast = (type: "success" | "error", message: string) => {
                Toast.show({
                    type,
                    text2: message,
                    visibilityTime: 2000,

                });
            };

            try {
                Alert.alert(
                    "Join Challenge",
                    "Do you want to join this group?",
                    [
                        { text: "Deny" },
                        {
                            text: "Accept",
                            onPress: async () => {
                                try {
                                    const res = await joinGroup(groupId).unwrap();
                                    if (res?.status) {
                                        showToast("success", "You joined the challenge successfully 🎉");
                                        router.replace("/(tab)/groups");
                                    }
                                } catch (err: any) {
                                    showToast("error", err?.errors?.[0] ?? "Something went wrong");
                                    router.replace("/(tab)/groups");
                                }
                            },
                        },
                    ]
                );
            } catch (err: any) {
                showToast("error", err?.errors?.[0] ?? "Something went wrong");
            }
        },
        [joinGroup]
    );




    // Pull-to-refresh handler
    const handleRefresh = () => {
        setRefreshing(true);
        loadPosts(1, true);
    };

    // Load more handler
    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true);
            loadPosts(page);
        }
    };

    // Initial load
    useEffect(() => {
        loadPosts();
        // reset();
    }, []);
    return isLoading ? <GlobalLoading /> : (
        <View style={tw` flex-1  bg-primaryBg p-[3%] `}>
            <Text style={tw`text-xl  font-montserrat-700 mb-4`}>Notification</Text>
            <FlatList
                data={posts}
                keyExtractor={(_, index) => String(index)}
                renderItem={({ item }) => (
                    <View style={tw`bg-white border-l-4 border-[#BCBDC0] rounded-lg p-2 mx-1 shadow-md mb-4`}>
                        {/* Header */}
                        <View style={tw`flex-row justify-between items-center mb-1`}>
                            {/* Left: Avatar & Name */}
                            <View style={tw`flex-row items-center gap-1`}>
                                <Image
                                    style={tw`h-8 w-8 rounded`}
                                    source={require('@/assets/images/splash-icon.png')}
                                />
                                <Text style={tw`font-montserrat-600 text-blackish text-base`}>DooGoo</Text>
                            </View>

                            {/* Right: Status / Time */}
                            <View style={tw`flex-col items-center gap-1`}>
                                {item?.data?.invited ? (
                                    <TouchableOpacity
                                        onPress={() => handleJoin(item?.data?.data?.id)}
                                        style={tw`px-2 py-1 bg-blackish rounded-md flex-row justify-center items-center`}
                                    >
                                        <Text style={tw`text-white text-xs`}>Joined</Text>
                                    </TouchableOpacity>
                                ) : (
                                    <Text style={tw`text-blackish text-xs`}>
                                        {timeFormateInstragram(item?.created_at)}
                                    </Text>
                                )}
                            </View>
                        </View>

                        {/* Body */}
                        <View style={tw`flex-row justify-between items-center`}>
                            <Text style={tw`text-blackish text-sm`}>{item?.data?.title}</Text>
                            {item?.data?.invited && (
                                <Text style={tw`text-blackish text-xs`}>
                                    {timeFormateInstragram(item?.created_at)}
                                </Text>
                            )}
                        </View>
                    </View>

                )
                }
                nestedScrollEnabled={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                showsVerticalScrollIndicator={false}
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={handleRefresh}
                        tintColor="#D6DF22"
                        colors={['#D6DF22']}
                    />
                }

                ListFooterComponent={() =>
                    loadingMore ? (
                        <GlobalLoading />
                    ) : null
                }
            />

        </View>
    );
};

export default NotificationsScreen;
