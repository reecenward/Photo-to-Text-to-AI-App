import { StyleSheet, View, TouchableOpacity, Image, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { Camera } from 'expo-camera';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';

export default function CameraView({ navigation }) {
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasCameraPermission, setHasCameraPermission] = useState(null);
  const cameraRef = useRef(null);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHasCameraPermission(status === 'granted');
    })();
  }, []);

  const removeImage = () => {
    setSelectedImage(null);
  };

  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission denied', 'Sorry, we need camera roll permissions to make this work!', [{ text: 'OK' }]);
      }
    })();
  }, []);

  const takePhoto = async () => {
    if (cameraRef.current) {
      const options = { quality: 1, base64: true, skipProcessing: true };
      const data = await cameraRef.current.takePictureAsync(options);
      setSelectedImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
  
    if (result.canceled === false) {
      setSelectedImage(result.assets[0].uri);
    }
  };

  const pressHandler2 = () => {
    navigation.navigate('Options', { selectedImage });
  };

  return (
    <View style={styles.container}>
      <View style={styles.cameraContainer}>
        {/* X button to remove selected image */}
        {selectedImage && (
          <TouchableOpacity style={styles.closeButton} onPress={removeImage}>
            <Ionicons name="close" size={28} color="white" />
          </TouchableOpacity>
        )}
        {hasCameraPermission && !selectedImage && (
          <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef} />
        )}
        {selectedImage && (
          <View style={[styles.imageOverlay, { zIndex: 1 }]}>
            <Image source={{ uri: selectedImage }} style={styles.image} />
          </View>
        )}
        <View style={[styles.buttonContainer, { zIndex: 99 }]}>
          {hasCameraPermission && !selectedImage && (
            <TouchableOpacity style={styles.bottomButton} onPress={pickImage}>
              <Ionicons name="image-outline" size={24} color="white" />
            </TouchableOpacity>
          )}
          {hasCameraPermission && !selectedImage && (
            <TouchableOpacity style={styles.cameraButton} onPress={takePhoto}>
              <Ionicons name="camera-outline" size={24} color="white" />
              </TouchableOpacity>
              )}
        {selectedImage && (
          <TouchableOpacity style={styles.nextButton} onPress={pressHandler2}>
            <Ionicons name="arrow-forward-outline" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  </View>
);
        }
const styles = StyleSheet.create({
container: {
backgroundColor: 'black',
alignItems: 'center',
justifyContent: 'flex-start',
},
cameraContainer: {
width: '100%',
height: '100%',
position: 'relative',
},
camera: {
width: '100%',
height: '100%',
},
closeButton: {
position: 'absolute',
top: 60,
zIndex: 99,
left: 20,
backgroundColor: 'rgba(255, 255, 255, 0.5)',
borderRadius: 50,
width: 50,
height: 50,
justifyContent: 'center',
alignItems: 'center',
},
image: {
width: '100%',
height: '100%',
resizeMode: 'contain',
},
imageOverlay: {
position: 'absolute',
top: 0,
left: 0,
width: '100%',
height: '100%',
},
buttonContainer: {
flexDirection: 'row',
position: 'absolute',
bottom: 100,
width: '100%',
paddingVertical: 16,
paddingHorizontal: 32,
},
cameraButton: {
borderRadius: 24,
width: 48,
left: 80,
height: 48,
alignItems: 'center',
justifyContent: 'center',
marginRight: 16,
backgroundColor: 'rgba(255, 255, 255, 0.5)',
borderRadius: 50,
width: 50,
height: 50,
},
bottomButton: {
borderRadius: 24,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: 'rgba(255, 255, 255, 0.5)',
borderRadius: 50,
width: 50,
height: 50,
},
nextButton: {
borderRadius: 24,
alignItems: 'center',
justifyContent: 'center',
backgroundColor: 'rgba(255, 255, 255, 0.5)',
borderRadius: 50,
width: 50,
height: 50,
right:20,

},
});