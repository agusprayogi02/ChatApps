import React, { Component } from "react";
import {
    View,
    Text
} from "react-native";
import styles from '../Styles/StylesGlobal';
import firebase from 'firebase'
import { Button, Icon, Card } from 'native-base';
import { getName } from '../Configs/Firebase'
import { YellowBox } from 'react-native';

class Utama extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <View style={{ width: 35, height: 35, alignItems: 'center', borderRadius: 25, backgroundColor: "#3499eb", marginRight: 10 }}>
                    <Icon name="md-person" />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{getName()}</Text>
            </View>,
            headerRight: () => (
                <Button light style={{ marginRight: 5 }}
                    onPress={() => firebase.auth().signOut()}>
                    <Icon name="exit" />
                </Button>
            ),
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            displayName: null
        }
        YellowBox.ignoreWarnings(['Setting a timer']);
    }

    componentDidMount() {
        var name = firebase.auth().currentUser.displayName
        this.setState({ displayName: name })
    }

    render() {
        return (
            <View style={styles.contCenter}>
                <Card style={[styles.CardInput, { marginTop: 10 }]}>
                    <Text>Hais</Text>
                </Card>
            </View>
        );
    }
}
export default Utama;
