import React, { Component } from "react";
import {
  View,
  AsyncStorage,
  Text,
  ScrollView,
  TouchableOpacity
} from "react-native";
import { connect } from 'react-redux';
import styles from "./styles";

import Api from '../../../../services/api';
import { PickerItem } from '../../../../globalComponents';


class DownloadPops extends Component {
  state = {
    area: [],   
    classe: [],
    subclasse: [],
    areaId: null,
    classeId: null,
    subclasseId: null,
    allPops: [],
    viewPops: [],
    keysOfArray: []
  };

  async componentDidMount() {
    const { login } = this.props;
    try {
      const response = await Api.form.getHierarchyPops();
      
      this.setState({ hierarchy: response.data })
    } catch (error) {
      console.log(error)
    }

    try {
      const response = await Api.form.getAllPops();
     
      this.setState({ allPops: response.data })
    } catch (error) {
      console.log(error)
    }

    let array = [];
    this.state.hierarchy.area.map(item => {
      array = [
        ...array,
        {
          name: item.nome_area,
          value: item,
        }
      ]
    })
    this.setState({ area: array });

    const arrayKeys = await AsyncStorage.getItem(`${login.userID}-arrayKeys`);
    
    if(arrayKeys !== null) {
      const keys = JSON.parse(arrayKeys);
      this.setState({ keysOfArray: keys })
    }
    
  }

  makeArrayClasse = async area => {
    await this.setState({ classe: [], subclasse: [] });
    
    let array = []; 
    area.classe.map(item => {
      array = [
        ...array,
        {
          name: item.nome_classe,
          value: item,
        }
      ]
    })
   
    this.setState({ classe: array, areaId: area.id });
  }

  makeArraySubClasse = async classe => {
    await this.setState({ subclasse: [] });
    let array = [];
    classe.subclasse.map(item => {
      array = [
        ...array,
        {
          name: item.nome_subclasse,
          value: item.id,
        }
      ]
    })
    this.setState({ subclasse: array, classeId: classe.id });
  }

  filterPops = subclasse => {
    const {
      areaId,
      classeId,
      subclasseId,
      allPops
     } = this.state;

     let array = [];
     
    allPops.map(item => {
      if(item.area == areaId && item.classe == classeId && item.subclasse == subclasse) {
        array = [
          ...array,
          item
        ]
      }      
    })

    this.setState({ viewPops: array })
  }

  rederItem = (item) => {
    const { keysOfArray } = this.state;
    var equal = false;

    keysOfArray.map(key => {
      if(key === item.form_name) {
        equal = true;
      }
    })

    return (
      <TouchableOpacity 
        style={styles.card} 
        onPress={() => (equal ? {} : this.setFormOffline(item))}
        activeOpacity={equal ? 1 : 0.5}
      >
        {
          equal &&
            <Text style={styles.baixado}>
              Baixado
            </Text>
        }
        <Text style={styles.title}>{item.form_titulo}</Text>
        <Text style={styles.version}>versão: {item.form_version}</Text>
      </TouchableOpacity>
    )
}

  setFormOffline = async (item) => {
    const { login } = this.props;
    const { keysOfArray } = this.state;
    var arrayKeys = await AsyncStorage.getItem(`${login.userID}-arrayKeys`);
    this.setState({ 
      keysOfArray:[
        ...keysOfArray,
        item.form_name
      ] 
    });

    try{
      const resp = await Api.form.getNewForm(item.form_id);

      if(arrayKeys === null) {
        const array = []
        
        await AsyncStorage.setItem(item.form_name, JSON.stringify(resp.data));
        array.push(item.form_name);

        await AsyncStorage.setItem(`${login.userID}-arrayKeys`, JSON.stringify(array));
      } else {
        const array = JSON.parse(arrayKeys);

        await AsyncStorage.setItem(item.form_name, JSON.stringify(resp.data));
        array.push(item.form_name);
        await AsyncStorage.setItem(`${login.userID}-arrayKeys`, JSON.stringify(array));
      }
    } catch(err) {
      console.log('error', err)
    }
  }

  render() {
    const { area, classe, subclasse, viewPops } = this.state;
    const { login } = this.props;
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          {
            area.length !== 0 && (
              <View style={styles.picker}>
                <PickerItem
                  receiveProps={(params => this.makeArrayClasse(params))}
                  arrayConfig={area}
                />
              </View>
            )
          }
          {
            classe.length !== 0 && (
              <View style={styles.picker}>
                <PickerItem
                  receiveProps={(params => this.makeArraySubClasse(params))}
                  arrayConfig={classe}
                />
              </View>
            )
          } 
          {
            subclasse.length !== 0 && (
              <View style={styles.picker}>
                <PickerItem
                  receiveProps={(params => this.filterPops(params))}
                  arrayConfig={subclasse}
                />
              </View>
            )
          }
          <View style={styles.viewCard}>
            <ScrollView contentContainerStyle={{ paddingBottom: 200 }}>
              {
                viewPops.map(item => this.rederItem(item))
              }
            </ScrollView>            
          </View>          
        </View>                
      </View>
    );
  }
}


const mapStateToProps = state => ({ 
  login: state.loginState,
});

export default connect(mapStateToProps, null)(DownloadPops);

