
// import React, { useCallback, useEffect, useRef, useState } from "react";
// import { Animated, Button, Dimensions, Easing, StyleSheet, Text, View } from "react-native";

// const { height, width } = Dimensions.get("window");
// const CONFETTI_COUNT = 50;

// const ConfettiPiece = ({ index, onAnimationEnd, startY }) => {
//     const translateY = useRef(new Animated.Value(startY)).current;
//     const translateX = useRef(new Animated.Value(Math.random() * width)).current;
//     const rotate = useRef(new Animated.Value(0)).current;
//     const opacity = useRef(new Animated.Value(1)).current;
//     const scale = useRef(new Animated.Value(0.8)).current;

//     useEffect(() => {
//         // X-axis movement with swing effect
//         const xAnim = Animated.timing(translateX, {
//             toValue: Math.random() * width,
//             duration: 3000 + Math.random() * 2000,
//             easing: Easing.inOut(Easing.sin),
//             useNativeDriver: true,
//         });

//         // Rotation animation
//         const rotateAnim = Animated.timing(rotate, {
//             toValue: 1,
//             duration: 2000 + Math.random() * 1000,
//             easing: Easing.linear,
//             useNativeDriver: true,
//         });

//         // Falling animation - from button position to top of screen
//         const fallAnim = Animated.timing(translateY, {
//             toValue: -100, // Top of screen and beyond
//             duration: 4000 + Math.random() * 2000,
//             easing: Easing.out(Easing.quad),
//             useNativeDriver: true,
//         });

//         // Fade out animation
//         const fadeAnim = Animated.timing(opacity, {
//             toValue: 0,
//             duration: 2500 + Math.random() * 1000,
//             easing: Easing.out(Easing.quad),
//             useNativeDriver: true,
//         });

//         // Scale animation
//         const scaleAnim = Animated.sequence([
//             Animated.timing(scale, {
//                 toValue: 1.2,
//                 duration: 500,
//                 easing: Easing.out(Easing.quad),
//                 useNativeDriver: true,
//             }),
//             Animated.timing(scale, {
//                 toValue: 1,
//                 duration: 500,
//                 easing: Easing.in(Easing.quad),
//                 useNativeDriver: true,
//             }),
//         ]);

//         Animated.parallel([
//             fallAnim,
//             xAnim,
//             rotateAnim,
//             fadeAnim,
//             scaleAnim,
//         ]).start(() => onAnimationEnd(index));
//     }, []);

//     const rotateInterpolate = rotate.interpolate({
//         inputRange: [0, 1],
//         outputRange: ['0deg', '360deg'],
//     });

//     return (
//         <Animated.View
//             style={{
//                 position: "absolute",
//                 top: 0,
//                 left: 0,
//                 transform: [
//                     { translateY },
//                     { translateX },
//                     { rotate: rotateInterpolate },
//                     { scale }
//                 ],
//                 opacity,
//             }}
//         >
//             <Text style={[
//                 styles.emoji,
//                 { fontSize: 20 + Math.random() * 20 } // Random sizes
//             ]}>
//                 {['🎉', '🎊', '✨', '🌟', '⭐', '💫', '🎈', '🥳'][Math.floor(Math.random() * 8)]}
//             </Text>
//         </Animated.View>
//     );
// };

// const ConfettiScreen = () => {
//     const [showConfetti, setShowConfetti] = useState(false);
//     const [activePieces, setActivePieces] = useState([]);
//     const buttonYRef = useRef(null);

//     const handleConfettiAnimation = useCallback(() => {
//         setShowConfetti(true);
//         // Create confetti pieces with their indices
//         setActivePieces(Array.from({ length: CONFETTI_COUNT }, (_, i) => i));
//     }, []);

//     const handleAnimationEnd = useCallback((index) => {
//         setActivePieces(prev => prev.filter(i => i !== index));
//     }, []);

//     // Auto hide when all animations are done
//     useEffect(() => {
//         if (showConfetti && activePieces.length === 0) {
//             setShowConfetti(false);
//         }
//     }, [showConfetti, activePieces.length]);

//     return (
//         <View style={styles.container}>
//             <View
//                 style={styles.buttonContainer}
//                 onLayout={(event) => {
//                     const { y } = event.nativeEvent.layout;
//                     buttonYRef.current = y;
//                 }}
//             >
//                 <Button title="Celebrate! 🎉" onPress={handleConfettiAnimation} />
//             </View>

//             {showConfetti && buttonYRef.current &&
//                 activePieces.map((index) => (
//                     <ConfettiPiece
//                         key={index}
//                         index={index}
//                         onAnimationEnd={handleAnimationEnd}
//                         startY={buttonYRef.current} // Start from button position
//                     />
//                 ))
//             }
//         </View>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         justifyContent: "center",
//         alignItems: "center",
//         backgroundColor: "#fff",
//     },
//     buttonContainer: {
//         position: "absolute",
//         bottom: 100, // Button positioned near bottom
//     },
//     emoji: {
//         // fontSize is now set dynamically for variety
//     },
// });

// export default ConfettiScreen;