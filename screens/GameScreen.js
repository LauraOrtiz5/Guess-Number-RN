import { StyleSheet, View, Alert, FlatList, useWindowDimensions } from 'react-native';
import { useState, useEffect } from 'react';

import Title from '../components/ui/Title';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import NumberContainer from '../components/game/NumberContainer';
import GuessLogItem from '../components/game/GuessLogItem';

import Colors from '../constants/colors';

import { Ionicons } from '@expo/vector-icons';

function generateRandomBetween(min, max, exclude) {
    const rndNum = Math.floor(Math.random() * (max - min)) + min;

    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude);
    } else {
        return rndNum;
    }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ userNumber, onGameOver }) {
    const initialGuess = generateRandomBetween(1, 100, userNumber);
    const [currentGuess, setCurrentGuess] = useState(initialGuess);
    const [guessRound, setGuessRound] = useState([initialGuess]);
    const { width, height } = useWindowDimensions();

    useEffect(() => {
        if (currentGuess === userNumber) {
            onGameOver(guessRound.length);
        }
    }, [currentGuess, userNumber, onGameOver]);

    useEffect(() => {
        minBoundary = 1;
        maxBoundary = 100;
    }, []);

    function nextGuessHandler(direction) { // direction => 'lower', 'greater' 
        if (
            (direction === 'lower' && currentGuess < userNumber) ||
            (direction === 'greater' && currentGuess > userNumber)
        ) {
            Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: "Sorry!", style: 'cancel' }]);
            return;
        }

        if (direction === 'lower') {
            maxBoundary = currentGuess;
        } else {
            minBoundary = currentGuess + 1;
        }
        const newRndNumber = generateRandomBetween(minBoundary, maxBoundary, currentGuess);
        setCurrentGuess(newRndNumber);
        setGuessRound(prevGuessRound => [newRndNumber, ...prevGuessRound]);
    }

    const guessRoundsListLength = guessRound.length;

    let content = (
        <>
            <Card>
                <NumberContainer>{currentGuess}</NumberContainer>
                <View>
                    <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                </View>
                <View style={styles.buttonsContainer}>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                            <Ionicons name="add-circle" size={24} color={Colors.accent500} />
                        </PrimaryButton>
                    </View>
                    <View style={styles.buttonContainer}>
                        <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                            <Ionicons name="remove-circle" size={24} color={Colors.accent500} />
                        </PrimaryButton>
                    </View>
                </View>
            </Card>
            <View style={styles.listConatiner} >
                <FlatList
                    data={guessRound}
                    renderItem={(itemData) => (
                        <GuessLogItem
                            roundNumber={guessRoundsListLength - itemData.index}
                            guess={itemData.item}
                        />
                    )}
                    keyExtractor={(item) => item}
                />
            </View>
        </>
    );

    if (width > 500) {
        content = (
            <>
                <View style={styles.generalWide}>
                    <Card>
                        <InstructionText style={styles.instructionText}>Higher or lower?</InstructionText>
                        <View style={styles.buttonContainerWide}>
                            <NumberContainer>{currentGuess}</NumberContainer>
                            <View style={styles.buttonsContainerPack}>
                                <View style={styles.buttonContainer}>
                                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')}>
                                        <Ionicons name="add-circle" size={24} color={Colors.accent500} />
                                    </PrimaryButton>
                                </View>
                                <View style={styles.buttonContainer}>
                                    <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')}>
                                        <Ionicons name="remove-circle" size={24} color={Colors.accent500} />
                                    </PrimaryButton>
                                </View>
                            </View>
                        </View>
                    </Card>
                    <View style={styles.listConatiner} >
                        <FlatList
                            data={guessRound}
                            renderItem={(itemData) => (
                                <GuessLogItem
                                    roundNumber={guessRoundsListLength - itemData.index}
                                    guess={itemData.item}
                                />
                            )}
                            keyExtractor={(item) => item}
                        />
                    </View>
                </View>
            </>
        );
    }

    return (
        <View style={styles.screen}>
            <Title>Opponent's Guess</Title>
            {content}
        </View>
    );
}

export default GameScreen;

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
        alignItems: 'center',
        marginTop: 15
    },
    instructionText: {
        marginBottom: 12
    },
    buttonsContainer: {
        flexDirection: 'row'
    },
    buttonContainer: {
        flex: 1
    },
    listConatiner: {
        flex: 1,
        paddingTop: 36
    },
    buttonContainerWide: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    buttonsContainerPack: {
        flexDirection: 'column'
    },
    generalWide: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center'
    }
});