import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View , Dimensions, ScrollView} from "react-native";
import { useNavigation } from "@react-navigation/native";
import test from '../constants/test.js';
import Icons from './Icons.jsx';

const { height, width } = Dimensions.get('window');
const THRESHOLD_HEIGHT = 700;

const Home = () => {
    const navigation = useNavigation();
    const [started, setStarted] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [categoryCounts, setCategoryCounts] = useState({
        "Self-Development": 0,
        "Work": 0,
        "Relationships": 0,
        "Rest": 0,
    });
    const [resultCategory, setResultCategory] = useState(null);
    
    const [completed, setCompleted] = useState(false);

    const getCurrentDate = () => {
        const date = new Date();
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}.${month}.${year}`;
      };

    const handleAnswerSelect = (answer, category) => {
        setSelectedAnswer(answer);
        setSelectedCategory(category)
        setCategoryCounts((prevCounts) => ({
            ...prevCounts,
            [category]: prevCounts[category] + 1,
        }));
    };
    
    const handleNext = () => {
        if (currentQuestionIndex < test.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1);
            setSelectedAnswer(null);
            setSelectedCategory(null);
        } else {
            const maxCategory = Object.keys(categoryCounts).reduce((a, b) =>
                categoryCounts[a] > categoryCounts[b] ? a : b
            );
            setResultCategory(maxCategory);
            setStarted(false);
            setCompleted(true); 
        }
    };

    useEffect(() => {
        console.log('Category counts updated:', categoryCounts);
        const maxCategory = Object.keys(categoryCounts).reduce((a, b) =>
            categoryCounts[a] > categoryCounts[b] ? a : b
        );
        console.log('Max Category:', maxCategory);
        setResultCategory(maxCategory);
    }, [categoryCounts]);
            
      const currentQuestion = test[currentQuestionIndex];

      const getLogoContainerStyle = () => {
        let color = '#1f1f1f';

        switch (selectedCategory) {
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
            borderColor: color,
            borderTopColor: 'transparent',
            borderWidth: 1,
            backgroundColor: '#3d3d3d',
            borderBottomLeftRadius: 300,
            borderBottomRightRadius: 300,
            marginBottom: height * 0.04,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: color,
            shadowOpacity: 0.3,
            shadowOffset: { width: 0, height: 4 },
            shadowRadius: 4,
        };
    };

    const getResultColor = () => {
        let color = '#2a2a2a';

        switch (resultCategory) {
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
    }

    return (
        <View style={styles.container}>

            <View style={[styles.logoContainer, 
                    getLogoContainerStyle(), 
                    completed && {borderColor: getResultColor().color, shadowColor: getResultColor().color},
                ]}
                    > 
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            {
                started ? (
                    <View style={{width: '100%', paddingHorizontal: 37}}>

                        <View style={styles.dotsContainer}>
                            {test.map((_, index) => (
                                <View 
                                    key={index} 
                                    style={[
                                        styles.dot, 
                                        currentQuestionIndex >= index && styles.activeDot
                                    ]}
                                />
                            ))}
                        </View>

                        <View style={styles.dateDecor}>
                            <Image source={require('../assets/romb.png')} style={[styles.romb, {marginRight: 10}]} />
                            <View style={styles.dateContainer}>
                                <Text style={styles.date}>{getCurrentDate()}</Text>
                            </View>
                            <Image source={require('../assets/romb.png')} style={[styles.romb, {marginLeft: 10}]} />
                        </View>

                        <Text style={styles.title}>{currentQuestion.question}</Text>

                        <View style={styles.answersContainer}>
                        {currentQuestion.answers.map((answer, index) => (
                            <TouchableOpacity
                            key={index}
                            style={[
                                styles.answerButton,
                                selectedAnswer === answer.text && styles.selectedAnswerButton,
                            ]}
                            onPress={() => {
                                handleAnswerSelect(answer.text, answer.category); 
                            }}
                            >
                                {
                                    selectedAnswer === answer.text && (
                                        <Image source={require('../assets/romb.png')} style={[styles.romb, {marginRight: 18}]} />
                                    )
                                }
                                <Text style={[styles.answerText,  selectedAnswer === answer.text && {fontWeight: '600'}]}>{answer.text}</Text>
                            </TouchableOpacity>
                        ))}
                        </View>

                        <TouchableOpacity
                        style={[styles.startBtn, !selectedAnswer && styles.disabledNextButton]}
                        onPress={handleNext}
                        disabled={!selectedAnswer}
                        >
                            <Text style={styles.startBtnText}>Next</Text>
                        </TouchableOpacity>

                    </View>
                ) :
                completed ? (
                    <View style={{ width: '100%', alignItems: 'center', paddingHorizontal: 37, marginTop: height <= THRESHOLD_HEIGHT ? 0 : height * 0.02}}>
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
                        {
                            resultCategory === "Self-Development" && 
                                <Text style={styles.title}>You’re Focused on Self-Development Today!</Text>
                        }
                        {
                            resultCategory === "Work" && 
                                <Text style={styles.title}>You’re Focused on Work Today!</Text>
                        }
                        {
                            resultCategory === "Relationships" && 
                                <Text style={styles.title}>You’re Focused on Relationships Today!</Text>
                        }
                        {
                            resultCategory === "Rest" && 
                                <Text style={styles.title}>You’re Focused on Rest Today!</Text>
                        }
                        <Text style={styles.text}>
                            {resultCategory === "Self-Development" &&
                                "Today is all about personal growth. Tap below to access your personalized plan and get started!"}
                            {resultCategory === "Work" &&
                                "Your priority today is productivity and work-related goals. Tap below to access your daily task and get moving!"}
                            {resultCategory === "Relationships" &&
                                "Today, nurture your connections with others. Tap below to see how you can strengthen your bonds today!"}
                            {resultCategory === "Rest" &&
                                "Today is for rest and rejuvenation. Tap below to see your plan for a relaxing and fulfilling day!"}
                        </Text>
                        <TouchableOpacity
                            style={[
                                styles.startBtn,
                                { backgroundColor: getResultColor().color },
                            ]}
                            onPress={() => navigation.navigate('PlanScreen', {category: resultCategory})}
                        >
                            <Text style={styles.startBtnText}>View My Plan</Text>
                        </TouchableOpacity>
                    </View>
                ) : (
                    <View style={styles.startContainer}>
                        <View style={styles.dateDecor}>
                            <Image source={require('../assets/romb.png')} style={[styles.romb, {marginRight: 10}]} />
                            <View style={styles.dateContainer}>
                                <Text style={styles.date}>{getCurrentDate()}</Text>
                            </View>
                            <Image source={require('../assets/romb.png')} style={[styles.romb, {marginLeft: 10}]} />
                        </View>
        
                        <Text style={styles.title}>Discover Your Core Element Today!</Text>
                        <Text style={styles.text}>Each day brings new energy and focus. Answer 5 quick questions to reveal today’s guiding element and unlock personalized insights.</Text>
        
                        <TouchableOpacity style={styles.startBtn} onPress={() => setStarted(true)}>
                            <Text style={styles.startBtnText}>Start Today’s Test</Text>
                        </TouchableOpacity>
                </View>    
                )
            }

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
    startContainer: {
        marginTop: height <= THRESHOLD_HEIGHT ? 0.01 : height * 0.03,
        width: '104%',
        height: height <= THRESHOLD_HEIGHT ? 350 : 400,
        padding: 32,
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderWidth: 1,
        borderRadius: 22,
        borderColor: '#ff4747',
        borderBottomColor: 'transparent',
        backgroundColor: '#2b2b2b'
    },
    dotsContainer: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: height * 0.04,
    },
    dot: {
        width: '19%',
        height: 8,
        borderRadius: 5,
        backgroundColor: '#2a2a2a',
    },
    activeDot: {
        backgroundColor: '#ff4747',
    },
    dateDecor: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        marginBottom: height <= THRESHOLD_HEIGHT ? 8 : 20,
    },
    romb: {
        width: 12,
        height: 12,
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
        fontSize: height <= THRESHOLD_HEIGHT ? 12 : 14,
        fontWeight: '400',
    },
    title: {
        color: '#fff',
        fontSize: height <= THRESHOLD_HEIGHT ? 16 : 18,
        fontWeight: '600',
        textAlign: 'center',
        marginBottom: height <= THRESHOLD_HEIGHT ? 10 : height * 0.03,
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
    startBtn: {
        width: '100%',
        padding: height <= THRESHOLD_HEIGHT ? 10 : 30,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: '#ff4747',
        marginBottom: height * 0.03
    },
    startBtnText: {
        fontWeight: '700',
        fontSize: 17,
        color: '#fff',
    },
    answersContainer: {
        width: '100%',
        marginBottom: height <= THRESHOLD_HEIGHT ? height * 0.007 : height * 0.016
    },
    answerButton: {
        width: '100%',
        paddingVertical: height <= THRESHOLD_HEIGHT ? 7 : 15,
        paddingHorizontal: 23,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#2a2a2a',
        borderRadius: 12,
        marginBottom: 8,
        flexDirection: 'row'
    },
    selectedAnswerButton: {
        borderWidth: 1,
        borderColor: '#ff4747',
    },
    answerText: {
        fontWeight: '400',
        fontSize: height <= THRESHOLD_HEIGHT ? 15 : 17,
        color: '#fff',
        textAlign: 'center',
        lineHeight: 20
    },
    disabledNextButton: {
        backgroundColor: 'rgba(255, 71, 71, 0.5)'
    }
});

export default Home;