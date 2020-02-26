import React, { Component } from "react";
import {
    View,
    Text
} from "react-native";
import styles from '../Styles/StylesGlobal';
import firebase from 'firebase'
import { Button, Icon } from 'native-base';

class Utama extends Component {
    static navigationOptions = {
        headerRight: () => (
            <Button light style={{ marginRight: 5 }}
                onPress={() => firebase.auth().signOut()}>
                <Icon name="exit" />
            </Button>
        ),
    };

    render() {
        return (
            <View style={styles.container}>
                <Text>{firebase.auth().currentUser.displayName}</Text>
            </View>
        );
    }
}
export default Utama;
