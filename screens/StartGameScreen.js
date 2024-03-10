import {
    TextInput,
    View,
    StyleSheet,
    Alert,
    useWindowDimensions,
    KeyboardAvoidingView,
    ScrollView
} from "react-native";
import { useState } from "react";

import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

import Colors from "../constants/colors";

function StartGameScreen({ onPickNumber }) {
    const [enteredNumber, setEnteredNumber] = useState('');

    const { width, height } = useWindowDimensions();

    function numberInputHandler(enteredText) {
        setEnteredNumber(enteredText);
    }

    function resetInputHandler() {
        setEnteredNumber('');
    }

    function confirmInputHandler() {
        const chosenNumber = parseInt(enteredNumber);

        if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
            Alert.alert('Invalid Number', 'Number has to be between 1 and 99',
                [{ text: 'Okay', style: 'destructive', onPress: resetInputHandler }]);
            return;
        }

        onPickNumber(chosenNumber);
    }

    const marginTopDistance = height < 380 ? 30 : 100;

    return (
        <ScrollView style={styles.screen}>
            <KeyboardAvoidingView style={styles.screen} behavior='position'>
                <View style={[styles.rootContainer, { marginTop: marginTopDistance }]}>
                    <Title>Guess my number</Title>
                    <Card>
                        <InstructionText>Enter a number between 1 and 99</InstructionText>
                        <TextInput style={styles.numberInput}
                            maxLength={2}
                            keyboardType="number-pad"
                            onChangeText={numberInputHandler}
                            value={enteredNumber} />
                        <View style={styles.buttonsContainer}>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
                            </View>
                            <View style={styles.buttonContainer}>
                                <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
                            </View>
                        </View>
                    </Card>
                </View>
            </KeyboardAvoidingView>
        </ScrollView>
    );
}

export default StartGameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1
    },
    rootContainer: {
        flex: 1,
        alignItems: 'center'
    },
    numberInput: {
        height: 50,
        width: 50,
        fontSize: 32,
        borderBottomColor: Colors.accent500,
        borderBottomWidth: 2,
        color: Colors.accent500,
        marginVertical: 8,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    }
});