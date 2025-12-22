import GlobalLoading from '@/src/components/GlobalLoading'
import RedemptionDetailsModal from '@/src/components/ui/RedemptionDetailsModal'
import Wrapper from '@/src/components/Wrapper'
import { formatDate } from '@/src/lib/formatDate'
import tw from '@/src/lib/tailwind'
import { useGetAllRedemptionsQuery, useLazyGetAllRedemptionsQuery } from '@/src/redux/redemptionsApi/redemptionsApi'
import { makeImage } from '@/src/utils/image_converter'
import { RedeemHistory } from '@/src/utils/rtkType'
import { _width } from '@/src/utils/utils'
import React, { useEffect, useState } from 'react'
import { FlatList, Image, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { RefreshControl } from 'react-native-gesture-handler'
import { useDebounce } from 'use-debounce'

export default function RedemptionsScreen() {
    const [viewModal, setViewModal] = React.useState<boolean>(false);
    const [posts, setPosts] = useState<RedeemHistory[]>([])
    const [page, setPage] = useState<number>(1)
    const [hasMore, setHasMore] = useState<boolean>(true)
    const [refreshing, setRefreshing] = useState<boolean>(false)
    const [loadingMore, setLoadingMore] = useState<boolean>(false)
    const [fetchPosts, { isLoading }] = useLazyGetAllRedemptionsQuery()
    const [search, setSearch] = useState<string>("")
    const [debouncedSearch] = useDebounce(search, 1000) // 1 sec debounce
    const { data } = useGetAllRedemptionsQuery({ page: 1, per_page: 10, search: "" })
    const [postId, setPostId] = useState<number>();

    console.log(postId);


    // Load posts functio
    const loadPosts = async (pageNum = 1, isRefresh = false, searchValue = "") => {
        try {
            const res = await fetchPosts({ page: pageNum, per_page: 10, search: searchValue }).unwrap()
            const newPosts = res?.data?.redeem_histories?.data ?? []

            if (isRefresh) {
                setPosts(newPosts)
            } else {
                setPosts((prev) => [...prev, ...newPosts])
            }

            const currentPage = res?.data?.redeem_histories?.current_page ?? 0
            const lastPage = res?.data?.redeem_histories?.last_page ?? 0

            setHasMore(currentPage < lastPage)
            setPage(currentPage + 1)
        } catch (err) {
            console.log("Fetch Error:", err)
        } finally {
            setRefreshing(false)
            setLoadingMore(false)
        }
    }

    // Pull-to-refresh handler
    const handleRefresh = () => {
        setRefreshing(true)
        loadPosts(1, true, debouncedSearch)
    }

    // Load more handler
    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true)
            loadPosts(page, false, debouncedSearch)
        }
    }

    // Initial load & search change
    useEffect(() => {
        setRefreshing(true)
        loadPosts(1, true, debouncedSearch)
    }, [debouncedSearch])




    return (
        <View style={tw`flex-1 bg-primaryBg`}>
            <Wrapper>
                <View style={tw`py-4`}>
                    <Text style={tw`text-blackish font-montserrat-600 text-xl`}>
                        Redemptions
                    </Text>

                    <View style={tw`flex-col gap-2 py-5`}>
                        <View style={tw`flex-row justify-between items-center`}>
                            <View style={tw`flex-row items-center gap-1 `}>
                                <Text style={[tw`text-blackish font-montserrat-500 `, { fontSize: _width * 0.03 }]}>
                                    Redemption completed
                                </Text>
                                <Text style={tw` text-green-500 rounded-full font-montserrat-700 text-xs `}>
                                    {data?.data?.redemption_completed ?? 0}
                                </Text>
                            </View>
                            <View style={tw`flex-row items-center justify-center gap-1 `}>
                                <Text style={[tw`text-blackish font-montserrat-500 text-sm`, { fontSize: _width * 0.03 }]}>
                                    Redemption pending
                                </Text>
                                <Text style={tw` text-orange-500 rounded-full font-montserrat-700 text-xs`}>
                                    {data?.data?.redemption_pending ?? 0}
                                </Text>
                            </View>
                        </View>

                    </View>
                    <View style={tw``}>
                        <TextInput
                            style={tw`
                        py-3 px-4 font-montserrat-600 border-[1px] border-[rgba(165,165,165,0.5)]
                        rounded-full text-blackish
                    `}
                            placeholder="search by cupoon code"
                            placeholderTextColor="#3e3e3f80"
                            returnKeyType="search"
                            clearButtonMode="while-editing"
                            onChangeText={setSearch}
                            value={search}
                        />
                    </View>
                </View>

                {/* Content / List */}
                <FlatList
                    data={posts}
                    keyExtractor={(item, index) => String(index)} // item.id safer than index
                    renderItem={({ item, index }) => {
                        return (
                            <View style={tw`bg-primaryBg rounded-lg border-l-4 border-[#d9d9d9] p-4 shadow-md mb-4`}>
                                <View style={tw`flex-row flex-1 gap-2`}>

                                    <View style={tw`bg-[#d9d9d9] h-14 w-14 items-center  justify-center  rounded-lg`} >
                                        <Image source={{ uri: makeImage(item?.user?.avatar_url) }} style={tw`h-14 w-14`} />
                                    </View>

                                    <View style={tw`flex-col   flex-1`}>
                                        <View style={tw`flex-col   justify-between gap-2`}>
                                            <View style={tw`flex-col  gap-0.5  flex-1`}>
                                                <Text style={[tw`text-blackish font-montserrat-700   `, { fontSize: _width < 375 ? 13 : 15 }]}>{item?.user?.full_name?.slice(0, 15)}</Text>
                                                <Text style={[tw`text-blackish font-montserrat-600 `, { fontSize: _width < 375 ? 12 : 15 }]}>{item?.reward?.title.slice(0, 15)}</Text>
                                                <Text style={tw`text-blackish font-montserrat-600 text-xs  `}> {formatDate(item?.date)}</Text>
                                            </View>

                                        </View>
                                    </View>

                                    <View style={tw`flex-col justify-between  `}>
                                        <Text style={tw`text-blackish font-montserrat-600 text-xs bg-blackish/20 px-2 py-1 rounded`}>
                                            {item?.status}
                                        </Text>
                                        <TouchableOpacity onPress={() => { setViewModal(!viewModal); setPostId(item?.id) }} style={tw` px-2 py-1 bg-blackish rounded-lg flex-row justify-center items-center gap-2.5`}>
                                            <Text style={tw`text-primaryBg text-xs  font-montserrat-700`}>Details</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            </View>
                        )
                    }}
                    showsVerticalScrollIndicator={false}
                    nestedScrollEnabled={false}
                    onEndReached={handleLoadMore}
                    onEndReachedThreshold={0.5}
                    refreshControl={
                        <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#D6DF22" colors={["#D6DF22"]} />
                    }
                    ListFooterComponent={() => (loadingMore ? <GlobalLoading /> : null)}
                />


                <RedemptionDetailsModal props={'stor'} viewModal={viewModal} setViewModal={setViewModal} partnaer_id={postId} />

            </Wrapper>
        </View>
    )
}
