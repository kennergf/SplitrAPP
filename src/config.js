import React, { useState, useEffect } from 'react';
import { Text, View, Button, TextInput } from 'react-native';

import * as Variables from './variables';
import styles from './styles';

export default function Config() {
    const [url, onChangeURL] = useState("");
    const [message, setMessage] = useState(null);

    useEffect(() => {
        onChangeURL(Variables.SERVER_URL);
    }, []);

    async function setServerURL(url) {
        setMessage("");
        Variables.SERVER_URL = url;
        setMessage("Server URL changed to " + Variables.SERVER_URL);
    }

    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.title}>Configuration</Text>
            </View>
            <View style={styles.content}>
                <Text>Server URL</Text>
                <TextInput style={styles.textInput} onChangeText={onChangeURL} value={url} ></TextInput>
                <Text></Text>
                <Button onPress={() => setServerURL(url)} title="Save Server URL" />
                <Text style={styles.message}>{message}</Text>
            </View>
        </View>
    )
}