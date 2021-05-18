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
            .then((json) => {
                //console.log(json);
                if (json["error"] !== undefined) {
                    setMessage("Status: " + json["status"] + " Message: " + json["error"]);
                } else {
                    let token = json["Authorization"];
                    //console.log(token);
                    if (token === null || token === "" || token === undefined) {
                        setMessage("Check the connection with the server!");
                    } else {
                        SecureStorage.setItemAsync("JWT", JSON.stringify(token));
                        setMessage("Welcome " + data["username"]);
                    }
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
                <Text style={styles.title}>Login</Text>
            </View>
            <View style={styles.content}>
                <TextInput style={styles.textInput} onChangeText={onChangeUsername} value={username}></TextInput>
                <TextInput style={styles.textInput} onChangeText={onChangePassword} value={password} keyboardType="visible-password"></TextInput>
                <Button onPress={() => login({ "username": username, "password": password })} title="Login" />
                <Text style={styles.text}>{message}</Text>
            </View>
        </View>
    );
}