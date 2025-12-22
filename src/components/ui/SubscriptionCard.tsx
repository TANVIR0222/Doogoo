import { IconsTickGreen } from '@/assets/icons'
import tw from '@/src/lib/tailwind'
import { useGetAdvanceUserSubscriptionQuery } from '@/src/redux/advanceFeaturesApi/advanceFeaturesApi'
import { useUserPaymentIntenMutation, useUserPaymentSuccessMutation } from '@/src/redux/paymentApi/paymentApi'
import { _width } from '@/src/utils/utils'
import { useStripe } from '@stripe/stripe-react-native'
import React, { useState } from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import Toast from 'react-native-toast-message'

const SubscriptionCard = () => {
    const { data, isLoading } = useGetAdvanceUserSubscriptionQuery()
    const [userPaymentInten] = useUserPaymentIntenMutation()
    const [paymentSuccess] = useUserPaymentSuccessMutation()
    const { initPaymentSheet, presentPaymentSheet } = useStripe()

    const [isProcessing, setIsProcessing] = useState<number | null>(null)

    const handlePlanPayment = async (price: number, subscriptionId: number) => {
        try {
            if (!price || price < 1) return

            // 1️⃣ Create payment intent
            const res = await userPaymentInten({
                amount: price,
                payment_method_types: 'card',
            }).unwrap()

            // 2️⃣ Initialize payment sheet
            const { error: initError } = await initPaymentSheet({
                merchantDisplayName: 'DooGoo',
                paymentIntentClientSecret: res.data.client_secret,
            })

            if (initError) {
                Toast.show({
                    type: 'error',
                    text2: 'Payment initialization failed',
                })
                return
            }

            // 3️⃣ Present the payment sheet
            const { error: paymentError } = await presentPaymentSheet()

            // 🔹 :
            if (paymentError) {
                if (paymentError.code === 'Canceled') {
                    Toast.show({
                        type: 'info',
                        text2: 'Payment canceled',
                        visibilityTime: 2000,
                    })
                } else {
                    Toast.show({
                        type: 'error',
                        text2: 'Payment failed, please try again.',
                        visibilityTime: 2000,
                    })
                }
                return
            }

            // 4️⃣ Payment success API call
            const successRes = await paymentSuccess({
                payment_intent_id: res?.data?.id,
                subscription_id: subscriptionId,
                amount: res?.data?.amount,
            }).unwrap()

            if (successRes?.status) {
                Toast.show({
                    type: 'success',
                    text2: 'Payment completed successfully 🎉',
                    visibilityTime: 2000,
                })
            } else {
                Toast.show({
                    type: 'error',
                    text2: 'Payment failed, please try again.',
                    visibilityTime: 2000,
                })
            }
        } catch (err) {
            console.error('Payment failed', err)
            Toast.show({
                type: 'error',
                text2: 'Something went wrong. Please try again.',
                visibilityTime: 2000,
            })
        } finally {
            setIsProcessing(null)
        }
    }

    return (
        <View style={tw`flex-1 flex-col gap-6 mb-4`}>
            <View style={tw`flex-1 flex-col gap-6`}>
                <View>
                    <Text style={tw`text-blackish text-xl font-montserrat-500`}>Subscription</Text>
                </View>

                {data?.data?.map((item: any, index: number) => (
                    <View
                        key={index}
                        style={tw`bg-primaryBg border-b-2 flex-col gap-4 border-[#d9d9d9] rounded-xl shadow-md px-4 py-5`}
                    >
                        <View style={tw`flex-row justify-between items-center`}>
                            <View style={tw`${item?.discount > 0 ? ' flex-col' : 'flex-row gap-1'}`}>
                                <Text style={tw`text-blackish text-lg font-montserrat-700`}>
                                    DooGoo
                                </Text>

                                <View style={tw`flex-row items-center ${item?.discount > 0 ? 'line-through mt-1' : ''} gap-1 `}>
                                    {item?.price > 0 && (
                                        <Text style={[tw`text-gray-500  ${item?.discount > 0 ? 'line-through' : ''} font-montserrat-400`, {
                                            fontSize: _width * 0.03
                                        }]}>
                                            {`($${item?.price})`}
                                        </Text>
                                    )}

                                    {item?.discount_price > 0 && (
                                        <Text style={[tw`text-green-600  font-montserrat-700`, {
                                            fontSize: _width * 0.03
                                        }]}>
                                            ${item?.discount_price}
                                        </Text>
                                    )}

                                    {item?.discount > 0 && (
                                        <Text style={[tw`text-redish  font-montserrat-600 bg-red-100 px-1.5 py-0.5 rounded`, {
                                            fontSize: _width * 0.03
                                        }]}>
                                            Save {item?.discount}%
                                        </Text>
                                    )}
                                </View>
                            </View>


                            <View style={tw`px-2 py-1 rounded-full bg-[#FFB74C]`}>
                                <Text style={tw`text-sm font-montserrat-500 text-blackish`}>
                                    {item?.plan_name} Plan
                                </Text>
                            </View>
                        </View>

                        <View style={tw`flex-col gap-2`}>
                            {item?.features?.map((feature: string, idx: number) => (
                                <View key={idx} style={tw`flex-row items-center gap-2`}>
                                    <SvgXml xml={IconsTickGreen} width={16} height={16} />
                                    <Text style={tw`text-blackish text-sm font-montserrat-400`}>{feature}</Text>
                                </View>
                            ))}
                        </View>

                        <TouchableOpacity
                            disabled={item?.id === 1 || isProcessing === item?.id}
                            onPress={() => {
                                setIsProcessing(item?.id)
                                handlePlanPayment(item?.price, item?.id)
                            }}
                            style={tw`bg-blackish py-2 rounded items-center ${isProcessing === item?.id ? 'opacity-70' : ''
                                }`}
                        >
                            <Text style={tw`text-white font-montserrat-600`}>
                                {isProcessing === item?.id ? 'Processing...' : item?.duration}
                            </Text>
                        </TouchableOpacity>
                    </View>
                ))}
            </View>
        </View>
    )
}

export default SubscriptionCard
