import React, { useState } from 'react';
import { Text, View, Button, FlatList, TextInput, Alert } from 'react-native';
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

        await fetch(Constants.SERVER_URL + label, {
            method: 'GET',
            headers: headers,
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
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

    // REF https://medium.com/react-native-zone/english-react-native-beginner-alert-confirm-box-957a13e4157b
    function removeExpensePressed(label, expense) {
        Alert.alert(
            'Remove Expense',
            'Are you sure you whant to remove the expense below permanently \nId: ' + expense.id + '\nUsername: ' + expense.username + '\nValue: ' + expense.value,
            [
                { text: 'NO' },
                { text: 'YES', onPress: () => removeExpense(label, expense.id), style: 'cancel' }
            ]
        );
    }

    async function removeExpense(label, expenseId) {
        let token = await SecureStorage.getItemAsync(Constants.STORAGE_KEY);
        token = token.replace("Splitr ", "");
        // REF https://www.codota.com/code/javascript/functions/builtins/Headers/append
        var headers = new Headers();
        headers.append("Content-Type", "application/json");
        headers.append("Authorization", JSON.parse(token));

        await fetch(Constants.SERVER_URL + label + "/remove?expenseId=" + expenseId, {
            method: 'DELETE',
            headers: headers,
        })
            .then((response) => response.text())
            .then((text) => {
                console.log(text);
                if (text.includes('error')) {
                    let json = JSON.parse(text);
                    setMessage("Status: " + json["status"] + " Message: " + json["error"]);
                } else {
                    setMessage(text);
                    // Update the list of expenses
                    getExpenses(label);
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
                    (<FlatList data={expenses} keyExtractor={({ id }, index) => id.toString()} renderItem={({ item }) => (
                        <View>
                            <Text>{item.username + '. ' + item.value.toString()}</Text>
                            <Button onPress={() => removeExpensePressed(text, item)} title="Remove Expense"></Button>
                        </View>
                    )} />)
                }
                <Text style={styles.text}>{message}</Text>
            </View>
        </View >
    );
}
