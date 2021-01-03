import React, { Component } from "react";
import {
    View,
    Text, TouchableOpacity
} from "react-native";
import styles from '../Styles/StylesGlobal';
import { Button, Icon, Card, Item } from 'native-base';
import { getName, Auth, Database, getUid } from '../Configs/Firebase'
import { YellowBox } from 'react-native';
import NavigationService from "../Configs/NavigationService";

class Utama extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <TouchableOpacity style={{ flexDirection: 'row', alignContent: 'center' }}
                onPress={() => navigation.navigate('Loading')}
            >
                <View style={{ width: 35, height: 35, alignItems: 'center', borderRadius: 25, backgroundColor: "#3499eb", marginRight: 10 }}>
                    <Icon name="md-person" style={{ marginTop: 5 }} />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{getName()}</Text>
            </TouchableOpacity>,
            headerRight: () => (
                <Button light style={{ marginRight: 5 }}
                    onPress={() => Auth().signOut()}>
                    <Icon name="exit" />
                </Button>
            ),
        }
    };

    constructor(props) {
        super(props)
        this.state = {
            data: []
        }
        YellowBox.ignoreWarnings(['Setting a timer']);
        this.listData()
    }

    listData = async () => {
        Database().ref('User/').on('value', snapshot => {
            console.log(snapshot.hasChildren());
            let i = 0, data = [];
            snapshot.forEach((e) => {
                var dt = e.val().userId;
                if (getUid() != dt) {
                    data[i] = {
                        key: i,
                        name: e.val().name,
                        uid: dt
                    };
                    i++;
                }
            });
            // console.log(data);
            this.setState({ data: data });
        })
    }

    onSelect(data) {
        const uid = data.uid
        let r = Math.random().toString(32).substring(2) + Math.random().toString(32).substring(2);
        Database().ref('Kode/Chat/' + getUid() + '/' + uid).once("value")
            .then((snap) => {
                if (snap.val() == null) {
                    Database().ref('Kode/Chat/' + getUid() + '/' + uid).push({
                        kode: r
                    })
                }
                let kode1 = null
                snap.forEach((e) => {
                    kode1 = e.val().kode
                })
                Database().ref("Kode/Chat/" + uid + '/' + getUid()).once("value")
                    .then((e) => {
                        if (e.val() == null) {
                            Database().ref("Kode/Chat/" + uid + '/' + getUid()).push({
                                kode: r
                            })
                        }
                        let kode2 = null
                        e.forEach((ef) => {
                            kode2 = ef.val().kode
                            // console.log(kode2);
                            // console.log(kode1);
                        })
                        if (kode1 == kode2) {
                            if (kode1 == null) {
                                kode1 = r
                            }
                            NavigationService.navigate('Chat', { data: data, kode: kode1 })
                        }
                    })
            })
            .catch((error) => { console.log("Error: " + error) })
    }

    render() {
        return (
            <View style={styles.contCenter}>
                <Card style={[styles.CardInput, { marginTop: 10, padding: 3, borderRadius: 3 }]}>
                    {this.state.data != null && this.state.data.map((e) =>
                        <Item key={e.key}>
                            <TouchableOpacity style={{ flexDirection: 'row', margin: 10, width: '100%' }}
                                onPress={() => this.onSelect(e)}
                            >
                                <View style={{ width: 40, height: 40, borderRadius: 25, backgroundColor: "#3499eb", marginRight: 15 }}>
                                    <Icon name="user" type="FontAwesome5" style={{ alignSelf: "center", marginLeft: 7, marginTop: 8 }} />
                                </View>
                                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{e.name}</Text>
                            </TouchableOpacity>
                        </Item>
                    )}
                </Card>
            </View>
        );
    }
}
export default Utama;
