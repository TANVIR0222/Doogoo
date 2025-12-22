import { IconsAE, IconsCardCount, IconsDiscover, IconsMaster, IconsVisa } from '@/assets/icons'
import KeyboardAvoidingComponent from '@/src/components/KeyboardAvoidingComponent'
import HeadingTop from '@/src/components/ui/HeadingTop'
import Wrapper from '@/src/components/Wrapper'
import tw from '@/src/lib/tailwind'
import { Picker } from '@react-native-picker/picker'
import axios from 'axios'
import Checkbox from 'expo-checkbox'
import React, { useEffect } from 'react'
import { Text, TextInput, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'

const PaymentProcedure = () => {


    const [checked, setChecked] = React.useState<boolean>(false)

    const [description, setDescription] = React.useState<string>('Health');
    const [country, setCountry] = React.useState<string[]>(["canada", "usa", "mexico"]);


    useEffect(() => {
        // Fetch data or perform any side effects here
        const fetchData = async () => {
            try {
                const response = await axios.get('https://www.apicountries.com/countries');
                setCountry(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    return (
        <View style={tw`flex-1 bg-primaryBg`}>
            <HeadingTop />
            <Wrapper>

                <KeyboardAvoidingComponent>
                    <View style={tw`  flex-1 gap-4 py-2`}>
                        {/* Upper Section */}
                        <Text style={tw`text-xl text-blackish font-montserrat-600 `}>
                            Payment Procedure
                        </Text>
                        <View style={tw`  flex-col gap-4 `}>
                            <View style={tw`flex-col gap-3`}>
                                <View>
                                    <Text style={tw`text-xl text-blackish font-montserrat-700 `}>
                                        Add card
                                    </Text>
                                </View>
                                {/* Card Info */}
                                <View style={tw`  flex-col gap-2 `}>
                                    <Text style={tw`text-base font-montserrat-600 text-blackish/50`}>
                                        Contact Information
                                    </Text>
                                    <TextInput
                                        placeholder="Email"
                                        placeholderTextColor="#888"
                                        style={tw`text-base border rounded-md text-blackish font-montserrat-500 py-2 border-blackish/40 px-2`}
                                    />
                                </View>
                            </View>

                            {/* Card Information */}
                            <View style={tw`  flex-col gap-2 `}>
                                <Text style={tw`text-base font-montserrat-600 text-blackish/50`}>
                                    Cardholder Name
                                </Text>
                                <View style={tw`border border-blackish/40 rounded-lg `}>

                                    <TextInput
                                        placeholder="Full Name"
                                        placeholderTextColor="#888"
                                        style={tw`text-base text-blackish font-montserrat-500 border-b border-blackish/40 px-2 py-3`}
                                    />
                                    <View style={tw`absolute right-3 top-3 flex-row gap-1`}>
                                        <SvgXml xml={IconsMaster} />
                                        <SvgXml xml={IconsVisa} />
                                        <SvgXml xml={IconsAE} />
                                        <SvgXml xml={IconsDiscover} />
                                    </View>

                                    <View style={tw`flex-row justify-between gap-2`}>
                                        <TextInput
                                            placeholder="MM/YY"
                                            placeholderTextColor="#888"
                                            style={tw`flex-1 p-3 text-base border-r border-blackish/40`}
                                        />
                                        <TextInput
                                            placeholder="CVC"
                                            placeholderTextColor="#888"
                                            style={tw`flex-1 p-3 text-base`}
                                        />
                                        <View style={tw`absolute right-3 top-3`}>
                                            <SvgXml xml={IconsCardCount} />
                                        </View>
                                    </View>
                                </View>
                            </View>

                            <View style={tw`  flex-col gap-2 `}>
                                <Text style={tw`text-base font-montserrat-600 text-blackish/50`}>
                                    Contact Information
                                </Text>
                                <TextInput
                                    placeholder="Email"
                                    placeholderTextColor="#888"
                                    style={tw`text-base border rounded-md text-blackish font-montserrat-500  py-2 border-blackish/40 px-2`}
                                />
                            </View>

                            {/* Billing Address */}
                            <Text style={tw`text-sm font-montserrat-500  text-[#6D6D6D] `}>
                                Billing address
                            </Text>

                            <View style={tw`border border-blackish/40 rounded-lg`}>
                                <Text
                                    style={tw`pt-2 px-2 text-sm text-[#888888] font-montserrat-400`}
                                >
                                    Country or region
                                </Text>

                                <View>
                                    <View style={tw`border-b-[1px]  border-blackish/40 rounded`}>
                                        <Picker
                                            selectedValue={description}
                                            onValueChange={(itemValue) => setDescription(itemValue)}
                                        >
                                            {
                                                country?.map((country: string, index: number) => (
                                                    <Picker.Item
                                                        key={index}
                                                        label={country?.name}
                                                        value={country}
                                                    />
                                                ))
                                            }


                                            {/* Add more options here */}
                                        </Picker>
                                    </View>


                                </View>

                                <TextInput
                                    placeholder="ZIP"
                                    placeholderTextColor="#888"
                                    style={tw`p-3 text-base`}
                                />
                            </View>

                            {/* Save Card */}
                            <View style={tw`flex-row items-center justify-between mt-6`}>
                                <View style={tw`flex-row gap-2 items-center`}>

                                    <Checkbox
                                        style={tw``}
                                        value={checked}
                                        onValueChange={setChecked}
                                        color={checked ? '#D6DF22' : undefined}
                                    />
                                    <Text style={tw`text-sm  font-montserrat-600 text-blackish`}>
                                        Save this card for future payment
                                    </Text>
                                </View>
                            </View>
                        </View>

                        {/* Pay Button */}
                        <TouchableOpacity
                            // onPress={() => router.push('/payment-procedure')} 
                            style={tw`bg-blackish py-2 rounded items-center`}>
                            <Text style={tw`text-white  font-montserrat-600`}>Select Plan</Text>
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingComponent>
            </Wrapper>
        </View>
    )
}

export default PaymentProcedure