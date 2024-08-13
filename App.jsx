// import { SafeAreaView, StyleSheet, Text, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from './src/screens/HomeScreen';
import WelcomeScreen from './src/screens/WelcomeScreen';
import ChartScreen from './src/screens/ChartScreen';
import TrialVoice from './src/screens/TrialVoice';

const Stack = createNativeStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='welcome'>
        <Stack.Screen name="home" component={HomeScreen} />
        <Stack.Screen name="welcome" component={WelcomeScreen} />
        <Stack.Screen name="chart" component={ChartScreen} />
        {/* <Stack.Screen name="chart" component={TrialVoice} /> */}
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App
