import { AddSayHabitModalProps } from '@/src/constants/type'
import { formatDateReword } from '@/src/lib/formatDate'
import tw from '@/src/lib/tailwind'
import { useGetAllChalangesQuery } from '@/src/redux/groupApi/groupApi'
import { useCheckAlldataFilledOrNotQuery, useSingleRewardPostMutation } from '@/src/redux/rewardsPartnerApi/rewardsPartnerApi'
import DateTimePicker from '@react-native-community/datetimepicker'
import { Picker } from '@react-native-picker/picker'
import { router } from 'expo-router'
import React, { useState } from 'react'
import {
    Alert,
    KeyboardAvoidingView,
    Modal,
    Platform,
    Pressable,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native'
import Toast from 'react-native-toast-message'

const AddSayNoEntryModalReward = ({ visible, onClose }: AddSayHabitModalProps) => {
    const { data: allChalange } = useGetAllChalangesQuery()
    const { data } = useCheckAlldataFilledOrNotQuery();
    const [createReward, { isLoading }] = useSingleRewardPostMutation();

    //  single state object
    const [form, setForm] = useState({
        title: '',
        challengeType: allChalange?.data[0],
        description: '',
        expirationDate: new Date(),
        purchasePoint: '',
        showDatePicker: false,
    })



    // handle change
    const updateForm = (key: keyof typeof form, value: any) => {
        setForm(prev => ({ ...prev, [key]: value }))
    }

    const onChangeDate = (_: any, selectedDate?: Date) => {
        if (selectedDate) {
            updateForm('expirationDate', selectedDate)
        }
        updateForm('showDatePicker', false)
    }

    const handleSubmit = async () => {
        const payload = {
            title: form.title.trim(),
            challenge_type: form.challengeType,
            description: form.description.trim(),
            expiration_date: formatDateReword(form.expirationDate),
            purchase_point: Number(form.purchasePoint),
        }

        //  field required check + expiration date future check
        if (
            !payload.title ||
            !payload.challenge_type ||
            !payload.description ||
            !payload.expiration_date ||
            !payload.purchase_point
        ) {
            Alert.alert("Validation Error", "Please fill in all the fields before submitting.")
            return
        } else if (form.expirationDate <= new Date()) {
            Alert.alert("Validation Error", "Expiration date must be a future date.")
            return
        }

        if (data?.data?.is_complete === false) {
            Alert.alert("Profile Incomplete", "Please complete your profile before adding a reward.", [
                {
                    text: "OK",
                    onPress: () => {
                        router.push('/(common)/update-profile');
                        onClose();
                    },
                }
            ]);
            // router.push('/(common)/update-profile');
            return;
        }

        try {



            const result = await createReward(payload).unwrap();
            if (result?.status) {
                onClose()
                setForm({
                    title: '',
                    challengeType: allChalange?.data[0],
                    description: '',
                    expirationDate: new Date(),
                    purchasePoint: '',
                    showDatePicker: false,
                })
                const showToast = () => {
                    Toast.show({
                        type: "success",
                        text2: "Reward added successfully 🎉",
                        visibilityTime: 2000,
                    });
                };

                showToast();
            }
        } catch (error) {
            console.error("Error creating reward:", error)
        }
    }

    return (


        <Modal transparent visible={visible} animationType="fade">
            <KeyboardAvoidingView
                behavior={Platform.OS === "ios" ? "padding" : "height"}
                style={{ flex: 1 }}
            >
                <ScrollView
                    keyboardShouldPersistTaps="handled"
                    contentContainerStyle={tw`justify-center items-center p-6`}
                    showsVerticalScrollIndicator={false}
                >
                    <View style={tw`bg-white shadow-2xl rounded-lg p-6 w-80`}>

                        {/* Header */}
                        <View style={tw`flex-row justify-between items-center mb-4`}>
                            <Text style={tw`text-xl font-montserrat-700`}>Add Reward</Text>
                            <Pressable onPress={onClose}>
                                <Text style={tw`text-2xl font-montserrat-600`}>×</Text>
                            </Pressable>
                        </View>

                        {/* Title */}
                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1 text-sm font-montserrat-600`}>Reward Title</Text>
                            <TextInput
                                style={tw`border border-blackish rounded px-3 py-2`}
                                value={form.title}
                                onChangeText={text => updateForm('title', text)}
                                placeholder="Enter reward title"
                            />
                        </View>

                        {/* Challenge Type */}
                        <View style={tw`mb-4`}>
                            <Text style={tw`text-sm font-montserrat-600 mb-2`}>Challenge Type</Text>
                            <View style={tw`border border-blackish/40 rounded px-2`}>
                                <Picker
                                    selectedValue={form.challengeType}
                                    onValueChange={val => updateForm('challengeType', val)}
                                >
                                    {allChalange?.data?.map((type: any) => (
                                        <Picker.Item key={type.id} label={type} value={type} />
                                    ))}
                                </Picker>
                            </View>
                        </View>

                        {/* Description */}
                        <View style={tw`mb-4`}>
                            <Text style={tw`text-sm font-montserrat-600 mb-1`}>Description</Text>
                            <TextInput
                                style={tw`border h-32 border-blackish rounded px-3 py-2`}
                                value={form.description}
                                onChangeText={text => updateForm('description', text)}
                                multiline
                                textAlignVertical="top"
                                placeholder="Write description..."
                            />
                        </View>

                        {/* Expiration Date */}
                        <View style={tw`mb-4`}>
                            <Pressable onPress={() => updateForm('showDatePicker', true)}>
                                <Text style={tw`mb-1 text-sm font-montserrat-600`}>Expiration Date</Text>
                                <TextInput
                                    style={tw`border border-blackish rounded px-3 py-2 bg-white`}
                                    value={form.expirationDate.toLocaleDateString()}
                                    editable={false}
                                    pointerEvents="none"
                                />
                            </Pressable>
                            {/* Android Picker */}
                            {form.showDatePicker && Platform.OS === 'android' && (
                                <DateTimePicker
                                    value={form.expirationDate}
                                    mode="date"
                                    display="default"
                                    onChange={onChangeDate}
                                />
                            )}
                        </View>

                        {/* Purchase Point */}
                        <View style={tw`mb-4`}>
                            <Text style={tw`mb-1 text-sm font-montserrat-600`}>Purchase Point</Text>
                            <TextInput
                                style={tw`border border-blackish rounded px-3 py-2`}
                                value={form.purchasePoint}
                                onChangeText={text => updateForm('purchasePoint', text)}
                                keyboardType="numeric"
                                placeholder="Amount (e.g., 50)"
                            />
                        </View>

                        {/* Save Button */}
                        <TouchableOpacity
                            style={tw`bg-blackish px-4 py-2 rounded self-end`}
                            disabled={isLoading}
                            onPress={() => handleSubmit()}
                        >
                            <Text style={tw`text-white font-montserrat-400 text-sm`}>Add</Text>
                        </TouchableOpacity>

                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        </Modal>

    )
}

export default AddSayNoEntryModalReward
