import React, { useState } from 'react';
import { Text, View, Button, FlatList, TextInput } from 'react-native';
import * as SecureStorage from 'expo-secure-store';

import * as Variables from './variables';
import * as Constants from './constants';
import styles from './styles';

export default function closeTrip() {
    const [text, onChangeText] = React.useState("Label");
    const [tripClosed, setTripClosed] = useState("null");
    const [message, setMessage] = useState(null);

    async function closeTrip(label) {
        setTripClosed("null");
        setMessage("");

        let token = await SecureStorage.getItemAsync(Constants.STORAGE_KEY);
        if(token === null){
            setMessage("Please login to use the system!");
            return;
        }
        token = token.replace("Splitr ", "");
        // REF https://www.codota.com/code/javascript/functions/builtins/Headers/append
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", JSON.parse(token));

        await fetch(Variables.SERVER_URL + label + '/close', {
            method: 'POST',
            headers: headers,
        })
            .then((response) => response.json())
            .then((json) => {
                if (json["error"] !== undefined) {
                    setMessage("Status: " + json["status"] + " Message: " + json["error"]);
                } else {
                    console.log(json);
                    setTripClosed(json);
                }
            })
            .catch((error) => {
                console.log("Error: " + error);
                setMessage("Error: " + error.message);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.title}>Close Trip</Text>
            </View>
            <View style={styles.content}>
                <Text>Label</Text>
                <TextInput style={styles.textInput} onChangeText={onChangeText} value={text}></TextInput>
                <Text></Text>
                <Button onPress={() => closeTrip(text)} title="Close Trip" />

                {tripClosed === null ?
                    <Text>No result found!</Text>
                    :
                    (<View>
                        <Text>{tripClosed.label}</Text>
                        <Text>{tripClosed.status}</Text>
                    </View>)
                }
                <Text style={styles.message}>{message}</Text>
            </View>
        </View>
    );
};