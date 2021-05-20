import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import * as SecureStorage from 'expo-secure-store';

import * as Constants from './constants';
import styles from './styles';

export default function Signup() {
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    const [message, setMessage] = useState(null);

    async function signup(data) {
        setMessage("");

        // REF https://www.codota.com/code/javascript/functions/builtins/Headers/append
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        await fetch(Constants.SERVER_URL + 'signup', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
        })
            .then((response) => response.text())
            .then((text) => {
                //console.log(json);
                if (text.includes('error')) {
                    let json = JSON.parse(text);
                    setMessage("Status: " + json["status"] + " Message: " + json["error"]);
                } else {
                    setMessage(text);
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
                <Text style={styles.title}>Sign Up</Text>
            </View>
            <View style={styles.content}>
                <TextInput style={styles.textInput} onChangeText={onChangeUsername} value={username}></TextInput>
                <TextInput style={styles.textInput} onChangeText={onChangePassword} value={password} keyboardType="visible-password"></TextInput>
                <Button onPress={() => signup({ "username": username, "password": password, "role": "USER" })} title="Sign Up" />
                <Text style={styles.text}>{message}</Text>
            </View>
        </View>
    );
}