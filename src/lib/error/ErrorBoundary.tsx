import React from "react";
import { StatusBar, Text, TouchableOpacity, View } from "react-native";

export default class GlobalErrorBoundary extends React.Component {
    constructor(props: any) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error: any) {
        return { hasError: true, error };
    }

    componentDidCatch(error: any, info: any) {
        console.log("GLOBAL ERROR:", error, info);
    }

    resetError = () => {
        this.setState({ hasError: false, error: null });
    };

    render() {
        if (this.state.hasError) {
            return (
                <View
                    style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        padding: 24,
                        backgroundColor: "#fff",
                    }}
                >
                    <StatusBar barStyle={"dark-content"} translucent />
                    {/* Error Illustration */}
                    <View
                        style={{
                            width: 120,
                            height: 120,
                            borderRadius: 60,
                            backgroundColor: "#D6DF22",
                            justifyContent: "center",
                            alignItems: "center",
                            marginBottom: 25,
                        }}
                    >
                        <Text style={{ fontSize: 55 }}>⚠️</Text>
                    </View>

                    {/* Title */}
                    <Text
                        style={{
                            fontSize: 22,
                            fontWeight: "700",
                            color: "#333",
                            textAlign: "center",
                            marginBottom: 10,
                        }}
                    >
                        Something went wrong
                    </Text>

                    {/* Subtitle */}
                    <Text
                        style={{
                            fontSize: 15,
                            color: "#666",
                            textAlign: "center",
                            marginBottom: 30,
                            lineHeight: 20,
                            width: "85%",
                        }}
                    >
                        An unexpected error occurred. Please try again or restart the app.
                    </Text>

                    {/* Button */}
                    <TouchableOpacity
                        onPress={this.resetError}
                        style={{
                            backgroundColor: "#D6DF22",
                            paddingVertical: 12,
                            paddingHorizontal: 28,
                            borderRadius: 10,
                            shadowColor: "#000",
                            shadowOpacity: 0.1,
                            shadowRadius: 4,
                        }}
                    >
                        <Text
                            style={{
                                color: "#fff",
                                fontSize: 16,
                                fontWeight: "600",
                            }}
                        >
                            Try Again
                        </Text>
                    </TouchableOpacity>
                </View>
            );
        }

        return this.props.children;
    }
}
