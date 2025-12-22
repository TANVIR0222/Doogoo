import tw from '@/src/lib/tailwind'
import React from 'react'
import { ScrollView, View } from 'react-native'
import ProfileHeader from '../../(tab)/profile'

export default function ProfileScreen() {
    return (
        <View style={tw`flex-1 bg-primaryBg`} >
            <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingHorizontal: 20 }} >

                <View style={tw`flex-1 flex-col gap-6`}>
                    {/* Profile Header */}
                    <ProfileHeader />
                    {/* Stats Cards */}

                </View>

            </ScrollView>
        </View>
    )
}