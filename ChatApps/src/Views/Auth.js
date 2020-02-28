import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import styles from '../Styles/StylesGlobal';
import { Icon, Button, Card, Form, Item, Input } from "native-base";
import { TouchableOpacity } from "react-native";
import { Auth } from '../Configs/Firebase'

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: true,
            icon: 'eye',
            user: '',
            pass: '',
            error: null,
            userInfo: null,
            loggedIn: null,
        }
    }

    visible = () => {
        let { password } = this.state;
        if (password) {
            this.setState({ icon: "ios-eye-off", password: false })
        } else {
            this.setState({ icon: "eye", password: true })
        }
    }

    create = () => {
        this.props.navigation.navigate("SignUp")
    }

    login = () => {
        const { user, pass } = this.state
        Auth().signInWithEmailAndPassword(user, pass)
            .catch((error) => { this.setState({ error: error.message }) })
    }

    render() {
        return (
            <View style={styles.contCenter}>
                <Card style={styles.CardInput}>
                    <Form>
                        {this.state.error != null && <Text style={{ color: 'red', alignSelf: 'center' }}>{this.state.error}</Text>}
                        <Text style={styles.titHeader}>Sign In</Text>
                        <Item>
                            <Icon active name='mail' />
                            <Input placeholder='Email ..' keyboardType="email-address" onChangeText={e => this.setState({ user: e, error: null })} />
                        </Item>
                        <Item style={{ marginTop: 15 }}>
                            <Icon active name='lock' />
                            <Input placeholder='Password ..' secureTextEntry={this.state.password} onChangeText={e => this.setState({ pass: e, error: null })} />
                            <TouchableOpacity onPress={this.visible}>
                                <Icon active name={this.state.icon} />
                            </TouchableOpacity>
                        </Item>
                        <View style={styles.txtMake}>
                            <Text>Don't have Account? </Text>
                            <TouchableOpacity onPress={this.create}>
                                <Text style={styles.underline}>Create</Text>
                            </TouchableOpacity>
                        </View>
                        <Button info block style={{ width: "80%", alignSelf: 'center', margin: 15 }} onPress={this.login}>
                            <Text>Sign In</Text>
                        </Button>
                    </Form>
                </Card>
            </View>
        );
    }
}
export default SignIn;