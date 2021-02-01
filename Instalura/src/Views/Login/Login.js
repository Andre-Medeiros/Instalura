import AsyncStorage from '@react-native-community/async-storage';
import React, { Fragment, useEffect, useState } from 'react';
import { Button, Platform, Text, TextInput, View } from 'react-native';
import efetuarLogin from '../../api/login';

import estilo from './estilos';

const Login = ({ navigation }) => {

    const [usuario, setUsuario] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagenErro, setMensagenErro] = useState('');

    const tentarLogar = async () =>{
        try{
            const token = await efetuarLogin(usuario, senha);
            await AsyncStorage.setItem("instalura_token", token);

            navigation.replace("Feed", {nome : usuario});
            
        }catch(erro){
            setMensagenErro(erro.message)
        }
        
    }

  return (
    <Fragment>
        <View style={estilo.container}>
            <TextInput style={estilo.inputs} placeholder="Usuario" onChangeText={texto => setUsuario(texto)} />
            <TextInput style={estilo.inputs} placeholder="Senha" secureTextEntry={true} onChangeText={texto => setSenha(texto)} />
            <Text>{mensagenErro}</Text>
        </View>

        <View style={estilo.botaoView}>
            <Button title="Entrar" onPress={tentarLogar} />
        </View>
    </Fragment>
    
  )
};

Login.navigationOptions = () => {
    const opcoes = {
        title:'Login'
    }

    if (Platform.OS == 'android'){
        opcoes.header = null;
    }

    return opcoes;
}

export default Login;