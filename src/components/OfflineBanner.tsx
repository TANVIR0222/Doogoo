import { Text, View } from "react-native";
import tw from "../lib/tailwind";

const OfflineBanner: React.FC = () => {
    return (
        <View style={tw`absolute top-0 left-0 right-0 bg-red-600 p-3 z-50`}>
            <Text style={tw`text-white text-center font-bold`}>
                No Internet Connection
            </Text>
        </View>
    );
};

export default OfflineBanner;
