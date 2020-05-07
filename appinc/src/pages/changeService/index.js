import React, { Component } from 'react';

import { View, Text, TouchableOpacity, TextInput } from 'react-native';
import {
  Header,
  PickerItem
} from '../../globalComponents';

import Api from '../../services/api';

import styles from './styles';
import { InputText } from '../../components';

class ChangeService extends Component {
  state = {
    infopicker: [
      {
        name: 'Servidor - Policia Federal',
        value: 'http://35.198.17.69/api',
      },
    ],
    testeParam: '',
    inputSave: '',
  }

  change = (variavel) => {
    if (variavel) {
    Api.changeBaseURL(variavel);
    this.props.navigation.goBack();
    }
    else {
      Api.changeBaseURL('http://35.198.17.69/api');
      this.props.navigation.goBack();
    }
  }

  changeByInput = () => {
    const { inputSave } = this.state;
    Api.changeBaseURL(inputSave);
    this.props.navigation.goBack();
  }

  receiveParams = params => {
    console.log(params)
    this.setState({ testeParam: params });
  }

  render() {
    const { infopicker, testeParam, inputSave } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title="Trocar Servidor"
          showArrow
          goBack={this.props.navigation.goBack}
        />
        <View style={styles.mainView}>
          <Text style={styles.title}>
            Digite o servidor desejado:
          </Text>
          <TextInput
            style={styles.input}
            autoCapitalize="none"
            autoCorrect={false}
            placeholder={"Ex: http://35.198.17.69 "}
            maxLength={255}
            underlineColorAndroid="rgba(0,0,0,0)"
            onChangeText={inputSave => this.setState({ inputSave })}
            value={this.state.inputSave}
          />
          <Text style={styles.title}>
            Escolha um servidor:
          </Text>
          <View style={styles.picker}>
            <PickerItem
              receiveProps={(params => this.receiveParams(params))}
              arrayConfig={infopicker}
            />
          </View>
          { inputSave 
            ?
              <TouchableOpacity style={styles.button} onPress={() => this.changeByInput()}>
                <Text style={styles.textButton}>OK</Text>
              </TouchableOpacity>
            :
              <TouchableOpacity style={styles.button} onPress={() => this.change(testeParam)}>
                <Text style={styles.textButton}>OK</Text>
              </TouchableOpacity>
          }
        </View>
      </View>
    );
  }
}

export default ChangeService;
