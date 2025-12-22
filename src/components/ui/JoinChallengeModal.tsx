import { IconsClose } from '@/assets/icons';
import { JoinChallengeModalProps } from '@/src/constants/type';
import tw from '@/src/lib/tailwind';
import Checkbox from 'expo-checkbox';
import React, { useState } from 'react';
import { Modal, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import CalendarView from './CalendarView';
import ProgressBar from './ProgressBar';


const JoinChallengeModal = ({ modalVisible, setModalVisible }: JoinChallengeModalProps) => {

    const [isChecked, setChecked] = useState<boolean>(false);

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <ScrollView showsVerticalScrollIndicator={false} >
                <View style={tw` bg-white rounded-2xl  flex-col gap-5 p-5 `}>

                    <View style={tw`flex-col gap-6 `}>
                        {/* Header */}
                        <View style={tw`flex-row justify-between items-center `}>
                            <Text style={tw`text-blackish text-base font-montserrat-700 `}>
                                Join 30-Day Fitness Challenge
                            </Text>
                            <TouchableOpacity onPress={() => setModalVisible(false)}>
                                <SvgXml xml={IconsClose} />
                            </TouchableOpacity>
                        </View>

                        <View style={tw`flex-col gap-2 `}>
                            {/* Challenge Title */}
                            <Text style={tw`text-blackish text-sm font-montserrat-600 `}>
                                30-Day Fitness Challenge
                            </Text>

                            <ProgressBar color={'#D6DF22'} height={10} progress={70} />
                        </View>

                    </View>



                    <View>
                        <CalendarView />
                    </View>

                    <View style={tw`flex-col  gap-4`}>
                        {/* Today's Tasks Header */}
                        <View style={tw`flex-row  gap-2`}>
                            <Text style={tw`text-blackish text-base font-semibold font-montserrat-700`}>
                                Today's Tasks
                            </Text>
                            <View style={tw`bg-zinc-600 rounded px-2 py-1`}>
                                <Text style={tw`text-white text-[10px] font-semibold font-montserrat-600`}>
                                    15 points
                                </Text>
                            </View>
                        </View>
                        <View >
                            {/* Task List */}
                            <View style={tw`px-4`}>
                                {[
                                    { title: "15-minute cardio workout", points: 5 },
                                    { title: "10-minute stretching", points: 5 },
                                    { title: "Drink 8 glasses of water", points: 5 },
                                ].map((task, index) => (
                                    <View key={index} style={tw`flex-row justify-between items-center border border-neutral-400/50 rounded mb-2 px-3 py-3`}>
                                        <View style={tw`flex-row gap-2 items-center`}>
                                            <Checkbox
                                                style={tw``}
                                                value={isChecked}
                                                onValueChange={setChecked}
                                                color={isChecked ? '#D6DF22' : undefined}
                                            />
                                            <Text style={tw`text-blackish text-sm font-montserrat-600`}>
                                                {task.title}
                                            </Text>
                                        </View>
                                        <View style={tw`bg-zinc-600 rounded px-2 py-1`}>
                                            <Text style={tw`text-white text-sm font-montserrat-600`}>
                                                {task.points} points
                                            </Text>
                                        </View>
                                    </View>
                                ))}
                            </View>

                            {/* Challenge Details */}
                            <Text style={tw`text-blackish text-base font-semibold font-montserrat-600 mt-4 mb-1`}>
                                Challenge Details
                            </Text>
                            <Text style={tw`text-blackish text-[10px] `}>
                                This challenge is designed to help you build a consistent fitness habit. Each day you'll have specific tasks to complete. Consistency is key!
                            </Text>
                        </View>
                    </View>



                    {/* Buttons */}
                    <View style={tw`flex-row justify-around `}>
                        <TouchableOpacity style={tw`bg-zinc-300 rounded px-6 py-2`}>
                            <Text style={tw`text-neutral-500 text-sm font-semibold font-montserrat-600`}>
                                Leave Challenge
                            </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={tw`bg-blackish rounded px-6 py-2`}>
                            <Text style={tw`text-white text-sm font-semibold font-montserrat-600`}>
                                Mark as Complete
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </ScrollView>
        </Modal>
    );
};

export default JoinChallengeModal;
