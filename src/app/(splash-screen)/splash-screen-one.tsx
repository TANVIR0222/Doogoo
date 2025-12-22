
import { IconsLeftArrowBlack, IconsRightArrowBlack, ImageOne, ImageThree, ImageTow } from '@/assets/icons';
import tw from '@/src/lib/tailwind';
import { dynamicHeight, dynamicWidth, scaleFont } from '@/src/utils/utils';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
    Animated,
    Dimensions,
    FlatList,
    ImageBackground,
    ImageSourcePropType,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
import { SvgXml } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

// --- Type Definition ---
interface Slide {
    id: string;
    title: string;
    svg: string;
    backgroundImage: ImageSourcePropType | undefined; //  string not 
    buttonTitle: string,
    buttonIcons: string
}
const slides: Slide[] = [
    {
        id: '1',
        title: 'The best time to build habits was yesterday. The next best is now',
        svg: ImageOne,
        buttonIcons: IconsRightArrowBlack,
        backgroundImage: require('@/assets/images/splash-screen-1.png'),
        buttonTitle: 'Start Building',
    },
    {
        id: '2',
        title: 'Group challenges graduate your dreams',
        svg: ImageTow,
        backgroundImage: require('@/assets/images/splash-screen-2.png'),
        buttonTitle: 'Join a Challenge',
        buttonIcons: IconsRightArrowBlack,

    },
    {
        id: '3',
        title: 'Sailing into your dream life is your reward',
        svg: ImageThree,
        backgroundImage: require('@/assets/images/splash-screen-3.png'),
        buttonTitle: 'Claim Your Reward',
        buttonIcons: IconsRightArrowBlack,

    },
];


export default function OnboardingScreens() {
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const scrollX = useRef(new Animated.Value(0)).current;
    const flatListRef = useRef<FlatList<Slide>>(null);
    const router = useRouter();

    const handleNext = () => {
        if (currentIndex < slides.length - 1) {
            flatListRef.current?.scrollToIndex({ index: currentIndex + 1 });
        } else {
            // Navigate to the main app screen on the last slide
            router.replace('/(splash-screen)/role-screen'); // Adjust this path to your main screen
        }
    };

    const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
        if (viewableItems.length > 0) {
            setCurrentIndex(viewableItems[0].index);
        }
    }).current;

    const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;


    return (
        <View style={styles.container}>

            <FlatList
                data={slides}
                ref={flatListRef}
                keyExtractor={(item) => item.id}
                horizontal
                pagingEnabled
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    { useNativeDriver: false }
                )}
                onViewableItemsChanged={onViewableItemsChanged}
                viewabilityConfig={viewConfig}
                renderItem={({ item, index }) => (
                    <View style={[tw`relative`, styles.slide]}>
                        {/* Back Button */}
                        <View style={tw`absolute top-14 left-4 z-40`}>
                            <TouchableOpacity onPress={() => {
                                if (index === 0) {
                                    router.replace('/(splash-screen)')
                                } else {
                                    flatListRef.current?.scrollToIndex({ index: index - 1 }); // next 
                                }
                            }}>
                                <SvgXml xml={IconsLeftArrowBlack} />
                            </TouchableOpacity>
                        </View>

                        {/* Background Image */}
                        <ImageBackground
                            source={item.backgroundImage}
                            style={styles.imageBackground}
                            resizeMode="cover"
                        >
                            <View style={styles.svgContainer}>
                                <SvgXml
                                    xml={item.svg}
                                    width={dynamicWidth(100)}
                                    height={dynamicHeight(100)}
                                />
                            </View>
                        </ImageBackground>

                        {/* Footer */}
                        <View style={styles.footer}>
                            <Text style={styles.title}>{item.title}</Text>

                            <View style={styles.dotsContainer}>
                                {slides.map((_, dotIndex) => (
                                    <View
                                        key={dotIndex}
                                        style={[
                                            styles.dot,
                                            { backgroundColor: dotIndex === currentIndex ? '#D6DF22' : '#D9D9D9' },
                                        ]}
                                    />
                                ))}
                            </View>

                            <TouchableOpacity
                                onPress={() => {
                                    if (index === slides.length - 1) {
                                        handleNext(); //  → navigation
                                    } else {
                                        flatListRef.current?.scrollToIndex({ index: index + 1 }); // next 
                                    }
                                }}
                                style={styles.startButton}
                            >
                                <Text style={styles.startButtonText} allowFontScaling={true}>
                                    {item?.buttonTitle || (index === slides.length - 1 ? 'Start' : 'Next')}
                                </Text>
                                {item?.buttonIcons && <SvgXml xml={item.buttonIcons} />}
                            </TouchableOpacity>
                        </View>
                    </View>
                )}

            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    slide: {
        width,
        height,
        justifyContent: 'center',
        alignItems: 'center',
    },
    svgContainer: {
        position: 'absolute',
        top: height >= 360 ? height * 0.12 : height * 0.2,
    },
    footer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: 20,
        paddingBottom: 40,
    },
    title: {
        color: '#D6DF22',
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 16,
        textShadowColor: "black",
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 1,
    },

    dotsContainer: {
        flexDirection: 'row',
        marginBottom: 40,
    },
    dot: {
        width: 10,
        height: 10,
        borderRadius: 8,
        marginHorizontal: 4,
    },
    startButton: {
        backgroundColor: '#D6DF22',
        borderRadius: 18,
        paddingVertical: 16,
        width: '100%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 3
    },
    startButtonText: {
        color: '#000',
        fontSize: scaleFont(18),
        fontWeight: '700',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },


});
