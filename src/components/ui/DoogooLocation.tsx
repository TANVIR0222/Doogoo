// import { LocationProps } from "@/src/lib/authType";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { Text, TextInput, TouchableOpacity, View } from "react-native";
// import tw from "../../lib/tailwind";

// const DoogooLocation = ({ setSelectedLocation, setAddress, isEmpty, address }: LocationProps) => {
//     const [searchText, setSearchText] = useState("");
//     const [locationSuggestions, setLocationSuggestions] = useState([]);
//     const [viewLocations, setViewLocations] = useState();
//     console.log('------>>>>>>-----', viewLocations[0]?.formatted_address);



//     useEffect(() => {
//         setAddress(searchText);
//         if (isEmpty) {
//             setSearchText("");
//         }
//     }, [searchText, setAddress, isEmpty]);


//     const handleSearchLocation = async (query: string) => {
//         setSelectedLocation(null);
//         setSearchText(query);

//         // Stop search if query is empty or only spaces
//         if (!query.trim()) {
//             setLocationSuggestions([]);
//             return;
//         }

//         try {
//             const response = await axios.get(
//                 `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
//             );

//             setLocationSuggestions(response?.data?.results || []);
//             setViewLocations(response?.data?.results?.formatted_address || []);
//         } catch (error) {
//             console.log(error);
//         }
//     };


//     return (
//         <View style={tw`flex-1`}>


//             <View>
//                 <Text style={tw`text-sm font-montserrat-600 mb-1`}>
//                     Address
//                 </Text>
//                 <View
//                     style={tw``}
//                 >
//                     <TextInput
//                         value={viewLocations[0]?.formatted_address}
//                         onChangeText={handleSearchLocation}
//                         placeholderTextColor="#3e3e3f"
//                         style={tw`border border-blackish rounded px-3 py-2`}
//                     />
//                 </View>
//             </View>

//             {locationSuggestions.map((item, index) => (
//                 <TouchableOpacity
//                     key={index}
//                     onPress={() => {
//                         setSelectedLocation(item);
//                         setSearchText(item?.name);
//                         setLocationSuggestions([]);
//                     }}
//                 >
//                     <View style={tw`py-2 border-b border-gray`}>
//                         <Text style={tw`font-montserrat-500  text-black`}>{item?.name}</Text>
//                         <Text style={tw`text-gray`}>{item?.formatted_address}</Text>
//                     </View>
//                 </TouchableOpacity>
//             ))}
//         </View>
//     );
// };

// export default DoogooLocation;

import { LocationProps } from "@/src/lib/authType";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import tw from "../../lib/tailwind";

const DoogooLocation = ({ setSelectedLocation, setAddress, isEmpty }: LocationProps) => {
    const [searchText, setSearchText] = useState("");
    const [locationSuggestions, setLocationSuggestions] = useState([]);

    useEffect(() => {
        setAddress(searchText);
        if (isEmpty) {
            setSearchText("");
        }
    }, [searchText, isEmpty, setAddress]);

    const handleSearchLocation = async (query: string) => {
        setSelectedLocation(null);
        setSearchText(query);

        if (!query.trim()) {
            setLocationSuggestions([]);
            return;
        }

        try {
            const response = await axios.get(
                `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${query}&key=${process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY}`
            );

            setLocationSuggestions(response?.data?.results || []);
        } catch (error) {
            console.log("Location search error:", error);
        }
    };

    return (
        <View style={tw`flex-1`}>

            <View>
                <Text style={tw`text-sm font-montserrat-600 mb-1`}>
                    Address
                </Text>

                <TextInput
                    value={searchText}
                    onChangeText={handleSearchLocation}
                    placeholder="Search location..."
                    placeholderTextColor="#3e3e3f"
                    style={tw`border border-blackish rounded px-3 py-2`}
                />
            </View>

            {/* Suggestion list */}
            {locationSuggestions.map((item, index) => (
                <TouchableOpacity
                    key={index}
                    onPress={() => {
                        setSelectedLocation(item);
                        setSearchText(item?.formatted_address); // show full address
                        setLocationSuggestions([]);
                    }}
                >
                    <View style={tw`py-2 border-b border-gray`}>
                        <Text style={tw`font-montserrat-500 text-black`}>
                            {item?.name}
                        </Text>
                        <Text style={tw`text-gray`}>
                            {item?.formatted_address}
                        </Text>
                    </View>
                </TouchableOpacity>
            ))}
        </View>
    );
};

export default DoogooLocation;
