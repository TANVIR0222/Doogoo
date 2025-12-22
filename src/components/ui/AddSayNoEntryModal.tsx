import { AddSayHabitModalProps } from '@/src/constants/type';
import tw from '@/src/lib/tailwind';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';

import {
    Modal,
    Platform,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const AddSayNoEntryModal = ({ visible, onClose }: AddSayHabitModalProps) => {
    const [duration, setDuration] = useState<string>('');
    const [participants, setParticipants] = useState<string>('');

    const [date, setDate] = useState(new Date());
    const [show, setShow] = useState(false);

    const onChange = (event: any, selectedDate: any) => {
        if (selectedDate) {
            setDate(selectedDate);
        }
        setShow(false);
    };

    return (
        <Modal transparent visible={visible} animationType="fade">
            <View style={tw`flex-1  justify-center items-center`}>
                <View style={tw`bg-white shadow-2xl rounded-lg p-6 w-80`}>
                    {/* Header */}
                    <View style={tw`flex-row justify-between items-center mb-4`}>
                        <Text style={tw`text-xl  font-montserrat-700`}>Add “Say No” Entry</Text>
                        <Pressable onPress={onClose}>
                            <Text style={tw`text-2xl font-montserrat-600`}>×</Text>
                        </Pressable>
                    </View>


                    {/* Form fields */}
                    <View style={tw`mb-4`}>
                        <View style={tw`mt-4`}>
                            {/* <Text style={tw`text-blackish mb-2 font-semibold`}>Select a Date</Text> */}

                            <Pressable onPress={() => setShow(true)}>
                                <Text style={tw`text-blackish font-montserrat-400 text-sm mb-2`}>Date</Text>

                                <TextInput
                                    style={tw`border-[1px] border-blackish rounded px-3 py-2 bg-white`}
                                    value={date.toLocaleDateString()}
                                    placeholder="Select date"
                                    editable={false} // prevent manual typing
                                    pointerEvents="none"
                                />
                            </Pressable>

                            {show && (
                                <DateTimePicker
                                    value={date}
                                    mode="date"
                                    display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                                    onChange={onChange}
                                />
                            )}
                        </View>
                    </View>

                    <View style={tw`mb-4`}>
                        <Text style={tw`mb-1 text-sm  font-montserrat-600`}>What did you say no to?</Text>
                        <TextInput
                            style={tw`border-[1px]  border-blackish rounded px-3 py-2`}
                            value={duration}
                            onChangeText={setDuration}
                            placeholder="What did you say no to?    "
                            keyboardType="numeric"
                        />
                    </View>


                    <View style={tw`mb-6`}>
                        <Text style={tw`mb-1 text-sm  font-montserrat-600`}>Why did you say no?</Text>
                        <TextInput
                            style={tw`border-[1px]  border-blackish rounded px-3 py-2`}
                            value={participants}
                            onChangeText={setParticipants}
                            placeholder="Why did you say no?"
                            keyboardType="numeric"
                        />
                    </View>

                    {/* Save button */}
                    <TouchableOpacity
                        style={tw`bg-blackish px-4 py-2 rounded self-end`}
                        onPress={() =>
                            // onSave({ habitName, description, goal, duration, participants })
                            onClose()
                        }
                    >
                        <Text style={tw`text-white  font-montserrat-400 text-sm`}>Save Entry</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default AddSayNoEntryModal