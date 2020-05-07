import React, { Component } from 'react';
import { StackActions, NavigationActions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import HideWithKeyboard from 'react-native-hide-with-keyboard';
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
import Axios from 'axios';
import Api from '../../services/api';

import { SnackBar, HeaderCadastro, ModalCheck, PickerItem, Header } from '../../globalComponents';

const imageCheck = require('../../assents/lottie/warning.json');
const imageCheck2 = require('../../assents/lottie/check.json');

import styles from './styles';

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
    currentPosition: 2,
    idRegistro: null,
    pinRegistro: null,
    inputSave1: null,
    inputSave2: null,
    id: null,
    viewModals: false,
    messageRequest: '',
    load: false,
    cont: true,
  }

  async componentWillMount() {
    const idRegistro = await AsyncStorage.getItem('@IdRegistro');
    this.setState({ idRegistro: idRegistro });
    const pinRegistro = await AsyncStorage.getItem('@PinRegistro');
    this.setState({ pinRegistro: pinRegistro });
    const id = await AsyncStorage.getItem('@IdProv');
    this.setState({ id: id });
  }

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.navigateToEmail);
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


  salvarId = async () => {
    const { id, idRegistro, pinRegistro, inputSave1, inputSave2 , load , cont} = this.state;
    this.setState({ viewModal: false ,load: true, cont: false });

    if (inputSave1 == inputSave2) {
      try {
        const response = await Api.user.createPassword({ matricula: idRegistro, pin: pinRegistro, pass: inputSave2 });
        if (response.status === 200) {
          this.setState({ viewModals: true })
        } else {
          Alert.alert(response.data.mensagem);
          this.setState({load: false , cont : true })
        }
      } catch {
        this.setState({ viewModal: true, load: false, cont: true, messageRequest: 'Erro de conexão' });
      }
    } else {
      this.setState({ viewModal: true, load: false, cont: true, messageRequest: 'Senhas diferentes' });
    }

    if (id) {
      AsyncStorage.setItem('@Id', id);
    }
  }

  closeModal = () => {
    this.props.navigation.navigate('Password');
  }

  onPressAnimated = async () => {
    this.animation.play(30, 1000);
  }

  render() {
    const { viewModal, messageRequest, viewModals , load , cont } = this.state;
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
            <Icon name="vpn-key" size={60} color="#fff" style={styles.icon} />
          </View>

          <Text style={styles.descript}>Escolha uma senha</Text>
          <View style={styles.forms}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Senha"
              secureTextEntry={true}
              underlineColorAndroid="rgba(0,0,0,0)"
              onChangeText={inputSave1 => this.setState({ inputSave1 })}
              value={this.state.inputSave1}
            />
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Senha"
              secureTextEntry={true}
              underlineColorAndroid="rgba(0,0,0,0)"
              onChangeText={inputSave2 => this.setState({ inputSave2 })}
              value={this.state.inputSave2}
            />

            <TouchableOpacity style={styles.testebutton} onPress={() => { this.salvarId(); }}>
            {
                cont && (
                  <Text style={styles.buttonText}>
                    Cadastrar
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
          viewModals && (
            <ModalCheck
              message={messageRequest}
              viewModal
              success
              sourceImage={imageCheck2}
            />
          )
        }
        {
          viewModal && (
            <SnackBar inside content={this.state.messageRequest} color="white" fontcolor="grey" />
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
