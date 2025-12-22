import { IconContact } from "@/assets/icons";
import InvitedFriend from "@/src/components/ui/InvitedFriend";
import { usePlanFeatures } from "@/src/hooks/useCheckPreminum";
import tw from "@/src/lib/tailwind";
import { useGetContactQuery } from "@/src/redux/contactApi/contactApi";
import { useInvitedFriendMutation, useLazyGetAllJointUserQuery } from "@/src/redux/groupApi/groupApi";
import { makeImage } from "@/src/utils/image_converter";
import { Friend } from "@/src/utils/rtkType";
import * as Contacts from 'expo-contacts';
import { useLocalSearchParams } from "expo-router";
import React, { useCallback, useEffect, useState } from "react";
import {
    Alert,
    FlatList,
    Image,
    RefreshControl,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from "react-native";
import { SvgXml } from "react-native-svg";
import Toast from "react-native-toast-message";
import { useDebounce } from "use-debounce";

const FriendView = () => {

    const { id: invited_id } = useLocalSearchParams<{ id: string }>();
    const [modalVisible, setModalVisible] = useState<boolean>(false);


    // -------------------- State --------------------
    const [friends, setFriends] = useState<Friend[]>([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [refreshing, setRefreshing] = useState(false);
    const [loadingMore, setLoadingMore] = useState(false);
    const [search, setSearch] = useState("");
    const [debouncedSearch] = useDebounce(search, 500);
    const [userId, setUserId] = useState<number>();
    const [contactsSynced, setContactsSynced] = useState(false);
    const [syncNumber, setSyncNumber] = useState(false);
    const [storeNumber, setStoreNumber] = useState<string[]>([]);
    const [userInfo, setUserInfo] = useState<any[]>([]);

    // -------------------- API --------------------
    const [fetchFriends, { isLoading }] = useLazyGetAllJointUserQuery();
    const [inviteFriend, { isLoading: isLoadingInvite }] = useInvitedFriendMutation();
    const { data } = useGetContactQuery({ contact_lists: storeNumber }, { skip: !contactsSynced });

    // ------------------ chack subcription ------------------
    const { unlimitedHabitsTracking } = usePlanFeatures();

    const isPremiumUser = React.useMemo(() => {
        // Use optional chaining (?) for safety, in case 
        // unlimitedHabitsTracking might be null or undefined initially
        return unlimitedHabitsTracking?.includes('Creating a challenge group');
    }, [unlimitedHabitsTracking])




    //  ----------------------- Sync Contacts -----------------------
    const handleSyncContacts = useCallback(async () => {
        try {
            // 1 Permission 
            const { status } = await Contacts.requestPermissionsAsync();
            if (status !== "granted") {
                return Alert.alert("Permission Denied", "Please allow contacts access.");
            }

            // 2️ Contacts
            const { data } = await Contacts.getContactsAsync({
                fields: [Contacts.Fields.PhoneNumbers],
            });



            if (data.length > 0) {
                setUserInfo(data);
                (() => (
                    Toast.show({
                        type: "success",
                        text2: "Contacts synced successfully",
                        visibilityTime: 2000,
                    })
                ))()
            }
            // Return number exactly as it is
            const keepOriginalNumber = (num: string) => {
                return num?.trim();
            };

            // Valid Numbers Filter + Keep Original
            const validNumbers = data
                .filter((c: any) => c.phoneNumbers?.[0]?.number)
                .map((c: any) => keepOriginalNumber(c.phoneNumbers[0].number));

            setStoreNumber(validNumbers);
            setContactsSynced(true);
            setSyncNumber(true);


        } catch (error) {
            console.error("Error syncing contacts:", error);
            Alert.alert("Error", "Failed to sync contacts. Please try again.");
        }
    }, [])


    // -------------------- Load Friends --------------------
    const loadFriends = useCallback(
        async (pageNum = 1, isRefresh = false, searchValue = "") => {
            try {
                const res = await fetchFriends({
                    page: pageNum,
                    per_page: 10,
                    search: searchValue,
                }).unwrap();

                const newFriends = res?.data?.data ?? [];

                setFriends((prev) => (isRefresh ? newFriends : [...prev, ...newFriends]));

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
        },
        [fetchFriends]
    );

    // --------------------invete friend --------------------
    const handleInviteFriend = useCallback(async (id: number) => {
        if (!invited_id) {
            return;
        }

        try {
            const res = await inviteFriend({ user_id: id, challenge_group_id: invited_id }).unwrap();

            if (res?.status) {
                Toast.show({
                    type: "success",
                    text2: "You invited user to the challenge successfully 🎉",
                    visibilityTime: 2000,
                });
            }
        } catch (error) {
            console.error("Error inviting friend:", error);
        }
    }, [invited_id, inviteFriend]);

    // -------------------- Handlers --------------------
    const handleRefresh = () => {
        setRefreshing(true);
        loadFriends(1, true, debouncedSearch);
    };

    const handleLoadMore = () => {
        if (!loadingMore && hasMore) {
            setLoadingMore(true);
            loadFriends(page, false, debouncedSearch);
        }
    };

    // -------------------- Effect --------------------
    useEffect(() => {
        setRefreshing(true);
        loadFriends(1, true, debouncedSearch);
    }, [debouncedSearch, loadFriends]);

    // -------------------- Render Item --------------------
    const renderItem = useCallback(({ item }: { item: Friend }) => {
        return (
            <View style={tw`flex-col mb-3`}>
                <View
                    style={tw`flex-row justify-between items-center gap-2 p-2 border bg-white border-l-4 border-[#BCBDC0] rounded-lg`}
                >
                    <View style={tw`flex-row items-center gap-2`}>
                        <Image
                            source={{ uri: makeImage(item.avatar_url) }}
                            style={tw`w-14 h-14 rounded-full`}
                        />
                        <Text style={tw`text-base text-blackText font-montserrat-600`}>
                            {item.full_name}
                        </Text>
                    </View>
                    <TouchableOpacity disabled={isLoadingInvite || !isPremiumUser} onPress={() => {
                        handleInviteFriend(item.id);
                        if (!invited_id) {
                            setUserId(item?.id);
                            setModalVisible(true);
                        }
                    }} style={tw`px-3 py-1 ${isLoadingInvite ? 'bg-blackish/40' : 'bg-blackish'} rounded-lg`}>
                        <Text style={tw`text-sm text-white font-montserrat-600`}>Invite</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }, [handleInviteFriend, invited_id, isLoadingInvite, isPremiumUser]);


    if (data?.data?.length === 0) {
        (() => (
            Toast.show({
                type: "error",
                text2: "No contacts found ",
                visibilityTime: 2000,
            })
        ))();
    }

    const renderData = contactsSynced && data?.data?.length > 0
        ? data?.data
        : friends;

    // -------------------- Main --------------------

    return (
        <View style={tw`flex-1 flex-col gap-2 bg-primaryBg px-[4%] pt-4`}>
            <Text style={tw`text-base text-blackText font-montserrat-700`}>
                Friend Suggestions
            </Text>

            <TextInput
                style={tw`py-3 px-4 font-montserrat-600 border-[1px] border-[rgba(165,165,165,0.5)] rounded-full text-blackish`}
                placeholder="Search"
                placeholderTextColor="#3e3e3f80"
                returnKeyType="search"
                clearButtonMode="while-editing"
                value={search}
                onChangeText={setSearch}
            />



            <FlatList
                data={renderData}
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
                contentContainerStyle={{ paddingTop: 10, paddingBottom: 10 }}
                ListHeaderComponent={<View>
                    {!syncNumber && !contactsSynced && (
                        <View
                            style={tw`flex-row items-center justify-between bg-white p-3 shadow-sm  border-l-4 border-yellowGreen mr-1 rounded-lg  mb-4`}
                        >
                            <View style={tw`flex-row items-center gap-3`}>
                                <View style={tw` p-2 border-yellowGreen border rounded-full`}>
                                    <SvgXml xml={IconContact} width={25} height={25} />
                                </View>
                                <View>
                                    <Text style={tw`text-base font-montserrat-700 text-[#121212] `}>
                                        Contact Sync
                                    </Text>
                                    <Text style={tw`text-xs font-montserrat-400 text-blackText`}>
                                        Find people you know
                                    </Text>
                                </View>
                            </View>
                            <View style={tw`flex-row items-center gap-2`}>
                                <TouchableOpacity
                                    onPress={() => handleSyncContacts()}
                                    style={tw`bg-yellowGreen px-4 py-1 rounded-full`}
                                >
                                    <Text style={tw`text-white text-sm font-montserrat-600 `}>Sync</Text>
                                </TouchableOpacity>

                            </View>
                        </View>
                    )}
                </View>}
            />
            <InvitedFriend modalVisible={modalVisible} setModalVisible={setModalVisible} user_id={String(userId)} />

        </View>
    );
};

export default FriendView;
