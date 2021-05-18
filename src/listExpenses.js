import React, { useState } from 'react';
import { Text, View, Button, FlatList, TextInput } from 'react-native';
import * as SecureStorage from 'expo-secure-store';

import * as Constants from './constants';
import styles from './styles';

export default function listExpenses() {
    const [text, onChangeText] = useState("Label");
    const [expenses, setExpenses] = useState([]);
    const [message, setMessage] = useState(null);

    // REF https://programmingwithmosh.com/react-native/make-api-calls-in-react-native-using-fetch/
    async function getExpenses(label) {
        setExpenses(null);
        setMessage("");

        let token = await SecureStorage.getItemAsync("JWT");
        token = token.replace("Splitr ", "");
        // REF https://www.codota.com/code/javascript/functions/builtins/Headers/append
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", JSON.parse(token));

        await fetch(Constants.SERVER_URL + label, {
            method: 'GET',
            headers: headers,
        })
            .then((response) => response.json())
            .then((json) => {
                if (json["error"] !== undefined) {
                    setMessage("Status: " + json["status"] + " Message: " + json["error"]);
                } else {
                    setExpenses(json);
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
                <Text style={styles.title}>List Expenses</Text>
            </View>
            <View style={styles.content}>
                <TextInput style={styles.textInput} onChangeText={onChangeText} value={text}></TextInput>
                <Button onPress={() => getExpenses(text)} title="List Expenses" />
                {expenses === null ?
                    <Text>No result found!</Text>
                    :
                    (<FlatList data={expenses} keyExtractor={({ id }, index) => id} renderItem={({ item }) => (
                        <Text>{item.username + '. ' + item.value}</Text>
                    )} />)
                }
                <Text style={styles.text}>{message}</Text>
            </View>
        </View >
    );
}
