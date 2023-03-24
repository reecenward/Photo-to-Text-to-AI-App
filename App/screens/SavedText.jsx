import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Button, TouchableOpacity, ScrollView } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function SavedText({ navigation }) {
  const [savedTexts, setSavedTexts] = useState([]);

  useEffect(() => {
    retrieveSavedTexts();
  }, []);

  const pressHandler = () => {
    navigation.goBack();
  }

  const retrieveSavedTexts = async () => {
    try {
      const retrievedTexts = await AsyncStorage.getAllKeys();
      const texts = await AsyncStorage.multiGet(retrievedTexts);
      setSavedTexts(texts.map(([key, value]) => ({ id: key, text: value })));
    } catch (error) {
      console.error(error);
    }
  }

  const deleteSavedText = async (id) => {
    try {
      await AsyncStorage.removeItem(id);
      const newSavedTexts = savedTexts.filter((text) => text.id !== id);
      setSavedTexts(newSavedTexts);
    } catch (error) {
      console.error(error);
    }
  }
  

  const deleteAllSavedTexts = async () => {
    try {
      await AsyncStorage.clear();
      setSavedTexts([]);
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeButton} onPress={pressHandler}>
        <MaterialIcons name="arrow-back" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.deleteButton} onPress={deleteAllSavedTexts}>
        <MaterialIcons name="delete" size={20} color="white" />
        </TouchableOpacity>
          <ScrollView style={styles.savedText}>
            {savedTexts.map(({ id, text }, index) => (
              <TouchableOpacity
              key={id}
              style={[    styles.savedText,    { backgroundColor: index % 2 === 0 ? '#eee' : 'white' },  ]}
              onPress={() => deleteSavedText(id)}
            >
              <Text>{text}</Text>
              </TouchableOpacity>
            
            ))}
          </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  gradientBox: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 120,
    zIndex: -1,
  },
  closeButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    backgroundColor: 'rgba(0,0,0, 1)',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 3,
  },
  deleteButton: {
    position: 'absolute',
    top: 60,
    right: 20,
    backgroundColor: 'rgba(0,0,0, 1)',
    borderRadius: 50,
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex:2,
  },
  savedText: {
  padding: 10,
  marginVertical: 5,
  borderRadius: 5,
  },
  savedText: {
    top:60
  }
  });