import { firebase } from "firebase";
// import auth from '@react-native-firebase/auth';

const firebaseConfig = {
    apiKey: 'AIzaSyDVE58CiLBOyof8GIpsU7G3lqUtnyLSfkw',
    authDomain: 'chatapps-5a237.firebaseapp.com',
    databaseURL: 'https://chatapps-5a237.firebaseio.com',
    projectId: 'chatapps-5a237',
    storageBucket: 'chatapps-5a237.appspot.com',
    messagingSenderId: '722169027778',
    appId: '1:722169027778:web:6a9efc39b0b8f725d52f5b',
    measurementId: 'G-QBME0J80WS',
};

export const initApi = () => {
    return firebase.initializeApp(firebaseConfig)
}

export const getName = () => {
    return auth().currentUser.displayName
}

export const publicKey = (key) => {
    return firebase.messaging().usePublicVapidKey(key)
}

export const Auth = () => {
    return firebase.auth()
}
export const Database = () => {
    return firebase.database()
}