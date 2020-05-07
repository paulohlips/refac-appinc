import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  BackHandler,
} from "react-native";
import { Header } from "../../globalComponents";
import styles from "./styles";
import Api from '../../services/api';
import ListPops from './Screens/ListPops';
import DownloadPops from './Screens/DownloadPops';

class UpdatePops extends Component {
  state = {
    screen1: true,
  };

  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.handleBackButton);
  }

  async componentWillMount() {
    this.requestAllPops();
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.handleBackButton);
  }

  loading() {
    this.setState({ loading: false });
  }

  handleBackButton() {
    return true;
  }


  requestAllPops = async () => {
    try {
      const response = await Api.form.getAllPops();
      if (response.status === 200) {
        this.setState({ pops: response.data, popList: true, loading: false, errorview: true });
      } else {

      }
    } catch (error) {
      this.setState({ loading: false, errorview: true })
    }
  }

  renderPops = item => {
    if (item) {
      return (
        <TouchableOpacity
          style={styles.box}
          onPress={() => { }}
        >
          <View style={styles.row}>
            <Text style={styles.status}>Perícia {item.form_titulo} </Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.status1}>Num ID: {item.form_id}  |  Versão {item.form_version}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.status1}></Text>
          </View>
        </TouchableOpacity>

      );
    }
    return null;
  }

  toggleScreen = (screen) => {
    if (screen === 1)
      this.setState({ screen1: true });

    if (screen === 2)
      this.setState({ screen1: false });

  }

  renderTabMenu = () => {
    const { screen1 } = this.state;
    return (
      <View style={styles.tabMenu}>
        {
          screen1
            ? <TouchableOpacity
              onPress={() => this.toggleScreen(1)}
              style={{
                ...styles.tabButton1,
                borderBottomColor: '#f9aa33',
                borderBottomWidth: 3,
              }}
            >
              <Text>Baixar POP</Text>
            </TouchableOpacity>
            : <TouchableOpacity
              onPress={() => this.toggleScreen(1)}
              style={{
                ...styles.tabButton1,
              }}
            >
              <Text>Baixar POP</Text>
            </TouchableOpacity>
        }
        {
          !screen1
            ? <TouchableOpacity
              style={{
                ...styles.tabButton2,
                borderBottomColor: '#f9aa33',
                borderBottomWidth: 3,
              }}
              onPress={() => this.toggleScreen(2)}
            >
              <Text>Baixados</Text>
            </TouchableOpacity>
            : <TouchableOpacity
              style={{
                ...styles.tabButton2,
              }}
              onPress={() => this.toggleScreen(2)}
            >
              <Text>Baixados</Text>
            </TouchableOpacity>
        }
      </View>
    );
  }

  render() {
    const { screen1 } = this.state;
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <Header
          showMenu
          showClear
          openMenu={navigation.toggleDrawer}
          title="POPs Disponíveis"
        />
        <View style={styles.main}>
          {this.renderTabMenu()}
          {
            screen1
              ? <DownloadPops />
              : <ListPops />
          }
        </View> 
      </View>
    );
  }
}

export default (UpdatePops);

/*
  <ScrollView>
    {popList ? pops.map(item => this.renderPops(item)) : null}
  </ScrollView>
*/