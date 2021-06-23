import React from 'react';
import {
    StyleSheet, Text, View,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Dimensions,
} from 'react-native';

import { Icon, Header, Body, Title } from 'native-base';

import UsersRepository from '../repositories/User';

let usersRep = new UsersRepository();

export default function TeladeSiguin(props) {
    const navigation = props.navigation;
    const [firstName, onChangeFirstName] = React.useState(null);
    const [lastName, onChangeLastName] = React.useState(null);
    const [email, onChangeEmail] = React.useState(null);
    const [senha, onChangeSenha] = React.useState(null);
    const sigin = () => {
        if (firstName == null) {
            alert('você não preencheu o campo nome!')
            return;
        }
        if (lastName == null) {
            alert('você não preencheu o campo sobrenome!')
            return;
        }
        if (email == null) {
            alert('você não preencheu o email!')
            return;
        }
        if (senha == null) {
            alert('você não preencheu a senha!')
            return;
        }

        const user = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            senha: senha,
        }
        usersRep.sigin(
            user,
            (results, error) => {
                if (error) {
                    alert('ocorreu um erro inesperado!');
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
                    navigation.navigate('Confirm', {
                        email: user.email
                    });
                }
            },
            () => {
                alert('deu algum erro patrão!')
            }
        )
    }
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
                    <Title style={{ color: "#ffffff", paddingLeft: 20, }}>Registrar-se</Title>
                </Body>
            </Header>
            <KeyboardAvoidingView style={styles.BOM}>
                <View>
                </View>
                <View >
                    <TextInput
                        style={styles.IN}
                        placeholder="Nome"
                        autoCorrect={false}
                        onChangeText={onChangeFirstName}
                    />
                </View>
                <View >
                    <TextInput
                        style={styles.IN}
                        placeholder="Sobrenome"
                        autoCorrect={false}
                        onChangeText={onChangeLastName}
                    />
                    <TextInput
                        style={styles.IN}
                        placeholder="Email"
                        autoCorrect={false}
                        onChangeText={onChangeEmail}
                    />
                    <TextInput
                        style={styles.IN}
                        placeholder="Senha"
                        autoCorrect={false}
                        onChangeText={onChangeSenha}
                    />
                </View>
                <TouchableOpacity
                    style={styles.EDB}
                    onPress={() => { sigin() }}>
                    <Text style={{ textAlign: "center" }}>Cadastrar</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    );
}
const margin = 80;
const altura = (Dimensions.get('window').width - margin) * (200 / 200);
const largura = Dimensions.get('window').width - margin;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  backgroundColor: '#00fbff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    BOM: {
        // backgroundColor: '#FFA07A',
        //   flex: 1,
        //   AlignItems: 'center',
        //   justifyContente: 'center',
    },
    IN: {// aqui onde estiliza os input
        backgroundColor: '#FFF',
        //  AlignItems: 'center',
        // height: 200,
        borderColor: '#73748c',
        borderStyle: "solid",
        borderWidth: 1,
        marginTop: 10,
        marginLeft: 15,
        marginRight: 15,
        padding: 5,
    },
    EDB: { // estilo dos botões
        borderWidth: 2,
        borderRadius: 7,
        backgroundColor: "#ffdA00", // cor Amarelo
        textAlign: 'center',
        borderColor: "#dd2929", // vermelho
        margin: 10,
        marginLeft: 15,
        marginRight: 15,
        padding: 8,
    },
    textView: {
        textAlign: 'center',
    },
    TOU: {// centralizar o Text Precisando de uma conta
        marginTop: 10,
    },
    IM: {// estilo pra  coloca imagem la em cima
        height: altura,
        width: largura,
        alignSelf: "center",
    },
    OTE: {// o texto de registro
        color: '#00bbff',
        borderWidth: 2,
        borderRadius: 7,
        width: 50,
        borderColor: "#dd2929", // vermelho
        padding: 6,
        marginBottom: 20,
        backgroundColor: 'yellow',
    },
});

/*
function TeladeLoguin () {
    if("Email" =='Rafael@gmail.com' && "Senha" =='1234'){
        onPress = () => {
       const Teladeloguin =() =>{
           const navigation = props.navigation;
            navigation.replace('Home');
        }
    }
   };
*/