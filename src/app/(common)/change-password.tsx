import { IconsLoock } from "@/assets/icons";
import KeyboardAvoidingWrapper from "@/src/components/KeyboardAvoidingComponent";
import ProfileBackButton from "@/src/components/ui/ProfileBackButton";
import { changePasswordValidationSchema } from "@/src/lib/auth_Schema";
import tw from "@/src/lib/tailwind";
import { useUserPasswordChangeMutation } from "@/src/redux/authApi/authApiSlice";
import { MyFormValues } from "@/src/utils/globalType";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { Formik } from "formik";
import { useEffect, useState } from "react";
import {
    ActivityIndicator,
    Alert,
    Keyboard,
    ScrollView,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SvgXml } from "react-native-svg";

export default function ChangePasswordScreen() {
    const [show, setShow] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const [userPasswordChange, { isLoading }] =
        useUserPasswordChangeMutation();

    const toggleVisibility = (field: "current" | "new" | "confirm") =>
        setShow((prev) => ({ ...prev, [field]: !prev[field] }));

    const handleSuccess = (resetForm: () => void) => {
        resetForm();
        Alert.alert("Success", "Password changed successfully", [
            {
                text: "OK",
                onPress: () => router.replace("/(tab)/profile"),
            },
        ]);
    };

    const [isKeyboardVisible, setIsKeyboardVisible] = useState(false);

    useEffect(() => {
        const showSubscription = Keyboard.addListener('keyboardDidShow', handleKeyboardShow);
        const hideSubscription = Keyboard.addListener('keyboardDidHide', handleKeyboardHide);

        return () => {
            showSubscription.remove();
            hideSubscription.remove();
        };
    }, []);

    const handleKeyboardShow = (event: any) => {
        setIsKeyboardVisible(true);
    };

    const handleKeyboardHide = (event: any) => {
        setIsKeyboardVisible(false);
    };


    return (
        <KeyboardAvoidingWrapper>
            <View style={tw`flex-1 bg-white`}>
                <ProfileBackButton title="Change Password" />

                <Formik<MyFormValues>
                    initialValues={{
                        current_password: "",
                        password: "",
                        password_confirmation: "",
                    }}
                    validationSchema={changePasswordValidationSchema}
                    onSubmit={async (values, { resetForm }) => {
                        try {
                            const res = await userPasswordChange(values).unwrap();
                            if (res?.status) handleSuccess(resetForm);
                        } catch (error) {
                            console.log("Error changing password:", error);
                            Alert.alert(
                                "Error",
                                "Failed to change password. Please try again."
                            );
                        }
                    }}
                >
                    {({
                        handleChange,
                        handleBlur,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                    }) => (
                        <ScrollView
                            contentContainerStyle={tw`flex-grow  justify-between px-5 ${isKeyboardVisible ? 'pb-28' : 'pb-0'}  `}
                            showsVerticalScrollIndicator={false}
                        >
                            <View>
                                <View style={tw`items-center mt-6 mb-4`}>
                                    <SvgXml xml={IconsLoock} />
                                </View>

                                {[
                                    {
                                        label: "Current Password",
                                        field: "current_password",
                                        secure: !show.current,
                                        toggle: () => toggleVisibility("current"),
                                        showIcon: show.current,
                                    },
                                    {
                                        label: "New Password",
                                        field: "password",
                                        secure: !show.new,
                                        toggle: () => toggleVisibility("new"),
                                        showIcon: show.new,
                                    },
                                    {
                                        label: "Confirm Password",
                                        field: "password_confirmation",
                                        secure: !show.confirm,
                                        toggle: () => toggleVisibility("confirm"),
                                        showIcon: show.confirm,
                                    },
                                ].map(({ label, field, secure, toggle, showIcon }) => (
                                    <View key={field} style={tw`mb-4`}>
                                        <Text style={tw`text-black text-base font-montserrat-700 mb-2`}>
                                            {label}
                                        </Text>

                                        <View
                                            style={tw`flex-row items-center border border-blackish/60 rounded px-3 py-1`}
                                        >
                                            <TextInput
                                                secureTextEntry={secure}
                                                style={tw`flex-1 h-10 text-base text-black`}
                                                placeholder="* * * * * * *"
                                                onChangeText={handleChange(field)}
                                                onBlur={handleBlur(field)}
                                                value={(values as any)[field]}
                                            />
                                            <Feather
                                                onPress={toggle}
                                                name={showIcon ? "eye-off" : "eye"}
                                                size={18}
                                                style={tw`text-[#888888]`}
                                            />
                                        </View>

                                        {touched[field as keyof typeof touched] &&
                                            errors[field as keyof typeof errors] && (
                                                <Text style={tw`text-red-500 mt-1 ml-2 text-xs`}>
                                                    {errors[field as keyof typeof errors]}
                                                </Text>
                                            )}
                                    </View>
                                ))}
                            </View>

                            <TouchableOpacity
                                onPress={() => handleSubmit()}
                                disabled={isLoading}
                                style={tw`${isLoading ? "opacity-60" : ""} bg-blackish p-3 rounded flex-row justify-center items-center mt-6`}
                            >
                                {isLoading ? (
                                    <ActivityIndicator color="#fff" />
                                ) : (
                                    <Text style={tw`text-white text-center`}>
                                        Change Password
                                    </Text>
                                )}
                            </TouchableOpacity>
                        </ScrollView>
                    )}
                </Formik>
            </View>
        </KeyboardAvoidingWrapper>
    );
}








