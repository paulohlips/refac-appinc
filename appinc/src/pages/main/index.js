import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
  AsyncStorage,
  BackHandler
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import styles from "./styles";
import axios from "axios";
import { Header } from "../../globalComponents";
import { Sketch } from "../../components";
import { responsividade } from "../../styles";
import { connect } from "react-redux";

import {
  NavigationActions,
  withNavigation,
  StackActions
} from "react-navigation";
import { bindActionCreators } from "redux";
import { Creators as UserActions } from "../../store/ducks/login";

class Main extends Component {
  navigateToScreen = route => () => {
    const navigateAction = NavigationActions.navigate({
      routeName: route
    });
    this.props.navigation.dispatch(navigateAction);
  };

  static navigationOptions = {
    header: null
  };

  state = {
    nome: "",
    day: 0,
    drawerStatus: null
  };

  componentWillMount() {
    const { login, getExitLogin } = this.props;
    let days;
    const currentDate = new Date();
    const date = new Date(login.valtoken.replace(" ", "T"));

    const currentDay = currentDate.getDate();
    const currentMonth = currentDate.getMonth();

    const dateDay = date.getDate();
    const dateMonth = date.getMonth();

    if (dateMonth > currentMonth) {
      if (dateDay < currentDay) {
        days = 30 - currentDay + dateDay;
      } else {
        days = 30;
      }
    } else {
      days = dateDay - currentDay;
    }
    if (days <= 0) {
      getExitLogin();
      this.navigateToLogout();
    } else {
      this.setState({ day: days });
    }
  }

  navigateToLogout = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        // Logged
        NavigationActions.navigate({ routeName: "Login" })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  convertDate = starttime => {
    // Your default date object
    //var starttime = new Date();
    // Get the iso time (GMT 0 == UTC 0)
    var isotime = new Date(new Date(starttime).toISOString());
    var fixedtime = new Date(
      isotime.getTime() - starttime.getTimezoneOffset() * 60000
    );
    var formatedMysqlString = fixedtime
      .toISOString()
      .slice(0, 19)
      .replace("T", " ");
    console.log(formatedMysqlString);

    return formatedMysqlString;
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.navigateToLogin);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress");
  }

  openDrawer = () => {
    const { drawerStatus } = this.state;

    if (drawerStatus === true) {
    }
  };

  navigateToLogin = async () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [
        // Logged
        NavigationActions.navigate({ routeName: "Login" })
      ]
    });
    this.props.navigation.dispatch(resetAction);
  };

  render() {
    const { navigation, login } = this.props;
    const { nome, day } = this.state;
    const name = navigation.getParam("nome", "Nome não cadastrado");
    const { largura_tela } = responsividade;
    return (
      <View style={styles.container}>
        <Header
          showMenu
          showExit
          openMenu={navigation.toggleDrawer}
          title="Inicial"
        />

        <View style={styles.bodyS}>
          <View style={styles.tokenView}>
            <Text style={styles.token}>Token válido por </Text>
            <Text style={styles.tokenD}>{day}</Text>
            <Text style={styles.token}> dias</Text>
          </View>

          <View style={styles.info}>
            <View style={styles.profile}>
              <Image
                source={require("../../assents/imgs/avatar.png")}
                style={styles.ImageStyle}
              />
            </View>
            <View style={styles.name_view}>
              <Text style={styles.name}>{login.userName}</Text>
            </View>
          </View>
          <View style={styles.buttons_view}>
            <TouchableOpacity onPress={this.navigateToScreen("NewMenu")}>
              <View style={styles.button}>
                <Text style={styles.button_text}>NOVA PERÍCIA</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity onPress={this.navigateToScreen("Hist")}>
              <View style={styles.button}>
                <Text style={styles.button_text}>MINHAS PERÍCIAS</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  login: state.loginState
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UserActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Main);
