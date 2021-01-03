import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import styles from '../Styles/StylesGlobal';
import { Icon, Input } from 'native-base';
import { GiftedChat } from 'react-native-gifted-chat';
import { getName, Database, getUid } from '../Configs/Firebase';
// const { width, height } = Dimensions.get('window')

class Chat extends Component {
    static navigationOptions = navigation => {
        return {
            headerTitle: () => (
                <TouchableOpacity
                    style={{ flexDirection: 'row', alignContent: 'center' }}
                    onPress={() => navigation.navigation.goBack()}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: '100',
                            marginTop: 6,
                            marginRight: 5,
                        }}>
                        Chat{' '}
                    </Text>
                    <View
                        style={{
                            width: 35,
                            height: 35,
                            alignItems: 'center',
                            borderRadius: 25,
                            backgroundColor: '#3499eb',
                            marginRight: 5,
                        }}>
                        <Icon name="md-person" style={{ marginTop: 5 }} />
                    </View>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>
                        {navigation.navigation.state.params.data.name}
                    </Text>
                </TouchableOpacity>
            ),
        };
    };

    constructor(props) {
        super(props);
        this.state = {
            message: [],
            uid: this.props.navigation.state.params.data.uid,
            kode: this.props.navigation.state.params.kode,
        };
    }

    componentDidMount() {
        this.load();
    }

    load = async () => {
        console.log(this.state.kode);
        Database()
            .ref('Chat/' + this.state.kode + '/')
            .on('value', snap => {
                console.log(snap.hasChildren());
                let i = 0;
                this.setState({ message: [] })
                snap.forEach(e => {
                    let dt = [];
                    dt[0] = {
                        id: i,
                        _id: e.val()._id,
                        createdAt: JSON.parse(e.val().createdAt),
                        text: e.val().text,
                        user: e.val().user,
                    };
                    // console.log(dt);
                    this.setState(previousState => ({
                        message: GiftedChat.append(previousState.message, dt),
                    }));
                    i++;
                });
            });
    };

    onSend(messages = []) {
        const { kode } = this.state;
        this.setState(previousState => ({
            message: GiftedChat.append(previousState.message, messages),
        }));
        console.log(messages);

        Database()
            .ref('Chat/' + kode)
            .push({
                _id: messages[0]._id,
                createdAt: JSON.stringify(messages[0].createdAt),
                text: messages[0].text,
                user: messages[0].user,
            });
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <GiftedChat
                    messages={this.state.message}
                    onSend={mes => this.onSend(mes)}
                    user={{ _id: getUid(), name: getName() }}
                />
            </View>
        );
    }
}
export default Chat;
