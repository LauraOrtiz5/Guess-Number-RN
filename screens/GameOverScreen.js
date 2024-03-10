import { View, Image, StyleSheet, Text, ScrollView, useWindowDimensions } from "react-native";

import Title from "../components/ui/Title";
import PrimaryButton from "../components/ui/PrimaryButton";
import Colors from "../constants/colors"

function GameOverScreen({ roundsNumber, userNumber, onStartNewGame }) {
    const { width, height } = useWindowDimensions();

    let imageSize = 300;
    let textSize = 24;

    if (width < 380) {
        imageSize = 260;
    }

    if (height < 400) {
        imageSize = 130;
    }

    if (width > height) {
        textSize = 18;
    }

    const imageStyle = {
        width: imageSize,
        height: imageSize,
        borderRadius: imageSize / 2
    }

    const textStyle = {
        fontSize: textSize,
    }

    return (
        <ScrollView>
            <View style={styles.rootContainer}>
                <Title>GAME OVER</Title>
                <View style={[styles.imageContainer, imageStyle]}>
                    <Image style={styles.image} source={require('../assets/images/success.png')} />
                </View>
                <View>
                    <Text style={[styles.summaryText, textStyle]}>
                        Your phone needed
                        <Text style={styles.highlight}> {roundsNumber} </Text>
                        rounds to guess the number
                        <Text style={styles.highlight}> {userNumber} </Text>
                    </Text>
                </View>
                <PrimaryButton onPress={onStartNewGame}>Start new game</PrimaryButton>
            </View>
        </ScrollView>
    );
}

export default GameOverScreen;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: Colors.primary800,
        overflow: 'hidden',
        margin: 36
    },
    image: {
        width: '100%',
        height: '100%'
    },
    summaryText: {
        fontFamily: 'open-sans',
        textAlign: 'center',
        marginBottom: 24
    },
    highlight: {
        fontFamily: 'open-sans-bold',
        color: Colors.primary500
    }
});