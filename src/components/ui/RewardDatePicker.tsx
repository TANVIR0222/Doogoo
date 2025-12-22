// components/ImagePickerBox.tsx
import tw from "@/src/lib/tailwind";
import React from "react";
import { Image, Pressable, Text, View } from "react-native";

// Props interface
interface ImagePickerBoxProps {
    image?: { assets: { uri: string }[] } | null; // যেভাবে expo-image-picker result আসে
    onPress: () => void;
    width?: number | string;
    height?: number | string;
    placeholderText?: string;
}

const ImagePickerBox: React.FC<ImagePickerBoxProps> = ({
    image,
    onPress,
    width = 160,       // default width (40 in tailwind * 4)
    height = 96,       // default height (24 in tailwind * 4)
    placeholderText = "Select Image",
}) => {
    return (
        <View style={tw`items-center mb-2`}>
            <Pressable
                onPress={onPress}
                style={[
                    tw`border border-blackish border-dashed items-center justify-center rounded`,
                    { width, height },
                ]}
            >
                {image?.assets?.[0]?.uri ? (
                    <Image
                        source={{ uri: image.assets[0].uri }}
                        style={[tw`rounded`, { width: "100%", height: "100%" }]}
                    />
                ) : (
                    <Text style={tw`text-xs text-blackish`}>{placeholderText}</Text>
                )}
            </Pressable>
        </View>
    );
};

export default ImagePickerBox;
