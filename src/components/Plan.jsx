import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View , Dimensions, Share} from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import content from '../constants/content.js';
import Icons from './Icons.jsx';

const { height, width } = Dimensions.get('window');

const Plan = ({ category }) => {
    const [isTask, setIsTask] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSaved, setIsSaved] = useState(false);
    const [timeLeft, setTimeLeft] = useState(10 * 60);
    const [timer, setTimer] = useState(null);
    const [isStarted, setIsStarted] = useState(false);

    useEffect(() => {
        checkIfSaved();
    }, [currentIndex, isTask]);

    const checkIfSaved = async () => {
        try {
            const savedItems = JSON.parse(await AsyncStorage.getItem('saved')) || [];
            const currentItem = getTipOrTask();
            setIsSaved(savedItems.includes(currentItem));
        } catch (error) {
            console.error('Error checking saved items:', error);
        }
    };

    const handleSave = async () => {
        try {
            const savedItems = JSON.parse(await AsyncStorage.getItem('saved')) || [];
            const currentItem = getTipOrTask();
            let updatedItems;

            if (isSaved) {
                updatedItems = savedItems.filter(item => item !== currentItem);
            } else {
                updatedItems = [...savedItems, currentItem];
            }

            await AsyncStorage.setItem('saved', JSON.stringify(updatedItems));
            setIsSaved(!isSaved);
        } catch (error) {
            console.error('Error toggling save:', error);
        }
    };

    const handleShare = async () => {
        try {
            const currentItem = getTipOrTask();
            await Share.share({
                message: currentItem,
                title: category,
            });
        } catch (error) {
            console.error('Error sharing item:', error);
        }
    };

    const getTipOrTask = () => {
        const filteredContent = content.find(item => item.category === category);
        if (isTask) {
            return filteredContent?.tasks[currentIndex % filteredContent.tasks.length];
        }
        return filteredContent?.tips[0];
    };

    const generateNewTask = () => {
        setCurrentIndex(prevIndex => prevIndex + 1);
    };

    const getCurrentDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      };

    const getResultColor = () => {
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

    const startTask = () => {
        setIsTask(true);
        setTimeLeft(10 * 60);
        setIsStarted(true);
        const interval = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return prevTime - 1;
            });
        }, 1000);
    
        setTimer(interval);
    };
    
    const handleTask = () => {
        if (isTask) {
            if (!isStarted) {
                startTask();
            }
    
            if (isStarted && timeLeft === 0) {
                handleTaskComplete();
            }
        }
    };
    
    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    const handleTaskComplete = () => {
        setIsTask(false);
        setTimeLeft(10 * 60);
        if (timer) {
            clearInterval(timer);
            setTimer(null);
        }
    };

    return (
        <View style={styles.container}>

            <View style={[styles.logoContainer, category && {borderColor: getResultColor().color, shadowColor: getResultColor().color}]}> 
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <View style={styles.dotsContainer}>
                <View
                    style={[
                        styles.dot,
                        { backgroundColor: getResultColor().color },
                    ]}
                />
                <View
                    style={[
                        styles.dot,
                        isTask && { backgroundColor: getResultColor().color },
                    ]}
                />
            </View>

            <View style={[styles.dateDecor,  { borderColor: getResultColor().color} ]}>
                <View style={[styles.romb, {marginRight: 10}]}>
                    <Icons type={'romb'} color={getResultColor().color} />
                </View>
                <View style={[styles.dateContainer,  { borderColor: getResultColor().color}]}>
                    <Text style={styles.date}>{getCurrentDate()}</Text>
                </View>
                <View style={[styles.romb, {marginLeft: 10}]}>
                    <Icons type={'romb'} color={getResultColor().color} />
                </View>
            </View>

            <View style={{width: '100%', alignItems: 'center', paddingHorizontal: 35}}>
                <Text style={styles.title}>{isTask ? 'Daily Task' : category}</Text>

                <View style={styles.contentContainer}>
                    <View>
                        <View style={{width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 13}}>
                            <View style={[styles.clock, {marginRight: 10, padding: 1.5}]}>
                                <Icons type={'romb'} color={getResultColor().color} />
                            </View>
                            <Text style={[styles.text, {fontWeight: '700'}]}>{isTask ? "Your task:" : "Daily tip:"}</Text>
                        </View>
                        <Text style={[styles.text, {marginBottom: 18}]}>{getTipOrTask()}</Text>
                        {
                            !isTask && (
                                <View style={{width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row'}}>
                                    <TouchableOpacity style={styles.toolBtn} onPress={handleSave}>
                                        <View style={[styles.clock, {marginRight: 10}]}>
                                            <Icons type={'save'} />
                                        </View>
                                        <Text style={styles.toolBtnText}>{isSaved ? 'Saved' : 'Save'}</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.toolBtn} onPress={handleShare}>
                                        <View style={[styles.clock, {marginRight: 10}]}>
                                            <Icons type={'share'} />
                                        </View>
                                        <Text style={styles.toolBtnText}>Share</Text>
                                    </TouchableOpacity>
                                </View>
                            )
                        }
                        {isTask && (
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center' }}>
                                <View style={[styles.clock, { marginRight: 10 }]}>
                                    <Icons type={'clock'} color={getResultColor().color} />
                                </View>
                                <Text style={[styles.text, { fontWeight: '700' }]}> Estimated time:
                                    <Text style={{ fontWeight: '400' }}> 10 minutes</Text>
                                </Text>
                            </View>
                        )}
                    </View>
                </View>

                {
                    isTask ? (
                    <TouchableOpacity
                        style={[
                            styles.startBtn,
                            { backgroundColor: getResultColor().color},
                            isStarted && timeLeft != 0 && {backgroundColor: '#3d3d3d', borderWidth: 1, borderColor: getResultColor().color}
                        ]}
                        onPress={handleTask}
                        disabled={isStarted && timeLeft != 0}
                    >
                        <Text style={styles.startBtnText}>{isStarted ? `Time left: ${formatTime(timeLeft)}` : timeLeft === 0 ? 'Done' : 'Start this task'}</Text>
                    </TouchableOpacity>
                    ) : (
                        <TouchableOpacity
                            style={[
                                styles.startBtn,
                                { backgroundColor: getResultColor().color },
                            ]}
                            onPress={() => setIsTask(!isTask)}
                        >
                            <Text style={styles.startBtnText}>Catch this</Text>
                        </TouchableOpacity>
                    )
                }

                { isTask && !isStarted && (
                    <TouchableOpacity
                    style={[
                        styles.startBtn,
                        { backgroundColor: 'transparent', },
                    ]}
                    onPress={generateNewTask}
                >
                    <Text style={styles.startBtnText}>Generate new task</Text>
                </TouchableOpacity>
                )}

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
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height * 0.04,
        paddingHorizontal: 35
    },
    dot: {
        width: '49%',
        height: 8,
        borderRadius: 5,
        backgroundColor: '#3d3d3d',
    },
    activeDot: {
        backgroundColor: '#ff4747',
    },
    dateDecor: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: 38,
    },
    romb: {
        width: 12,
        height: 12,
    },
    clock: {
        width: 20,
        height: 20,
    },
    dateContainer: {
        backgroundColor: '#1f1f1f',
        borderRadius: 6,
        borderWidth: 1,
        borderColor: '#ff4747',
        paddingVertical: 9,
        paddingHorizontal: 13,
    },
    date: {
        color: '#fff',
        fontSize: 14,
        fontWeight: '400',
    },
    contentContainer: {
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 23,
        alignItems: 'flex-start',
        backgroundColor: '#3d3d3d',
        borderRadius: 12,
        marginBottom: 26
    },
    title: {
        color: '#fff',
        fontSize: 22,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: height * 0.03,
        lineHeight: 26
    },
    text: {
        fontWeight: '400',
        fontSize: 17,
        color: '#fff',
        textAlign: 'left',
        lineHeight: 20
    },
    startBtn: {
        width: '100%',
        padding: height * 0.03,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#ff4747',
        marginBottom: height * 0.01
    },
    startBtnText: {
        fontWeight: '700',
        fontSize: 17,
        color: '#fff',
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

export default Plan;