// import { IconsLoock } from "@/assets/icons";
// import KeyboardAvoidingComponent from "@/src/components/KeyboardAvoidingComponent";
// import ProfileBackButton from "@/src/components/ui/ProfileBackButton";
// import Wrapper from "@/src/components/Wrapper";
// import { changePasswordValidationSchema } from "@/src/lib/auth_Schema";
// import tw from "@/src/lib/tailwind";
// import { useUserPasswordChangeMutation } from "@/src/redux/authApi/authApiSlice";
// import { MyFormValues } from "@/src/utils/globalType";
// import { Feather } from "@expo/vector-icons";
// import { router } from "expo-router";
// import { Formik } from "formik";
// import { useState } from "react";
// import {
//     Alert,
//     Text,
//     TextInput,
//     TouchableOpacity,
//     View
// } from "react-native";
// import { SvgXml } from "react-native-svg";



// export default function ChangePasswordScreen() {
//     const [showCurrent, setShowCurrent] = useState(false);
//     const [showNew, setShowNew] = useState(false);
//     const [showConfirm, setShowConfirm] = useState(false);
//     const [userPasswordChange, { isLoading, isError, error }] = useUserPasswordChangeMutation();


//     return (
//         <View style={tw`flex-1 bg-primaryBg`}>
//             <ProfileBackButton title='Change Password' />

//             <Wrapper>

//                 <View style={tw`items-center mb-8`}>
//                     <SvgXml xml={IconsLoock} />
//                 </View>
//                 <Formik<MyFormValues>
//                     initialValues={{
//                         current_password: "",
//                         password: "",
//                         password_confirmation: "",
//                     }}
//                     validationSchema={changePasswordValidationSchema}
//                     onSubmit={async (values, { resetForm }) => {
//                         try {
//                             const res = await userPasswordChange(values).unwrap();
//                             if (res?.status) {
//                                 resetForm();
//                                 Alert.alert(
//                                     "Success",
//                                     "Password changed successfully",
//                                     [
//                                         {
//                                             text: "ok",
//                                             onPress: () => router.replace("/(tab)/profile"),
//                                             style: "default"
//                                         }
//                                     ],
//                                     { cancelable: true }
//                                 );

//                             }
//                         } catch (error) {
//                             console.log("Error changing password:", error);
//                         }
//                     }}
//                 >
//                     {({
//                         handleChange,
//                         handleBlur,
//                         handleSubmit,
//                         values,
//                         errors,
//                         touched,
//                     }) => (


//                         <KeyboardAvoidingComponent>

