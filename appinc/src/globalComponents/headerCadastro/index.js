import React, { Component } from 'react';
import { View, Text, TouchableOpacity, StatusBar, AsyncStorage, Alert } from 'react-native';
import { withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Creators as GroupActions } from '../../store/ducks/group';
import { responsividade } from '../../styles';

class HeaderReduxCadastro extends Component {
  state = {
    showAlert: false,
    alertVisible: false,
  }

  openAlert = () => {
    this.setState({ showAlert: true, alertVisible: true })
  }

  closeAlert = () => {
    this.setState({ showAlert: false, alertVisible: false })
  }

  clearAsync = () => {
    AsyncStorage.clear();
  }

  render() {
    const {
      showClear,
      showModalInfo,
      showArrow,
      showMenu,
      showInfo,
      goBack,
      openMenu,
      title,
      startUpdateProgress,
      showProgress,
      saveStepState,
      form,
      activeFlag,
    } = this.props;
    const { showAlert } = this.state;
    const { largura_tela } = responsividade;

    return (
      <View style={styles.headerCadastro}>

        <StatusBar backgroundColor='#344955' barStyle="light-content" />
          <View style={styles.viewIcon}>
            {
              showMenu && (
                <TouchableOpacity onPress={() => openMenu()}>
                  <Icon name="md-menu" size={ largura_tela < 430 ? 28 : 40 } style={styles.iconMenu} />
                </TouchableOpacity>
              )
            }
            {
              showArrow && (
                <TouchableOpacity onPress={() => {
                    if(showProgress){
                      activeFlag();
                      startUpdateProgress();
                      saveStepState();                     
                    }
                    goBack();
                  }}
                >
                  <Icon name="md-arrow-back" size={ largura_tela < 430 ? 28 : 40 } style={styles.iconMenu} />
                </TouchableOpacity>
              )
            }
          </View>
            <View style={styles.viewTitle}>
              <Text style={styles.headerTitle}>
                {title}
              </Text>
            </View>
          <View>
            {
              showInfo ?
                <TouchableOpacity onPress={() => this.openInfo()}>
                  <Icon name="ios-information-circle-outline" size={28} style={styles.iconMenu} />
                </TouchableOpacity>
              : <View style={styles.concerto} />
            }
            {
              showClear && (
                <TouchableOpacity onPress={() => this.clearAsync()}>
                  <Icon name="md-trash" size={28} style={styles.iconMenu} />
                </TouchableOpacity>
              )
            }
            {
              showModalInfo && (
                <Info
                  closeModalInfo={this.closeInfo}
                  textInfo={info}
                />
              )
            }
            {
              showAlert && (
                <Alert
                  alertVisible
                  goBack={goBack}
                  closeModalAlert={this.closeAlert}
                />
              )
            }
          </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({...FormActions, ...GroupActions}, dispatch);

const Header = connect(mapStateToProps, mapDispatchToProps)(HeaderReduxCadastro)
export default withNavigation(HeaderCadastro);
