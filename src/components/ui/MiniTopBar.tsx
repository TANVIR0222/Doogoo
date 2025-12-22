import { IconsAdd } from '@/assets/icons'
import { MiniTopProps } from '@/src/constants/type'
import tw from '@/src/lib/tailwind'
import React from 'react'
import { Text, TouchableOpacity, View } from 'react-native'
import { SvgXml } from 'react-native-svg'
import AddSayNoEntryModalReward from './AddSayNoEntryModalReward'

const MiniTopBar = ({ Heading, setVisible, visible, pageName }: MiniTopProps) => {

    // const viewModel = pageName

    // console.log('MiniTopBar pageName:', viewModel);




    return (
        <View>
            <View style={tw` px-[5%] py-3`}>
                <View style={tw`flex-row items-center justify-between `}>
                    <Text style={tw`text-blackish font-montserrat-600 text-xl`}>
                        {Heading}
                    </Text>
                    <TouchableOpacity onPress={() => setVisible(!visible)} >
                        <SvgXml xml={IconsAdd} />
                    </TouchableOpacity>
                </View>
            </View>
            {/* Add Say No Entry Modal */}
            <AddSayNoEntryModalReward visible={visible} onClose={() => setVisible(false)} />
        </View>
    )
}

export default MiniTopBar