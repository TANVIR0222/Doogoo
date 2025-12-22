import { IconsClose } from '@/assets/icons'
import { NewModalProps } from '@/src/constants/type'
import tw from '@/src/lib/tailwind'
import { useUserAddHabitMutation } from '@/src/redux/habitsApi/habitsApi'
import React, { useState } from 'react'
import { Modal, Pressable, Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Toast from 'react-native-toast-message'

const NewAddedModal = ({ visible, onClose }: NewModalProps) => {


    const [userAddHabit, { isLoading }] = useUserAddHabitMutation()
    const [habit_name, setHabitName] = useState<string>("");

    const handleSave = async () => {
        try {
            await userAddHabit({ habit_name }).unwrap();
            setHabitName('');
            onClose();

        } catch (error) {
            // console.log("Error adding habit:", error?.errors?.error);
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
                        <Text style={tw`text-xl  font-montserrat-700`}>Create New Habit</Text>
                        <Pressable onPress={onClose}>
                            <SvgXml xml={IconsClose} />
                        </Pressable>
                    </View>


                    <View style={tw` gap-4`} >
                        {/* Form fields */}
                        <View style={tw`mt-4 gap-1`}>
                            <Text style={tw`text-blackish mb-2 font-semibold`}>Name a Habit</Text>
                            <TextInput
                                style={tw`border-[1px]  border-blackish rounded px-3 py-3 `}
                                placeholder="Enter habit name"
                                value={habit_name}
                                onChangeText={setHabitName}
                                placeholderTextColor={'#000'}
                            />

                        </View>



                        {/* Save button */}
                        <TouchableOpacity
                            style={tw`${!habit_name ? 'bg-blackish/60' : "bg-blackish"} px-4 py-2 rounded self-end`}
                            disabled={isLoading || !habit_name}
                            onPress={() =>
                                // onSave({ habitName, description, goal, duration, participants })
                                handleSave()
                            }
                        >
                            <Text style={tw`text-white  font-montserrat-400 text-sm`}>{isLoading ? "Saving..." : "Create Habit"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default NewAddedModal