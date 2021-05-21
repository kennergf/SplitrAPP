import React, { useState, setState } from 'react';
import { Text, View, Button, FlatList, TextInput } from 'react-native';
import * as SecureStorage from 'expo-secure-store';

import * as Variables from './variables';
import * as Constants from './constants';
import styles from './styles';

export default function summary() {
    const [label, onChangeLabel] = useState("");
    const [description, onChangeDescription] = useState("");
    const [value, onChangeValue] = useState("");
    const [message, setMessage] = useState(null);

    async function addExpense(data) {
        setMessage("Adding expense!");

        let token = await SecureStorage.getItemAsync(Constants.STORAGE_KEY);
        if (token === null) {
            setMessage("Please login to use the system!");
            return;
        }
        token = token.replace("Splitr ", "");
        //console.log(token);
        // REF https://www.codota.com/code/javascript/functions/builtins/Headers/append
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", JSON.parse(token));

        await fetch(Variables.SERVER_URL + label + '/expense', {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(data),
        })
            .then((response) => response.text())
            .then((text) => {
                //console.log(text);
                if (text.includes('error')) {
                    let json = JSON.parse(text);
                    setMessage("Status: " + json["status"] + " Message: " + json["error"]);
                } else {
                    setMessage(text);
                }
            }).catch((error) => {
                console.log("Error: " + error);
                setMessage("Error: " + error.message);
            });
    }

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.title}>Add Expenses</Text>
            </View>
            <View style={styles.content}>
                <Text>Label</Text>
                <TextInput style={styles.textInput} onChangeText={onChangeLabel} value={label}></TextInput>
                <Text>Description</Text>
                <TextInput style={styles.textInput} onChangeText={onChangeDescription} value={description}></TextInput>
                <Text>Value</Text>
                <TextInput style={styles.textInput} onChangeText={onChangeValue} value={value} keyboardType="numeric"></TextInput>
                <Text></Text>
                <Button onPress={() => addExpense({ 'description': description, 'value': value })} title="Submit" />
                <Text style={styles.message}>{message}</Text>
            </View>
        </View>
    );
};