import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import styles from '../Styles/StylesGlobal';
import { Icon, Button, Card, Form, Item, Input } from "native-base";
import { TouchableOpacity } from "react-native";
import { Auth, Database, initApi } from "../Configs/Firebase";

class SignUp extends Component {
    constructor(props) {
        super(props);
        this.state = {
            password: true,
            icon: 'eye',
            pass: '',
            user: '',
            name: '',
            error: null,
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

    login = () => {
        this.props.navigation.navigate("SignIn")
    }

    createAcc = async () => {
        const { user, name, pass } = this.state
        Auth().createUserWithEmailAndPassword(user, pass)
            .then((e) => {
                var userN = e.user
                if (userN != null) {
                    userN.updateProfile({
                        displayName: name,
                    }).then((e) => {
                        console.log(e);
                    }).catch((error) => {
                        console.log("eror: ", error);
                    });
                    Database().ref('User/' + userN.uid).set({
                        userId: userN.uid,
                        name: name,
                        email: userN.email,
                    })
                        .then(() => {
                            this.props.navigation.navigate("Auth")
                        })
                }
            })
            .catch(a =>
                this.setState({ error: a.message })
            )

    }

    render() {
        return (
            <View style={styles.contCenter}>
                <Card style={styles.CardInput}>
                    {this.state.error != null && <Text style={{ color: 'red', alignSelf: 'center' }}>{this.state.error} </Text>}
                    <Form>
                        <Text style={styles.titHeader}>Create Account</Text>
                        <Item>
                            <Icon active name='md-person' />
                            <Input placeholder='Name ..' keyboardType="default" onChangeText={e => this.setState({ name: e, error: null })} />
                        </Item>
                        <Item style={{ marginTop: 15 }}>
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
                            <Text>have Account? </Text>
                            <TouchableOpacity onPress={this.login}>
                                <Text style={styles.underline}>SignIn</Text>
                            </TouchableOpacity>
                        </View>
                        <Button info block style={{ width: "80%", alignSelf: 'center', margin: 15 }} onPress={this.createAcc}>
                            <Text>Create Account</Text>
                        </Button>
                    </Form>
                </Card>
            </View>
        );
    }
}
export default SignUp;