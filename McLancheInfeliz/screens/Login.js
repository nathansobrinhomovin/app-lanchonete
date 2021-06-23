import React from 'react';
import {
    Image, StyleSheet, Text, View, TextInputAndroidProps,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity,
    Dimensions
} from 'react-native';
import store from '../redux/store';
import UsersRepository from '../repositories/User';

let usersRep = new UsersRepository();

export default function Teladeloguin(props) {
    const navigation = props.navigation;
    const [email, onChangeEmail] = React.useState(null);
    const [senha, onChangeSenha] = React.useState(null);

    React.useEffect(() => {
        if(store.getState().data != null) {
            onChangeEmail(data.email);
            onChangeSenha(data.senha);
            login();
        }
    })

    const login = () => {
        if (email == null) {
            alert('você não preencheu o email!')
            return;
        }
        if (senha == null) {
            alert('você não preencheu a senha!')
            return;
        }

        let user = {
            email: email,
            senha: senha
        }
        usersRep.login(
            user,
            (results, error) => {
                if(error) {
                    alert('ocorreu um erro inesperado no login!');
                    return;
                }
                const res = results.rows;
                if(res.status == 0) {
                    if(res.message == 'Validation Error.') {
                        alert(res.message + "\n" + res.data[0].msg)
                    }
                    else {
                        alert(res.message)
                    }
                    return;
                }
                else {
                    //TODO: faz td a parafernalha pra salvar no app os dados
                    
                    store.dispatch({type: 'LOGIN', data: res.data});
                    navigation.navigate('Home', {
                        user: res.data
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
            <Image
                style={styles.IM}
                source={require('../res/img/logo.png')} />
            <KeyboardAvoidingView style={styles.BOM}>
                <View>
                </View>
                <View >
                    <TextInput
                        style={styles.IN}
                        placeholder="Email"
                        autoCorrect={false}
                        onChangeText={onChangeEmail}
                    />
                </View>
                <View >
                    <TextInput
                        style={styles.IN}
                        secureTextEntry={true}
                        placeholder="Senha"
                        autoCorrect={false}
                        onChangeText={onChangeSenha}
                    />
                </View>
                <TouchableOpacity
                    style={styles.EDB}
                    onPress={() => {login()}}>
                    <Text style={styles.textView}>Logar</Text>
                </TouchableOpacity>
                <View style={styles.TudoAlinhado}>
                    <Text style={styles.TOU}>Precisando de uma conta?</Text>
                    <TouchableOpacity
                        style={styles.OTE}
                        onPress={() => {
                            navigation.navigate('Sigin');
                        }}>
                        <Text>Registrar-se</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
const margin = 100;
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
    Esqemail: { // estilo de  texto ali no <Text  esqueci email
        fontSize: 12, // tamanho da letra
        color: 'blue',
        textAlign: 'right',
        marginRight: 20,
        marginBottom: 8,
    },
    EsqeSenha: {// estilo do esqueci senha
        color: 'blue',
        fontSize: 12,
        textAlign: 'right',
        marginRight: 20,
        marginBottom: 8,
    },
    OTE: {// o texto de registro
        color: '#00bbff',
        marginBottom: 40,
        marginLeft: 200,
    },
    TudoAlinhado: {
        //flex: ,
        alignItems: 'flex-end',
    },
});