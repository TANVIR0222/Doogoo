import tw from '@/src/lib/tailwind';
import React from 'react';
import { ScrollView, Text, View } from 'react-native';

const AboutDoogoo = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`flex-1 bg-white p-4`}>
            <Text style={tw`text-xl font-montserrat-600 mb-4`}>About Us</Text>
            <View style={tw`mb-6`}>
                <Text style={tw`text-lg  font-montserrat-600 mb-2`}>
                    At Doogoo, we believe that greatness doesn’t come from giant leaps — it comes from small, consistent steps taken every day.
                </Text>
                <Text style={tw`text-base  text-blackText font-montserrat-400`}>
                    Our mission is to make personal growth a habit, not a chore, and to turn that journey into something engaging, rewarding, and community-driven.
                </Text>
            </View>

            <View style={tw`mb-6`}>
                <Text style={tw`text-base  text-blackText font-montserrat-400`}>
                    Born out of a desire to help people live better, more intentional lives, Doogoo is a lifestyle and productivity app designed to build healthier habits, boost motivation, and bring people together through shared challenges.
                </Text>
                <Text style={tw`text-base  text-blackText font-montserrat-400 mt-2`}>
                    Whether you're trying to drink more water, journal daily, meditate, or hit the gym — Doogoo helps you stay on track and actually enjoy the process.
                </Text>
            </View>

            <View style={tw`mb-6`}>
                <Text style={tw`text-base  text-blackText font-montserrat-400`}>
                    But we don’t stop at habit tracking. We bring your progress to life by rewarding you with real-world value — discounts and special offers from local businesses that believe in the same values we do. It's personal development that gives back.
                </Text>
            </View>

            <View style={tw`mb-6`}>
                <Text style={tw`text-base  text-blackText font-montserrat-400`}>
                    Doogoo is where discipline meets delight, where self-improvement becomes a community sport, and where progress is not only seen, but celebrated.
                </Text>
            </View>

            <View>
                <Text style={tw`text-base  text-blackText font-montserrat-400`}>
                    We're not just another habit app.
                </Text>
                <Text style={tw`text-base  text-blackText font-montserrat-600 mt-2`}>
                    We're a movement — a gamified lifestyle shift — and you're invited.
                </Text>
            </View>
        </ScrollView>
    );
};

export default AboutDoogoo;
