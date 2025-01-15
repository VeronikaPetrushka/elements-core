import { View, Dimensions } from "react-native"
import Plan from "../components/Plan"
import Menu from "../components/Menu";

const { height } = Dimensions.get('window');

const PlanScreen = ({ route }) => {
    const { category } = route.params;

    return (
        <View style={styles.container}>
            <Plan category={category} />
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

export default PlanScreen;