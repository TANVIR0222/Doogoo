import {
    IconsDeleted,
    IconsFaqDownArrow,
    IconsFaqTopArrow,
    IconsSquer,
    IconsStart,
    IconsWhiteStar,
} from '@/assets/icons';
import tw from '@/src/lib/tailwind';
import React, { useState } from 'react';
import {
    LayoutAnimation,
    Pressable,
    Text,
    View,
} from 'react-native';
import DraggableFlatList, { ScaleDecorator } from 'react-native-draggable-flatlist';
import { SvgXml } from 'react-native-svg';

export default function HabitsScreen() {
    const [habits, setHabits] = useState([
        { id: '1', name: 'Practice', count: '1 times' },
        { id: '2', name: 'Relationships', count: '1 times' },
        { id: '3', name: 'Meditation', count: '2 times' },
        { id: '4', name: 'Learning', count: '3 times' },
    ]);
    const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);
    const [deleted, setDeleted] = useState(false);

    const toggleAccordion = (id: string) => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
        setExpandedAccordion(expandedAccordion === id ? null : id);
    };

    const renderItem = ({ item, drag, isActive }) => (
        <ScaleDecorator>
            <Pressable
                onLongPress={drag}
                disabled={isActive}
                onPress={() => toggleAccordion(item.id)}
                style={[
                    tw`border-l-4 border-gray flex-row justify-between items-center bg-white shadow-md p-4 rounded-lg mb-6`,
                    isActive && { backgroundColor: '#f0f0f0' },
                ]}
            >
                <View style={tw`flex-row gap-2 items-center`}>
                    <View style={tw`bg-gray/50 p-1 rounded`}>
                        <SvgXml xml={IconsSquer} />
                    </View>
                    <View style={tw`bg-yellowGreen p-2 rounded-full`}>
                        <SvgXml xml={IconsWhiteStar} />
                    </View>
                    <Text style={tw`text-lg font-bold`}>{item.name}</Text>
                </View>
                <SvgXml xml={expandedAccordion === item.id ? IconsFaqTopArrow : IconsFaqDownArrow} />
            </Pressable>
            {expandedAccordion === item.id && (
                <View style={tw`bg-white border-gray border-[1px] rounded-lg mt-5 overflow-hidden`}>
                    {[1, 2, 3].map((subItem) => (
                        <View key={subItem} style={tw`p-4 border-gray/60 border-b-[1px]`}>
                            <View style={tw`flex-row justify-between items-center`}>
                                <View style={tw`flex-row gap-3 items-center mb-2`}>
                                    <View style={tw`bg-gray/50 p-1 rounded`}>
                                        <SvgXml xml={IconsSquer} />
                                    </View>
                                    <View style={tw`flex-col gap-1`}>
                                        <Text style={tw`text-base`}>Complete todo list</Text>
                                        <View style={tw`flex-row gap-1`}>
                                            <SvgXml xml={IconsStart} />
                                            <Text style={tw`text-gray`}>1 item</Text>
                                        </View>
                                    </View>
                                </View>
                                {deleted ? (
                                    <View style={tw`flex-col flex-1 items-end`}>
                                        <Pressable onPress={() => alert('Delete')}>
                                            <SvgXml xml={IconsDeleted} />
                                        </Pressable>
                                    </View>
                                ) : (
                                    <View style={tw`justify-end items-end`}>
                                        <Pressable onPress={() => alert('Done')}>
                                            <Text style={tw`text-white text-sm bg-blackish p-1 rounded font-montserrat-600`}>Done</Text>
                                        </Pressable>
                                    </View>
                                )}
                            </View>
                        </View>
                    ))}
                </View>
            )}
        </ScaleDecorator>
    );

    return (
        <View style={tw`flex-1 bg-primaryBg`}>
            <DraggableFlatList
                data={habits}
                onDragEnd={({ data }) => setHabits(data)}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                contentContainerStyle={tw`p-4`}
            />
        </View>
    );
}
