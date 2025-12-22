import { IconsAdd } from '@/assets/icons';
import { AddGroupProps } from '@/src/constants/type';
import { usePlanFeatures } from '@/src/hooks/useCheckPreminum';
import tw from '@/src/lib/tailwind';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import AddHabitModal from './AddHabitModal';

const SearchHabite: React.FC<AddGroupProps> = ({ title, addHeading, setSearch, search, setNewPost }) => {

    const [visible, setVisible] = useState<boolean>(false)
    const [onSave, setOnSave] = useState<string>("")

    const hiddednAdded = addHeading === "Rewards";
    // ------------------ chack subcription ------------------
    const { unlimitedHabitsTracking } = usePlanFeatures();
    const isPremiumUser = React.useMemo(() => {
        // Use optional chaining (?) for safety, in case 
        // unlimitedHabitsTracking might be null or undefined initially
        return unlimitedHabitsTracking?.includes('Creating a challenge group');
    }, [unlimitedHabitsTracking])

    console.log(isPremiumUser);


    return (
        <View style={tw` flex-col gap-3 pb-2 px-[4%] pt-[3%]`}>
            {/* Header Section */}
            <View style={tw``}>
                <View style={tw`flex-row items-center justify-between `}>
                    <Text style={tw`text-blackish font-montserrat-600 text-xl`}>
                        {title}
                    </Text>

                    {
                        !hiddednAdded && <TouchableOpacity
                            // disabled={!isPremiumUser}
                            onPress={() => isPremiumUser ? setVisible(true) : router.push("/subcription-modal")}
                        >
                            <SvgXml xml={IconsAdd} />
                        </TouchableOpacity>
                    }
                </View>
            </View>

            {/* Search Bar */}
            <View style={tw``}>
                <TextInput
                    style={tw`
                        py-3 px-4 font-montserrat-600 border-[1px] border-[rgba(165,165,165,0.5)]
                        rounded-full text-blackish
                    `}
                    placeholder="Search"
                    placeholderTextColor="#3e3e3f80"
                    returnKeyType="search"
                    clearButtonMode="while-editing"
                    onChangeText={setSearch}
                    value={search}
                />
            </View>


            <AddHabitModal setNewPost={setNewPost} addHeading={addHeading} visible={visible} onClose={() => setVisible(!visible)} onSave={() => setOnSave(onSave)} />

        </View>
    );
};

export default SearchHabite;