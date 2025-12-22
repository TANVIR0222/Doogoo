import { NewModalProps } from '@/src/constants/type';
import tw from '@/src/lib/tailwind';
import { useAddEntryUserMutation } from '@/src/redux/sayNoApi/sayNoApi';
import React, { useState } from 'react';

import {
    Modal,
    Pressable,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';
import Toast from 'react-native-toast-message';

const NewModal = ({ visible, onClose }: NewModalProps) => {
    const [participants, setParticipants] = useState<string>('');
    // console.log();

    const [addEntryUser, { isLoading }] = useAddEntryUserMutation();

    const handleSave = async () => {
        try {
            const res = await addEntryUser({ say_no: participants }).unwrap();
            const showToast = () => {
                Toast.show({
                    type: "success",
                    text2: res?.message,
                    visibilityTime: 2000,
                });
            };
            showToast();
            setParticipants('');
            onClose();
        } catch (error) {
            Toast.show({
                type: 'error',
                // text1: 'Error',
                text2: error?.errors?.error || 'Failed to add habit. Please try again.',
            });
        }
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
                    <View style={tw`mb-6`}>
                        <Text style={tw`mb-1 text-sm  font-montserrat-600`}>What did you say no to?</Text>
                        <TextInput
                            style={tw`border-[1px]  border-blackish rounded px-3 py-2`}
                            value={participants}
                            onChangeText={setParticipants}
                            keyboardType="default"
                            placeholderTextColor={'#000'}
                        />
                    </View>

                    {/* Save button */}
                    <TouchableOpacity
                        style={tw`${participants ? 'bg-blackish' : 'bg-blackish/80'} px-4 py-2 rounded self-end`}
                        disabled={!participants || isLoading}
                        onPress={() =>
                            handleSave()
                        }
                    >
                        <Text style={tw`text-white  font-montserrat-400 text-sm`}>{isLoading ? 'Saving...' : 'Save Entry'}</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default NewModal