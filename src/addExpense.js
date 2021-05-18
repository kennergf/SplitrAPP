import React, { useState, setState } from 'react';
import { Text, View, Button, FlatList, TextInput } from 'react-native';
import * as SecureStorage from 'expo-secure-store';

import * as Constants from './constants';
import styles from './styles';

export default function summary() {
    const [label, onChangeLabel] = useState("Label");
    const [value, onChangeValue] = useState("");
    const [message, setMessage] = useState(null);

    async function addExpense(data) {
        setMessage("Adding expense!");
        let token = await SecureStorage.getItemAsync("JWT");
        token = token.replace("Splitr ", "");
        //console.log(token);
        
        // REF https://www.codota.com/code/javascript/functions/builtins/Headers/append
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", JSON.parse(token));

        await fetch(Constants.SERVER_URL + label + '/expense', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
        })
            .then((response) => response.text())
            .then((text) => {
                console.log(text);
                if (text === null || text === "") {
                    setMessage("Check the connection with the server!");
                } else {
                    setMessage(text);
                }
            })
            .catch((error) => {
                console.log("Error: " + error);
                setMessage(error.message);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} onChangeText={onChangeLabel} value={label}></TextInput>
            <TextInput style={styles.textInput} onChangeText={onChangeValue} value={value} keyboardType="numeric"></TextInput>
            <Button onPress={() => addExpense({ 'value': value })} title="Submit" />
            <Text>{message}</Text>
        </View>
    );
};