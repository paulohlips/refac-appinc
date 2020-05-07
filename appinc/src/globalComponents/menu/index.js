import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity, AsyncStorage } from 'react-native';
import { NavigationActions, withNavigation } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './style';
import { responsividade } from '../../styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as LoginActions } from '../../store/ducks/login';


const pathImage = '../../assents/imgs/avatar.png';
class MenuClass extends Component {
    state = {
        nome: '',
    }

    async componentWillMount() {
        const name = await AsyncStorage.getItem('@AppInc:nome');
        this.setState({
            nome: name
        });
   }

    navigateToScreen = (route, exit) => async () => {
        if (exit) {
            this.props.getExitLogin();
            await AsyncStorage.setItem('@infoUser', '');
        }
        const navigateAction = NavigationActions.navigate({
            routeName: route
        });
        this.props.navigation.dispatch(navigateAction);
    }

    render() {
        const { nome  } = this.state;
        const { largura_tela } = responsividade;
        const { login } = this.props;

        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={this.navigateToScreen('Main')}>
                    <View style={styles.profile}>
                        <Image source={require(pathImage)} style={styles.profileImage} />
                        <Text style={styles.profileName}>{login.userName}</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.buttonsView}>
                    <TouchableOpacity onPress={this.navigateToScreen('NewMenu')}>
                        <View style={styles.buttonBox}>
                            <Icon name="pencil" size={largura_tela < 430 ? 19 : 29} color="#fff" style={styles.icon} />
                            <Text style={styles.textButton}>Nova Perícia</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.navigateToScreen('Hist')}>
                        <View style={styles.buttonBox}>
                            <Icon name="history" size={largura_tela < 430 ? 19 : 29} color="#fff" style={styles.icon} />
                            <Text style={styles.textButton}>Minhas perícias</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.navigateToScreen('UpdatePops')}>
                        <View style={styles.buttonBox}>
                            <Icon name="download" size={largura_tela < 430 ? 19 : 29} color="#fff" style={styles.icon} />
                            <Text style={styles.textButton}>Baixar POPs</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <View style={styles.buttonBox}>
                            <Icon name="key-variant" size={largura_tela < 430 ? 19 : 29} color="#fff" style={styles.icon} />
                            <Text style={styles.textButton}>Renovar token</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={this.navigateToScreen('Login', true)}>
                        <View style={styles.buttonBox}>
                            <Icon name="exit-to-app" size={largura_tela < 430 ? 19 : 29} color="#fff" style={styles.icon} />
                            <Text style={styles.textButton}>Sair</Text>
                        </View>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => ({
    login: state.loginState,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators(LoginActions, dispatch);

const Menu = connect(mapStateToProps, mapDispatchToProps)(MenuClass)
export default withNavigation(Menu);