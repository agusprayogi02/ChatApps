import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions
} from "react-native";
import styles from '../Styles/StylesGlobal';
import { Icon, Input } from "native-base";
const { width, height } = Dimensions.get('window')

class Chat extends Component {
    static navigationOptions = (navigation) => {
        return {
            headerTitle: () => <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center' }}
                onPress={() => navigation.navigation.goBack()}
            >
                <Text style={{ fontSize: 18, fontWeight: '100', marginTop: 6, marginRight: 5 }}>Chat </Text>
                <View style={{ width: 35, height: 35, alignItems: 'center', borderRadius: 25, backgroundColor: "#3499eb", marginRight: 5 }}>
                    <Icon name="md-person" style={{ marginTop: 5 }} />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{navigation.navigation.state.params.data.name}</Text>
            </TouchableOpacity>
        }
    }
    render() {
        return (
            <View style={styles.contCenter}>
                <Input placeholder="hai" style={{ ...StyleSheet.absoluteFill, marginTop: height - 120, width: width }} />
            </View>
        );
    }
}
export default Chat;