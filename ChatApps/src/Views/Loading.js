import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styles from '../Styles/StylesGlobal';
import firebase from "firebase";

class Loading extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.AuthLog()
  }

  AuthLog = () => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        this.props.navigation.navigate('Home');
      } else {
        this.props.navigation.navigate('Auth')
      }
    }.bind(this));
  }

  render() {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="blue" />
        <Text> Loading ..</Text>
      </View>
    );
  }
}
export default Loading;
