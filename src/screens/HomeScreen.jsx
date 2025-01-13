import { View, Dimensions } from "react-native"
import Home from "../components/Home"
import Menu from "../components/Menu";

const { height } = Dimensions.get('window');

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Home />
            <View style={styles.menu}>
                <Menu />
            </View>
        </View>
    )
}; 

const styles = {
    container: {
        width: "100%",
        height: "100%",
    },
    menu: {
        position: 'absolute',
        bottom: height * 0.04,
        left: 0,
        right: 0
    }
}

export default HomeScreen;