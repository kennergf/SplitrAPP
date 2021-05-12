import React, { useState } from 'react';
import { Text, View, Button, FlatList, TextInput } from 'react-native';

import * as Constants from './constants';
import styles from './styles';

export default function closeTrip() {
    const [text, onChangeText] = React.useState("Label");
    const [tripClosed, setTripClosed] = useState(null);

    async function closeTrip(label) {
        setTripClosed(null);
        await fetch(Constants.SERVER_URL + label + '/close')
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setTripClosed(json);
            })
            .catch((error) => { console.log(error); });
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} onChangeText={onChangeText} value={text}></TextInput>
            <Button onPress={() => closeTrip(text)} title="Close Trip" />

            {tripClosed === null ?
                <Text>No result found!</Text>
                :
                (<View>
                    <Text>{tripClosed.label}</Text>
                    <Text>{tripClosed.status}</Text>
                </View>)
            }
        </View>
    );
};