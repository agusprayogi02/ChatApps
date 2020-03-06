import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Utama from './src/Views/Utama';
import Chat from './src/Views/Chat';
import SignIn from './src/Views/Auth';
import Loading from './src/Views/Loading';
import SignUp from './src/Views/SignUp';
import NavigationService from "./src/Configs/NavigationService";

const Home = createStackNavigator({
    Utama: { screen: Utama },
    Chat: { screen: Chat }
}, {
    initialRouteName: 'Utama'
});

const auth = createStackNavigator({
    SignIn: { screen: SignIn }, SignUp: { screen: SignUp }
}, {
    initialRouteName: "SignIn"
})

const screen = createSwitchNavigator({
    Loading: Loading,
    Home: Home,
    Auth: auth,
}, {
    initialRouteName: 'Loading'
})

const Navigation = createAppContainer(screen);

export default class App extends React.Component {
    render() {
        return (
            <Navigation
                ref={navigatorRef => {
                    NavigationService.setTopLevelNavigator(navigatorRef)
                }}
            />
        )
    }
}

