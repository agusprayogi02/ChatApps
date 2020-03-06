import React, { Component } from "react";
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Platform
} from "react-native";
import styles from '../Styles/StylesGlobal';
import { Icon, Input } from "native-base";
import { GiftedChat } from 'react-native-gifted-chat'
import { getName, Database, getUid } from '../Configs/Firebase'
// const { width, height } = Dimensions.get('window')

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

    constructor(props) {
        super(props)
        this.state = {
            message: [],
            uid: this.props.navigation.state.params.data.uid
        }
        Database().ref('Chats/' + this.props.navigation.state.params.data.kode).once("value")
            .then((e) => {
                e.forEach((d) => {

                })
            })
    }

    onSend(messages = []) {
        this.setState(previousState => ({
            message: GiftedChat.append(previousState.message, messages),
        }))
        console.log(this.state.message);

    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <GiftedChat
                    messages={this.state.message}
                    onSend={mes => this.onSend(mes)}
                    user={{ _id: getUid() }}
                />
            </View>
        );
    }
}
export default Chat;