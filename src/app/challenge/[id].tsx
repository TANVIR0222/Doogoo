import GlobalLoading from '@/src/components/GlobalLoading';
import ConModal from '@/src/components/ui/ConModal';
import HeadingTop from '@/src/components/ui/HeadingTop';
import ProgressBar from '@/src/components/ui/ProgressBar';
import { usePlanFeatures } from '@/src/hooks/useCheckPreminum';
import tw from '@/src/lib/tailwind';
import {
    useGetAllJointGroupQuery,
    useUserJoinGroupMutation,
    useUserLogProgressGroupMutation
} from '@/src/redux/groupApi/groupApi';
import { useGetSingleGroupQuery } from '@/src/redux/singleGroupView/singleGroupApi';
import { makeImage } from '@/src/utils/image_converter';
import { router, useLocalSearchParams } from 'expo-router';
import React, { useCallback, useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';

const AllChallange = () => {

    console.log('--------------------------');


    const { id } = useLocalSearchParams<{ id?: string }>();
    console.log(id);






    // ------------------ use state ------------------
    const [visible, setVisible] = useState(false);
    const [userId, setUserId] = useState<number | undefined>();
    const [loadingId, setLoadingId] = useState(null);
    const [joind, setJoindId] = useState(null);

    // ------------------ use query ------------------
    const [joinGroup, { isLoading: isLoadingJoin }] = useUserJoinGroupMutation();
    const [logProgress, { isLoading: isLoadingPress }] = useUserLogProgressGroupMutation();
    const { data } = useGetAllJointGroupQuery();


    // ------------------ use params ------------------
    const { data: groupData, isLoading } = useGetSingleGroupQuery(id!, {
        skip: !id,
    }); console.log(groupData);




    // ------------------ get challenge data ------------------
    const item = groupData?.data?.[0];






    // ------------------ chack subcription ------------------
    const { unlimitedHabitsTracking } = usePlanFeatures();

    const isPremiumUser = React.useMemo(() => {
        return unlimitedHabitsTracking?.includes('Creating a challenge group');
    }, [unlimitedHabitsTracking])



    const joinedIds = data?.join_group_ids ?? [];
    const alreadyJoined = item ? joinedIds.includes(item?.id) : false;


    // -------------------- Load Posts --------------------


    // -------------------- Handlers --------------------

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
                const res = await logProgress(groupId).unwrap();
                console.log(
                    res
                );

                router.push({ pathname: '/view-details/view-details-log-progress', params: { id: groupId } });
                setLoadingId(null);
            } catch (err) {
                console.log('Log Progress Error:', err);
            }
        },
        [logProgress]
    );


    return isLoading || !item ? <GlobalLoading /> : (
        <View style={tw`flex-1  bg-primaryBg`}>

            {/* top header */}
            <HeadingTop />

            {/* Challenge Card */}
            <View style={tw`bg-white mx-2 mt-10 border-l-4 h-56 border-[#BCBDC0] rounded-lg p-3 shadow-md mb-4`}>
                {/* Header */}
                <View style={tw`flex-row items-center justify-between border-b-[1px] border-gray py-2`}>
                    <Text style={tw`text-blackish font-montserrat-700 text-sm`}>{item?.group_name}</Text>
                    <View style={tw`px-2.4 py-1 bg-neutral-700 rounded flex-row justify-center items-center gap-2.5`}>
                        <Text style={tw`text-white text-xs font-semibold font-montserrat-400`}>{item?.status}</Text>
                    </View>
                </View>

                {/* Progress Bars */}
                <View style={tw`flex-col gap-4 mt-2`}>
                    <View>
                        <View style={tw`flex-row items-center justify-between`}>
                            <Text style={tw`text-blackish font-montserrat-700 text-sm`}>My Daily Progress</Text>
                            <Text style={tw`text-blackish font-montserrat-600 text-sm`}>{item?.my_daily_progress}%</Text>
                        </View>
                        <ProgressBar height={6} progress={item?.my_daily_progress} color="#D6DF22" />
                    </View>

                    <View>
                        <View style={tw`flex-row items-center justify-between`}>
                            <Text style={tw`text-blackish font-montserrat-700 text-sm`}>Group Daily Progress</Text>
                            <Text style={tw`text-blackish font-montserrat-600 text-sm`}>{item?.group_daily_progress}%</Text>
                        </View>
                        <ProgressBar height={6} progress={item?.group_daily_progress} color="#3E3E3F" />
                    </View>
                </View>

                {/* Participants */}
                <View style={tw`flex-row items-center gap-1 mt-2`}>
                    <Text style={tw`text-blackish text-xs font-semibold font-montserrat-600`}>Participants:</Text>
                    <View style={tw`flex-row items-center`}>
                        {item?.member_lists?.map((m: any, idx: any) => (
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
                <View style={tw`flex-row items-center justify-between  mt-2`}>
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

            {/* Modals */}
            <ConModal prors="ativeChallange" visible={visible} onClose={() => setVisible(!visible)} userId={userId} />
        </View>
    );
};

export default AllChallange;