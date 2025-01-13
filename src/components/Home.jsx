import React, { useEffect, useState } from 'react';
import { TouchableOpacity, StyleSheet, View , Dimensions} from "react-native";

const { height } = Dimensions.get('window');

const Home = () => {
    return (
        <View style={styles.container}>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: height * 0.16,
        backgroundColor: '#1f1f1f'
    },
});

export default Home;