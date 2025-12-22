import tw from '@/src/lib/tailwind';
import React from 'react';
import { Text, useWindowDimensions, View } from 'react-native';

// Define Props for clarity
interface PremiumSubscriptionHeaderProps {
    startDate: string | number; // e.g., "Jan 15, 2024"
    endDate: string | number;   // e.g., "Jan 15, 2025"
}

const PremiumSubscriptionHeader: React.FC<PremiumSubscriptionHeaderProps> = ({
    startDate,
    endDate
}) => {


    // Date Color: Accent green for positive/active status
    // Card Background: A slight off-white or light accent background 
    const CARD_BG = 'bg-white';
    const { width } = useWindowDimensions();


    return (
        <View style={tw`w-full p-4 mt-2 ${CARD_BG} rounded-xl  border-2 border-yellowGreen`}>

            {/* --- Top Row: Title & Premium Badge --- */}
            <View style={tw`flex-row  gap-2 items-center justify-between mb-3`}>

                {/* Main Title */}
                <Text style={[tw`text-blackish  font-montserrat-700`, {
                    fontSize: width * 0.04
                }]}>
                    Your Subscription
                </Text>

                {/* Premium Badge (Golden/Colorfull) */}
                <View style={tw`px-3 py-1 rounded-full bg-yellowGreen shadow-md`}>
                    <Text style={[tw`font-montserrat-700 text-blackish `, {
                        fontSize: width * 0.03
                    }]}>
                        PREMIUM ACTIVE
                    </Text>
                </View>

            </View>

            {/* --- Date Information Block --- */}
            <View style={tw`mt-2 pt-3 border-t border-gray`}>
                <Text style={tw`text-sm text-blackish font-montserrat-700 mb-2`}>
                    Subscription Period
                </Text>

                <View style={tw`flex-row items-center justify-between`}>

                    {/* Start Date */}
                    <View style={tw`flex-col items-start p-1`}>
                        <Text style={tw`text-xs text-blackish font-montserrat-600`}>Start Date:</Text>
                        <Text style={tw`text-lg text-yellowGreen font-montserrat-700`}>
                            {startDate}
                        </Text>
                    </View>

                    {/* Separator / Arrow Icon Placeholder */}
                    <Text style={tw`text-blackish text-2xl mx-2`}>→</Text>

                    {/* End Date (Expiry) */}
                    <View style={tw`flex-col items-end p-1`}>
                        <Text style={tw`text-xs text-blackish font-montserrat-600`}>Expiry  Date:</Text>
                        <Text style={tw`text-lg text-yellowGreen font-montserrat-700`}>
                            {endDate}
                        </Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default PremiumSubscriptionHeader;