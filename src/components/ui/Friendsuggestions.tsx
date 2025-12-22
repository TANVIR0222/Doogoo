import { IconsInviteCancle } from '@/assets/icons'
import { usePlanFeatures } from '@/src/hooks/useCheckPreminum'
import tw from '@/src/lib/tailwind'
import { useLazyGetAllJointUserQuery } from '@/src/redux/groupApi/groupApi'
import { makeImage } from '@/src/utils/image_converter'
import { Friend } from '@/src/utils/rtkType'
import { router } from 'expo-router'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import InvitedFriend from './InvitedFriend'

const Friendsuggestions = () => {
    const [modalVisible, setModalVisible] = useState(false)
    const [posts, setPosts] = useState<Friend[]>([])
    const [page, setPage] = useState(1)
    const [hasMore, setHasMore] = useState(true)
    const [refreshing, setRefreshing] = useState(false)
    const [loadingMore, setLoadingMore] = useState(false)
    const [userId, setUserId] = useState<number>()

    const { unlimitedHabitsTracking } = usePlanFeatures()

    const isPremiumUser = useMemo(
        () => unlimitedHabitsTracking?.includes('Creating a challenge group'),
        [unlimitedHabitsTracking]
    )

    const [fetchPosts, { isLoading }] = useLazyGetAllJointUserQuery()

    const loadPosts = useCallback(
        async (pageNum = 1, isRefresh = false) => {
            try {
                const res = await fetchPosts({ page: pageNum, per_page: 10 }).unwrap()
                const newPosts = res?.data?.data ?? []

                setPosts(prev =>
                    isRefresh ? newPosts : [...prev, ...newPosts]
                )

                const currentPage = res?.data?.current_page ?? 0
                const lastPage = res?.data?.last_page ?? 0
                setHasMore(currentPage < lastPage)
                setPage(currentPage + 1)
            } catch (err) {
                console.log('Fetch Error:', err)
            } finally {
                setRefreshing(false)
                setLoadingMore(false)
            }
        },
        [fetchPosts]
    )

    const handleRefresh = () => {
        setRefreshing(true)
        loadPosts(1, true)
    }

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true)
            loadPosts(page)
        }
    }

    useEffect(() => {
        setRefreshing(true)
        loadPosts(1, true)
    }, [loadPosts])

    //  Remove card when cancel icon pressed
    const handleRemoveCard = useCallback(
        (id: number) => setPosts(prev => prev.filter(item => item.id !== id)),
        []
    )

    const renderItem = useCallback(({ item }: { item: Friend }) => (
        <View style={tw`flex-row mr-4`}>
            <View style={tw`relative border-2 flex-col gap-2 items-center px-8 py-3 rounded-2xl`}>
                <TouchableOpacity
                    onPress={() => handleRemoveCard(item.id)}
                    style={tw`absolute right-2 top-5`}
                    activeOpacity={0.7}
                >
                    <SvgXml xml={IconsInviteCancle} width={15} height={15} />
                </TouchableOpacity>

                <Image
                    source={{ uri: makeImage(item.avatar_url) }}
                    style={tw`w-13 h-13 rounded-full`}
                />
                <Text style={tw`text-base text-blackText font-montserrat-600`}>
                    {item?.full_name}
                </Text>
                <TouchableOpacity
                    onPress={() => {
                        isPremiumUser ? setModalVisible(true) : router.push('/subcription-modal')
                        setUserId(item.id)
                    }}
                    style={tw`px-2 py-1 bg-blackish rounded-lg flex-row justify-center items-center gap-2.5`}
                >
                    <Text style={tw`text-base text-white font-montserrat-600`}>Invite</Text>
                </TouchableOpacity>
            </View>
        </View>
    ), [handleRemoveCard, isPremiumUser])



    return (
        <View style={tw`flex-col gap-2 pb-4`}>
            <View style={tw`flex-row items-center justify-between`}>
                <Text style={tw`text-base text-blackText font-montserrat-700`}>
                    Friend suggestions
                </Text>
                <TouchableOpacity
                    onPress={() => router.push('/(common)/friendView')}
                    style={tw`px-3 py-1 bg-blackish rounded-lg flex-row justify-center items-center gap-2.5`}
                >
                    <Text style={tw`text-sm text-white font-montserrat-600`}>View All</Text>
                </TouchableOpacity>
            </View>

            <FlatList
                data={posts}
                keyExtractor={item => String(item.id)}
                horizontal
                showsHorizontalScrollIndicator={false}
                renderItem={renderItem}
                contentContainerStyle={{ paddingVertical: 10 }}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.5}
                refreshing={refreshing}
                onRefresh={handleRefresh}
                initialNumToRender={10}
                maxToRenderPerBatch={10}
                windowSize={5}
                removeClippedSubviews
            />

            <InvitedFriend
                modalVisible={modalVisible}
                setModalVisible={setModalVisible}
                user_id={String(userId)}
            />
        </View>
    )
}

export default Friendsuggestions