//                             <View style={tw` flex-col  flex-1  justify-between `}>
//                                 <View style={tw` flex-col gap-4`}>
//                                     {/* Current Password */}
//                                     <View>
//                                         <Text style={tw`text-black text-base font-montserrat-700 mb-2`}>
//                                             Current Password
//                                         </Text>
//                                         <View style={tw`flex-row items-center border border-blackish/60 rounded px-3 py-1`}>
//                                             <TextInput
//                                                 secureTextEntry={!showCurrent}
//                                                 style={tw`flex-1 h-10 text-base text-black`}
//                                                 placeholder="* * * * * * *"
//                                                 onChangeText={handleChange("current_password")}
//                                                 onBlur={handleBlur("current_password")}
//                                                 value={values.current_password}
//                                             />
//                                             <Feather
//                                                 onPress={() => setShowCurrent(!showCurrent)}
//                                                 name={showCurrent ? "eye-off" : "eye"}
//                                                 size={18}
//                                                 style={tw`text-[#888888]`}
//                                             />
//                                         </View>
//                                         {touched.current_password && errors.current_password && (
//                                             <Text style={tw`text-red-500 mt-1 ml-2 text-xs`}>
//                                                 {errors.current_password}
//                                             </Text>
//                                         )}
//                                     </View>

//                                     {/* New Password */}
//                                     <View>
//                                         <Text style={tw`text-black text-base font-montserrat-700 mb-2`}>
//                                             New Password
//                                         </Text>
//                                         <View style={tw`flex-row items-center border border-blackish/60 rounded px-3 py-1`}>
//                                             <TextInput
//                                                 secureTextEntry={!showNew}
//                                                 style={tw`flex-1 h-10 text-base text-black`}
//                                                 placeholder="* * * * * * *"
//                                                 onChangeText={handleChange("password")}
//                                                 onBlur={handleBlur("password")}
//                                                 value={values.password}
//                                             />
//                                             <Feather
//                                                 onPress={() => setShowNew(!showNew)}
//                                                 name={showNew ? "eye-off" : "eye"}
//                                                 size={18}
//                                                 style={tw`text-[#888888]`}
//                                             />
//                                         </View>
//                                         {touched.password && errors.password && (
//                                             <Text style={tw`text-red-500 mt-1 ml-2 text-xs`}>
//                                                 {errors.password}
//                                             </Text>
//                                         )}
//                                     </View>

//                                     {/* Confirm Password */}
//                                     <View>
//                                         <Text style={tw`text-black text-base font-montserrat-700 mb-2`}>
//                                             Confirm Password
//                                         </Text>
//                                         <View style={tw`flex-row items-center border border-blackish/60 rounded px-3 py-1`}>
//                                             <TextInput
//                                                 secureTextEntry={!showConfirm}
//                                                 style={tw`flex-1 h-10 text-base text-black`}
//                                                 placeholder="* * * * * * *"
//                                                 onChangeText={handleChange("password_confirmation")}
//                                                 onBlur={handleBlur("password_confirmation")}
//                                                 value={values.password_confirmation}
//                                             />
//                                             <Feather
//                                                 onPress={() => setShowConfirm(!showConfirm)}
//                                                 name={showConfirm ? "eye-off" : "eye"}
//                                                 size={18}
//                                                 style={tw`text-[#888888]`}
//                                             />
//                                         </View>
//                                         {touched.password_confirmation && errors.password_confirmation && (
//                                             <Text style={tw`text-red-500 mt-1 ml-2 text-xs`}>
//                                                 {errors.password_confirmation}
//                                             </Text>
//                                         )}
//                                     </View>
//                                 </View>

//                                 {/* Submit Button */}
//                                 <TouchableOpacity
//                                     onPress={() => handleSubmit()}
//                                     disabled={isLoading}
//                                     style={tw` ${isLoading ? "opacity-50" : ""} bg-blackish  p-3 rounded flex-row justify-center items-center`}
//                                 >
//                                     <Text style={tw`text-center text-white`}>
//                                         {isLoading ? "Changing..." : "Change Password"}
//                                     </Text>
//                                 </TouchableOpacity>
//                             </View>
//                         </KeyboardAvoidingComponent>


//                     )}
//                 </Formik>

//             </Wrapper>
//         </View>
//     );
// }
