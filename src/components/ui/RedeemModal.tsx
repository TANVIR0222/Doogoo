import { IconsClose } from '@/assets/icons';
import { RedeemModalProps } from '@/src/constants/type';
import tw from '@/src/lib/tailwind';
import { useRedeemAvailableRewardsMutation, useViewAvailableRewardsQuery } from '@/src/redux/rewardsApi/rewardsApi';
import { makeImage } from '@/src/utils/image_converter';
import { _width } from '@/src/utils/utils';
import React from 'react';
import { Image, Modal, Text, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';
import Toast from 'react-native-toast-message';


const RedeemModal = ({ setViewModal, viewModal, id }: RedeemModalProps) => {


    console.log(id);


    const { data, isLoading } = useViewAvailableRewardsQuery({ id: Number(id) });

    const [redeemAvailableRewards, { isLoading: redeemLoading }] = useRedeemAvailableRewardsMutation();

    const handleRedeemReward = async () => {
        try {

            const res = await redeemAvailableRewards({ reward_id: id }).unwrap();
            console.log(res);

            (() => (
                Toast.show({
                    type: res?.status ? "success" : "error",
                    text2: res?.message,
                    visibilityTime: 2000,
                })
            ))();
            // setViewModal(!viewModal)

        } catch (error) {
            console.log(error);

        }
    }




    return (
        <Modal visible={viewModal} transparent animationType="fade">
            <View style={tw`flex-1 items-center justify-center `}>
                <View style={tw` bg-white shadow-xl px-5 pt-5    pb-8 w-90 rounded-2xl`}>
                    {/* Header */}
                    <View style={tw`flex-row justify-between items-center mb-6`}>
                        <Text style={tw`text-xl text-blackish font-montserrat-700 `}>Reward Details</Text>
                        <TouchableOpacity onPress={() => setViewModal(!viewModal)}>
                            <SvgXml xml={IconsClose} />
                        </TouchableOpacity>
                    </View>

                    {/* Reward Icon */}
                    <View style={tw` items-center justify-center rounded-lg`}>
                        <Image source={{ uri: makeImage(data?.data?.image || data?.data?.image_url) }} resizeMode='cover' style={tw`w-22  rounded  h-22`} />
                    </View>

                    {/* Reward Title */}
                    <Text style={tw`text-base font-montserrat-700  text-center text-blackish mb-2`}>{data?.data?.title}</Text>

                    {/* Points Cost */}
                    <Text style={tw`text-base font-montserrat-700 text-[#1a8b03] text-center mb-6`}>{data?.data?.purchase_point} points</Text>

                    <View style={tw` flex-col gap-4`}>
                        <View style={tw` flex-col gap-4`}>
                            {/* Description */}
                            <Text style={tw`text-base text-blackish text-center `}>
                                {data?.data?.description}
                            </Text>

                            {/* Terms */}
                            <View style={tw` flex-row  gap-1 `}>
                                <Text style={tw` font-montserrat-700 text-blackish`}>Terms :</Text  >
                                <Text style={[tw` font-montserrat-600 text-blackish`, { fontSize: _width < 375 ? 12 : 13 }]}>{'Offer valid for 30 days after redemption. \n One  per customer'}.</Text>
                            </View>
                        </View>

                        {/* Redeem Button */}
                        <TouchableOpacity
                            style={tw`${data?.data?.already_redeemed ? "bg-blackish/50" : "bg-blackish"}   py-2 rounded-md self-stretch`}
                            onPress={() => handleRedeemReward()}
                            disabled={redeemLoading || data?.data?.already_redeemed}
                        >
                            <Text style={tw` ${data?.data?.already_redeemed ? "text-[#6C6C6C]" : "text-white"} text-lg   font-montserrat-600 text-center`}>{data?.data?.already_redeemed ? 'Already Redeemed' : 'Redeem'}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default RedeemModal;