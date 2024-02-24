import { Text, View, StyleSheet } from "react-native";
import Title from "../components/ui/Title";

function GameOverScreen () {
    return (
        <View style={styles.screen}>
            <Title>Game is over!</Title>
        </View>
    );
}

export default GameOverScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignContent: 'center',
        justifyContent: 'center'
    }
});