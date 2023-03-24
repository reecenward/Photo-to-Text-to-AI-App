import React, { useState } from 'react';
import { StyleSheet, View, Text, Button, Image, TouchableOpacity, ActivityIndicator, ScrollView, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import * as Clipboard from 'expo-clipboard';
import { v4 as uuidv4 } from 'uuid'; // Import uuid library


export default function GeneratedText({ navigation, route }) {
  const [savedText, setSavedText] = useState(null);
  const {generatedText} = route.params;

  const pressHandler = () => {
    navigation.goBack();
  }

  const copyTextToClipboard = () => {
    Clipboard.setString(generatedText);
    Alert.alert('Copied', 'Generated text copied to clipboard');
  };
  

  // const saveText = async () => {
  //   try {
  //     const prevSavedText = await AsyncStorage.getItem('generatedText');
  //     const newSavedText = prevSavedText ? prevSavedText + "\n\n" + generatedText : generatedText;
  //     await AsyncStorage.setItem('generatedText', newSavedText);
  //     Alert.alert('Success', 'Generated text saved successfully');
  //     setSavedText(newSavedText);
  //   } catch (error) {
  //     console.error(error);
  //     Alert.alert('Error', 'Failed to save generated text');
  //   }
  // }

  const saveText = async () => {
    try {
      const prevSavedText = await AsyncStorage.getItem('generatedText');
      const newSavedText = {
        id: uuidv4(), // Generate a unique ID
        text: generatedText
      };
      const savedTextArray = prevSavedText ? JSON.parse(prevSavedText) : [];
      savedTextArray.push(newSavedText);
      await AsyncStorage.setItem('generatedText', JSON.stringify(savedTextArray));
      Alert.alert('Success', 'Generated text saved successfully');
      setSavedText(newSavedText);
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Failed to save generated text');
    }
  }

  return (
//     <View>
//     <TouchableOpacity style={styles.closeButton} onPress={pressHandler}>
//       <MaterialIcons name="close" size={20} color="white" />
//     </TouchableOpacity>
//     <TouchableOpacity style={styles.copyButton} onPress={copyToClipboard}>
//   <MaterialIcons name="content-copy" size={20} color="white" />
// </TouchableOpacity>

//     <ScrollView style={styles.top}>
//       <Text style={styles.generatedText}>
//         {generatedText}
//       </Text>
//     </ScrollView>
//     <TouchableOpacity style={styles.bottomButton} onPress={saveText}>
//       <MaterialIcons name="save" size={20} color="white" />
//     </TouchableOpacity>
//   </View>

<View>
<TouchableOpacity style={styles.closeButton} onPress={pressHandler}>
  <MaterialIcons name="close" size={20} color="white" />
</TouchableOpacity>

<TouchableOpacity style={styles.copyButton} onPress={copyTextToClipboard}>
  <MaterialIcons name="content-copy" size={20} color="white" />
</TouchableOpacity>
<ScrollView style={styles.top}>
  <Text style={styles.generatedText}>
    {generatedText}
  </Text>
</ScrollView>
<TouchableOpacity style={styles.bottomButton} onPress={saveText}>
  <MaterialIcons name="save" size={20} color="white" />
</TouchableOpacity>

</View>

    // <View >
    //         <TouchableOpacity style={styles.closeButton} onPress={pressHandler}>
    //         <MaterialIcons name="close" size={20} color="black" />
    //     </TouchableOpacity>
    //   {/* {savedText && <Text style={styles.savedText}>Saved Text: {savedText}</Text>} */}
    //   <ScrollView style={styles.top}>
    //     <Text>
    //     {generatedText}

    //     </Text>
    //   </ScrollView>
    //   <TouchableOpacity style={styles.bottomButton} onPress={saveText}>
    //   <MaterialIcons name="save" size={20} color="white" />
    //   </TouchableOpacity>
    // </View>
  )
}

const styles = StyleSheet.create({
  slide: {
    flex: 1,
    height: '100%',
    padding: 50,
    backgroundColor: 'white',
  },
  image: {
    width: '100%',
    height: '45%',
    resizeMode: 'repeat',
    zIndex: 1,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: 'lightgrey',
  },
  optionButtonText: {
    fontSize: 15,
    paddingVertical: 10,
    paddingHorizontal: 'auto',
    fontWeight: 'bold',
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto',
  },
  selectedOptionButton: {
    backgroundColor: 'blue',
    borderRadius: 1000,
  },
  discriptionText: {
    top: 10,
    fontSize: 35,
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto',
    color: 'darkgrey',
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  bottomButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: 'green',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  
  buttonText: {
    fontSize: 20,
    color: 'white',
  },
  h: {},
  x: {
    height: '100%',
    backgroundColor: 'white',
  },
  loadingContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 99,
  },
  textInput: {
    height: 100,
    fontSize: 20,
  },

  generatedText: {
    fontSize: 20, // Adjust font size to make the text bigger
    fontFamily: Platform.OS === 'ios' ? 'Helvetica' : 'Roboto',
    lineHeight: 30, // Adjust line height to make the text more readable
    color: 'rgba(0, 0, 0, 0.9)', // Adjust text color for better contrast
  },
  top: {
    top: 100,
    padding: 50,
    height: '90%',
  },
  copyButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'black',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9,
  },
  
});
