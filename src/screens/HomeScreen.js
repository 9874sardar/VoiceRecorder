import React, { useEffect, useState, useRef } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  AppState,
  ScrollView,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Button } from "react-native-paper";
import Voice from "@react-native-voice/voice";
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({ navigation }) => {
  const [messages, setMessages] = useState([
    "Hello how are you",
    "I hope you are fine",
    "I wish to fine you",
    "you are very pretty",
    "you are looking lovely today",
    "Hello how are you",
    "I hope you are fine",
    "I wish to fine you",
    "you are very pretty",
    "you are looking lovely today",
    "things were just great",
    "Lets go for a walk",
    "I will go for a walk",
    "T will Miss you forever",
    "Do you think yor good enough",
    "You can use '--warning-mode all' to show the individual deprecation warnings and determine if they come from your own scripts or plugins.",
    "For more on this, please refer to in the Gradle documentation.",
    "No apps connected. Sending ",
    "happy independence day to you too"
  ]);
  const [recording, setRecording] = useState(false);
  const [error, setError] = useState("");
  // const appState = useRef(AppState.currentState);
  const [wordFrequencies, setWordFrequencies] = useState({});

  console.log("wordFrequencies", wordFrequencies);

  useEffect(() => {
    storeData();
  }, [wordFrequencies]);

  useEffect(() => {
    
    // storeData();
    Voice.onSpeechStart = () => {
      console.log("Speech");
      setRecording(true);
    };
    Voice.onSpeechEnd = () => setRecording(false);
    Voice.onSpeechError = (err) =>
      setError(err.error.message || "An error occurred");
    Voice.onSpeechResults = (result) => {
      const newSentence = result.value[0];
      setMessages((prevMessages) => [...prevMessages, newSentence]);

      updateWordFrequencies(newSentence);
    };

    startdd();
    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const storeData = async () => {
    try {
      const jsonValue = JSON.stringify(wordFrequencies);
      console.log("wordFrequencies effect :: ", jsonValue);
      await AsyncStorage.setItem('word_count', jsonValue);
    } catch (e) {
      console.error(e.message);
    }
  };

  const startdd = () =>{
    messages.map((message) =>{
      updateWordFrequencies(message);
    })
  }
  console.log("Speech", messages);
  console.log("error", error);

  const updateWordFrequencies = (sentence) => {
    const words = sentence.trim().toLowerCase().split(/\s+/);
    setWordFrequencies((prevFrequencies) => {
      const newFrequencies = { ...prevFrequencies };
      words.forEach((word) => {
        newFrequencies[word] = (newFrequencies[word] || 0) + 1;
      });
      storeData();
      return newFrequencies;
    });
  };

  const clearAll = () => {
    setMessages([]);
    setError("");
    setRecording(false);
    setWordFrequencies({});
  };

  const startRecording = async () => {
    try {
      await Voice.start("en-US");
    } catch (err) {
      setError(err.message || "An error occurred while starting recording");
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
      setRecording(false);
    } catch (err) {
      setError(err.message || "An error occurred while stopping recording");
    }
  };

  const countWords = (text) => {
    const words = text.trim().split(/\s+/);
    const count = words.filter((word) => word.length > 0).length;
    return count;
  };

  return (
    <View className="flex-1 bg-white p-5">
      <SafeAreaView className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
          <Image
            source={require("../assests/bot_1.png")}
            className="w-20 h-20"
          />
        </View>
        {messages.length > 0 ? (
          <View className="flex-1 items-start py-4">
            <ScrollView className="h-44 w-64 bg-gray-200">
              <View className="flex-row flex-wrap p-3">
                {messages.map((message, index) => (
                  <Text key={index} className="mr-2 text-xl text-black">
                    {index}. {message},
                  </Text>
                ))}
              </View>
            </ScrollView>
          </View>
        ) : (
          <Text className="text-center text-4xl font-bold text-gray-700 py-32">
            Welcome to the Voice word count !!
          </Text>
        )}
        {messages.length > 0 && (
          <View>
            <Text className="text-black">
              Number of messages: {messages.length}
            </Text>
            <Text className="text-black">
              Total Word Count:{" "}
              {messages.length > 0
                ? messages
                    .map((message) => countWords(message))
                    .reduce((acc, curr) => acc + curr, 0)
                : 0}
            </Text>
            <ScrollView style={{height:150}}>
              <Text className="text-black">
                Word Frequencies: {JSON.stringify(wordFrequencies, null, 2)}
              </Text>
            </ScrollView>
          </View>
        )}
        <View className="flex justify-center items-center py-10">
          {recording ? (
            <TouchableOpacity onPress={stopRecording}>
              <Image
                source={require("../assests/listening.gif")}
                className="rounded-full w-16 h-16"
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity onPress={startRecording}>
              <Image
                source={require("../assests/mic_2.png")}
                className="rounded-full w-12 h-12"
              />
            </TouchableOpacity>
          )}

          {messages.length > 0 && (
            <TouchableOpacity
              className="rounded-3xl p-2 absolute right-0"
              onPress={clearAll}
            >
              <Button
                mode="contained"
                buttonColor="#0ea5e9"
                className="text-white font-semibold"
              >
                {" "}
                Clear
              </Button>
            </TouchableOpacity>
          )}
          {messages.length > 0 && (
            <TouchableOpacity
              className="rounded-3xl p-2 absolute left-0"
              onPress={() => navigation.navigate("chart")}
            >
              <Button
                mode="contained"
                buttonColor="#0ea5e9"
                className="text-white font-semibold"
              >
                Charts
              </Button>
            </TouchableOpacity>
          )}
        </View>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;

// const styles = StyleSheet.create({});
