import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
} from 'react-native';

import { Button, Icon, Header, Body, Title } from 'native-base';
import PedidosRepository from '../repositories/Pedidos';
import PratosRepository from '../repositories/Pratos';

const repository = new PedidosRepository();

export default function HomeView(props) {
    const [data, setData] = React.useState([]);

    const retrieveData = () => {
        repository.Retrieve((tx, results) => {
            let data = [];
            for (let i = 0; i < results.rows.length; i++) {
                data.push(results.rows.item(i));
            }
            setData(data);
        });
    };

    const deleteData = (id, onSuccess) => {
        return repository.Delete({id}, onSuccess);
    };
    React.useEffect(() => {
        retrieveData();
    }, []);
    const styles = StyleSheet.create({
        safeArea: {
            flex: 1,
        },
        container: {
            flex: 1,
        },
        scrollView: {
            flex: 1,
        },
        content: {
            flex: 1,
        },
    });
    const Pedido = ({ id, mesa, style }) => (
        <TouchableOpacity
            style={{
                backgroundColor: "#DD2929",
                color: "#FFDA00",
                justifyContent: 'center',
                padding: 0,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 5,
                marginTop: 5,
                borderRadius: 10,
            }}
            onPress={
                () => {
                    const navigation = props.navigation;
                    navigation.navigate('PedidoInfo', {
                        id: id,
                    }
                    );
                }
            }>
            <View style={style.view}>
                <View style={{ flex: 93 }}>
                    <Text style={style.text}>Pedido #{id}</Text>
                    <Text style={style.text}>Mesa: {mesa}</Text>
                </View>
                <View style={{ flex: 7, position: 'absolute', bottom: 10, right: 10, }}>
                    <TouchableOpacity
                        onPress={
                            () => {
                                deleteData(id, () => {
                                    alert("Pedido #".concat(id).concat(" deletado com sucesso"))
                                    retrieveData();
                                })
                            }} >
                        <Icon type="FontAwesome" name="trash" style={{ color: "#DD2929" }}>


                        </Icon>
                    </TouchableOpacity>
                </View>
            </View>

        </TouchableOpacity>
    );
    const renderPedido = ({ item }) => (
        <Pedido
            id={item.id}
            mesa={item.mesa}
            style={
                {
                    text: {
                        color: "#000000",
                        fontWeight: "bold",
                        fontSize: 18,
                    },
                    view: {
                        backgroundColor: "#FFDA00",
                        padding: 10,
                        margin: 5,
                        flexDirection: "row",
                        borderRadius: 10,
                    }
                }
            }
        />
    );
    return (

        <View style={styles.container}>
            <Header style={{ backgroundColor: '#DD2929' }} androidStatusBarColor="#C60000">
                <Body>
                    <Title style={{ color: "#ffffff" }}>Mc lanche infeliz</Title>
                </Body>
            </Header>
            <FlatList
                data={data}
                renderItem={renderPedido}
                keyExtractor={item => item.id}
            />
            <View
                style={{
                    position: 'absolute',
                    bottom: 25,
                    right: 25,
                }}>
                <Button
                    rounded
                    style={{
                        height: 60,
                        width: 60,
                        backgroundColor: "#DD2929",
                        color: "#FFDA00",
                        justifyContent: 'center',
                    }}
                    onPress={() => {
                        const navigation = props.navigation;
                        navigation.navigate('Cadastro');
                    }}>
                    <Icon type="FontAwesome" name="plus" style={{ color: "#FFDA00" }} />
                </Button>
            </View>
        </View>
    );
}