import { usePlanFeatures } from '@/src/hooks/useCheckPreminum';
import tw from '@/src/lib/tailwind';
import { useLazyGetAllAvailableRewardsQuery } from '@/src/redux/rewardsApi/rewardsApi';
import { makeImage } from '@/src/utils/image_converter';
import { RewardItem } from '@/src/utils/rtkType';
import { _width } from '@/src/utils/utils';
import { router, useFocusEffect } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { FlatList, Image, RefreshControl, Text, TouchableOpacity, View } from 'react-native';
import { useDebounce } from 'use-debounce';
import RedeemModal from './RedeemModal';
import SearchHabite from './SearchHabite';

const AvailableRewardsCard = () => {
  const [viewModal, setViewModal] = useState<boolean>(false);
  const [posts, setPosts] = useState<RewardItem[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [loadingMore, setLoadingMore] = useState<boolean>(false);
  const [search, setSearch] = useState<string>("");
  const [debouncedSearch] = useDebounce(search, 500);
  const [postId, setPostId] = useState<number>();

  const [fetchPosts, { reset }] = useLazyGetAllAvailableRewardsQuery();
  useFocusEffect(
    useCallback(() => {
      reset(); // Clear cached data
      loadPosts(1, true); // Optional: fetch fresh data
    }, [reset])
  );

  const { rewardRedemptionPremium } = usePlanFeatures();


  //  Fetch function
  const loadPosts = useCallback(async (pageNum = 1, isRefresh = false, searchValue = "") => {
    try {
      const res = await fetchPosts({ page: pageNum, per_page: 10, search: searchValue, radius: 10 }).unwrap();
      const newPosts = Array.isArray(res?.data?.data?.data) ? res.data.data.data : [];

      // console.log('Fetched Posts:', newPosts);

      // if (isRefresh) {
      //   setPosts(newPosts);
      // } else {
      //   setPosts(prev => [...prev, ...newPosts]);
      // }

      // CHANGE HERE: Use replacement logic if it's page 1 OR an explicit refresh
      if (isRefresh || pageNum === 1) {
        setPosts(newPosts); //  Replace the existing posts
      } else {
        setPosts((prev) => [...prev, ...newPosts]); // Append new posts
      }

      // setHasMore(res?.data?.current_page < res?.data?.last_page);
      // setPage(res?.data?.current_page + 1);

      const currentPage = res?.data?.data?.current_page ?? 0;
      const lastPage = res?.data?.data?.last_page ?? 0;

      setHasMore(currentPage < lastPage);
      setPage(currentPage + 1);
    } catch (err) {
      console.log("Fetch Error:", err);
    } finally {
      setRefreshing(false);
      setLoadingMore(false);
    }
  }, [fetchPosts]);

  //  Pull to refresh
  const handleRefresh = useCallback(() => {
    setRefreshing(true);
    loadPosts(1, true, debouncedSearch);
  }, [debouncedSearch, loadPosts]);

  // ⬇ Load more on scroll
  const handleLoadMore = () => {
    if (!loadingMore && hasMore) {
      setLoadingMore(true);
      loadPosts(page, false, debouncedSearch);
    }
  };

  // Search or first load
  useEffect(() => {
    setRefreshing(true);
    loadPosts(1, true, debouncedSearch);
  }, [debouncedSearch]);

  console.log(`post add`, posts);

  const renderItem = useCallback(({ item }: { item: RewardItem }) => {
    return (
      <View style={tw`bg-primaryBg rounded-lg border-l-4 border-[#d9d9d9] p-4 mx-4 shadow-md mb-4`}>
        <View style={tw`flex-row gap-8`}>
          <View style={tw` items-center justify-center rounded-lg`}>
            <Image source={{ uri: makeImage(item?.image || item?.image_url) }} resizeMode='cover' style={tw`w-22  rounded  h-22`} />
          </View>

          <View style={tw`flex-1 flex-col gap-3`}>
            <View>
              <Text style={tw`text-blackish font-montserrat-700 text-base`}>
                {item?.title?.slice(0, 15)}
              </Text>
              <Text style={tw`text-xs text-blackText font-montserrat-500`}>
                Address : {item?.location}
              </Text>
            </View>
            <Text style={tw`text-blackish font-montserrat-600 text-xs`}>
              {item?.description}
            </Text>
            <View>
              <Text style={tw`text-[#ff8c00] font-montserrat-700 text-base`}>
                {item?.purchase_point} points
              </Text>
              {/* <Text style={[tw`text-[#ff8c00] font-montserrat-600`, {
                fontSize: _width < 375 ? 10 : 12,
              }]}>
                Address : {item?.location}
              </Text> */}
              <Text style={[tw`text-[#ff8c00] font-montserrat-600`, {
                fontSize: _width < 375 ? 10 : 12,
              }]}>
                Distance: {item?.distance}
              </Text>
            </View>

            <TouchableOpacity
              onPress={() => {
                if (rewardRedemptionPremium) {
                  setViewModal(true);
                  setPostId(item?.id);
                } else {
                  router.push('/subcription-modal');
                }
              }}
              style={tw`px-2.4 py-2 bg-neutral-700 rounded-full justify-center items-center`}
            >
              <Text style={tw`text-white text-xs font-montserrat-400`}>Redeem</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    )
  }, []);

  return (
    <View style={tw`flex`}>
      <FlatList
        data={posts}
        keyExtractor={(item, index) => String(index)}
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
        contentContainerStyle={{ paddingBottom: 70 }}
        initialNumToRender={10}
        windowSize={5}
        removeClippedSubviews={true}
        maxToRenderPerBatch={10}
      />

      <RedeemModal viewModal={viewModal} setViewModal={setViewModal} id={Number(postId)} />
    </View>
  );
};

export default AvailableRewardsCard;
