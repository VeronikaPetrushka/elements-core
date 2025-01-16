import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Text, Image, StyleSheet, View , Dimensions, Share, ScrollView, ImageBackground } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Icons from './Icons.jsx';

const { height, width } = Dimensions.get('window');

const Saved = () => {
    const [savedItems, setSavedItems] = useState([]);

    useEffect(() => {
        fetchSavedItems();
    }, []);

    const fetchSavedItems = async () => {
        try {
            const savedData = JSON.parse(await AsyncStorage.getItem('saved')) || [];
            setSavedItems(savedData);
        } catch (error) {
            console.error('Error fetching saved items:', error);
        }
    };

    const handleRemove = async (itemToRemove) => {
        try {
            const updatedItems = savedItems.filter(
                item => !(item.category === itemToRemove.category && item.tip === itemToRemove.tip)
            );

            await AsyncStorage.setItem('saved', JSON.stringify(updatedItems));
            setSavedItems(updatedItems);
        } catch (error) {
            console.error('Error removing item:', error);
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

    const handleShare = async (tip) => {
        try {
            const message = `Daily Tip: ${tip}`;
            await Share.share({ message });
        } catch (error) {
            console.error('Error sharing the tip:', error);
        }
    };

    return (
        <ImageBackground source={require('../assets/back.png')} style={{flex: 1}}>
        <View style={styles.container}>

            <View style={styles.logoContainer}> 
                <Image source={require('../assets/logo.png')} style={styles.logo} />
            </View>

            <Text style={styles.title}>Saved Content</Text>

            {savedItems.length > 0 ? (
                <ScrollView contentContainerStyle={{paddingHorizontal: 35}}>
                    {savedItems.map((item, index) => (
                        <View key={`${item.category}-${index}`} style={styles.itemContainer}>
                            <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', marginBottom: 13 }}>
                                <View style={[styles.romb, { marginRight: 10, padding: 1.5 }]}>
                                    <Icons type={'romb'} color={getResultColor(item.category).color} />
                                </View>
                                <Text style={[styles.text, { fontWeight: '700' }]}>Daily tip:</Text>
                            </View>
                            <Text style={[styles.text, { marginBottom: 23 }]}>{item.tip}</Text>
                            <View style={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
                                <TouchableOpacity
                                    style={[styles.toolBtn, { backgroundColor: '#ff4747' }]}
                                    onPress={() => handleRemove(item)}
                                >
                                    <View style={[styles.romb, { marginRight: 10 }]}>
                                        <Icons type={'save'} />
                                    </View>
                                    <Text style={styles.toolBtnText}>Remove</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.toolBtn}  onPress={() => handleShare(item.tip)}>
                                    <View style={[styles.romb, { marginRight: 10 }]}>
                                        <Icons type={'share'} />
                                    </View>
                                    <Text style={styles.toolBtnText}>Share</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ))}
                    <View style={{height: 120}} />
                </ScrollView>
            ) : (
                <Text style={styles.text}>No saved items yet.</Text>
            )}

        </View>
        </ImageBackground>
    )
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        alignItems: 'center',
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
    itemContainer: {
        width: '100%',
        paddingVertical: 25,
        paddingHorizontal: 23,
        alignItems: 'flex-start',
        backgroundColor: '#3d3d3d',
        borderRadius: 12,
        marginBottom: 12
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
    text: {
        fontWeight: '400',
        fontSize: 17,
        color: '#fff',
        textAlign: 'left',
        lineHeight: 20
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

export default Saved;