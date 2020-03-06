import React, { Component } from "react";
import {
    View,
    TextInput,
    StyleSheet,
    Button,
    Keyboard
} from "react-native";
import { GiftedChat } from 'react-native-gifted-chat'

class Send extends Component {

    constructor(props) {
        super(props)
        this.state = {
            text: null
        }
        this.submit = this.submit.bind(this)
    }

    submit() {
        this.props.submit(this.state.text)
        this.setState({
            text: ''
        })
        Keyboard.dismiss()
    }

    render() {
        return (
            <View style={styles.container}>
                <TextInput
                    editable={true}
                    placeholder="Typing .."
                    style={styles.input}
                    value={this.state.text}
                    onChangeText={(text) => this.setState({ text: text })}
                    onSubmitEditing={() => this.onSubmit()}
                    maxLength={40}
                />
                <Button
                    title="SEND"
                    style={styles.btn}
                    onPress={this.submit}
                />
            </View>
        );
    }
}
export default Send;

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        margin: 10,
        marginHorizontal: 10
    },
    input: {
        width: '80%',
        backgroundColor: "#eaeaea",
        borderWidth: 1,
        borderColor: 'black',
        height: 40,
        paddingHorizontal: 10
    },
    btn: {
        marginLeft: 10,
    }
});