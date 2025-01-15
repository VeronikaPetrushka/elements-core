import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View , Dimensions, Share, ScrollView } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from './Icons.jsx';

const { height, width } = Dimensions.get('window');

const Stats = () => {
    const [completedTasks, setCompletedTasks] = useState([]);
    const categories = ["Self-Development", "Work", "Relationships", "Rest"];

    useEffect(() => {
        fetchCompletedTasks();
    }, []);

    const fetchCompletedTasks = async () => {
        try {
            const storedData = JSON.parse(await AsyncStorage.getItem('completed')) || [];
            setCompletedTasks(storedData);
        } catch (error) {
            console.error('Error fetching stats:', error);
        }
    };

    const getResultColor = (category) => {
        let color = '#2a2a2a';

        switch (category) {
            case "Self-Development":
                color = '#7dc059';
                break;
            case "Work":
                color = '#ff4747';
                break;
            case "Relationships":
                color = '#ffa947';
                break;
            case "Rest":
                color = '#47b9ff';
                break;
            default:
                break;
        }  
        
        return {
            color: color
        }
    };

    const calculateCompletionPercentage = (category) => {
        const completedForCategory = completedTasks.filter(task => task.category === category).length;
        return (completedForCategory / 10) * 100;
    };

    const handleShare = async (tip) => {
        try {
            const message = `I have completed ${completedTasks.length} tasks in Elements Core`;
            await Share.share({ message });
        } catch (error) {
            console.error('Error sharing the tip:', error);
        }
    };

    return (
        <View style={styles.container}>

            <View style={styles.logoContainer}> 
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <Text style={styles.title}>My Stats</Text>

            <View style={{width: '100%', alignItems: 'center', paddingHorizontal: 35}}>

                <View style={styles.dotsContainer}>
                    {categories.map((category, index) => (
                        <View
                            key={index}
                            style={[
                                styles.dot,
                                { backgroundColor: getResultColor(category).color },
                            ]}
                        />
                    ))}
                </View>

                <ScrollView style={{width: '100%'}}>
                    <View style={styles.barsContainer}>
                        {categories.map((category, index) => {
                            const percentage = calculateCompletionPercentage(category);
                            const barHeight = (percentage / 100) * 200;

                            return (
                                <View key={index} style={styles.barWrapper}>
                                    <Text style={styles.barPercentage}>{Math.round(percentage)}%</Text>
                                    <View style={styles.progressBarContainer}>
                                        <View
                                            style={[
                                                styles.progressBarBackground,
                                                { height: 200, backgroundColor: '#3d3d3d' }
                                            ]}
                                        />
                                        <View
                                            style={[
                                                styles.progressBar,
                                                { height: barHeight, backgroundColor: getResultColor(category).color }
                                            ]}
                                        />
                                    </View>
                                </View>
                            );
                        })}

                    </View>

                    <View style={styles.countContainer}>
                        <View style={{alignItems: 'flex-start'}}>
                            <Text style={[styles.text, {fontWeight: '700', marginBottom: 13}]}>{completedTasks.length}</Text>
                            <Text style={styles.text}>Completed tasks</Text>
                        </View>
                        <TouchableOpacity style={styles.toolBtn} onPress={handleShare}>
                            <View style={[styles.romb, { marginRight: 10 }]}>
                                <Icons type={'share'} />
                            </View>
                            <Text style={styles.toolBtnText}>Share</Text>
                        </TouchableOpacity>
                    </View>

                    <View style={{ height: 220 }} />

                </ScrollView>

            </View>

        </View>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
        backgroundColor: '#1f1f1f',
        paddingTop: height * 0.27
    },
    logoContainer: {
        width: width,
        height: width,
        borderRadius: 300,
        marginBottom: height * 0.04,
        alignItems: 'center',
        backgroundColor: '#3d3d3d',
        position: 'absolute',
        top: -210
    },
    logo: {
        width: 138,
        height: height * 0.1,
        resizeMode: 'contain',
        position: 'absolute',
        bottom: 55
    },
    dotsContainer: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 20,
    },
    dot: {
        width: '24.5%',
        height: 8,
        borderRadius: 6,
        marginHorizontal: 6,
    },
    romb: {
        width: 18,
        height: 18,
    },
    title: {
        color: '#fff',
        fontSize: 24,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: height * 0.03,
        lineHeight: 28.18
    },
    barsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 20,
    },
    barWrapper: {
        width: '22%',
        alignItems: 'center',
    },
    barPercentage: {
        color: '#fff',
        fontWeight: '600',
        fontSize: 24,
        marginBottom: 18,
    },
    progressBarContainer: {
        width: '100%',
        height: 200,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    progressBarBackground: {
        position: 'absolute',
        width: '100%',
        bottom: 0,
        borderRadius: 12
    },
    progressBar: {
        width: '100%',
        position: 'absolute',
        top: 0,
        borderRadius: 12,
    },
    text: {
        fontWeight: '400',
        fontSize: 17,
        color: '#fff',
        textAlign: 'left',
        lineHeight: 20
    },
    countContainer: {
        width: '100%',
        paddingVertical: 14,
        paddingHorizontal: 24,
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row',
        backgroundColor: '#3d3d3d',
        borderRadius: 12,
    },
    toolBtn: {
        width: '47%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        padding: 10,
        borderRadius: 12,
        backgroundColor: '#1f1f1f',
    },
    toolBtnText: {
        fontWeight: '700',
        fontSize: 15,
        color: '#fff',
    }
});

export default Stats;