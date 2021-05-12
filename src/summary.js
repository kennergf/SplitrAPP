import React, { useState } from 'react';
import { Text, View, Button, FlatList, TextInput } from 'react-native';

import * as Constants from './constants';
import styles from './styles';

export default function summary() {
    const [text, onChangeText] = React.useState("Label");
    const [summary, setSummary] = useState(null);

    async function getSummary(label) {
        setSummary(null);
        await fetch(Constants.SERVER_URL + label + '/summary')
            .then((response) => response.json())
            .then((json) => {
                console.log(json);
                setSummary(json);
            })
            .catch((error) => { console.log(error); });
    }

    return (
        <View style={styles.container}>
            <TextInput style={styles.textInput} onChangeText={onChangeText} value={text}></TextInput>
            <Button onPress={() => getSummary(text)} title="Show Summary" />

            {summary === null ?
                <Text>No result found!</Text>
                :
                (<View>
                    <Text>{summary.label}</Text>
                    
                    <FlatList data={summary.expenses} keyExtractor={({ id }, index) => id} renderItem={({ item }) => (
                        <Text>{item.id + '. ' + item.value}</Text>
                    )} />
                </View>)
            }
        </View>
    );
};