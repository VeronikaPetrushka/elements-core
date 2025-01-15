import React, { useState, useEffect, useRef } from 'react';
import { Animated, View, ImageBackground, StyleSheet } from 'react-native';
import { enableScreens } from 'react-native-screens';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import OnBoardingScreen from './src/screens/OnBoardingScreen';
import HomeScreen from './src/screens/HomeScreen';
import PlanScreen from './src/screens/PlanScreen';
import SavedScreen from './src/screens/SavedScreen';
import StatsScreen from './src/screens/StatsScreen';

enableScreens();

const Stack = createStackNavigator();


const App = () => {
    const [loaderIsEnded, setLoaderIsEnded] = useState(false);
  
    const firstImageAnim = useRef(new Animated.Value(0)).current;
    const secondImageAnim = useRef(new Animated.Value(0)).current;
    const thirdImageAnim = useRef(new Animated.Value(0)).current;

    const loader1 = require('./src/assets/loaders/1.png');
    const loader2 = require('./src/assets/loaders/2.png');
    const loader3 = require('./src/assets/loaders/3.png');

    useEffect(() => {
        Animated.sequence([
            Animated.timing(firstImageAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(firstImageAnim, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(secondImageAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(secondImageAnim, {
                toValue: 0,
                duration: 1500,
                useNativeDriver: true,
            }),
            Animated.timing(thirdImageAnim, {
                toValue: 1,
                duration: 1500,
                useNativeDriver: true,
            }),
        ]).start(() => {
            setLoaderIsEnded(true);
        });
    }, []);
  return (
      <NavigationContainer>
        {
                !loaderIsEnded ? (
                    <View style={styles.container}>
                        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                            <Animated.Image
                                source={loader1}
                                style={[styles.image1, { opacity: firstImageAnim }]}
                            />
                            <Animated.Image
                                source={loader2}
                                style={[styles.image2, { opacity: secondImageAnim }]}
                            />
                            <Animated.Image
                                source={loader3}
                                style={[styles.image3, { opacity: thirdImageAnim }]}
                            />
                        </View>
                    </View>
                ) : (
              <Stack.Navigator initialRouteName="OnBoardingScreen">
                  <Stack.Screen 
                      name="OnBoardingScreen" 
                      component={OnBoardingScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="HomeScreen" 
                      component={HomeScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="PlanScreen" 
                      component={PlanScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="SavedScreen" 
                      component={SavedScreen} 
                      options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                      name="StatsScreen" 
                      component={StatsScreen} 
                      options={{ headerShown: false }} 
                  />
              </Stack.Navigator>
                )
            }
      </NavigationContainer>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100%',
        backgroundColor: '#1f1f1f',
    },
    image1: {
        width: 105,
        height: 110,
        position: 'absolute',
        top: '40%'
    },
    image2: {
        width: 172,
        height: 170,
        position: 'absolute',
        top: '40%'
    },
    image3: {
        width: 264,
        height: 175,
        position: 'absolute',
        top: '42%'
    },
});

export default App;
