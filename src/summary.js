import React, { useState } from 'react';
import { Text, View, Button, FlatList, TextInput } from 'react-native';
import * as SecureStorage from 'expo-secure-store';

import * as Constants from './constants';
import styles from './styles';

export default function summary() {
    const [text, onChangeText] = useState("Label");
    const [summary, setSummary] = useState(null);
    const [message, setMessage] = useState(null);

    async function getSummary(label) {
        setSummary(null);
        setMessage("");

        let token = await SecureStorage.getItemAsync("JWT");
        token = token.replace("Splitr ", "");
        // REF https://www.codota.com/code/javascript/functions/builtins/Headers/append
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", JSON.parse(token));

        await fetch(Constants.SERVER_URL + label + '/summary', {
            method: 'GET',
            headers: headers,
        })
            .then((response) => response.json())
            .then((json) => {
                if (json["error"] !== undefined) {
                    setMessage("Status: " + json["status"] + " Message: " + json["error"]);
                } else {
                    console.log(json);
                    setSummary(json);
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
                <Text style={styles.title}>Summary</Text>
            </View>
            <View style={styles.content}>
                <TextInput style={styles.textInput} onChangeText={onChangeText} value={text}></TextInput>
                <Button onPress={() => getSummary(text)} title="Show Summary" />

                {summary === null ?
                    <Text>No result found!</Text>
                    :
                    (<View>
                        <Text>{summary.label}</Text>

                        <FlatList data={summary.expenses} keyExtractor={({ id }, index) => id} renderItem={({ item }) => (
                            <Text>{item.username + '. ' + item.value}</Text>
                        )} />
                    </View>)
                }
                <Text style={styles.text}>{message}</Text>
            </View>
        </View>
    );
};