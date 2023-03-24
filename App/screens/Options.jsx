import React, { useState, useEffect, useRef, useCallback } from 'react';
import {StyleSheet, View, Text, Button, Image, TouchableOpacity, ActivityIndicator,TextInput, Alert} from 'react-native';
import Swiper from 'react-native-swiper';
import axios from 'axios';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Platform } from 'react-native';

export default function Options({navigation, route}) {
  const {selectedImage} = route.params;
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [inputValue, setInputValue] = useState('');

  const pressHandler = () => {
    navigation.goBack();
  };

const pressHandler2 = () => {
    navigation.navigate('SavedText')
  }

  const submitImage = async () => {
    // Check if the input text is empty
    if (!inputValue.trim()) {
      return Alert.alert('Error', 'Please enter some text before submitting');
    }
  
    let payload = {};
    if (selectedImage) {
      setIsLoading(true);
      // Convert the image to base64
      payload['image'] = await fetch(selectedImage).then((response) =>
        response.blob().then((blob) => {
          return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result);
            reader.onerror = reject;
            reader.readAsDataURL(blob);
          });
        })
      );
    }
    // Add the text to the payload
    payload['text'] = inputValue;
  
    // Send the payload to the server
    try {
      const serverResponse = await axios.post('http://Your end point', payload);
      console.log(serverResponse.data);
      setResponse(serverResponse.data.result); // Store only the result property of the server response
      if (serverResponse) {
        navigation.navigate('GeneratedText', { generatedText: serverResponse.data.result }); // Pass only the result property as a prop
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <View style={styles.x}>
        <Image source={{ uri: selectedImage }} style={styles.image} />
        <TouchableOpacity style={styles.closeButton} onPress={pressHandler}>
            <MaterialIcons name="arrow-back" size={20} color="black" />
        </TouchableOpacity>

          <View style={styles.slide}>
            <View style={styles.h}>
              <Text style={styles.optionButtonText}>
                What Do You Want?
              </Text>
            </View>
            
<TextInput
            style={styles.textInput}
            value={inputValue}
            onChangeText={setInputValue}
            placeholder="Ex: summarize this text"
          />
          </View>


          <TouchableOpacity style={styles.bottomButton} onPress={submitImage} disabled={!selectedImage}>
    <MaterialIcons name="send" size={20} color="black" />
  </TouchableOpacity>
{isLoading && (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ffffff" />
      </View>
)}
<TouchableOpacity style={styles.ViewSavedText} onPress={pressHandler2}>
  <MaterialIcons name="save" size={20} color="white" />
</TouchableOpacity>
</View>
);
}


const styles = StyleSheet.create({
    slide: {
      flex: 1,
      height: '100%',
      padding:50,
      backgroundColor: 'white',
    },

    image: {
      width: '100%',
      height: '45%',
      resizeMode: "stretch",
      zIndex: 1,
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
    },
    
    optionButtonText:{
      fontSize: 20,
      paddingVertical: 10,
      paddingHorizontal: 'auto',
      fontWeight: 'bold',
      fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto',
    },
    selectedOptionButton : {
      backgroundColor: 'blue',
      borderRadius: 1000,
    },
    discriptionText: {
      top:10,
      fontSize: 35,
      fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto',
      color: 'darkgrey',
    },
    closeButton: {
      position: 'absolute',
      top: 60,
      left: 20,
      backgroundColor: 'rgba(255, 255, 255, 0.5)',
      borderRadius: 50,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:3,
    },
    bottomButton: {
      position: 'absolute',
      bottom: 100,
      right: 20,
      borderRadius: 50,
      width: 50,
      height: 50,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 100,
    },
    buttonText: {
      fontSize: 20,
      color: 'white',
    },
    h: {
     
    },
    x: {
      height:'100%',
      backgroundColor: 'white',

    },
    ViewSavedText: {
        position: 'absolute',
        bottom: 100,
        left: 20,
        backgroundColor: 'black',
        borderRadius: 50,
        width: 50,
        height: 50,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 100,
    },
    loadingContainer: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex:99,
      },
      textInput: {
        height: 100,
        fontSize: 20
        // other style properties
      }
      
  });
  