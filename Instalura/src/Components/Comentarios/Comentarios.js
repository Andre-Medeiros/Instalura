import React, { Fragment, useState } from 'react';
import { Image, Text, TouchableOpacity, View, FlatList, TextInput } from 'react-native';
import estilo from './estilo';

const Comentarios = ({ comentarios, adicionarComentario }) => {

    const [estComentarios, setComentarios] = useState(comentarios);

    const comentar = () => {
        campoInput.clear();
        const novoComentario = adicionarComentario(
            conteudoCampoInput,
            "André")
        setComentarios([...estComentarios, novoComentario]);
    }

    let campoInput;
    let conteudoCampoInput = "";

    return (
        <Fragment>
            <FlatList
                data={estComentarios}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) =>
                <View style={estilo.inline}>
                    <Text>{item.userName} </Text>
                    <Text>{item.text}</Text>
                </View>
                }
            />
            <View style={estilo.inline}>
                <TextInput
                    ref={TextInput => campoInput = TextInput}
                    onChangeText={texto => conteudoCampoInput = texto}
                    placeholder={"Deixe seu comentario..."}
                    style={{ flex: 1 }} 
                />
                <TouchableOpacity onPress={adicionarComentario}>
                    <Image
                        source={require("../../../res/img/send.png")}
                        style={estilo.imgSend} 
                    />
                </TouchableOpacity>
            </View>
        </Fragment>
    );
};

export default Comentarios;