import tw from '@/src/lib/tailwind';
import React from 'react';
import { Linking, ScrollView, Text, TouchableOpacity, View } from 'react-native';

const DataPrivacy = () => {
    const email = 'support@doogoo.app';

    const handleEmailPress = () => {
        Linking.openURL(`mailto:${email}`);
    };
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`flex-1 bg-white p-4`}>
            <Text style={tw`text-xl font-montserrat-600 mb-4`}>Data Privacy</Text>

            <Text style={tw`mb-4  font-montserrat-500 text-sm`}>
                Your privacy matters. At Doogoo, we’re committed to protecting your data and being transparent about how we use it.
            </Text>

            {/* Section 1 */}
            <View style={tw`mb-4`}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>1. Data We Collect</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Account Info: Name, email, profile picture
                </Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Usage Data: Habit progress, points earned, challenge participation
                </Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Location Data (if you enable it): To offer local rewards and business deals
                </Text>
            </View>

            {/* Section 2 */}
            <View style={tw`mb-4  font-montserrat-500 text-sm`}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>2. How We Use Your Data</Text>
                <Text style={tw`mb-1 text-sm`}>
                    • To personalize your experience
                </Text>
                <Text style={tw`mb-1 text-sm`}>
                    • To track and reward habit completion
                </Text>
                <Text style={tw`mb-1 text-sm`}>
                    • To recommend local business offers
                </Text>
                <Text style={tw`mb-1 text-sm`}>
                    • To improve our services and features

                </Text>
            </View>

            {/* Section 3 */}
            <View style={tw`mb-4 `}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>3. Sharing of Data</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>• We do not sell your data.</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Data may be shared with partnered businesses only when you redeem a reward.
                </Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • We may share anonymized usage stats to improve our system and partnerships.
                </Text>
            </View>

            {/* Section 4 */}
            <View style={tw`mb-4`}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>4. . Data Security</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Your data is stored securely with industry-standard encryption.
                </Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Access to user data is limited to authorized personnel only.
                </Text>
            </View>

            {/* Section 5 */}
            <View style={tw`mb-4`}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>5. Your Rights</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    •You can update or delete your personal information at any time from within the app .
                </Text>
                <Text style={tw`text-gray text-base`}>
                    You can request to delete your account and associated data by contacting us at{' '}
                    <TouchableOpacity onPress={handleEmailPress}>
                        <Text style={tw`text-yellowGreen underline`}>[support@doogoo.app].</Text>
                    </TouchableOpacity>
                    .
                </Text>
            </View>

            {/* Section 6 */}
            <View style={tw`mb-4  font-montserrat-500 text-sm`}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>6. Third-Party Tools</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • The app may use analytics or cloud services to improve performance.
                </Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Third-party tools are vetted for compliance with privacy standards.
                </Text>
            </View>

            {/* Section 7 */}
            <View style={tw`mb-4 `}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>7. Termination</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • We reserve the right to suspend or terminate accounts for violations
                    of these Terms.
                </Text>
            </View>

            {/* Section 8 */}
            <View style={tw`mb-8`}>
                <Text style={tw`text-base font-semibold mb-2`}>8. Changes to Terms</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Doogoo may update these Terms at any time. Continued use after
                    changes means you accept the new terms.
                </Text>
            </View>
        </ScrollView>
    )
}

export default DataPrivacy