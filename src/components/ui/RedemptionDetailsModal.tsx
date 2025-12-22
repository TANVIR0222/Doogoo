import { IconsClose } from '@/assets/icons'
import { RedeemModalProps } from '@/src/constants/type'
import { formatDate } from '@/src/lib/formatDate'
import tw from '@/src/lib/tailwind'
import { useCompaletedRedemptionPartnerDetailsMutation, useGetSinglaeRedemptionHistoryQuery } from '@/src/redux/redemptionsApi/redemptionsApi'
import { useCompaletedRedemptionDetailsMutation, useViewAvailableRedemptionDetailsQuery } from '@/src/redux/rewardsApi/rewardsApi'
import React from 'react'
import { Modal, Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const RedemptionDetailsModal = ({ setViewModal, viewModal, props, id, partnaer_id }: RedeemModalProps) => {
    // console.log(id);


    // Api calls
    const { data, isLoading } = useViewAvailableRedemptionDetailsQuery({ id: Number(id) });
    const { data: userData, isLoading: userLoading } = useGetSinglaeRedemptionHistoryQuery({ id: Number(partnaer_id) });
    const [redeemAvailableRewards, { isLoading: redeemLoading }] = useCompaletedRedemptionDetailsMutation();
    const [redeemAvailableRewardsPartner, { isLoading: redeemLoadingPartner }] = useCompaletedRedemptionPartnerDetailsMutation();


    console.log(data);


    // user status
    const userStatus = userData?.data?.status;

    const handleRedeemReward = async () => {
        try {

            const res = await redeemAvailableRewards({ id: Number(id) }).unwrap();
            if (res?.status) {
                setViewModal(!viewModal)
            }
        } catch (error) {
            console.log(error);

        }
    }
    const handleRedeemRewardPartner = async () => {
        try {

            const res = await redeemAvailableRewardsPartner({ id: Number(partnaer_id) }).unwrap();

            if (res?.status) {
                setViewModal(!viewModal)
            }
        } catch (error) {
            console.log(error);

        }
    }




    return (
        <Modal visible={viewModal} transparent animationType="fade">
            <View style={tw`flex-1 items-center justify-center `}>
                <View style={tw` bg-white shadow-xl px-5 pt-5    pb-8 w-90 rounded-xl`}>
                    {/* Header */}
                    <View style={tw`flex-row justify-between items-center mb-6`}>
                        {/* <Text style={tw`text-xl text-blackish font-montserrat-700 `}>  {
                        props === 'USER' ? 'Redemption Details' : 'Redemption Details '
                        }  </Text> */}
                        <Text style={tw`text-xl text-blackish font-montserrat-700 `}>Redemption Details </Text>
                        <TouchableOpacity onPress={() => setViewModal(!viewModal)}>
                            <SvgXml xml={IconsClose} />
                        </TouchableOpacity>
                    </View>

                    <View style={tw` flex-col gap-4`}>
                        <View style={tw` flex-col gap-1`}>
                            {/* Description */}
                            {
                                props === 'USER' && (
                                    <View style={tw` flex-row  gap-1`}>
                                        <Text style={tw` font-montserrat-700 text-blackish`}>Rewards :</Text  >
                                        <Text style={tw` font-montserrat-600 text-blackish`}>{data?.data?.reward?.title}</Text>
                                    </View>
                                )
                            }


                            {/* Terms */}
                            {props !== 'USER' && (
                                <>

                                    <View style={tw` flex-row  gap-1`}>
                                        <Text style={tw` font-montserrat-700 text-blackish`}>Rewards :</Text  >
                                        <Text style={tw` font-montserrat-600 text-blackish`}>{userData?.data?.reward?.title}</Text>
                                    </View>
                                </>
                            )

                            }
                            {props !== 'USER' && (
                                <>

                                    <View style={tw` flex-row  gap-1`}>
                                        <Text style={tw` font-montserrat-700 text-blackish`}>Customer :</Text  >
                                        <Text style={tw` font-montserrat-600 text-blackish`}>{userData?.data?.user?.full_name}</Text>
                                    </View>
                                </>
                            )

                            }


                            {/* Terms */}
                            {
                                props === 'USER' && <View style={tw` flex-row  gap-1`}>
                                    <Text style={tw` font-montserrat-700 text-blackish`}>Shop Name :</Text  >
                                    <Text style={tw` font-montserrat-600 text-blackish`}>{data?.data?.reward?.partner?.profile?.business_name ?? 'N/A'}</Text>
                                </View>
                            }
                            {/* Terms */}
                            {props === 'USER' && <View style={tw` flex-row  gap-1`}>
                                <Text style={tw` font-montserrat-700 text-blackish`}>Address : </Text  >
                                <Text style={tw` font-montserrat-600 text-blackish`}>{data?.data?.reward?.partner?.address ?? 'N/A'}</Text>
                            </View>}
                            {/* Terms */}
                            {props === 'USER' && <View style={tw` flex-row  gap-1`}>
                                <Text style={tw` font-montserrat-700 text-blackish`}>Phone Number : </Text  >
                                <Text style={tw` font-montserrat-600 text-blackish`}>{data?.data?.reward?.partner?.phone_number ?? 'N/A'}</Text>
                            </View>}


                            {/* Terms */}
                            {props !== 'USER' && (
                                <View style={tw` flex-row  gap-1`}>
                                    <Text style={tw` font-montserrat-700 text-blackish`}>Date :</Text  >
                                    <Text style={tw` font-montserrat-600 text-blackish`}>{formatDate((userData?.data?.date))}</Text>
                                </View>
                            )}
                            {props === 'USER' && (
                                <View style={tw` flex-row  gap-1`}>
                                    <Text style={tw` font-montserrat-700 text-blackish`}>Date :</Text  >
                                    <Text style={tw` font-montserrat-600 text-blackish`}>{formatDate((data?.data?.date))}</Text>
                                </View>
                            )}

                            {props !== 'USER' && (
                                <View style={tw` flex-row  gap-1`}>
                                    <Text style={tw` font-montserrat-700 text-blackish`}>Code :</Text  >
                                    <Text style={tw` font-montserrat-600 text-blackish`}>{userData?.data?.code ?? 'C150085'}</Text>
                                </View>
                            )}
                            {props === 'USER' && (
                                <View style={tw` flex-row  gap-1`}>
                                    <Text style={tw` font-montserrat-700 text-blackish`}>Code :</Text  >
                                    <Text style={tw` font-montserrat-600 text-blackish`}>{data?.data?.code ?? 'C150085'}</Text>
                                </View>
                            )}

                            {props !== 'USER' && (
                                <View style={tw` flex-row  gap-1`}>
                                    <Text style={tw` font-montserrat-700 text-blackish`}>Status :</Text  >
                                    <Text style={tw` font-montserrat-600 bg-blackish/20 px-2 items-center rounded text-sm   text-blackish`}>{userData?.data?.status}</Text>
                                </View>
                            )}
                            {props === 'USER' && (
                                <View style={tw` flex-row  gap-1`}>
                                    <Text style={tw` font-montserrat-700 text-blackish`}>Status :</Text  >
                                    <Text style={tw` font-montserrat-600 bg-blackish/20 px-2 items-center rounded   text-blackish`}>{data?.data?.status}</Text>
                                </View>
                            )}



                            {/* Terms */}

                        </View>

                        {/* Redeem Button */}
                        {props === 'USER' ? <TouchableOpacity
                            style={tw`bg-blackish py-2 rounded-md self-stretch`}
                            disabled={redeemLoading}
                            onPress={() => handleRedeemReward()}
                        >
                            <Text style={tw`text-white text-lg  font-montserrat-600 text-center`}>
                                Completed
                            </Text>
                        </TouchableOpacity>
                            :
                            <TouchableOpacity
                                style={tw`${userStatus === 'Completed' ? 'bg-blackish/80' : 'bg-blackish'}  py-2 rounded-md self-stretch`}
                                disabled={redeemLoadingPartner || userStatus === 'Completed'}
                                onPress={() => handleRedeemRewardPartner()}
                            >
                                <Text style={tw`text-white text-lg  font-montserrat-600 text-center`}>
                                    Mark as Redeemed
                                </Text>
                            </TouchableOpacity>}
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default RedemptionDetailsModal