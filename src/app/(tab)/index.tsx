

import { IconsArchived, IconsDeleted, IconsSquer, IconsStart } from '@/assets/icons';
import GlobalLoading from '@/src/components/GlobalLoading';
import NewAddedModal from '@/src/components/ui/NewAddedModal';
import { usePlanFeatures } from '@/src/hooks/useCheckPreminum';
import tw from '@/src/lib/tailwind';
import { useArchivedHabitMutation, useCompletedHabitMutation, useDeleteHabitMutation, useGetAllHabitQuery } from '@/src/redux/habitsApi/habitsApi';
import { useUserProfileUpdateMutation } from '@/src/redux/profileApi/profileApi';
import * as Location from 'expo-location';
import { router } from 'expo-router';
import React, { useCallback, useEffect, useState } from 'react';
import { Alert, Pressable, Text, TouchableOpacity, View } from 'react-native';
import { NestableDraggableFlatList, NestableScrollContainer, ScaleDecorator } from 'react-native-draggable-flatlist';
import { SvgXml } from 'react-native-svg';

type Habit = {
    id: number;
    habit_name: string;
    isArchived: number;
    logs?: any[];
};

export default function HabitsScreen() {
    const [isEditing, setIsEditing] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    //  ------ Redux api ------
    const { data: habits, isLoading: isLoadingHabits, refetch } = useGetAllHabitQuery();
    const [completeHabit, { isLoading }] = useCompletedHabitMutation();
    const [archiveHabit, { isLoading: isLoadingArchive }] = useArchivedHabitMutation();
    const [deleteHabit, { isLoading: isLoadingDelete }] = useDeleteHabitMutation();
    const [userProfileUpdate, { isLoading: isLoadingUpdate }] = useUserProfileUpdateMutation();


    const [filteredHabits, setFilteredHabits] = useState<Habit[]>([]);

    useEffect(() => {
        if (habits?.data) {
            setFilteredHabits(habits.data.filter((habit) => habit.isArchived === 0));
        }
    }, [habits]);

    const toggleEditMode = useCallback(() => setIsEditing(prev => !prev), []);

    // ------------------ chack subcription ------------------
    const { unlimitedHabits } = usePlanFeatures();

    const isPremiumUser = React.useMemo(() => {
        // Use optional chaining (?) for safety, in case 
        // unlimitedHabitsTracking might be null or undefined initially
        return unlimitedHabits?.includes('Unlimited habits tracking');
    }, [unlimitedHabits])


    const updateUserLocation = useCallback(() => {
        const timer = setTimeout(async () => {
            try {
                // 1️⃣ Request permission
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    setErrorMsg('Location permission denied');
                    return;
                }

                // 2️⃣ Get current location with accuracy
                const { coords } = await Location.getCurrentPositionAsync({
                    accuracy: Location.Accuracy.High
                });

                // 3️⃣ Prepare form data
                const form = new FormData();
                form.append("latitude", String(coords.latitude));
                form.append("longitude", String(coords.longitude));

                // 4️⃣ Send to API
                const response = await userProfileUpdate(form).unwrap();

            } catch (error) {
                console.error("Profile update failed:", error);
            }
        }, 500);

        // Cleanup to avoid memory leak if component unmounts
        return () => clearTimeout(timer);
    }, [userProfileUpdate]);


    useEffect(() => {
        updateUserLocation();
    }, []);



    const handleArchive = (habit: Habit) => {
        Alert.alert('Archive Entry', `Archive "${habit.habit_name}"?`, [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Archive',
                onPress: async () => {
                    try {
                        const res = await archiveHabit({ habit_id: habit.id }).unwrap();
                    } catch (error) {
                        console.log(error);
                    }
                },
                style: 'destructive'
            },
        ]);
    };

    const handleDelete = (id: number) => {
        Alert.alert('Delete Entry', 'Are you sure you want to delete this entry?', [
            { text: 'Cancel', style: 'cancel' },
            {
                text: 'Delete',
                onPress: async () => {
                    try {
                        await deleteHabit(id).unwrap();
                    } catch (error) {
                        console.log(error);
                    }
                },
                style: 'destructive',
            },
        ]);
    };

    const handleDone = async (habit_id: number) => {
        try {
            Alert.alert(
                'Complete Habit',
                'Did you complete this habit?',
                [
                    { text: 'Cancel', style: 'cancel' },
                    {
                        text: 'Complete',
                        onPress: async () => {
                            try {
                                const res = await completeHabit({ habit_id }).unwrap();
                            } catch (error) {
                                console.log(error);
                            }
                        },
                        style: 'destructive',
                    },
                ]
            )

        } catch (error) {
            console.log(error);
        }
    };

    const renderHabitItem = ({ item, drag, isActive }: any) => {
        // Check if this habit is already completed today
        const today = new Date().toDateString();
        const isDone = item.logs?.some((log: any) =>
            log.habit_id === item.id &&
            new Date(log.created_at).toDateString() === today
        );

        return (
            <ScaleDecorator>
                <View style={tw`px-5 flex-row gap-4 items-center border-b border-gray py-3`}>

                    {isEditing && (
                        <Pressable
                            onLongPress={drag}
                            disabled={isActive}
                            style={[
                                tw`items-center justify-center rounded`,
                                { backgroundColor: isActive ? '#D6DF22' : '#EEEEEE' },
                            ]}
                        >
                            <View style={tw`p-1 rounded`}>
                                <SvgXml xml={IconsSquer} width={25} height={25} />
                            </View>
                        </Pressable>
                    )}

                    <View style={tw`flex-1`}>
                        <View style={tw`flex-row items-center justify-between`}>
                            <View>
                                <Text style={tw`text-base text-blackText`}>{item.habit_name}</Text>
                                <View style={tw`flex-row gap-1 items-center mt-1`}>
                                    <SvgXml xml={IconsStart} width={14} height={14} />
                                    <Text style={tw`text-gray text-sm`}>{item.logs?.length || 0} times</Text>
                                </View>
                            </View>

                            {!isEditing && (
                                <TouchableOpacity
                                    onPress={() => handleDone(item.id)}

                                    style={[
                                        tw`px-3 py-1 rounded`,
                                        { backgroundColor: isDone ? '#cccccc' : '#000000' },
                                    ]}
                                    disabled={isDone || isLoading}
                                    accessibilityLabel="Mark done"
                                >
                                    <Text style={tw`text-white text-sm font-montserrat-600`}>
                                        {isDone ? 'Completed' : 'Done'}
                                    </Text>
                                </TouchableOpacity>
                            )}

                            {isEditing && (
                                <Pressable onPress={() => handleDelete(item.id)} accessibilityLabel="Delete item">
                                    <SvgXml xml={IconsDeleted} width={20} height={20} />
                                </Pressable>
                            )}
                        </View>

                        {/* Archive button hidden if habit is already done or in edit mode */}
                        {isEditing && (
                            <Pressable
                                onPress={() => handleArchive(item)}
                                style={tw`border-blackish border w-[35%] items-center px-2 py-1 rounded mt-2`}
                            >
                                <Text style={tw`text-blackish text-sm font-montserrat-600`}>Archive</Text>
                            </Pressable>
                        )}
                    </View>
                </View>
            </ScaleDecorator>
        );
    };

    return isLoadingHabits ? <GlobalLoading /> : (
        <NestableScrollContainer
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ flexGrow: 1, paddingBottom: 20, backgroundColor: "#ffffff" }}
        >
            <View style={tw``}>
                {/* Header */}
                <View style={tw`p-4 flex-col gap-4`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <Text style={tw`text-blackish font-montserrat-600 text-xl`}>My Habits</Text>
                        <TouchableOpacity
                            style={tw`px-2 py-2 bg-blackText rounded flex-row items-center gap-2.5`}
                            onPress={() => toggleEditMode()}
                        >
                            <Text style={tw`text-white text-xs font-montserrat-400`}>
                                {isEditing ? 'Done' : 'Edit'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

                {isEditing && (
                    <View style={tw`bg-yellowGreen/20 py-2 pl-4`}>
                        <Text style={tw`items-center text-sm text-gray font-montserrat-500`}>
                            the <SvgXml xml={IconsSquer} width={10} height={10} /> icon to reorder. Touch elsewhere to scroll.
                        </Text>
                    </View>
                )}

                {/* Search + Archived */}

                <View style={tw`p-4 flex-col gap-4`}>
                    <TouchableOpacity
                        onPress={() => router.push('/archived')}
                        style={tw`flex-row items-center gap-2`}
                    >
                        <SvgXml xml={IconsArchived} />
                        <Text style={tw`text-sm font-montserrat-600`}>Archived</Text>
                    </TouchableOpacity>
                </View>

                {/* All Habits */}
                <View style={tw`border-b border-gray/50`}>
                    <Text style={tw`px-4 text-sm font-montserrat-600 mb-3`}>All Habits</Text>
                </View>

                {filteredHabits?.length > 0 ? (
                    <View style={tw`flex-1 border border-gray mx-4 my-5 rounded-md`}>
                        <NestableDraggableFlatList
                            data={filteredHabits}
                            keyExtractor={(item: Habit) => item.id.toString()} // Use stable unique key
                            renderItem={renderHabitItem}
                            onDragEnd={({ data }) => setFilteredHabits([...data])} // update immutably
                            showsVerticalScrollIndicator={false}
                            nestedScrollEnabled={false}
                        />


                        {isEditing && (
                            <Pressable
                                style={tw`flex-row items-center p-4`}
                                onPress={() => setIsModalVisible(true)}
                            >
                                <Text style={tw`text-yellow-400 text-lg font-montserrat-700 mr-1`}>+</Text>
                                <Text style={tw`text-yellow-400 text-base font-montserrat-600`}>Add New Habit</Text>
                            </Pressable>
                        )}
                    </View>
                ) : (
                    <Pressable
                        style={tw`flex-row items-center p-4`}
                        // onPress={() => isPremiumUser ? setIsModalVisible(true) : router.push('/subcription-modal')}
                        // onPress={() => isPremiumUser ? setIsModalVisible(true) : router.push('/subcription-modal')}
                        onPress={() => setIsModalVisible(true)}
                    >
                        <Text style={tw`text-yellow-400 text-lg font-montserrat-700 mr-1`}>+</Text>
                        <Text style={tw`text-yellow-400 text-base font-montserrat-600`}>Add New Habit</Text>
                    </Pressable>
                )}

                <NewAddedModal visible={isModalVisible} onClose={() => setIsModalVisible(false)} />
            </View>
        </NestableScrollContainer>
    );
}