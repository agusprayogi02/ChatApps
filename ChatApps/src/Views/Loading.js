import React, { Component } from 'react';
import { View, ActivityIndicator, Text } from 'react-native';
import styles from '../Styles/StylesGlobal';
import { Auth } from "../Configs/Firebase";
import { InitMessage, getUid } from "../Configs/Firebase";

class Loading extends Component {
  constructor(props) {
    super(props)
  }
  componentDidMount() {
    this.AuthLog()
  }

  AuthLog = () => {
    Auth().onAuthStateChanged(function (user) {
      if (user) {
        this.props.navigation.navigate('Home');
        InitMessage()
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
