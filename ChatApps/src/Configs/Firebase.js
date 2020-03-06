import auth from '@react-native-firebase/auth';
import database from "@react-native-firebase/database";
import messaging from '@react-native-firebase/messaging';

export const getName = () => {
    return auth().currentUser.displayName
}

export const getUid = () => {
    return auth().currentUser.uid
}

export const InitMessage = async () => {
    await messaging().registerForRemoteNotifications()
    const granted = messaging().requestPermission()
    if (granted) {
        console.log('User granted messaging permissions!');
    } else {
        console.log('User declined messaging permissions :(');
    }
    const FCMtoken = await messaging().getToken()
    database().ref('User/' + getUid()).update({
        FCMtoken: FCMtoken
    })
}

export const Auth = () => {
    return auth()
}
export const Database = () => {
    return database()
}
