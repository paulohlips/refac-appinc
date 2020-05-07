import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Camera from '../camera';
import CheckBall from '../check';
import styles from './styles';

export default class VeiculoTeste extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Camera />
                <CheckBall />
            </View>
        );
    }
}
