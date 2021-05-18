import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { Text, View, Button, TextInput } from 'react-native';
import * as SecureStorage from 'expo-secure-store';

import * as Constants from './constants';
import styles from './styles';

export default function Login() {
    const [username, onChangeUsername] = useState("");
    const [password, onChangePassword] = useState("");
    const [message, setMessage] = useState(null);

    async function login(data) {
        setMessage("");

        // REF https://www.codota.com/code/javascript/functions/builtins/Headers/append
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        await fetch(Constants.SERVER_URL + 'login', {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
        })
            .then((response) => response.json())
            .then((text) => {
                let token = text["Authorization"];
                //console.log(token);
                SecureStorage.setItemAsync("JWT", JSON.stringify(token));
                if (text === null || text === "") {
                    setMessage("Check the connection with the server!");
                } else {
                    setMessage("Welcome " + data["username"]);
                }
            })
            .catch((error) => {
                console.log("Error: " + error);
                setMessage(error.message);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} onChangeText={onChangeUsername} value={username}></TextInput>
            <TextInput style={styles.textInput} onChangeText={onChangePassword} value={password} keyboardType="visible-password"></TextInput>
            <Button onPress={() => login({ "username": username, "password": password })} title="Login" />
            <Text>{message}</Text>
        </View>
    );
}