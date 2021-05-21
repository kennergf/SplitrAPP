import React, { useState } from 'react';
import { Text, View, Button } from 'react-native';
import * as SecureStorage from 'expo-secure-store';

import * as Constants from './constants';
import styles from './styles';

export default function Logout() {
    const [message, setMessage] = useState(null);

    // Remove JWT
    async function logout() {
        setMessage("Loging out!");
        SecureStorage.deleteItemAsync(Constants.STORAGE_KEY);
        setMessage("Thank you for use our service!")
    }

    // Render View
    return (
        <View style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.title}>Logout</Text>
            </View>
            <View style={styles.content}>
                <Button onPress={() => logout()} title="Logout" />
                <Text style={styles.message}>{message}</Text>
            </View>
        </View>
    )
}