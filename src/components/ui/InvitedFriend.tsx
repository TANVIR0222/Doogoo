

import { IconsInviteCancle } from "@/assets/icons";
import tw from "@/src/lib/tailwind";
import {
    useInvitedFriendMutation,
    useLazyGetAllMyChallangeUserQuery,
} from "@/src/redux/groupApi/groupApi";
import { MyChallenge } from "@/src/utils/rtkType";
import React, { memo, useCallback, useEffect, useState } from "react";
import {
    FlatList,
    Modal,
    RefreshControl,
    Text,
    TouchableOpacity,
    View,
} from "react-native";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";
import GlobalLoading from "../GlobalLoading";

interface InvitedFriendProps {
    modalVisible: boolean;
    setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
    user_id: string | number;
}

const InvitedFriend: React.FC<InvitedFriendProps> = ({
    modalVisible,
    setModalVisible,
    user_id,
}) => {
    // -------------------- State --------------------
    const [posts, setPosts] = useState<MyChallenge[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);

    // -------------------- API --------------------
    const [fetchPosts, { isLoading }] = useLazyGetAllMyChallangeUserQuery();
    const [inviteFriend, { isLoading: isLoadingInvite }] = useInvitedFriendMutation();

    // -------------------- Load Posts --------------------
    const loadPosts = useCallback(
        async (pageNum = 1, isRefresh = false) => {
            try {
                const res = await fetchPosts({ page: pageNum, per_page: 10 }).unwrap();
                const newPosts = res?.data?.data ?? [];

                setPosts((prev) => (isRefresh ? newPosts : [...prev, ...newPosts]));

                const currentPage = res?.data?.current_page ?? 1;
                const lastPage = res?.data?.last_page ?? 1;

                setHasMore(currentPage < lastPage);
                setPage(currentPage + 1);
            } catch (err) {
                console.error("Fetch Error:", err);
            } finally {
                setRefreshing(false);
                setLoadingMore(false);
            }
        },
        [fetchPosts]
    );

    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        loadPosts(1, true);
    }, [loadPosts]);

    const handleLoadMore = useCallback(() => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true);
            loadPosts(page);
        }
    }, [loadingMore, hasMore, loadPosts, page]);

    useEffect(() => {
        setRefreshing(true);
        loadPosts(1, true);
    }, [loadPosts]);

    // -------------------- Invite Handler --------------------
    const handleInviteFriend = useCallback(
        async (challengeId: number) => {
            try {
                const res = await inviteFriend({ user_id, challenge_group_id: challengeId }).unwrap();
                if (res?.status) {
                    Toast.show({
                        type: "success",
                        text2: "You invited user to the challenge successfully 🎉",
                        visibilityTime: 2000,
                    });
                }
            } catch (error) {
                console.error("Invite Error:", error);
            }
        },
        [inviteFriend, user_id]
    );

    // -------------------- Render Item --------------------
    const renderItem = useCallback(
        ({ item }: { item: MyChallenge }) => (
            <View style={tw`flex-col mb-3`}>
                <View
                    style={tw`flex-row justify-between items-center gap-2 p-2 border bg-white border-l-4 border-[#BCBDC0] rounded-lg`}
                >
                    <Text style={tw`text-base text-blackText font-montserrat-600`}>
                        {item.group_name}
                    </Text>
                    <TouchableOpacity
                        disabled={isLoadingInvite}
                        onPress={() => handleInviteFriend(item.id)}
                        style={tw`px-3 py-1 bg-blackish rounded-lg`}
                    >
                        <Text style={tw`text-sm text-white font-montserrat-600`}>Invited</Text>
                    </TouchableOpacity>
                </View>
            </View>
        ),
        [handleInviteFriend, isLoadingInvite]
    );

    // -------------------- Main --------------------
    return (
        <Modal visible={modalVisible} animationType="fade" transparent statusBarTranslucent>
            <View style={tw`flex-1 bg-black/40 justify-end`}>
                <View style={tw`w-full bg-white rounded-t-2xl h-96 overflow-hidden`}>
                    {/* Header */}
                    <View style={tw`flex-row items-center justify-between px-4 py-3 border-b border-gray`}>
                        <Text style={tw`text-base text-blackText font-montserrat-700`}>Invite Friend</Text>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <SvgXml xml={IconsInviteCancle} width={20} height={20} />
                        </TouchableOpacity>
                    </View>

                    {/* Body */}
                    <View style={tw`flex-1 flex-col gap-2 bg-primaryBg px-[4%] pt-4`}>
                        {isLoading && posts.length === 0 ? (
                            <GlobalLoading />
                        ) : (
                            <FlatList
                                data={posts}
                                keyExtractor={(_, index) => String(index)}
                                renderItem={renderItem}
                                showsVerticalScrollIndicator={false}
                                onEndReached={handleLoadMore}
                                onEndReachedThreshold={0.5}
                                refreshControl={
                                    <RefreshControl
                                        refreshing={refreshing}
                                        onRefresh={handleRefresh}
                                        tintColor="#D6DF22"
                                        colors={["#D6DF22"]}
                                    />
                                }
                                initialNumToRender={10}
                                maxToRenderPerBatch={10}
                                windowSize={5}
                                removeClippedSubviews={true}
                                contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
                                ListFooterComponent={loadingMore ? <GlobalLoading /> : null}
                            />
                        )}
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default memo(InvitedFriend);
