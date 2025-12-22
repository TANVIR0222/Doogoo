import tw from "@/src/lib/tailwind";
import React from "react";
import { ScrollView, Text, View } from "react-native";

const TermsAndConditions = () => {
    return (
        <ScrollView showsVerticalScrollIndicator={false} style={tw`flex-1 bg-white p-4`}>
            <Text style={tw`text-xl font-montserrat-600 mb-4`}>Terms & Conditions</Text>

            <Text style={tw`mb-4  font-montserrat-500 text-sm`}>
                Welcome to Doogoo!{`\n`}
                By downloading or using the Doogoo app, you agree to these Terms and
                Conditions. If you do not agree, please do not use the app.
            </Text>

            {/* Section 1 */}
            <View style={tw`mb-4`}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>1. Use of the App</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Doogoo is intended for personal, non-commercial use to help users
                    build positive habits and earn rewards.
                </Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • You must be at least 13 years old to use Doogoo. By using the app
                    you confirm that you meet this age requirement.
                </Text>
            </View>

            {/* Section 2 */}
            <View style={tw`mb-4  font-montserrat-500 text-sm`}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>2. Accounts</Text>
                <Text style={tw`mb-1`}>
                    • You are responsible for keeping your login credentials secure.
                </Text>
                <Text style={tw`mb-1`}>
                    • You may not use another person’s account without permission.
                </Text>
            </View>

            {/* Section 3 */}
            <View style={tw`mb-4 `}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>3. Subscription & Payments</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>• Doogoo offers both free and premium (paid) plans.</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Subscription payments are processed via the app store and renew
                    automatically unless canceled.
                </Text>
            </View>

            {/* Section 4 */}
            <View style={tw`mb-4`}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>4. Rewards & Redemptions</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Points earned through habit tracking can be redeemed for discounts
                    from participating local businesses.
                </Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Rewards are subject to availability and business terms.
                </Text>
            </View>

            {/* Section 5 */}
            <View style={tw`mb-4`}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>5. User Conduct</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • You agree not to misuse the app, cheat the reward system, or harm
                    the community.
                </Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • Any fraudulent behavior may result in account suspension.
                </Text>
            </View>

            {/* Section 6 */}
            <View style={tw`mb-4  font-montserrat-500 text-sm`}>
                <Text style={tw`text-base font-montserrat-700 mb-2`}>6. Intellectual Property</Text>
                <Text style={tw`mb-1  font-montserrat-500 text-sm`}>
                    • All content in the app, including text, graphics, logos, and
                    software, is the property of Doogoo and protected by applicable laws.
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
    );
};

export default TermsAndConditions;
