
import { Header, Icon, Body, Title, List } from 'native-base';
import React from 'react';
import {
    View, flatList, StyleSheet, Color, LogBox, SafeAreaView,
    FlexAlignType, Keyboard,
    flex, FlatList, FontSize, TouchableOpacity, Text,
    ScrollView, TeladeCima, ViewBase, alignItems, TextInput
} from 'react-native';
import PedidosRepository from '../repositories/Pedidos';
import PratosRepository from '../repositories/Pratos';

import { Navigator } from '@react-navigation/native';

const pedidosRepository = new PedidosRepository();
const pratosRepository = new PratosRepository();

export default function pedidoInfoView(props) {
    const [pedido, setPedido] = React.useState({ id: 0, nome: 'nulo', mesa: 0 })
    const [data, setData] = React.useState([])
    const [nome, onChangeNome] = React.useState(null);
    const [mesa, onChangeMesa] = React.useState(null);
    const [mesaCheck, onCheckMesa] = React.useState();
    /*const data = [
        { id: 1, nome: 'Guarana', preco_uni: 3.00, quantidade: 3 },
        { id: 2, nome: '___', preco_uni: 3.50, quantidade: 10 },
        { id: 3, nome: 'Dominic', preco_uni: 2.90, quantidade: 5 },
        { id: 4, nome: 'Jackson', preco_uni: 1.90, quantidade: 2 },
        { id: 5, nome: 'James', preco_uni: 2.50, quantidade: 1 },
        { id: 6, nome: 'Joel', preco_uni: 4.90, quantidade: 4 },
    ]*/
    const styles = StyleSheet.create({
        container: {
            flex: 1,
            paddingTop: 0,
            backgroundColor: '#F5FCFF',
        },
        header: {
            fontSize: 25,
            textAlign: 'center',
            margin: 10,
            fontWeight: 'bold'
        },
        inputContainer: {
            paddingTop: 15,
            flex: 1,
        },
        textInput: {
            borderRadius: 5,
            borderColor: '#DD2929',
            backgroundColor: '#FFDA00',
            borderWidth: 3,
            minHeight: 50,
            fontSize: 25,
            margin: 5,
            paddingLeft: 20,
            paddingRight: 20
        },
        enviarButton: {
            borderRadius: 5,
            backgroundColor: '#DD2929',
            padding: 15,
            margin: 5
        },
        enviarButtonText: {
            color: '#FFFFFF',
            fontSize: 20,
            textAlign: 'center'
        },
        text1: {
            width: '70%',
            color: "#000000",
            fontSize: 18
        },
        text2: {
            width: '15%',
            color: "#000000",
            textAlign: 'center',
            fontSize: 18
        },
        text3: {
            width: '15%',
            color: "#000000",
            textAlign: 'right',
            fontSize: 18,
        },
        B1: { // B1 = Bloco 1 para criar bloco
            padding: 5,
            marginTop: 10,
            marginLeft: 5,
            marginRight: 5,
            minHeight: 10,
            borderStyle: 'solid',
            borderWidth: 4,
            borderColor: '#DD2929',
        },
        B2: {
            paddingBottom: 5,
            paddingLeft: 5,
            paddingRight: 5,
            marginLeft: 5,
            marginRight: 5,
            minHeight: 10,
            borderStyle: 'solid',
            borderWidth: 4,
            borderColor: '#DD2929',
        },
    }); // tem q ter esses pontos aki
    const checkMesa = (mesa) => {
        onChangeMesa(mesa)
        pedidosRepository.getMesa({ mesa }, (tx, results) => {
            if (results.rows.length > 0) {
                onCheckMesa(false)
            }
            else {
                onCheckMesa(true)
            }
        });
    };

    const totalQtd = () => {
        let qtd = 0;
        if (data != null) {
            for (let i = 0; i < data.length; i++) {
                qtd += data[i].quantidade;
            }
        }
        return qtd
    }

    const totalPreco = () => {
        let total = 0.0;
        if (data != null) {
            for (let i = 0; i < data.length; i++) {
                total += (data[i].preco_uni * data[i].quantidade);
            }
        }
        return total
    }
    const retrieveData = () => {
        let _id = props.route.params?.id
        if (_id) {
            pedidosRepository.getOne({ id: _id }, (tx, results) => {
                let pedido = results.rows.item(0);
                setPedido(pedido)
                onChangeNome(pedido.cliente_nome)
                checkMesa(pedido.mesa)
            });
            pratosRepository.getByPedido({ id: _id }, (tx, results) => {
                let data = [];
                for (let i = 0; i < results.rows.length; i++) {
                    data.push(results.rows.item(i));
                }
                setData(data);
            });
        }
        else if (dados) { }
    };
    React.useEffect(() => {
        retrieveData();
    }, []);
    return (
        <View style={styles.container}>
            <Header style={{ backgroundColor: '#DD2929', flexDirection: "row" }} androidStatusBarColor="#C60000">
                <Body style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={
                            () => {
                                const navigation = props.navigation;
                                navigation.goBack();
                            }
                        }>
                        <Icon type="FontAwesome" name="arrow-left" style={{ color: "#FFFFFF" }} />
                    </TouchableOpacity>
                    <Title style={{ color: "#ffffff", paddingLeft: 20, }}>Pedido #{pedido.id}</Title>
                </Body>
            </Header>
            <View style={[styles.container, { flexDirection: 'column' }]}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.textInput}
                        placeholder="Nome"
                        value={nome}
                        onChangeText={onChangeNome}
                        maxLength={20}
                        onBlur={Keyboard.dismiss}
                    />
                    <TextInput
                        style={styles.textInput}
                        placeholder="Mesa"
                        value={"".concat(mesa)}
                        onChangeText={checkMesa}
                        maxLength={20}
                        onBlur={Keyboard.dismiss}
                        keyboardType="numeric"
                    />
                    <Text style={[styles.text1, {paddingLeft: 10, paddingTop: 10, fontWeight: "bold"}]}>Lanches:</Text>

                    <View style={styles.B1}>
                        <FlatList
                            data={data}
                            renderItem={({ item }) =>
                                <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
                                    <Text style={styles.text1}>
                                        {item.prato_nome}
                                    </Text>
                                    <Text style={styles.text2}>
                                        {item.quantidade}
                                    </Text>
                                    <Text style={styles.text3}>
                                        {item.preco_uni.toFixed(2)}
                                    </Text>
                                </View>

                            }
                        />
                    </View>
                    <View style={styles.B2}>
                        <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
                            <Text style={styles.text1}>
                                Total
                        </Text>
                            <Text style={styles.text2}>
                                {totalQtd()}
                            </Text>
                            <Text style={styles.text3}>
                                {totalPreco().toFixed(2)}
                            </Text>
                        </View>
                    </View>


                    <View style={{ width: "100%", flex: 1, position: 'absolute', bottom: 10 }}>
                        <TouchableOpacity style={styles.enviarButton} onPress={() => {
                            if (nome == null) {
                                alert('Cadastro invalido! É necessario preencher o nome');
                                return
                            }
                            if (mesa == null) {
                                alert('Cadastro invalido! É necessario preencher a mesa');
                                return
                            }
                            if (!mesaCheck) {
                                alert('Mesa ocupada no momento')
                                return
                            }
                            if (data == null) {
                                alert('Nenhum lanche foi selecionado!')
                                return
                            }

                            pedidosRepository.Update({ id: pedido.id, mesa: mesa, cliente_nome: nome }, () => {
                                //Informando que o cadastro foi feito com sucesso
                                const navigation = props.navigation;
                                navigation.replace('Home');
                            }, (e) => {
                                alert('Erro durante salvamento');
                            });
                        }}>
                            <Text style={styles.enviarButtonText}>Atualizar dados</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    );
};
