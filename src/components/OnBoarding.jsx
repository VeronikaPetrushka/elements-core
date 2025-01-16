import React, { useState } from "react"
import { View, Text,TouchableOpacity, Image, StyleSheet, Dimensions, ImageBackground } from "react-native"
import { useNavigation } from "@react-navigation/native";

const { height } = Dimensions.get('window');

const OnBoarding = () => {
    const navigation = useNavigation();
    const [componentIndex, setComponentIndex] = useState(0);


    const handleButtonPress = () => {
        setComponentIndex((prevIndex) => (prevIndex + 1) % 4);

        if(componentIndex === 3) {
            navigation.navigate('HomeScreen')
        }
    };

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
        <View style={styles.container}>

            <Image source={require('../assets/logo.png')} style={styles.logo} />

            <View style={styles.infoContainer}>

                <Image source={require('../assets/rombs3.png')} style={styles.rombs} />

                {
                    componentIndex === 0 && 
                    <Text style={styles.title}>Welcome to Elements Core!</Text>
                }
                {
                    componentIndex === 1 && 
                    <Text style={styles.title}>Discover Your Core Element</Text>
                }
                {
                    componentIndex === 2 && 
                    <Text style={styles.title}>Daily Inspiration and Action</Text>
                }
                {
                    componentIndex === 3 && 
                    <Text style={styles.title}>Track Your Progress</Text>
                }

                {
                    componentIndex === 0 && 
                    <Text style={styles.text}>Your guide to daily balance and personal growth. Discover what truly drives you each day and make the most of every moment.</Text>
                }
                {
                    componentIndex === 1 && 
                    <Text style={styles.text}>Take a short daily test to reveal your focus area: Self-Development, Work, Relationships, or Rest. Each day is unique, and so is your element!</Text>
                }
                {
                    componentIndex === 2 && 
                    <Text style={styles.text}>Receive a personalized quote to inspire your mindset and a focused task to keep you on track. Small steps lead to big changes!</Text>
                }
                {
                    componentIndex === 3 && 
                    <Text style={styles.text}>View your weekly analytics to see which elements you focus on the most. Gain insights into your habits and find balance over time.</Text>
                }

            <TouchableOpacity style={styles.btn} onPress={handleButtonPress}>
                {
                    componentIndex === 0 && 
                    <Text style={styles.btnText}>Let’s Begin</Text>
                }
                {
                    componentIndex === 1 && 
                    <Text style={styles.btnText}>Understand My Element</Text>
                }
                {
                    componentIndex === 2 && 
                    <Text style={styles.btnText}>Get Inspired</Text>
                }
                {
                    componentIndex === 3 && 
                    <Text style={styles.btnText}>Start Now!</Text>
                }
            </TouchableOpacity>

                {
                    componentIndex != 3 && 
                    <TouchableOpacity style={styles.skipBtn} onPress={() => navigation.navigate('HomeScreen')}>
                        <Text style={styles.skipBtnText}>Skip</Text>
                    </TouchableOpacity>
                }

            </View>
        </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: height * 0.16,
    },
    logo: {
        width: 264,
        height: height * 0.18,
        resizeMode: 'contain',
    },
    infoContainer: {
        width: '101%',
        height: height * 0.59,
        paddingHorizontal: 32,
        paddingVertical: 35,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderTopLeftRadius: 22,
        borderTopRightRadius: 22,
        borderColor: '#ff4747',
        borderBottomColor: 'transparent',
        backgroundColor: '#2b2b2b'
    },
    rombs: {
        width: 74,
        height: 28,
        marginBottom: height * 0.035,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: height * 0.03,
        lineHeight: 28.18
    },
    text: {
        fontWeight: '400',
        fontSize: 16,
        color: '#fff',
        textAlign: 'center',
        marginBottom: height * 0.05,
        lineHeight: 18.78
    },
    btn: {
        width: '100%',
        padding: height * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#ff4747',
        marginBottom: height * 0.03
    },
    btnText: {
        fontWeight: '700',
        fontSize: 17,
        color: '#fff',
    },
    skipBtn: {
        paddingHorizontal: 39,
        paddingVertical: 13,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#1f1f1f',
    },
    skipBtnText: {
        fontWeight: '700',
        fontSize: 14,
        color: '#fff',
    },

})

export default OnBoarding;