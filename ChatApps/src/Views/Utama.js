import React, { Component } from "react";
import {
    View,
    Text, TouchableOpacity
} from "react-native";
import styles from '../Styles/StylesGlobal';
import { Button, Icon, Card, Item } from 'native-base';
import { getName, Auth, Database } from '../Configs/Firebase'
import { YellowBox } from 'react-native';

class Utama extends Component {
    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: () => <View style={{ flexDirection: 'row', alignContent: 'center' }}>
                <View style={{ width: 35, height: 35, alignItems: 'center', borderRadius: 25, backgroundColor: "#3499eb", marginRight: 10 }}>
                    <Icon name="md-person" style={{ marginTop: 5 }} />
                </View>
                <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{getName()}</Text>
            </View>,
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
        const snapshot = await Database().ref('User/').once('value')
        // const data = snapshot.exportVal();
        let i = 0, data = []
        snapshot.forEach((e) => {
            var dt = e.val().name
            if (getName() != dt) {
                data[i] = {
                    key: i,
                    name: dt,
                    uid: e.val().userId
                }
                i++
            }
        })
        // console.log(data);
        this.setState({ data: data })
    }

    render() {
        return (
            <View style={styles.contCenter}>
                <Card style={[styles.CardInput, { marginTop: 10, padding: 3, borderRadius: 3 }]}>
                    {this.state.data != null && this.state.data.map((e) =>
                        <Item key={e.key}>
                            <TouchableOpacity style={{ flexDirection: 'row', margin: 10, width: '100%' }}>
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
