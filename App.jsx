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

    const loaderAnim = useRef(new Animated.Value(0)).current;

    const firstLoaderImage = require('./src/assets/loaders/1.png');
    const secondLoaderImage = require('./src/assets/loaders/2.png');

    const [currentLoader, setCurrentLoader] = useState(firstLoaderImage);
    useEffect(() => {
        Animated.timing(loaderAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
        }).start(() => {
            setCurrentLoader(secondLoaderImage);

            loaderAnim.setValue(0);
            Animated.timing(loaderAnim, {
                toValue: 1,
                duration: 2000,
                useNativeDriver: true,
            }).start(() => {
                setLoaderIsEnded(true);
            });
        });
    }, []);
    
    return (
      <NavigationContainer>
        {
                !loaderIsEnded ? (
                    <View style={{ flex: 1 }}>
                        <ImageBackground style={{ flex: 1 }} source={currentLoader}>
                            <View style={styles.container}>
                                <Animated.View style={[styles.imageContainer, { opacity: loaderAnim }]}>
                                    <ImageBackground source={currentLoader} style={styles.image} />
                                </Animated.View>
                            </View>
                        </ImageBackground>
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
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageContainer: {
        width: '100%',
        height: '100%',
        position: 'absolute',
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },
});

export default App;
