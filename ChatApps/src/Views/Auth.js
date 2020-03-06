import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import styles from '../Styles/StylesGlobal';
import { Icon, Button, Card, Form, Item, Input } from "native-base";
import { TouchableOpacity } from "react-native";
import { Auth } from '../Configs/Firebase'
import { GoogleSignin, GoogleSigninButton, statusCodes } from '@react-native-community/google-signin';
import { firebase } from "@react-native-firebase/auth";

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

    // _signIn = async () => {
    //     try {
    //         await GoogleSignin.configure({
    //             // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
    //             webClientId: '722169027778-eatl1a7hv7jd0o1p3532jkb7sr1f8ku9.apps.googleusercontent.com',
    //             offlineAccess: true,
    //             hostedDomain: '',
    //             forceConsentPrompt: true, // required
    //         });
    //         const data = await GoogleSignin.signIn();
    //         const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.serverAuthCode);
    //         console.log(credential)
    //         await firebase.auth().signInWithCredential(credential);
    //     } catch (error) {
    //         console.log(error);
    //         if (error.code === statusCodes.SIGN_IN_CANCELLED) {
    //             console.log("cenceling ..");
    //             // user cancelled the login flow
    //         } else if (error.code === statusCodes.IN_PROGRESS) {
    //             console.log("In Progress");
    //             // operation (f.e. sign in) is in progress already
    //         } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
    //             console.log("Play Services");
    //             // play services not available or outdated
    //         } else {
    //             console.log("some other error happened");
    //             // some other error happened
    //         }
    //     }
    // }

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
                        {/* <GoogleSigninButton
                            style={{ width: "81%", height: 48, alignSelf: 'center' }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this._signIn} /> */}
                    </Form>
                </Card>
            </View>
        );
    }
}
export default SignIn;