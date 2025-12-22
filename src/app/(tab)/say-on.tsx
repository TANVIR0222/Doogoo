import { IconsAddedSay, IconsDeleted } from '@/assets/icons'
import GlobalLoading from '@/src/components/GlobalLoading'
import NewModal from '@/src/components/ui/NewModal'
import { usePlanFeatures } from '@/src/hooks/useCheckPreminum'
import { formatDate } from '@/src/lib/formatDate'
import tw from '@/src/lib/tailwind'
import { useDeleteSayNoMutation, useLazyGetAllSayNoQuery } from '@/src/redux/sayNoApi/sayNoApi'
import { Entry } from '@/src/utils/rtkType'
import React, { useEffect, useState } from 'react'
import {
    Alert,
    FlatList,
    RefreshControl,
    ScrollView,
    Text,
    TouchableOpacity,
    View
} from 'react-native'
import { SvgXml } from 'react-native-svg'

export default function SayOnScreen() {
    const [visible, setVisible] = useState<boolean>(false)
    const [deleted, setDeleted] = useState<boolean>(false)
    const [duration, setDuration] = useState<string>("all")
    const [deleteHabit, { isLoading: isLoadingDelete }] = useDeleteSayNoMutation();
    const [posts, setPosts] = useState<Entry[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [fetchPosts, { isLoading, isFetching }] = useLazyGetAllSayNoQuery();

    const { unlimitedSayNo } = usePlanFeatures();



    // console.log(duration);

    const handleDeleted = (id: number) => {

        Alert.alert(
            "Delete Entry",
            "Are you sure you want to delete this entry?",
            [
                {
                    text: "Cancel",
                    style: "cancel"
                },
                {
                    text: "Delete",
                    onPress: async () => {
                        try {
                            const res = await deleteHabit(id).unwrap();
                            setLoadingMore(true);
                            await loadPosts(1, true);

                        } catch (error) {
                            console.log(error);
                        }
                    },
                    style: "destructive"
                }
            ]
        );
    };





    // Load posts function
    const loadPosts = async (pageNum = 1, isRefresh = false, selectedDuration?: string) => {
        const activeDuration = selectedDuration ?? duration;

        try {
            const res = await fetchPosts({ page: pageNum, per_page: 10, duration: activeDuration }).unwrap();
            const newPosts = res?.data?.data ?? [];

            // CHANGE HERE: Use replacement logic if it's page 1 OR an explicit refresh
            if (isRefresh || pageNum === 1) {
                setPosts(newPosts); //  Replace the existing posts
            } else {
                setPosts((prev) => [...prev, ...newPosts]); // Append new posts
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



    // Pull-to-refresh handler
    const handleRefresh = () => {
        setRefreshing(true);
        loadPosts(1, true);
    };

    // Load more handler
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

    return (
        <View style={tw`flex-1 bg-primaryBg`}>
            <ScrollView
                showsVerticalScrollIndicator={false}
                nestedScrollEnabled={true}
                contentContainerStyle={tw`pt-5 pb-10`}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#D6DF22" colors={["#D6DF22"]} />
                }
            >
                <View style={tw`px-[4%] flex-col gap-8`}>
                    {/* Header */}
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`text-blackish font-montserrat-600 text-xl`}>
                            Say No Tracker
                        </Text>
                        <TouchableOpacity
                            style={tw`px-2 py-2 bg-neutral-700 rounded flex-row items-center gap-2.5`}
                            onPress={() => setDeleted(!deleted)}
                        >
                            <Text style={tw`text-white text-xs font-montserrat-400`}> {deleted ? 'Done' : 'Edit'} </Text>
                        </TouchableOpacity>
                    </View>

                    {/* Quote */}
                    <View style={tw`bg-primaryBg border-l-4 border-yellowGreen rounded-xl shadow-lg p-[4%] gap-3`}>
                        <Text style={tw`text-base font-montserrat-600 text-blackText`}>
                            “The difference between successful people and really successful people is that really successful people say no to almost everything.”
                        </Text>
                        <Text style={tw`text-base text-right font-montserrat-600 text-blackText`}>
                            - Warren Buffett
                        </Text>
                    </View>

                    {/* Input Row */}
                    <View style={tw`bg-blackish px-3 py-3 rounded-lg flex-row items-center gap-3`}>
                        <TouchableOpacity
                            // disabled={!unlimitedSayNo.includes('Unlimited Say No')}
                            onPress={() => setVisible(true)}
                            style={tw`h-8 w-8 items-center justify-center bg-primaryBg rounded-full`}
                        >
                            <SvgXml xml={IconsAddedSay} />
                        </TouchableOpacity>
                        <Text style={tw`text-base font-montserrat-600 text-primaryBg`}>
                            What did you say No to?
                        </Text>
                    </View>

                    {/* Duration Tabs */}
                    <View style={tw`flex-row  justify-between gap-2`}>
                        {['all', 'day', 'week', 'month', 'year'].map((d) => (
                            <TouchableOpacity
                                key={d}
                                onPress={async () => {
                                    setDuration(d);
                                    setLoadingMore(true);
                                    await loadPosts(1, true, d); // pass the new duration
                                }}
                                style={tw` sm:px-3 sm:py-1 md:px-3 md:py-2  lg:px-4 lg:py-2 rounded-lg border ${duration === d ? 'bg-blackish' : 'bg-white'
                                    }`}
                                accessibilityLabel={`Select ${d} duration`}
                            >
                                <Text
                                    style={tw`text-center text-sm capitalize ${duration === d ? 'text-white' : 'text-blackText'
                                        }`}
                                >
                                    {d}
                                </Text>
                            </TouchableOpacity>
                        ))}
                    </View>

                    {/* Entry Section */}
                    {isLoading ? <GlobalLoading /> : <View>
                        <Text style={tw`text-lg font-montserrat-700 text-blackish mb-3`}>
                            All Entries
                        </Text>

                        <FlatList
                            data={posts}
                            keyExtractor={(_, index) => String(index)}
                            renderItem={({ item }) => (
                                <View
                                    style={tw`bg-white border-l-4 border-[#BCBDC0] rounded-lg px-3 py-3 shadow-md m-1 mb-4`}
                                >
                                    <View style={tw`gap-3`}>
                                        <Text style={tw`text-blackish font-montserrat-700 text-base`}>
                                            {formatDate(item?.created_at)}
                                        </Text>

                                        <View>
                                            <View style={tw`flex-row justify-between items-center gap-1`}>
                                                <View style={tw`flex-row items-center gap-1`}>
                                                    <Text style={tw`text-blackish font-montserrat-700 text-base`}>
                                                        Say no to :
                                                    </Text>
                                                    <Text style={tw`text-base text-blackish  font-montserrat-600`}>
                                                        {item?.say_no}
                                                    </Text>
                                                </View>

                                                {deleted && (
                                                    <View style={tw`flex-row justify-end`}>
                                                        <TouchableOpacity onPress={() => handleDeleted(item?.id)}>
                                                            <SvgXml xml={IconsDeleted} />
                                                        </TouchableOpacity>
                                                    </View>
                                                )}
                                            </View>
                                        </View>
                                    </View>
                                </View>
                            )}
                            // nestedScrollEnabled={true}
                            onEndReached={handleLoadMore}
                            onEndReachedThreshold={0.5}
                            scrollEnabled={false}
                            ListFooterComponent={() =>
                                loadingMore ? (
                                    <GlobalLoading />
                                ) : null
                            }
                        />

                    </View>
                    }
                </View>
            </ScrollView>

            {/* Modal */}
            <NewModal
                visible={visible}
                onClose={async () => {
                    setVisible(false);
                    setLoadingMore(true);
                    await loadPosts(1, true);
                }}
            />

        </View>
    )
}
