import React, { useState } from 'react';
import { Text, View, Button, FlatList, TextInput, ScrollView } from 'react-native';
import * as SecureStorage from 'expo-secure-store';

import * as Variables from './variables';
import * as Constants from './constants';
import styles from './styles';

export default function summary() {
    const [text, onChangeText] = useState("");
    const [summary, setSummary] = useState(null);
    const [message, setMessage] = useState(null);

    // Make the web API request
    async function getSummary(label) {
        setSummary(null);
        setMessage("");

        let token = await SecureStorage.getItemAsync(Constants.STORAGE_KEY);
        if (token === null) {
            setMessage("Please login to use the system!");
            return;
        }
        token = token.replace("Splitr ", "");
        // REF https://www.codota.com/code/javascript/functions/builtins/Headers/append
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", JSON.parse(token));

        await fetch(Variables.SERVER_URL + label + '/summary', {
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

    // Render View
    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.title}>Summary</Text>
            </View>
            <View style={styles.content}>
                <Text>Label</Text>
                <TextInput style={styles.textInput} onChangeText={onChangeText} value={text}></TextInput>
                <Text></Text>
                <Button onPress={() => getSummary(text)} title="Show Summary" />

                {summary === null ?
                    <Text>No result found!</Text>
                    :
                    (<View>
                        <ScrollView keyboardShouldPersistTaps='always'>
                            <View style={styles.listItem}>
                                <Text>Label: {summary.label}</Text>
                                <View style={styles.item}>
                                    <Text>Status: {summary.active ? "Active" : "Inative"}</Text>
                                    <Text>Lowest Expense: {summary.lowestExpense.toString()}</Text>
                                    <Text>Highest Expense: {summary.highestExpense.toString()}</Text>
                                    <Text>Avarage Expense: {summary.avarageExpense.toString()}</Text>
                                    <Text>Number of Purchases: {summary.numberPurchases.toString()}</Text>
                                    <Text>Total: {summary.total.toString()}</Text>
                                </View>
                            </View>
                            <View style={styles.listItem}>
                                <Text>Value Paid per User</Text>
                                <FlatList data={summary.paidPerUser} keyExtractor={({ id }, index) => id} renderItem={({ item }) => (
                                    <View style={styles.item}>
                                        <Text>Username: {item.username}</Text>
                                        <Text>Value Paid: {item.value.toString()}</Text>
                                        <Text>Value to be Paid: {item.valueToBePaid.toString()}</Text>
                                        <Text>Value to be Received: {item.valueToBeReceived.toString()}</Text>
                                    </View>
                                )} />
                            </View>
                            <View style={styles.listItem}>
                                <Text>List of Expenses</Text>
                                <FlatList data={summary.expenses} keyExtractor={({ id }, index) => id.toString()} renderItem={({ item }) => (
                                    <View style={styles.item}>
                                        <Text>Username: {item.username}</Text>
                                        <Text>Description: {item.description}</Text>
                                        <Text>Value: {item.value.toString()}</Text>
                                </View>
                                )} />
                            </View>
                        </ScrollView>
                    </View>)
                }
                <Text style={styles.message}>{message}</Text>
            </View>
        </View>
    );
};