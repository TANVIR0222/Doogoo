
// import { formatDate } from '@/src/lib/formatDate'
// import tw from '@/src/lib/tailwind'
// import { useLazyGetAllRedeemHistroyQuery } from '@/src/redux/rewardsApi/rewardsApi'
// import { makeImage } from '@/src/utils/image_converter'
// import { RedeemHistory } from '@/src/utils/rtkType'
// import React, { useEffect, useState } from 'react'
// import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native'
// import { useDebounce } from 'use-debounce'
// import RedemptionDetailsModal from './RedemptionDetailsModal'
// import SearchHabite from './SearchHabite'

// const RedeemHistorys = () => {
//     const [viewModal, setViewModal] = useState<boolean>(false)
//     const [posts, setPosts] = useState<RedeemHistory[]>([])
//     const [page, setPage] = useState<number>(1)
//     const [hasMore, setHasMore] = useState<boolean>(true)
//     const [refreshing, setRefreshing] = useState<boolean>(false)
//     const [loadingMore, setLoadingMore] = useState<boolean>(false)
//     const [fetchPosts, { isLoading }] = useLazyGetAllRedeemHistroyQuery()
//     const [search, setSearch] = useState<string>("")
//     const [debouncedSearch] = useDebounce(search, 1000) // 1 sec debounce
//     const [postId, setPostId] = useState<number>();


//     // Load posts function
//     const loadPosts = async (pageNum = 1, isRefresh = false, searchValue = "") => {
//         try {
//             const res = await fetchPosts({ page: pageNum, per_page: 10, search: searchValue }).unwrap()
//             const newPosts = res?.data?.data ?? []

//             if (isRefresh) {
//                 setPosts(newPosts)
//             } else {
//                 setPosts((prev) => [...prev, ...newPosts])
//             }

//             const currentPage = res?.data?.current_page ?? 0
//             const lastPage = res?.data?.last_page ?? 0

//             setHasMore(currentPage < lastPage)
//             setPage(currentPage + 1)
//         } catch (err) {
//             console.log("Fetch Error:", err)
//         } finally {
//             setRefreshing(false)
//             setLoadingMore(false)
//         }
//     }

//     // Pull-to-refresh handler
//     const handleRefresh = () => {
//         setRefreshing(true)
//         loadPosts(1, true, debouncedSearch)
//     }

//     // Load more handler
//     const handleLoadMore = () => {
//         if (!loadingMore && hasMore) {
//             setLoadingMore(true)
//             loadPosts(page, false, debouncedSearch)
//         }
//     }

//     // Initial load & search change
//     useEffect(() => {
//         setRefreshing(true)
//         loadPosts(1, true, debouncedSearch)
//     }, [debouncedSearch])

//     return (
//         <View>

//             <View style={tw` `}>
//                 <FlatList
//                     data={posts}
//                     keyExtractor={(item, index) => String(index)} // item.id safer than index
//                     renderItem={({ item, index }) => (
//                         <View style={tw`bg-primaryBg rounded-lg border-l-4  border-[#d9d9d9] p-4 mx-4 shadow-md mb-4`}>
//                             <View style={tw`flex-row flex-1 gap-2`}>

//                                 <View style={tw` items-start p-2 justify-start  rounded-lg`} >
//                                     <Image source={{ uri: makeImage(item?.reward?.partner?.avatar_url) }} style={tw`w-18 rounded-full h-18`} />
//                                 </View>

//                                 <View style={tw`flex-col   flex-1`}>
//                                     <View style={tw`flex-col   justify-between gap-2`}>
//                                         <View style={tw`flex-col gap-1  flex-1`}>
//                                             <Text style={tw`text-blackish font-montserrat-700 text-sm  `}>{item?.reward?.partner?.profile?.business_name ?? 'N/A'}</Text>
//                                             <Text style={tw`text-blackish font-montserrat-600 text-xs  `}>{item?.reward?.title}</Text>
//                                         </View>
//                                         <View style={tw`flex-row gap-3  flex-1`}>
//                                             <Text style={tw`text-blackish font-montserrat-600 text-xs  `}> {formatDate(item?.date)}</Text>
//                                         </View>
//                                     </View>
//                                     {/*  */}
//                                 </View>

//                                 <View style={tw`flex-col justify-between  `}>
//                                     <Text style={tw` font-montserrat-600 bg-blackish/20 px-2 py-1 items-center rounded   text-blackish`}>{item?.status}</Text>

//                                     <TouchableOpacity onPress={() => { setPostId(item?.id); setViewModal(!viewModal) }} style={tw` px-2 py-1 bg-blackish rounded-lg flex-row justify-center items-center gap-2.5`}>
//                                         <Text style={tw`text-primaryBg text-xs  font-montserrat-700`}>Details</Text>
//                                     </TouchableOpacity>
//                                 </View>

//                             </View>
//                         </View>
//                     )}
//                     showsVerticalScrollIndicator={false}
//                     nestedScrollEnabled={false}
//                     onEndReached={handleLoadMore}
//                     onEndReachedThreshold={0.5}
//                     refreshControl={
//                         <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#D6DF22" colors={["#D6DF22"]} />
//                     }
//                     ListHeaderComponent={<View style={tw` pb-4`}>
//                         <SearchHabite title='Available Rewards' addHeading='Rewards' search={search} setSearch={setSearch} />
//                     </View>
//                     }
//                     contentContainerStyle={{ paddingBottom: 10 }}
//                 />
//                 <RedemptionDetailsModal props={'USER'} viewModal={viewModal} setViewModal={setViewModal} id={Number(postId)} />

