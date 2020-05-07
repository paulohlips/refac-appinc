import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
  TouchableOpacity,
  ScrollView,
  AsyncStorage,
  TextInput,
  Animated,
  BackHandler,
} from 'react-native';
import { StackActions, NavigationActions } from 'react-navigation';
import { Header, ModalCheck, PickerItem } from '../../globalComponents';
import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as NewActions } from '../../store/ducks/new';
import { Creators as FormActios } from '../../store/ducks/form';


const imageCheck = require('../../assents/lottie/warning.json');

class New extends Component {
  static navigationOptions = {
    title: 'Nova Pericia',
  }

  state = {
    errorInput: false,
    tipo: null,
    subtipo: null,
    ssubtipo: null,
    form: null,
    formQuerry: null,
    classe: null,
    incrementar: 2,
    contador: [1],
    showRef: false,
    fadeAnim: new Animated.Value(0),
    fadeAnim_l: new Animated.Value(0),
    fadeAnim_s: new Animated.Value(0),
    fadeAnim_ref: new Animated.Value(0),
    showButton: null,
    baseUrl: '',
    resposta: null,
    escolha: null,
    showAlert: false,
    viewModal: false,
    messageRequest: 'Sem conexão',
    viewError: false,
    infopicker: [],
  }

  async componentDidMount() {
    const { login } = this.props;
    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    let array = [];
    try{
      const response = await AsyncStorage.getItem(`${login.userID}-arrayKeys`);      
      const keyPops = JSON.parse(response); 

      for (let i = 0; i < keyPops.length; i++) {
        const popJSON = await AsyncStorage.getItem(keyPops[i]);
        const pop = JSON.parse(popJSON);
        array = [
          ...array,
          {
            value: pop,
            name: pop.form_titulo,
          }         
        ] 
      }
    } catch(err) {
      console.log('errorNEW', err);
    }
    this.setState({ infopicker: array });
  }

  async componentWillMount() {
    const valueForm = await AsyncStorage.getItem('@Form');
    const formLocal = JSON.parse(valueForm);
    this.setState({ form: formLocal });
    const valueQuerry = await AsyncStorage.getItem('@Querry');
    const formQuerryLocal = JSON.parse(valueQuerry);
    this.setState({ formQuerry: formQuerryLocal });
    this.incrementarFuncao();
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
  }

  handleBackButton() {
    return true;
  }

  onPressButton = async () => {
    const { navigation, getReference, resetEditForm } = this.props;
    const { inputSave, errorInput } = this.state;
    let err = false;

    const arrayRef = await AsyncStorage.getItem('arrayRef');
    const refs = JSON.parse(arrayRef);

    if(arrayRef !== null) {
      refs.map(async item => {
        if (item === inputSave) {
          err = true;
          this.setState({ errorInput: true });
        }
      })
    }
   

    if (err) {
    } else {
      if (inputSave) {
        getReference(this.state.inputSave);
        resetEditForm();
        navigation.navigate('StepList', { inputSave: this.state.inputSave });
      } else {
        getReference('LaudosemNome');
        resetEditForm();
        navigation.navigate('StepList');
      }
    }
  }

  reqUrl = (value) => {
    const { getNewRequest, getNewSucsses } = this.props;
    getNewSucsses(value);

    this.setState({ showRef: true, showButton: true });
    Animated.timing(                  // Animate over time
      this.state.fadeAnim_ref,            // The animated value to drive
      {
        toValue: 1,                   // Animate to opacity: 1 (opaque)
        duration: 2000,              // Make it take a while
      }
    ).start();
  }

  closeModal = () => {
    this.setState({ showRef: false });
    this.props.closeModalError();
  };

  closeModalErr = () => {
    this.setState({ errorInput: false });
  }

  receiveParams = params => {
    this.setState({ testeParam: params, baseUrl: params });
    this.reqUrl(params)
  }

  render() {
    const {
      showRef,
      fadeAnim_ref,
      viewError,
      messageRequest,
      infopicker,
      errorInput,
      showButton
    } = this.state;
    const { navigation, newState } = this.props;
    return (
      <View style={styles.container}>
        <Header
          title='Nova Perícia'
          showMenu
          openMenu={navigation.toggleDrawer}
        />
        <ScrollView contentContainerStyle={styles.scrollview}>
          {
            viewError && (
              <View style={styles.message}>
                <Text style={styles.messageError}>Sem conexão</Text>
              </View>
            )
          }
          <View style={styles.forms1}>
            <View style={styles.title}>
              <View style={styles.ball}>
                <Text style={styles.numberType}>1</Text>
              </View>
              <Text style={styles.textType}> Perícia: </Text>
            </View> 
            <View style={styles.Picker}>
              {
                infopicker.length !== 0 && (
                  <PickerItem
                    receiveProps={(params => this.receiveParams(params))}
                    arrayConfig={infopicker}
                  />
                ) 
              } 

              {
                infopicker.length == 0 && (
                  
                  <View style = {styles.preView}> 
                    <Text>AInda não há POPs baixados. Para iniciar uma perícia, baixe os formulários
                      no atalho "Baixar POPs", que pode ser acessado pelo menu lateral.
                    </Text>
                  </View>  
                  
                )
              }             
            </View>
          </View>

          {
            showRef && (
              <Animated.View
                style={{ ...this.props.style, opacity: fadeAnim_ref }}>
                {this.props.children}
                <View style={styles.forms}>
                  <View style={styles.title}>
                    <View style={styles.ball}><Text style={styles.numberType}> 2 </Text></View>
                    <Text style={styles.textType}> Referência: </Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    autoCapitalize="words"
                    maxLength={72}
                    underlineColorAndroid="rgba(0,0,0,0)"
                    onChangeText={inputSave => this.setState({ inputSave })}
                  />
                </View>
              </Animated.View>
            )
          }
          {
            showButton && (
              <TouchableOpacity style={styles.button} onPress={() => this.onPressButton()}>
                <Text style={styles.buttonText}>
                  CONTINUAR
              </Text>
              </TouchableOpacity>
            )
          }
          {
            newState.erro && (
              <ModalCheck
                message={messageRequest}
                viewModal
                failure
                sourceImage={imageCheck}
                onClose={this.closeModal}
              />
            )
          }
          {
            errorInput && (
              <ModalCheck
                message={'Ja existe uma perícia com essa refêrencia'}
                viewModal={errorInput}
                failure
                sourceImage={imageCheck}
                onClose={this.closeModalErr}
              />
            )
          }
        </ScrollView>
      </View>

    );
  }
}

const mapStateToProps = state => ({
  newState: state.newState,
  login: state.loginState
});

const mapDispatchToProps = dispatch => bindActionCreators({
  ...NewActions,
  ...FormActios
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(New);