import React from 'react';
import {
    Image, StyleSheet, Text, View, TextInputAndroidProps,
    TextInput,
    KeyboardAvoidingView,
    TouchableOpacity, marginBotton, Button, Alert,
    onPress, title,
} from 'react-native';
import { Header, Icon, Body, Title } from 'native-base';
import UsersRepository from '../repositories/User';
import store from '../redux/store';

let usersRep = new UsersRepository();

export default function TeladeConfirm(props) {
    const [codigo, onChangeCodigo] = React.useState(null);
    const email = props.route.params?.email;
    const navigation = props.navigation;
    const confirm = () => {
        if (codigo == null) {
            alert('você não preencheu o campo codigo!')
            return;
        }
        let code = {
            code: codigo,
            email: email,
        }
        usersRep.confirm(
            code,
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
                    store.dispatch({type: 'LOGIN', data: res.data});
                    navigation.navigate('Home', {
                        name: res.data.firstName
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
                    <Title style={{ color: "#ffffff", paddingLeft: 20, }}>Confirmar E-mail</Title>
                </Body>
            </Header>
            <KeyboardAvoidingView style={styles.BOM}>
                <View>
                    <Text style={{margin: 10, padding: 10, fontSize: 20}}>Enviamos um codigo para o seu email insira aqui para confirmar.</Text>
                </View>
                <View >
                    <TextInput
                        style={styles.IN}
                        placeholder="codigo de verificação"
                        autoCorrect={false}
                        onChangeText={onChangeCodigo}
                    />
                </View>
                <View style={styles.EDB} >
                    <TouchableOpacity
                        onPress={() => {confirm()}
                        }>
                            <Text style={{textAlign:'center'}}>Confirmar</Text>
                    </TouchableOpacity>
                </View>
            </KeyboardAvoidingView>
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        //  backgroundColor: '#00fbff',
        // alignItems: 'center',
        // justifyContent: 'center',
    },
    IN: { // estilo do input
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
        marginTop: 50,
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
});