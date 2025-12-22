import { IconsAbout, IconsChangePassword, IconsDataPrivacy, IconsHandler, IconsNotification, IconsProfile, IconsTermsConditionsy } from '@/assets/icons';
import HabitCompletionRateGraph from '@/src/components/ui/HabitCompletionRateGraph';
import HabitTracker from '@/src/components/ui/HabitTracker';
import Logout from '@/src/components/ui/Logout';
import ProductivityInsightsGraph from '@/src/components/ui/ProductivityInsightsGraph';
import SubscriptionCard from '@/src/components/ui/SubscriptionCard';
import EnhancedSubscriptionHeader from '@/src/components/ui/SubscriptionHeader';
import WorkoutProgress from '@/src/components/ui/WorkoutProgress';
import { usePlanFeatures } from '@/src/hooks/useCheckPreminum';
import { formatDate } from '@/src/lib/formatDate';
import tw from '@/src/lib/tailwind';
import { useCheckPremiumUserQuery, useGetAdvanceUserDataQuery } from '@/src/redux/advanceFeaturesApi/advanceFeaturesApi';
import { useUserGetProfileQuery } from '@/src/redux/authApi/authApiSlice';
import { useGetAllNotificationsCountQuery, useReadAllNotificationsMutation } from '@/src/redux/notificationsApi/notificationsApi';
import { makeImage } from '@/src/utils/image_converter';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { ActivityIndicator, RefreshControl, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';


interface MenuItem {
    icon: any;
    label: string;
    route: string;
    badge?: number;
}

const ProfileHeader = () => {

    //  ------  state ------------------
    const [settingView, setSettingView] = useState<boolean>(false);
    const [refreshing, setRefreshing] = React.useState(false);
    const [imageLoading, setImageLoading] = React.useState(true);

    // ------  RTK Query ------------------
    const { data: userData, refetch, isLoading } = useUserGetProfileQuery();
    const { data: advanceData, isLoading: advanceLoading, refetch: userRefetch } = useGetAdvanceUserDataQuery();
    const { data } = useGetAllNotificationsCountQuery();
    const [readAllNotifications] = useReadAllNotificationsMutation();
    const { data: premium } = useCheckPremiumUserQuery();

    const role = userData?.data?.user?.role;
    const unreadCount = data?.unread_count ?? 0;
    // const hasPremium = advancedAnalytics
    const { advancedAnalytics, refetch: graphRefetch } = usePlanFeatures();




    // ------  refresh ------------------
    const onRefresh = React.useCallback(async () => {
        try {
            setRefreshing(true);
            await userRefetch();
            await graphRefetch();
        } finally {
            setRefreshing(false);
        }
    }, [userRefetch, graphRefetch]);



    const menuItems: MenuItem[] = [
        { icon: IconsProfile, label: "My Profile", route: "/(common)" },
        { icon: IconsChangePassword, label: "Change Password", route: "/(common)/change-password" },
        {
            icon: IconsNotification, label: "Notification", route: "/(common)/notification", badge: unreadCount > 0 ? (unreadCount < 99 ? unreadCount : "99+") : null,
        },
        { icon: IconsAbout, label: "About Us", route: "/(common)/about-us" },
        { icon: IconsDataPrivacy, label: "Data Privacy", route: "/(common)/dataprivacy" },
        { icon: IconsTermsConditionsy, label: "Terms & Conditions", route: "/(common)/termsandconditions" },
    ];

    const handleNotification = async () => {
        try {
            await readAllNotifications().unwrap();
        } catch (error) {
            console.log(error);
        }

    }


    return advanceLoading || isLoading ?

        <View style={tw`flex-1 bg-primaryBg items-center justify-center `}>
            <ActivityIndicator size="large" color="#D6DF22" />
        </View> :
        (
            <ScrollView
                refreshControl={
                    <RefreshControl
                        refreshing={refreshing}
                        onRefresh={onRefresh}
                        colors={["#D6DF22"]}
                        tintColor="#D6DF22"
                    />
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ backgroundColor: "#F5F5F5" }}

            >
                <View style={tw` flex-1 px-[4%] bg-white flex-col gap-4  pt-5 relative`}>
                    {/* Top Header */}
                    <View style={tw`flex-row items-center justify-between relative`}>
                        <Text style={tw`text-black text-xl font-montserrat-700`}>
                            My Profile
                        </Text>

                        <TouchableOpacity
                            onPress={() => setSettingView((prev) => !prev)}
                            hitSlop={10}
                            accessibilityLabel="Open Settings"
                        >
                            <SvgXml xml={IconsHandler} width={24} height={24} />
                        </TouchableOpacity>

                        {/* Dropdown Menu */}
                        {settingView && (
                            <View style={tw`absolute top-10 right-0 z-50 bg-white rounded-lg shadow-lg`}>
                                {menuItems.map((item, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        style={tw`py-3 px-5`}
                                        onPress={() => {
                                            setSettingView(false);
                                            router.push(item?.route);
                                            item?.route === "/(common)/notification" && handleNotification();
                                        }}
                                    >
                                        <View style={tw`flex-row items-center   gap-1`}>
                                            <SvgXml xml={item.icon} width={24} height={24} style={tw`relative`} />
                                            {item?.badge && (
                                                <Text
                                                    style={tw`absolute -top-2  -left-2
                                                 bg-yellowGreen w-6 h-6 rounded-full items-center justify-center text-black text-sm text-center leading-6`}
                                                >
                                                    {item?.badge}
                                                </Text>
                                            )}
                                            <Text style={tw`text-black text-sm`}>{item?.label}</Text>
                                        </View>
                                    </TouchableOpacity>
                                ))}
                                <Logout setSettingView={() => setSettingView(true)} />
                            </View>
                        )}

                    </View>



                    {/* Profile Info */}
                    <View style={tw`mt-6 flex-row items-center`}>
                        <Image
                            style={[
                                tw`w-24 h-24 rounded-full bg-gray  mr-4`,
                                data?.data?.is_premium_check && tw`border-2 border-orange-500`,
                            ]} source={{ uri: makeImage(userData?.data?.user?.avatar_url) }}
                            contentFit="cover"
                            transition={300}
                            onLoad={() => setImageLoading(false)}
                        />


                        <View style={tw`flex-1`}>
                            {
                                role === 'USER' && <View>
                                    <Text style={tw`text-blackish text-lg font-montserrat-800`}>{advanceData?.data?.user?.full_name || userData?.data?.user?.full_name}</Text>
                                    <Text style={tw`text-blackish text-xs font-montserrat-600 mt-1`}>Level {advanceData?.data?.level} Habit Hero</Text>
                                    <Text style={tw`text-orange-500 text-lg font-montserrat-700 mt-1`}>{advanceData?.data?.total_points} points</Text>
                                </View>

                            }
                            {
                                role === 'PARTNER' && <View>
                                    <Text style={tw`text-blackish text-xl font-montserrat-700`}>{userData?.data?.user?.profile?.business_name || 'N/A'}</Text>
                                    <Text style={tw`text-blackish text-sm font-montserrat-600`}>{userData?.data?.user?.profile?.category || 'N/A'}</Text>
                                    <Text style={tw`text-blackish text-base font-montserrat-600 `}>{userData?.data?.user?.full_name || 'N/A'}</Text>
                                </View>
                            }
                        </View>

                    </View>
                    <View style={tw`flex-1`}>

                        {
                            role === 'PARTNER' && <View>
                                <View style={tw`flex-col gap-1 py-6`}>
                                    <Text style={tw`text-blackish text-lg font-montserrat-700`}>{userData?.data?.user?.profile?.business_name || 'N/A'}</Text>
                                    <Text style={tw`text-blackish text-xs font-montserrat-600 mt-1`}>{userData?.data?.user?.profile?.description || 'description'}</Text>
                                </View>
                                <View>
                                    <Text style={tw`text-blackish text-lg font-montserrat-700`}>About Us</Text>

                                    <View style={tw`flex-col  `}>
                                        <View style={tw` flex-row  items-center gap-1 `}>
                                            <Text style={tw`text-blackish font-montserrat-600 text-base`}>Phone : </Text>
                                            <Text style={tw`text-xs font-montserrat-300`}>{userData?.data?.user?.phone_number || 'N/A'}</Text>
                                        </View>
                                        {/*  */}
                                        <View style={tw` flex-row  items-center gap-1`}>
                                            <Text style={tw`text-blackish font-montserrat-600 text-base`}>Email :</Text>
                                            <Text style={tw`text-xs font-montserrat-300`}>{userData?.data?.user?.email || 'N/A'}</Text>
                                        </View>
                                        {/*  */}
                                        <View style={tw` flex-row  items-center gap-1`}>
                                            <Text style={tw`text-blackish font-montserrat-600 text-base`}>Hours :</Text>
                                            <Text style={tw`text-xs font-montserrat-300`}>{userData?.data?.user?.profile?.business_hours || 'N/A'}</Text>
                                        </View>
                                        {/*  */}
                                        <View style={tw` flex-row  items-center gap-1`}>
                                            <Text style={tw`text-blackish font-montserrat-600 text-base`}>Location :</Text>
                                            <Text style={tw`text-xs font-montserrat-300`}>{userData?.data?.user?.address || 'N/A'}</Text>
                                        </View>
                                    </View>
                                </View>
                            </View>
                        }
                    </View>

                    <View>
                        {
                            role === 'USER' && <View style={tw`flex-row gap-4  justify-around   `}>
                                <View style={tw`flex-col gap-5  justify-around  `} >
                                    <View style={tw`bg-[#FCFCFC] p-8 border-b-4 h-40 w-40 items-center justify-center border-[#d9d9d9] shadow-md rounded-xl gap-2`}>
                                        <Text style={tw` text-blackish text-xl font-montserrat-600 text-center`}>{advanceData?.data?.completed_habit}</Text>
                                        <Text style={tw` text-blackish text-base font-montserrat-500 text-center`}>{`Active Habits`}</Text>
                                    </View>
                                    <View style={tw` bg-[#FCFCFC] p-8 border-b-4 h-40 w-40 items-center justify-center border-[#d9d9d9] shadow-md rounded-xl gap-2`}>
                                        <Text style={tw` text-blackish text-xl font-montserrat-600 text-center`}>{advanceData?.data?.completed_group_challenge}</Text>
                                        <Text style={tw` text-blackish text-base font-montserrat-500 text-center`}>Completed Group Challenges</Text>
                                    </View>

                                </View>
                                <View style={tw`flex-col gap-5  justify-around  `}>
                                    <View style={tw`bg-[#FCFCFC] p-8 border-b-4 h-40 w-40 items-center justify-center border-[#d9d9d9] shadow-md rounded-xl gap-2`}>
                                        <Text style={tw` text-blackish text-xl font-montserrat-600 text-center`}>{advanceData?.data?.longest_streaks_max}</Text>
                                        <Text style={tw` text-blackish text-base font-montserrat-500 text-center`}>{'Longest Streak'}</Text>
                                    </View>
                                    <View style={tw` bg-[#FCFCFC] p-8 border-b-4  h-40 w-40 items-center justify-center border-[#d9d9d9] shadow-md rounded-xl gap-2   `}>
                                        <Text style={tw` text-blackish text-xl font-montserrat-600 text-center`}>{advanceData?.data?.say_no}</Text>
                                        <Text style={tw` text-blackish text-base font-montserrat-500 text-center`}>Say No</Text>
                                    </View>
                                </View>
                            </View>}
                    </View>

                    {role === 'USER' && <View style={tw`flex-1 flex-col gap-6 pb-5`}>
                        {/* Subscription Section */}
                        {premium?.data?.is_premium_check === false ? (
                            <SubscriptionCard />
                        ) : (
                            <>
                                <EnhancedSubscriptionHeader
                                    startDate={formatDate(premium?.data?.current_plan?.created_at)}
                                    endDate={formatDate(premium?.data?.current_plan?.renewal)}
                                />
                            </>
                        )}

                        {/* Premium-only Section */}
                        {(premium?.data?.is_premium_user || advancedAnalytics) && (
                            <>
                                <View
                                    style={tw`flex-1 flex-col gap-6 rounded-md shadow bg-[#FCFCFC] px-5 py-4`}
                                >
                                    <HabitTracker />
                                    <WorkoutProgress />
                                </View>

                                <HabitCompletionRateGraph />
                                <ProductivityInsightsGraph />
                            </>
                        )}
                    </View>}

                </View>
            </ScrollView >
        );
};

export default ProfileHeader;
