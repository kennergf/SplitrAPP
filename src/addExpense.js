import React, { useState, setState } from 'react';
import { Text, View, Button, FlatList, TextInput } from 'react-native';
//import { useForm } from 'react-hook-form';

import * as Constants from './constants';
import styles from './styles';

export default function summary() {
    //const { register, handleSubmit, error } = useForm;
    const [label, onChangeLabel] = useState("Label");
    const [value, onChangeValue] = useState("");
    const [summary, setSummary] = useState(null);

    async function addExpense(data) {
        //setSummary(null);
        console.log(data);
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Authorization", "application/json");

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify(data),
        };
        await fetch(Constants.SERVER_URL + label + '/expense', requestOptions)
            .then((response) => response.text())
            .then((json) => {
                console.log(json);
                //setSummary(json);
            })
            .catch((error) => { console.log("Error: " + error); });
    }

    return (
        <View style={styles.container}>

            <TextInput style={styles.textInput} onChangeText={onChangeLabel} value={label}></TextInput>
            <TextInput style={styles.textInput} onChangeText={onChangeValue} value={value} keyboardType="numeric"></TextInput>
            <Button onPress={() => addExpense({ 'value': value })} title="Submit" />

        </View>
    );
};