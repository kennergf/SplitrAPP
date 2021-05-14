import React, { useState } from 'react';
import { Text, View, Button, FlatList, TextInput } from 'react-native';

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

        await fetch(Constants.SERVER_URL + label)
            .then((response) => response.json())
            .then((json) => { setExpenses(json); })
            .catch((error) => {
                console.log("Error: " + error);
                setMessage(error.message);
            });
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} onChangeText={onChangeText} value={text}></TextInput>
            <Button onPress={() => getExpenses(text)} title="List Expenses" />
            {expenses === null ?
                <Text>No result found!</Text>
                :
                (<FlatList data={expenses} keyExtractor={({ id }, index) => id} renderItem={({ item }) => (
                    <Text>{item.id + '. ' + item.value}</Text>
                )} />)
            }
            <Text>{message}</Text>
        </View>
    );
}
