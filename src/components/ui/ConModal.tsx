import { IconsCelebrate, IconsClose } from '@/assets/icons'
import { NewModalPropsCon } from '@/src/constants/type'
import tw from '@/src/lib/tailwind'
import { useGetOthersProfileQuery } from '@/src/redux/authApi/authApiSlice'
import { useGetCelebrationUserIdQuery, useUserCelebrateSingleMutation } from '@/src/redux/groupApi/groupApi'
import { makeImage } from '@/src/utils/image_converter'
import React from 'react'
import { Image, Modal, Pressable, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Toast from 'react-native-toast-message'

const ConModal = ({ visible, onClose, prors, userId, chalange_id, con_user_id }: NewModalPropsCon) => {

    const { data, isLoading } = useGetOthersProfileQuery({ id: userId });
    const { data: celebrateData, isLoading: celebrateLoading } = useGetCelebrationUserIdQuery({ id: Number(chalange_id), con_user_id: con_user_id })
    const [celebrateUser, { isLoading: celebrateLoadingPost }] = useUserCelebrateSingleMutation()
    // console.log(celebrateData);
    const handleCelebrate = async () => {
        try {
            const res = await celebrateUser({ id: Number(con_user_id) }).unwrap();
            if (res?.status) {
                onClose();
                (() => {
                    Toast.show({
                        type: "success",
                        text2: "Congratulations sent to the user! 🎉",
                        visibilityTime: 2000,
                    });
                })();
            }


        } catch (error) {
            console.log(error);

        }
    }





    return (
        <Modal transparent visible={visible} animationType="slide">

            {
                prors === 'ativeChallange' ?
                    <View style={tw`flex-1 shadow-md justify-center items-center`}>
                        <View style={tw`bg-white  shadow-2xl  rounded-lg p-6 w-80`}>
                            {/* Header */}
                            <View >
                                <Pressable style={tw` mb-4  flex-row  items-end justify-end`} onPress={onClose}>
                                    <SvgXml xml={IconsClose} />
                                </Pressable>
                            </View>
                            <View style={tw` flex-col gap-4 justify-center items-center`}>

                                <Image source={{ uri: makeImage(data?.data?.user?.avatar_url) }} style={tw`w-32 h-32 rounded-full`} />
                                <Text style={tw`text-blackish text-base  font-montserrat-700`}>{data?.data?.user?.full_name}</Text>
                            </View>
                        </View>
                    </View>
                    :
                    <View style={tw`flex-1 justify-center items-center  `}>
                        <View style={tw`bg-white shadow-2xl rounded-lg  p-6 w-80`}>

                            {/* Header */}
                            <View style={tw`flex-row items-start justify-between`}>

                                {/* Profile */}
                                <View style={tw`flex-row gap-4 items-center`}>
                                    <Image
                                        source={{ uri: makeImage(celebrateData?.user?.avatar_url) }}
                                        style={tw`w-14 h-14 rounded-full`}
                                    />
                                    <View>
                                        <Text style={tw`text-blackish text-base font-montserrat-700`}>
                                            {celebrateData?.user?.full_name}
                                        </Text>
                                        {/* <Text style={tw`text-blackish text-sm font-montserrat-500`}>
                                            {timeFormateInstragram(celebrateData?.last_completed_time)}
                                        </Text> */}
                                    </View>
                                </View>

                                {/* Close Button */}
                                <Pressable
                                    style={tw`p-1`}
                                    onPress={onClose}
                                >
                                    <SvgXml xml={IconsClose} />
                                </Pressable>
                            </View>

                            {/* Content */}
                            <View style={tw` px-4 py-2`}>
                                <Text style={tw`text-blackish my-3 text-base font-montserrat-500`}>
                                    {celebrateData?.challenge_group_name}
                                </Text>

                                {/* Celebrate Button */}
                                <TouchableOpacity
                                    style={tw`mt-4 ${celebrateLoadingPost ? 'border-yellow-300' : 'border-blackish'} border  flex-row items-center gap-2 px-4 py-2 rounded-lg self-start`}
                                    disabled={celebrateLoadingPost}
                                    onPress={() => handleCelebrate()}
                                >
                                    <SvgXml xml={IconsCelebrate} height={25} width={25} />
                                    <Text style={tw`text-blackText font-montserrat-400 text-sm`}>
                                        CELEBRATE
                                    </Text>
                                </TouchableOpacity>
                            </View>

                        </View>
                    </View>

            }



        </Modal>
    )
}

export default ConModal
