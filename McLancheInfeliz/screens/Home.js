import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';

import { Button, Icon, Header, Body, Title } from 'native-base';
import PedidosRepository from '../repositories/Pedidos';
import PedidoView from '../components/PedidoView';
import store from '../redux/store';
//import PratosRepository from '../repositories/Pratos';

const pedidosApi = new PedidosRepository();

export default function HomeView(props) {
    const user = store.getState().data
    const [data, setData] = React.useState([]);

    const retrieveData = () => {
        pedidosApi.getAll(
            (results, error) => {
                if (error) {
                    alert('Ocorreu um erro inesperado!');
                    return;
                }
                const res = results.rows;
                if (res.status == 0) {
                    if (res.message == 'Validation Error.') {
                        alert(res.message + "\n" + res.data[0].msg)
                    }
                    else {
                        alert(res.message)
                    }
                    return;
                }
                else {
                    let data = [];
                    for (let i = 0; i < res.data.length; i++) {
                        if (res.data[i].status > 0) {
                            data.push({
                                id: i+1,
                                _id: res.data[i]._id,
                                mesa: res.data[i].mesa,
                                nomeCliente: res.data[i].nomeCliente,
                                status: res.data[i].status,
                                valor: res.data[i].valor,
                                createdAt: res.data[i].createdAt,
                            });
                        }
                    }
                    setData(data);
                }
            });
    };
    React.useEffect(() => {
        retrieveData();
    }, []);
    const styles = StyleSheet.create({
        header: {
            backgroundColor: '#DD2929',
            flexDirection: 'row'
        },
        headerBack: {
            justifyContent: 'center',
            marginRight: 15
        },
        headerIcon: {
            color: "#FFFFFF"
        },
        headerTittle: {
            color: "#ffffff",
            marginLeft: 2
        },
        headerSubTittle: {
            color: "#ffffff",
            fontWeight: "bold"
        },
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
        button: {
            height: 60,
            width: 60,
            backgroundColor: "#DD2929",
            color: "#FFDA00",
            justifyContent: 'center',
        },
        cadastroButtonContainer: {
            position: 'absolute',
            bottom: 25,
            right: 25,
        },
        cadastroIcon: {
            color: "#FFDA00"
        }
    });
    const renderPedido = ({ item }) => {
        const pedidoStyle = StyleSheet.create({
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
            },
            background: {
                backgroundColor: "#DD2929",
                color: "#FFDA00",
                justifyContent: 'center',
                padding: 0,
                marginLeft: 10,
                marginRight: 10,
                marginBottom: 5,
                marginTop: 5,
                borderRadius: 10,
            },
            delete: {
                flex: 7,
                position: 'absolute',
                bottom: 10,
                right: 10,
            },
            textContainer: {
                flex: 93,
            },
            icon: {
                color: "#DD2929"
            }
        })
        const deleteData = (id, _id) => {
            return pedidosApi.delete(
                { id: _id },
                (results, error) => {
                    if (error) {
                        alert('Ocorreu um erro inesperado!');
                        return;
                    }
                    const res = results.rows;
                    if (res.status == 0) {
                        if (res.message == 'Validation Error.') {
                            alert(res.message + "\n" + res.data[0].msg)
                        }
                        else {
                            alert(res.message)
                        }
                        return;
                    }
                    else {
                        alert('Pedido #' + id + ' deletado com sucesso')
                        retrieveData()
                    }
                },
                () => {
                    alert('deu algum erro patrão!')
                });
        };
        const navigateToPedido = (id) => {
            let pedido = data[id-1];
            const navigation = props.navigation;
            navigation.navigate('PedidoInfo', {
                id: pedido.id,
                token: pedido._id,
                mesa: pedido.mesa,
                nomeCliente: pedido.nomeCliente,
                pedido: pedido,
                user: user,
            });
        }
        return (
            <PedidoView
                id={item.id}
                _id={item._id}
                mesa={item.mesa}
                style={pedidoStyle}
                onPress={navigateToPedido}
                onPressDelete={deleteData}
            />);
    }

    return (
        <View style={styles.container}>
            <Header style={styles.header} androidStatusBarColor="#C60000">
                <TouchableOpacity
                    style={styles.headerBack}
                    onPress={
                        () => {
                            const navigation = props.navigation;
                            navigation.goBack();
                            navigation.replace('Login');
                            store.dispatch({type: 'LOGIN', data: null});
                        }
                    }>
                    <Icon type="FontAwesome" name="arrow-left" style={styles.headerIcon} />
                </TouchableOpacity>
                <Body>
                    <Title style={styles.headerTittle}>Mc lanche infeliz</Title>
                    <Text style={styles.headerSubTittle}> {user.name} </Text>
                </Body>

            </Header>
            <FlatList
                data={data}
                renderItem={renderPedido}
                keyExtractor={item => item.id}
            />
            <View
                style={styles.cadastroButtonContainer}>
                <Button
                    rounded
                    style={styles.button}
                    onPress={() => {
                        const navigation = props.navigation;
                        navigation.navigate('Cadastro');
                    }}>
                    <Icon type="FontAwesome" name="plus" style={styles.cadastroIcon} />
                </Button>
            </View>
        </View>
    );
}