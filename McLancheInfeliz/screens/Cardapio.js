import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ToastAndroid,
    Modal,
} from 'react-native';

import { Icon, Header, Body, Title } from 'native-base';

export default function CardapioView(props) {
    const [modalVisible, setModalVisible] = React.useState(false)
    const [dados, setDados] = React.useState(null)
    const [data, setData] = React.useState(null)
    const [prato, setPrato] = React.useState({ id: 0, nome: "nome", quantidade: 0, preco_uni: 0.0, total: 0.0 })
    const [qtd, setQtd] = React.useState(1)
    const [total, setTotal] = React.useState(0.0)
    const navigation = props.navigation;
    //let data = props.route.params?.data;

    const lanches = [
        {
            id: '1',
            nome: 'Mec lanche infeliz',
            preco: 2.99
        },
        {
            id: '2',
            nome: 'Saladinha',
            preco: 1.99
        },
        {
            id: '3',
            nome: 'Nugget Borrachudo',
            preco: 0.99
        },
        {
            id: '4',
            nome: 'Fritas de chuchu',
            preco: 19.99,
        },
    ];
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
        modalBackground: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)'
        },
        modalContainer: {
            margin: 20,
            marginTop: '50%',
            minHeight: 50,
            backgroundColor: "#FFFFFF",

        },
        botoesView: {
            flexDirection: 'row',
            justifyContent: 'center',
            width: '100%',
            alignContent: 'center',
            margin: 5,
        },
        title: {
            width: '100%',
            justifyContent: 'center',
            textAlign: 'center',
            paddingBottom: 3,
            marginBottom: 10,
            fontSize: 24,
            backgroundColor: '#FFDA00',
            borderBottomWidth: 5,
            borderColor: '#DD2929'
            
        },
        boxx: {// uma caixa de estilo para os botoes confirma e cancela
            padding: 10,
            borderColor: '#0C5FF9',
            backgroundColor: "#0CF939",
            borderRadius: 10,
            margin: 5,
            fontSize: 18,

        },
        EDC: {// espaço do botão CANCELA
            padding: 10,
            borderColor: '#0C5FF9',
            margin: 5,
            backgroundColor: "#EF1537",
            borderRadius: 10,
            fontSize: 18,
        },
        MODALTEXT: { // estilos pros textos dentro do modal
            fontSize: 18,
            paddingBottom: 5,
        }
    });
    const enviarPrato = (prato) => {
        let newData = data
        let contain = false
        for (let i = 0; i < data.length; i++) {
            if (newData[i].id == prato.id) {
                newData[i].quantidade = prato.quantidade
                contain = true
            }
        }
        if (!contain) {
            newData.push({
                id: prato.id,
                nome: prato.nome,
                quantidade: prato.quantidade,
                preco_uni: prato.preco_uni
            })
        }
        navigation.push("Cadastro", { dados: dados, data: newData })
    }
    const refresh = () => {
        let data = props.route.params?.data
        let dados = props.route.params?.dados
        if (!data) {
            setData([])
        }
        else {
            setData(data)
        }
        if (dados) {
            setDados(dados)
        }
    }
    React.useEffect(() => {
        refresh();
    }, []);
    const Pedido = ({ id, nome, preco, style }) => (

        <TouchableOpacity
            style={{
                width: "95%",
                backgroundColor: "#DD2929",
                color: "#FFDA00",
                justifyContent: 'center',
                padding: 0,
                marginLeft: 10,
                marginBottom: 2,
                marginTop: 2,
                borderRadius: 10,
            }}
            onPress={
                () => {
                    let contain = false
                    let total = preco
                    let qtd = 1
                    setModalVisible(!modalVisible)

                    for (let i = 0; i < data.length; i++) {
                        if (data[i].id == id) {
                            setPrato({ id: id, nome: nome, quantidade: data[i].quantidade, preco_uni: preco })
                            contain = true
                            qtd = data[i].quantidade
                            total = data[i].quantidade * preco
                        }
                    }
                    if (!contain) {
                        setPrato({ id: id, nome: nome, quantidade: 1, preco_uni: preco})
                    }
                    setQtd(qtd)
                    setTotal(total)
                }
            }>
            <View style={style.view}>
                <View style={{ flex: 93 }}>
                    <Text style={style.text}>Nome: {nome}</Text>
                    <Text style={style.text}>Preço: {preco}</Text>
                </View>
            </View>

        </TouchableOpacity>
    );
    const renderPedido = ({ item }) => (
        <Pedido
            id={item.id}
            nome={item.nome}
            preco={item.preco}
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
                        width: "97%",
                        flexDirection: "row",
                        borderRadius: 10,
                    }
                }
            }
        />
    );
    return (
        <View style={styles.container}>
            <Header style={{ backgroundColor: '#DD2929', flexDirection: "row" }} androidStatusBarColor="#C60000">
                <Body style={{ flexDirection: "row" }}>
                    <TouchableOpacity
                        onPress={
                            () => {
                                const navigation = props.navigation;
                                navigation.push("Cadastro", { data: data, dados: dados });
                            }
                        }>
                        <Icon type="FontAwesome" name="arrow-left" style={{ color: "#FFFFFF" }} />
                    </TouchableOpacity>
                    <Title style={{ color: "#ffffff", paddingLeft: 20, }}>Cardapio</Title>
                </Body>
            </Header>
            <FlatList
                data={lanches}
                renderItem={renderPedido}
                keyExtractor={item => item.id}
            />

            <Modal
                animationType="fade"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}>
                <View style={StyleSheet.flatten([styles.container, styles.modalBackground])}>
                    <View style={styles.modalContainer}>
                        <Text style={styles.title}>{prato.nome}</Text>
                        <Text style={styles.MODALTEXT}>Preco unitario: {prato.preco_uni}</Text>
                        <Text style={styles.MODALTEXT}>Preco total: {total.toFixed(2)}</Text>
                        <View style={styles.botoesView}>
                            <TouchableOpacity
                                onPress={() => {
                                    let newPrato = prato
                                    newPrato.quantidade++
                                    setQtd(newPrato.quantidade)
                                    setPrato(newPrato)
                                    setTotal(newPrato.preco_uni * newPrato.quantidade)
                                }}>
                                <Icon type="FontAwesome" name="plus" style={{ color: "#000000", padding: 5, backgroundColor:"#09F8A1", }}/>
                            </TouchableOpacity>
                            <Text style={{paddingLeft: 10, paddingRight: 10, fontSize: 25, fontWeight: "bold", textAlignVertical: "center" }}>{qtd}</Text>
                            <TouchableOpacity
                                onPress={() => {
                                    if (qtd > 1) {
                                        let newPrato = prato
                                        newPrato.quantidade--
                                        setQtd(newPrato.quantidade)
                                        setPrato(newPrato)
                                        setTotal(newPrato.preco_uni * newPrato.quantidade)
                                    }

                                }}>
                                <Icon type="FontAwesome" name="minus" style={{ color: "#000000", padding:5, backgroundColor: "#3763DF", }} />
                            </TouchableOpacity>
                        </View>
                        <View style={styles.botoesView}>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                    enviarPrato(prato)
                                }}>
                                <Text style={styles.boxx}>Confirmar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => {
                                    setModalVisible(!modalVisible)
                                }}>
                                <Text style={styles.EDC} >Cancelar</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal>
        </View>
    );
}