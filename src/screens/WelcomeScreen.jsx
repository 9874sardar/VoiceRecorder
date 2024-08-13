import {Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

const WelcomeScreen = ({navigation}) => {
  return (
    <SafeAreaView className="flex-1 flex justify-around bg-white">
      <View className="space-y-2">
        <Text className="text-center text-4xl font-bold text-gray-700">
          Jarvis
        </Text>
        <Text className="text-center tracking-wider font-semibold text-gray-600">
          The Future is Knocking at your door
        </Text>
      </View>
      <View className="flex-row justify-center">
        <Image source={require('../assests/bot_1.png')} className="w-60 h-60" />
      </View>
      <TouchableOpacity className="bg-sky-500 mx-5 p-4 rounded-2xl"
        onPress={() => navigation.navigate('home')}
      >
        <Text className="text-center font-bold text-white text-2xl">Get Started</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});
