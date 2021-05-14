import React, { useState } from 'react';
import { Text, View, Button, FlatList, TextInput } from 'react-native';

import * as Constants from './constants';
import styles from './styles';

export default function closeTrip() {
    const [text, onChangeText] = React.useState("Label");
    const [tripClosed, setTripClosed] = useState("null");
    const [message, setMessage] = useState(null);

    async function closeTrip(label) {
        setTripClosed("null");
        setMessage("");

        // REF https://www.codota.com/code/javascript/functions/builtins/Headers/append
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "application/json");

        await fetch(Constants.SERVER_URL + label + '/close', {
            method: 'POST',
            headers: myHeaders,
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setTripClosed(json);
            })
            .catch((error) => {
                console.log("Error: " + error);
                setMessage(error.message);
            });
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
            <Text>{message}</Text>
        </View>
    );
};