//             </View>

//         </View>
//     )
// }

// export default RedeemHistorys

import { formatDate } from '@/src/lib/formatDate';
import tw from '@/src/lib/tailwind';
import { useLazyGetAllRedeemHistroyQuery } from '@/src/redux/rewardsApi/rewardsApi';
import { makeImage } from '@/src/utils/image_converter';
import { RedeemHistory } from '@/src/utils/rtkType';
import { _width } from '@/src/utils/utils';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { useDebounce } from 'use-debounce';
import RedemptionDetailsModal from './RedemptionDetailsModal';
import SearchHabite from './SearchHabite';

const RedeemHistorys = () => {
    const [viewModal, setViewModal] = useState<boolean>(false);
    const [posts, setPosts] = useState<RedeemHistory[]>([]);
    const [page, setPage] = useState<number>(1);
    const [hasMore, setHasMore] = useState<boolean>(true);
    const [refreshing, setRefreshing] = useState<boolean>(false);
    const [loadingMore, setLoadingMore] = useState<boolean>(false);
    const [fetchPosts] = useLazyGetAllRedeemHistroyQuery();
    const [search, setSearch] = useState<string>("");
    const [debouncedSearch] = useDebounce(search, 500);
    const [postId, setPostId] = useState<number>();

    //  Fetch posts optimized
    const loadPosts = useCallback(async (pageNum = 1, isRefresh = false, searchValue = "") => {
        try {
            const res = await fetchPosts({ page: pageNum, per_page: 10, search: searchValue }).unwrap();
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
    }, [fetchPosts]);

    // 🔄 Pull to Refresh
    const handleRefresh = useCallback(() => {
        setRefreshing(true);
        loadPosts(1, true, debouncedSearch);
    }, [debouncedSearch, loadPosts]);

    // ⬇ Load More
    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true);
            loadPosts(page, false, debouncedSearch);
        }
    };

    // 🔍 Initial Load & Search
    useEffect(() => {
        setRefreshing(true);
        loadPosts(1, true, debouncedSearch);
    }, [debouncedSearch]);

    //  Render item (same design, cleaner structure)
    const renderItem = ({ item }: { item: RedeemHistory }) => (
        <View style={tw`bg-primaryBg rounded-lg border-l-4 border-[#d9d9d9] p-4 mx-4 shadow-md mb-4`}>
            <View style={tw`flex-row flex-1`}>
                <View style={tw`items-start p-2 justify-start rounded-lg`}>
                    <Image source={{ uri: makeImage(item?.reward?.partner?.avatar_url) }} style={tw`w-14 h-14 rounded-full`} />
                </View>

                <View style={tw`flex-col flex-1`}>
                    <View style={tw`flex-col justify-between gap-1`}>
                        <View style={tw`flex-col gap-1`}>
                            <Text style={tw`text-blackish font-montserrat-700 text-sm`}>
                                {item?.reward?.partner?.profile?.business_name?.slice(0, 15) ?? 'N/A'}
                            </Text>
                            <Text style={tw`text-blackish font-montserrat-600 text-xs`}>
                                {item?.reward?.title?.slice(0, 15)}
                            </Text>
                        </View>
                        <View style={tw`flex-row gap-3`}>
                            <Text style={tw`text-blackish font-montserrat-600 text-xs`}>
                                {formatDate(item?.date)}
                            </Text>
                        </View>
                    </View>
                </View>

                <View style={tw`flex-col gap-2 justify-between`}>
                    <Text style={[tw`font-montserrat-600 bg-blackish/20 px-2 py-1 rounded text-blackish`, { fontSize: _width < 375 ? 12 : 13 }]}>
                        {item?.status}
                    </Text>

                    <TouchableOpacity
                        onPress={() => { setPostId(item?.id); setViewModal(true); }}
                        style={tw`px-2 py-1 bg-blackish rounded-lg flex-row justify-center items-center`}>
                        <Text style={tw`text-primaryBg text-xs font-montserrat-700`}>Details</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );

    return (
        <View>
            <FlatList
                data={posts}
                keyExtractor={(item, index) => index?.toString()}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshControl={
                    <RefreshControl refreshing={refreshing} onRefresh={handleRefresh} tintColor="#D6DF22" colors={["#D6DF22"]} />
                }
                ListHeaderComponent={
                    <View style={tw`pb-4`}>
                        <SearchHabite title='Available Rewards' addHeading='Rewards' search={search} setSearch={setSearch} />
                    </View>
                }
                contentContainerStyle={{ paddingBottom: 100 }}
                initialNumToRender={10}
                windowSize={5}
                removeClippedSubviews={true}
            />

            {/* 🔍 Modal */}
            <RedemptionDetailsModal
                props={'USER'}
                viewModal={viewModal}
                setViewModal={setViewModal}
                id={Number(postId)}
            />
        </View>
    );
};

export default RedeemHistorys;
