import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import Voice from '@react-native-voice/voice';

const TrialVoice = () => {
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [isRecording, setIsRecording] = useState(false);

  useEffect(() => {
    Voice.onSpeechStart = () => {
      console.log('Speech');
      setIsRecording(true);
    };
    Voice.onSpeechEnd = () => setIsRecording(false);
    Voice.onSpeechError = (err) => setError(err.error.message || 'An error occurred');
    Voice.onSpeechResults = (result) => setResult(result.value[0]);

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  const startRecording = async () => {
    try {
      await Voice.start('en-US');
    } catch (err) {
      setError(err.message || 'An error occurred while starting recording');
    }
  };

  const stopRecording = async () => {
    try {
      await Voice.stop();
    } catch (err) {
      setError(err.message || 'An error occurred while stopping recording');
    }
  };

  return (
    <View style={{ padding: 10 }}>
      <Text style={{color:'black'}}>{result}</Text>
      {error ? <Text style={{ color: 'red' }}>{error}</Text> : null}

      <TouchableOpacity style={{ marginTop: 30 }} onPress={stopRecording}>
        <Text style={{ color: 'red' }}>Stop Recording</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ marginTop: 30 }} onPress={startRecording}>
        <Text style={{ color: 'red' }}>Start Recording</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TrialVoice;

const styles = StyleSheet.create({});
