import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
import Icon from 'react-native-vector-icons/MaterialIcons';
import {
  View,
  Text,
  TextInput,
  Image,
  TouchableOpacity,
  StatusBar,
  ImageBackground,
  Animated,
  Easing,
  AsyncStorage,
  Alert,
  BackHandler,
  ActivityIndicator
} from 'react-native';
import StepIndicator from 'react-native-step-indicator';

import { SnackBar, HeaderCadastro, ModalCheck, PickerItem, Header } from '../../globalComponents';

const imageCheck = require('../../assents/lottie/warning.json');

import styles from './styles';
import { red } from 'ansi-colors';
import Axios from 'axios';
import Api from '../../services/api';


const labels = ["ID", "PIN", "Senha"];
const customStyles = {
  stepIndicatorSize: 45,
  currentStepIndicatorSize: 45,
  separatorStrokeWidth: 2,
  currentStepStrokeWidth: 3,
  stepStrokeCurrentColor: 'rgb(225, 200, 133)',
  stepStrokeWidth: 3,
  stepStrokeFinishedColor: 'rgb(225, 200, 133)',
  stepStrokeUnFinishedColor: '#aaaaaa',
  separatorFinishedColor: 'rgb(225, 200, 133)',
  separatorUnFinishedColor: '#aaaaaa',
  stepIndicatorFinishedColor: 'rgb(225, 200, 133)',
  stepIndicatorUnFinishedColor: '#ffffff',
  stepIndicatorCurrentColor: '#ffffff',
  stepIndicatorLabelFontSize: 13,
  currentStepIndicatorLabelFontSize: 13,
  stepIndicatorLabelCurrentColor: 'rgb(225, 200, 133)',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: '#aaaaaa',
  labelColor: '#999999',
  labelSize: 13,
  currentStepLabelColor: 'rgb(225, 200, 133)',
}


class Login extends Component {
  static navigationOptions = {
    header: null,
  };

  state = {
    progress: new Animated.Value(0),
    inputSave: null,
    viewModal: false,
    messageRequest: '',
    load: false,
    cont: true,
  }

  componentWillMount() {
    BackHandler.removeEventListener('hardwareBackPress', this.navigateToLogin);
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateToLogin);
  }

  navigateToLogin = async () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        // Logged
        NavigationActions.navigate({ routeName: 'Login' }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  navigateToHash = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        // Logged
        NavigationActions.navigate({ routeName: 'Hash' }),
      ]
    });
    this.props.navigation.dispatch(resetAction);
  }

  confereID = async () => {
    const { inputSave } = this.state;
    const { navigation } = this.props;
    this.setState({ viewModal: false , load: true, cont: false });
    try {
      const response = await Api.user.postCadastroId({ matricula: inputSave })
      if (response.status === 200) {
        await AsyncStorage.setItem( "@IdRegistro", inputSave)
        navigation.navigate('Hash', { key: inputSave })
      } else {
        this.setState({ viewModal: true, messageRequest: response.data.mensagem, load: false, cont: true });
      }
    } catch {
      this.setState({ viewModal: true, messageRequest: response.data.mensagem });
    }
  }

  onPressAnimated = async () => {
    this.animation.play(30, 1000);
  }

  render() {
    const { viewModal, messageRequest, load, cont } = this.state;
    return (
      <View style={styles.container}>
        <Header
          title='Cadastro'
          showArrow
          goBack={this.navigateToLogin}
        />
        <StatusBar backgroundColor="rgba(45, 45, 45, 0.8)" />
        <View style={styles.mainContainer}>
          <View style={styles.icon}>
            <Icon name="fingerprint" size={60} color="#fff" style={styles.icon} />
          </View>
          <Text style={styles.descript}>Por favor digite seu ID</Text>
          <View style={styles.forms}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              placeholder="Digite seu ID "
              underlineColorAndroid="rgba(0,0,0,0)"
              onChangeText={inputSave => this.setState({ inputSave })}
              value={this.state.inputSave}
            />
            <TouchableOpacity style={styles.testebutton} onPress={() => { this.confereID(); }}>
              {
                cont && (
                  <Text style={styles.buttonText}>
                    Continuar
                </Text>
                )

              }

              {
                load && (
                  <ActivityIndicator size="small" color="rgb(225, 200, 133)" />
                )
              }
            </TouchableOpacity>

          </View>
        </View>
        <HideWithKeyboard>
          <View style={styles.indicadorContainer}>
            <StepIndicator
              customStyles={customStyles}
              currentPosition={this.state.currentPosition}
              labels={labels}
              stepCount={3}
            />
          </View>
        </HideWithKeyboard>
        {
          viewModal && (
            <SnackBar inside content={this.state.messageRequest} color="white" />
          )
        }
      </View>
    );
  }
  onPageChange(position) {
    this.setState({ currentPosition: position });
  }
}

export default Login;
