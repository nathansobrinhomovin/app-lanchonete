import React, { Component } from 'react';
import {
  Button, StyleSheet, Text, ScrollView, TextInput, View, Keyboard, TouchableOpacity,
  ToastAndroid, InteractionManager, FlatList, Modal,
} from 'react-native';
import { Header, Icon, Body, Title } from 'native-base';
import PedidosRepository from '../repositories/Pedidos';
import PratosRepository from '../repositories/Pratos';

const pedidosRepository = new PedidosRepository();
const pratosRepository = new PratosRepository();

export default function CadastroView(props) {
  const navigation = props.navigation
  const [nome, onChangeNome] = React.useState(null);
  const [mesa, onChangeMesa] = React.useState(null);
  const [mesaCheck, onCheckMesa] = React.useState();
  const [data, onChangeData] = React.useState(null);

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
  const getMesaString = () => {
    if (mesa) {
      return "".concat(mesa)
    }
    return null
  }
  const refresh = () => {

    const newData = props.route.params?.data
    if (newData) {
      onChangeData(newData)
    }
    const newDados = props.route.params?.dados
    if (newDados) {
      onChangeNome(newDados.nome)
      onChangeMesa(newDados.mesa)
    }
    else {
      onChangeNome(null)
      onChangeMesa(null)
    }
  }
  React.useEffect(() => {
    refresh();
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
                navigation.replace('Home')
              }
            }>
            <Icon type="FontAwesome" name="arrow-left" style={{ color: "#FFFFFF" }} />
          </TouchableOpacity>
          <Title style={{ color: "#ffffff", paddingLeft: 20, }}>Cadastro</Title>
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
            value={getMesaString()}
            onChangeText={checkMesa}
            maxLength={20}
            onBlur={Keyboard.dismiss}
            keyboardType="numeric"
          />
          <TouchableOpacity style={styles.enviarButton}
            onPress={() => {
              const navigation = props.navigation;
              navigation.navigate('Cardapio', { data: data, dados: { nome: nome, mesa: mesa } });
            }}>
            <Text style={styles.enviarButtonText}>Lanches</Text>
          </TouchableOpacity>

          <View style={styles.B1}>
            <FlatList
              data={data}
              renderItem={({ item }) =>
                <View style={{ flexDirection: 'row', marginLeft: 10, marginRight: 10 }}>
                  <Text style={styles.text1}>
                    {item.nome}
                  </Text>
                  <Text style={styles.text2}>
                    {item.quantidade}
                  </Text>
                  <Text style={styles.text3}>
                    {item.preco_uni}
                  </Text>
                </View>

              }
              keyExtractor={item => item.id}
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

              pedidosRepository.Save({ mesa: mesa, cliente_nome: nome }, () => {
                //Informando que o cadastro foi feito com sucesso
                pedidosRepository.getMesa({ mesa }, (tx, results) => {
                  let pedido = results.rows.item(0);

                  pratosRepository.SaveAll(pedido, data, () => {
                    ToastAndroid.showWithGravity(
                      'Salvo com sucesso o prato '.concat(data[i].nome),
                      ToastAndroid.SHORT,
                      ToastAndroid.BOTTOM);
                  }, (e) => { alert('Erro durante o salvamento') })
                }
                )


                const navigation = props.navigation;
                navigation.replace('Home');
              }, (e) => {
                alert('Erro durante salvamento');
              });
            }}>
              <Text style={styles.enviarButtonText}>Enviar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>

  );
}

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
    height: 50,
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
  }
});