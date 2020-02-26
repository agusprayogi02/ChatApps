import React, { Component } from "react";
import {
    View,
    Text,
} from "react-native";
import styles from '../Styles/StylesGlobal';
import { Icon, Button, Card, Form, Item, Input } from "native-base";
import { TouchableOpacity } from "react-native";
import { GoogleSignin, GoogleSigninButton, statusCodes } from 'react-native-google-signin';
import firebase from 'firebase'

class Auth extends Component {
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

    componentDidMount() {
        GoogleSignin.configure({
            webClientId: '722169027778-gp3itu7pvshk2dakne9mn5g23crmo7no.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
            offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
            hostedDomain: '', // specifies a hosted domain restriction
            loginHint: '', // [iOS] The user's ID, or email address, to be prefilled in the authentication UI if possible. [See docs here](https://developers.google.com/identity/sign-in/ios/api/interface_g_i_d_sign_in.html#a0a68c7504c31ab0b728432565f6e33fd)
            forceConsentPrompt: true,
        });
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
        firebase.auth().signInWithEmailAndPassword(user, pass)
            .catch((error) => { this.setState({ error: error.message }) })
    }

    withGoogle = async () => {
        try {
            // await GoogleSignin.configure()
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            this.setState({ userInfo: userInfo, loggedIn: true });
            console.log(userInfo);
            // create a new firebase credential with the token
            const credential = firebase.auth.GoogleAuthProvider.credential(userInfo.idToken, userInfo.accessToken)
            console.log(credential);
            // login with credential
            const firebaseUserCredential = await firebase.auth().signInWithCredential(credential);
            console.warn(JSON.stringify(firebaseUserCredential.user.toJSON()));

        } catch (error) {
            console.log(error)
            if (error.code === statusCodes.SIGN_IN_CANCELLED) {
                // user cancelled the login flow
            } else if (error.code === statusCodes.IN_PROGRESS) {
                // operation (f.e. sign in) is in progress already
            } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                // play services not available or outdated
            } else {
                // some other error happened
            }
        }
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
                        <GoogleSigninButton
                            style={{ width: "80%", alignSelf: "center" }}
                            size={GoogleSigninButton.Size.Wide}
                            color={GoogleSigninButton.Color.Dark}
                            onPress={this.withGoogle}
                        />
                    </Form>
                </Card>
            </View>
        );
    }
}
export default Auth;