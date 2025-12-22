import { IconsCamara } from '@/assets/icons';
import * as ImagePicker from 'expo-image-picker';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { SvgXml } from 'react-native-svg';

export default function GetImageGallary({ setImage }: any) {

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ['images', 'videos'],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });


        if (!result.canceled) {
            setImage(result);
        }
    };

    return (
        <View style={styles.container}>

            <TouchableOpacity onPress={pickImage}>
                <SvgXml xml={IconsCamara} width={20} height={20} />
            </TouchableOpacity>


            {/* {image && <Image source={{ uri: image }} style={styles.image} />} */}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    image: {
        width: 200,
        height: 200,
    },
});
