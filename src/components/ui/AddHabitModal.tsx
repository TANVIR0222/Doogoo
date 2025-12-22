import { IconsClose } from '@/assets/icons';
import { AddHabitModalProps } from '@/src/constants/type';
import tw from '@/src/lib/tailwind';
import { useCreatedGroupMutation, useGetAllChalangesQuery } from '@/src/redux/groupApi/groupApi';
import { _width } from '@/src/utils/utils';
import { Picker } from '@react-native-picker/picker';
import React, { useEffect, useState } from 'react';
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SvgXml } from 'react-native-svg';
import Toast from 'react-native-toast-message';

const AddHabitModal: React.FC<AddHabitModalProps> = ({ visible, onClose, addHeading, setNewPost }) => {
  const [step, setStep] = useState<number>(0);
  const [challengeName, setChallengeName] = useState<string>('');
  const [habits, setHabits] = useState<string[]>([""]);
  const [duration, setDuration] = useState<string>('');

  // all rtk query
  const { data: allChalange } = useGetAllChalangesQuery();
  const [createHabits, { isLoading }] = useCreatedGroupMutation();
  const [selectedChallenge, setSelectedChallenge] = useState<string | undefined>(
    allChalange?.data?.[0]
  );

  // console.log("allChalange", allChalange);
  const showToast = (type: "success" | "error", message: string) => {
    Toast.show({
      type,
      text1: type === "success" ? "Group Created 🎉" : "Error ⚠️",
      text2: message,
      visibilityTime: 2000,
    });
  };



  useEffect(() => {
    const firstChallenge = allChalange?.data?.[0];
    if (firstChallenge && !selectedChallenge) {
      setSelectedChallenge(firstChallenge);
    }
  }, [allChalange, selectedChallenge]);




  const addHabit = () => {
    setHabits([...habits, ""]);
  };

  const removeHabit = (index: number) => {
    const updated = [...habits];
    updated.splice(index, 1);
    setHabits(updated);
  };

  const updateHabit = (index: number, value: string) => {
    const updated = [...habits];
    updated[index] = value;
    setHabits(updated);
  };

  const resetAll = () => {
    setStep(0);
    setChallengeName('');
    setHabits([]);
    setDuration('');
  };

  const handleNext = () => {
    if (canProceed() && step < 2) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep(step - 1);
  };

  // created habits 
  const handleCreate = async () => {
    if (!canProceed()) return;

    const payload = {
      group_name: challengeName,
      challenge_type: selectedChallenge || allChalange?.data?.[0],
      focus_on: habits,
      duration: String(duration),
    };

    try {
      const res = await createHabits(payload).unwrap();
      if (res?.status) {
        setNewPost(true);
        showToast("success", res?.message);
      }

    } catch (error) {

      console.log("error", error);
    }

    resetAll();
    onClose();
  };

  const canProceed = () => {
    switch (step) {
      case 0: return challengeName.trim().length > 0;
      case 1: return habits.length > 0 && habits.every(h => h.trim().length > 0);
      case 2: return duration.length > 0;
      default: return false;
    }
  };

  const renderContent = () => {
    switch (step) {
      case 0:
        return (
          <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
            <Text style={tw`text-sm font-montserrat-600 mb-4`}>Name a Group Challenge</Text>
            <TextInput
              placeholder="30-Day Fitness Challenge"
              value={challengeName}
              onChangeText={setChallengeName}
              placeholderTextColor="#999"
              style={tw`border-gray border-[1px] p-3 rounded-lg mb-5`}
              accessibilityLabel="Challenge name input"
            />
            <Text style={tw`text-sm font-montserrat-600 mb-4`}>Challenge Type</Text>

            <View style={tw`border border-blackish/40 rounded px-2 bg-white`}>
              <Picker
                selectedValue={selectedChallenge}
                onValueChange={(itemValue) => setSelectedChallenge(itemValue)}
                style={[tw`text-black`, { backgroundColor: 'white', color: 'black' }]}
                dropdownIconColor="black" // optional, for Android icon color
              >
                {allChalange?.data?.map((type: any) => (
                  <Picker.Item
                    key={type.id || type}
                    label={type.name || type}
                    value={type.id || type}
                    color="black" // always visible text color
                  />
                ))}
              </Picker>
            </View>




          </KeyboardAvoidingView>
        );
      case 1:
        return (
          <ScrollView style={tw`max-h-64`} showsVerticalScrollIndicator={false}>
            <Text style={tw`text-sm font-montserrat-600 mb-4`}>Add habits you will focus on</Text>
            {habits.map((habit, index) => (
              <View key={index} style={tw`flex-row gap-2 items-center mb-3`}>
                <TextInput
                  value={habit}
                  onChangeText={(text) => updateHabit(index, text)}
                  placeholder={`Habit ${index + 1}`}
                  style={tw`flex-1 border-gray border-[1px] p-3 rounded-lg text-blackText`}
                  placeholderTextColor="#999"
                  accessibilityLabel={`Habit ${index + 1} input`}
                />
                <Pressable
                  onPress={() => removeHabit(index)}
                  style={tw` w-8 h-8 rounded-full bg-blackish items-center justify-center`}
                  accessibilityLabel={`Remove habit ${index + 1}`}
                >
                  <Text style={tw`text-2xl font-montserrat-500 text-white`}>×</Text>
                </Pressable>
              </View>
            ))}
            <Pressable
              onPress={addHabit}
              style={tw`bg-blackish px-4 py-2 rounded-lg  self-end`}
              accessibilityLabel="Add new habit"
            >
              <Text style={tw`text-white text-sm font-montserrat-600`}>Add Habit</Text>
            </Pressable>
          </ScrollView>
        );
      case 2:
        return (
          <>
            <Text style={tw`text-sm font-montserrat-600 mb-4`}>Choose duration of group challenge</Text>
            <View style={tw`flex-row flex-wrap justify-between gap-2`}>
              {['7 Days', '15 Days', '30 Days', '60 Days'].map((d) => {
                const isActive = duration === d.split(' ')[0]; // 
                return (
                  <Pressable
                    key={d}
                    onPress={() => setDuration(d.split(' ')[0])}
                    style={tw`w-[48%] py-3 rounded-lg border ${isActive ? ' border-yellowGreen' : 'border-blackish'} bg-white`}
                    accessibilityLabel={`Select ${d} duration`}
                  >
                    <Text style={tw`text-center ${isActive ? 'text-blackish font-bold' : 'text-blackText'}`}>
                      {d}
                    </Text>
                  </Pressable>
                );
              })}
            </View>

          </>
        );
      default:
        return null;
    }
  };

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onClose}
      statusBarTranslucent
    >
      <Pressable
        style={tw`flex-1 bg-blackText/60 justify-center items-center px-5`}
        onPress={onClose}
      >
        <Pressable style={tw`w-full`} onPress={(e) => e.stopPropagation()}>
          <View style={tw`bg-white rounded-xl p-5`}>
            <View style={tw`flex-row justify-between items-center mb-5`}>
              <Text style={[tw`text-blackish font-montserrat-700`, { fontSize: _width * 0.05 }]}>
                {addHeading}
              </Text>
              <Pressable
                onPress={() => { resetAll(); onClose(); }}
                accessibilityLabel="Close modal"
              >
                <SvgXml xml={IconsClose} />
              </Pressable>
            </View>

            {renderContent()}

            <View style={tw`flex-row justify-between mt-6`}>
              {step > 0 ? (
                <Pressable
                  onPress={handleBack}
                  style={tw` px-4 py-2 rounded-lg border border-gray bg-white`}
                  accessibilityLabel="Go back to previous step"
                >
                  <Text style={tw`text-blackText text-sm font-montserrat-600`}>Back</Text>
                </Pressable>
              ) : (
                <Pressable
                  onPress={() => { resetAll(); onClose(); }}
                  style={tw` px-4 py-2 rounded-lg border border-gray bg-white`}
                  accessibilityLabel="Cancel and close modal"
                >
                  <Text style={tw`text-blackText text-sm font-montserrat-600`}>Cancel</Text>
                </Pressable>
              )}

              <TouchableOpacity
                onPress={step === 2 ? handleCreate : handleNext}
                style={tw` px-4 py-2 rounded-lg ${canProceed() ? 'bg-blackish' : 'bg-gray'}`}
                disabled={!canProceed()}
                accessibilityLabel={step === 2 ? "Create group" : "Go to next step"}
              >
                <Text style={tw`text-white text-sm  font-montserrat-600`}>
                  {isLoading ? 'Creating...' : step === 2 ? 'Create Group' : 'Next'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default AddHabitModal;