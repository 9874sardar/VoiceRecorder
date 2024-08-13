import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Button } from 'react-native-paper';
import Voice from '@react-native-voice/voice';

const HomeScreen = ({navigation}) => {
  const [messages , setMessages] = useState([]);
  const [recording , setRecording] = useState(false);

  useEffect(()=>{
    Voice.onSpeechStart = onSpeechStart;
    Voice.onSpeechEnd = onSpeechEnd;
    Voice.onSpeechResults = onSpeechResults;
    Voice.onSpeechError = error => console.error("onSpeechError",error);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };

  },[])

  const onSpeechStart = (event) => {
    console.log("onSpeechStart",event);
  };

  const onSpeechEnd =(event) => {
    console.log("onSpeechEnd",event);
    stopListing();
  };

  const onSpeechResults = (event) => {
    console.log("onSpeechResults event",event);
    const text = event.value;
    setMessages([...messages, text]);
  };

  const startListing = async () =>{
    setRecording(true);
    try{
      await Voice.start('en-US');
      console.log("Voice started successfully");
    }catch(error){
      console.error("Some Error in Listening : ",error);
      setRecording(false);
    }
  }
  
  const stopListing = async () =>{
    try{
      await Voice.stop();
      await Voice.destroy();
      setRecording(false);
      console.log("Stopping Voice");
    }
    catch(error){
      console.error("Some Error in Listening : ",error);
    }
  }

  return (
    <View className="flex-1 bg-white p-5">
      <SafeAreaView  className="flex-1 flex mx-5">
        <View className="flex-row justify-center">
            <Image source={require('../assests/bot_1.png')} className="w-20 h-20" />
        </View>
      {
        messages.length > 0 ? (
      <View className="flex-1 items-start p-3">
        <ScrollView className="h-44 w-80 bg-gray-200 p-5">
          <View className="flex-row flex-wrap">
            {messages.map((message, index) => (
              <Text key={index} className="mr-2 text-xl">{message}</Text>
            ))}
          </View>
        </ScrollView>
      </View>
        )
        : (
          <Text className="text-center text-4xl font-bold text-gray-700 py-32">
          Welcome to the Voice word count !! 
        </Text>
        )
      }
      <View className="flex justify-center items-center py-20">
        { recording ? 
          <TouchableOpacity
            onPress={()=>{
              stopListing()}}
          >
          <Image source={require("../assests/listening.gif")}
            className="rounded-full w-24 h-24"
          />
        </TouchableOpacity>
        :
          <TouchableOpacity
          onPress={()=>
            {startListing()}}
          >
          <Image source={require("../assests/mic_2.png")}
            className="rounded-full w-24 h-24"
          />
        </TouchableOpacity>}

        {
          messages.length > 0 && (
            <TouchableOpacity
              className="rounded-3xl p-2 absolute right-0"
            >
              <Button mode='contained' buttonColor="#0ea5e9" className="text-white font-semibold"> Clear</Button>
            </TouchableOpacity>
          )
        }
        {
          messages.length > 0 && (
            <TouchableOpacity
              className="rounded-3xl p-2 absolute left-0"
              onPress={()=>navigation.navigate('chart')}
            >
              <Button mode='contained' buttonColor="#0ea5e9" className="text-white font-semibold">Charts</Button>
            </TouchableOpacity>
          )
        }
      </View>
      </SafeAreaView>
    </View>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})
