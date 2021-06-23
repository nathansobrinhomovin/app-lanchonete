import * as React from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity
} from 'react-native';

import { Icon } from 'native-base';

export default function pedidoView({ id, _id, mesa, style, onPressDelete, onPress }) {
    const styles = StyleSheet.create({
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
    return (
        <TouchableOpacity
            style={styles.background}
            onPress={
                () => {
                    onPress(id);
                }
            }>
            <View style={styles.view}>
                <View style={styles.textContainer}>
                    <Text style={styles.text}>Pedido #{id}</Text>
                    <Text style={styles.text}>Mesa: {mesa}</Text>
                </View>
                <View style={styles.delete}>
                    <TouchableOpacity
                        onPress={
                            () => {
                                onPressDelete(id, _id)
                            }} >
                        <Icon type="FontAwesome" name="trash" style={styles.icon}/>
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableOpacity>
    );
}