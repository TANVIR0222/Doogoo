import React, { useState } from "react";
import {
    Modal,
    Pressable,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";
import DraggableFlatList, {
    RenderItemParams,
    ScaleDecorator,
} from "react-native-draggable-flatlist";
import { SvgXml } from "react-native-svg";
import tw from "twrnc";

// Mock icons (replace with your actual icons)
const IconsSquer = `<svg>...</svg>`;
const IconsStart = `<svg>...</svg>`;
const IconsDeleted = `<svg>...</svg>`;

type TodoItem = {
    key: string;
    label: string;
    description: string;
    itemsCount: number;
    deleted: boolean;
};

const initialData: TodoItem[] = [
    {
        key: "item-1",
        label: "Complete todo list",
        description: "Finish the draggable list implementation",
        itemsCount: 3,
        deleted: false,
    },
    {
        key: "item-2",
        label: "Add dropdown feature",
        description: "Implement dropdown menu for actions",
        itemsCount: 1,
        deleted: false,
    },
    {
        key: "item-3",
        label: "Fix styling issues",
        description: "Adjust padding and margins",
        itemsCount: 2,
        deleted: false,
    },
];

export default function DraggableTodoList() {
    const [data, setData] = useState(initialData);

    const handleDelete = (key: string) => {
        setData(data.map(item =>
            item.key === key ? { ...item, deleted: true } : item
        ));
    };

    const handleArchive = (key: string) => {
        // Your archive logic here
    };

    const handleDone = (key: string) => {
        // Your done logic here
    };

    const renderItem = ({
        item,
        drag,
        isActive
    }: RenderItemParams<TodoItem>) => {
        return (
            <TodoListItem
                item={item}
                drag={drag}
                isActive={isActive}
                onDelete={() => handleDelete(item.key)}
                onArchive={() => handleArchive(item.key)}
                handleDone={() => handleDone(item.key)}
            />
        );
    };

    return (
        <DraggableFlatList
            data={data}
            onDragEnd={({ data }) => setData(data)}
            keyExtractor={(item) => item.key}
            renderItem={renderItem}
        />
    );
}

type TodoListItemProps = {
    item: TodoItem;
    drag: () => void;
    isActive: boolean;
    onDelete: () => void;
    onArchive: () => void;
    handleDone: () => void;
};

const TodoListItem = ({
    item,
    drag,
    isActive,
    onDelete,
    onArchive,
    handleDone
}: TodoListItemProps) => {
    const [showDropdown, setShowDropdown] = useState(false);

    const toggleDropdown = () => setShowDropdown(!showDropdown);
    const closeDropdown = () => setShowDropdown(false);

    return (
        <ScaleDecorator>
            <View style={tw`px-5 flex-row gap-4 items-center border-b border-gray py-3 bg-white`}>
                {/* Drag handle */}
                <TouchableOpacity
                    onLongPress={drag}
                    disabled={isActive}
                    style={[
                        tw`items-center justify-center rounded`,
                        { backgroundColor: isActive ? '#D6DF22' : '#EEEEEE' },
                    ]}
                    accessibilityLabel="Drag to reorder"
                >
                    <View style={tw`p-1 rounded`}>
                        <SvgXml xml={IconsSquer} width={25} height={25} />
                    </View>
                </TouchableOpacity>

                {/* Item content */}
                <View style={tw`flex-1`}>
                    <View style={tw`flex-row items-center justify-between`}>
                        <View style={tw`gap-1.5`}>
                            <View style={tw`flex-col gap-1`}>
                                <Text style={tw`text-base text-black`}>{item.label}</Text>
                                <Text style={tw`text-gray text-sm`}>{item.description}</Text>
                                <View style={tw`flex-row gap-1 items-center`}>
                                    <SvgXml xml={IconsStart} width={14} height={14} />
                                    <Text style={tw`text-gray text-sm`}>{item.itemsCount} items</Text>
                                </View>
                            </View>

                            {!item.deleted && (
                                <Pressable
                                    onPress={onArchive}
                                    style={tw`border-black border w-[65%] items-center px-2 py-1 rounded`}
                                >
                                    <Text style={tw`text-black text-sm font-semibold`}>Archive</Text>
                                </Pressable>
                            )}
                        </View>

                        {/* Action buttons with dropdown */}
                        <View style={tw`relative`}>
                            {item.deleted ? (
                                <Pressable onPress={toggleDropdown}>
                                    <SvgXml xml={IconsDeleted} width={20} height={20} />
                                </Pressable>
                            ) : (
                                <Pressable
                                    onPress={toggleDropdown}
                                    style={tw`bg-black px-3 py-1 rounded`}
                                >
                                    <Text style={tw`text-white text-sm font-semibold`}>Done</Text>
                                </Pressable>
                            )}

                            {/* Dropdown menu */}
                            {showDropdown && (
                                <Modal
                                    transparent={true}
                                    visible={showDropdown}
                                    onRequestClose={closeDropdown}
                                >
                                    <TouchableWithoutFeedback onPress={closeDropdown}>
                                        <View style={tw`flex-1 justify-center items-center bg-black bg-opacity-50`}>
                                            <View style={tw`bg-white rounded shadow-lg w-48 absolute right-5 top-20`}>
                                                <Pressable
                                                    style={tw`px-4 py-3 border-b border-gray`}
                                                    onPress={() => {
                                                        handleDone();
                                                        closeDropdown();
                                                    }}
                                                >
                                                    <Text style={tw`text-black`}>Mark Done</Text>
                                                </Pressable>
                                                <Pressable
                                                    style={tw`px-4 py-3 border-b border-gray`}
                                                    onPress={() => {
                                                        onArchive();
                                                        closeDropdown();
                                                    }}
                                                >
                                                    <Text style={tw`text-black`}>Archive</Text>
                                                </Pressable>
                                                <Pressable
                                                    style={tw`px-4 py-3`}
                                                    onPress={() => {
                                                        onDelete();
                                                        closeDropdown();
                                                    }}
                                                >
                                                    <Text style={tw`text-red-500`}>Delete</Text>
                                                </Pressable>
                                            </View>
                                        </View>
                                    </TouchableWithoutFeedback>
                                </Modal>
                            )}
                        </View>
                    </View>
                </View>
            </View>
        </ScaleDecorator>
    );
};