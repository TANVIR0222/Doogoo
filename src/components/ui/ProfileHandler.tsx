import React, { ReactNode } from 'react';
import { Button, SafeAreaView, View } from 'react-native';
import Animated, {
    SharedValue,
    useAnimatedStyle,
    useDerivedValue,
    useSharedValue,
    withTiming,
} from 'react-native-reanimated';
import tw from 'twrnc';

type AccordionItemProps = {
    isExpanded: SharedValue<boolean>;
    children: ReactNode;
    viewKey: string;
    style?: any;
    duration?: number;
};

const AccordionItem: React.FC<AccordionItemProps> = ({
    isExpanded,
    children,
    viewKey,
    style,
    duration = 500,
}) => {
    const height = useSharedValue(0);

    const derivedHeight = useDerivedValue(() =>
        withTiming(height.value * Number(isExpanded.value), { duration })
    );

    const bodyStyle = useAnimatedStyle(() => ({
        height: derivedHeight.value,
    }));

    return (
        <Animated.View
            key={`accordionItem_${viewKey}`}
            style={[tw`w-full overflow-hidden`, bodyStyle, style]}
        >
            <View
                onLayout={(e) => {
                    height.value = e.nativeEvent.layout.height;
                }}
                style={tw`absolute w-full items-center`}
            >
                {children}
            </View>
        </Animated.View>
    );
};

const Item: React.FC = () => {
    return (
        <View style={tw`h-30 w-30 bg-purple-400 rounded-xl items-center justify-center`} />
    );
};

type ParentProps = {
    open: SharedValue<boolean>;
};

const Parent: React.FC<ParentProps> = ({ open }) => {
    return (
        <View style={tw`w-50`}>
            <AccordionItem isExpanded={open} viewKey="Accordion">
                <Item />
            </AccordionItem>
        </View>
    );
};

const ProfileHandler: React.FC = () => {
    const open = useSharedValue(false);

    const handleToggle = () => {
        open.value = !open.value;
    };

    return (
        <SafeAreaView style={tw`flex-1 justify-center pt-6`}>
            <View style={tw`flex-row justify-center items-center flex-1 mb-4`}>
                <Button onPress={handleToggle} title="Click me" />
            </View>

            <View style={tw`flex-1 justify-center items-center`}>
                <Parent open={open} />
            </View>
        </SafeAreaView>
    );
};

export default ProfileHandler;
