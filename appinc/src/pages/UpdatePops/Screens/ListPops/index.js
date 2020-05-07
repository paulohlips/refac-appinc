import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  AsyncStorage,
  ScrollView
} from "react-native";
import styles from "./styles";
import Icon from 'react-native-vector-icons/Ionicons';
import { connect } from 'react-redux';

import CheckModal from '../Modal';


class ListPops extends Component {
  state = {
    offlinePops: [],
    showRemove: false,
    viewModal: false
  };

  async componentWillMount() {
    const { login } =  this.props;
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
            form_name: pop.form_name,
            form_titulo: pop.form_titulo,
            form_version: pop.form_version,
            checkRemove: false,
          }         
        ]
      }
      
    } catch(err) {
      console.log('error', err);
    }

    this.setState({ offlinePops: array });
  }

  getPopOffline = async key => {
    const resp = AsyncStorage.getItem(key);
    const pop = JSON.parse(resp);
    return pop;
  }

  removePop = data => {
    const { offlinePops } = this.state;
    let array = offlinePops;
    
    for(let i = 0; i< array.length ; i++) {
      if(data.form_name === array[i].form_name) {
        if(array[i].checkRemove === true )
          array[i].checkRemove = false;
        else
          array[i].checkRemove = true;
      }
    }

    this.setState({ offlinePops: array });
  }

  pressTrash = () => {
    const { showRemove } = this.state;
    if(showRemove) {
      this.setState({ viewModal: true });
    } else {
      this.setState({ showRemove: true });
    }
  }

  closeModal = () => {
    const { viewModal } = this.state;
    if (viewModal) 
      this.setState({ viewModal: false });
    else 
      this.setState({ viewModal: true });    
  }

  onCloseModeEdit = () => {
    this.closeModal();
    this.setState({ showRemove: false });
  }

  onCloseAndDeletPops = async () => {
    const { login } =  this.props;
    const { offlinePops } = this.state;
    let array = offlinePops;
    const response = await AsyncStorage.getItem(`${login.userID}-arrayKeys`);
    const keyPops = JSON.parse(response);

    for(let i = 0; i < array.length ; i++) {
      if (array[i].checkRemove === true) {
        await AsyncStorage.removeItem(array[i].form_name)

        for (let j = 0; j < keyPops.length; j++) {
          if (keyPops[j] === array[i].form_name) {
            keyPops.splice(j, 1);
          }
        }

        array.splice(i, 1);
        i--;
      }
    }

    await AsyncStorage.setItem(`${login.userID}-arrayKeys`, JSON.stringify(keyPops));
    this.closeModal();
    this.setState({ showRemove: false, offlinePops: array });
  }

  renderPops = item => {
    const { showRemove, viewModal } = this.state;
    if (item) {
      return (
        <View
          style={{ 
            ...styles.box,
            justifyContent: showRemove ? 'space-between' : 'flex-start',
          }}
        >
          <View>
            <Text style={styles.status}>Perícia {item.form_titulo} </Text>
            <Text style={styles.status1}>Versão {item.form_version}</Text>
          </View>
          <View>
            {
              showRemove &&
                <TouchableOpacity 
                  style={{ 
                    ...styles.removeButton,
                      backgroundColor: item.checkRemove ? '#FE3636' : '#fff',
                      borderColor: '#FE3636',
                      borderWidth: 2.5,
                    }} 
                  onPress={() => this.removePop(item)}
                >
                  <Icon 
                    name={ item.checkRemove ? "ios-checkmark" : "md-remove" }
                    size={ item.checkRemove ? 32 : 28} 
                    style={{ 
                        color:  item.checkRemove ? '#fff' : '#FE3636',
                      }}
                  />
                </TouchableOpacity>
            }
          </View>          
        </View>
      );
    }
    return null;
  }


  render() {
    const { offlinePops, showRemove, viewModal } = this.state;
    return (
      <View style={styles.container}>
        <TouchableOpacity 
            style={{ 
              ...styles.trash, 
              backgroundColor: showRemove ? "#444" : "#FFF",                            
            }} 
            onPress={() => this.pressTrash()}
            activeOpacity={1.0}
          >
            {
              showRemove 
                ? <Icon name="md-trash" size={28} color="#FFF" />
                : <Icon name="md-create" size={28} color="#444" />
            }          
          </TouchableOpacity>
        <ScrollView contentContainerStyle={styles.styleScroll}>          
          {
            offlinePops.map(item => this.renderPops(item))         
          }          
        </ScrollView>
        {
            viewModal && 
              <CheckModal
                viewModal
                onClose={this.closeModal}
                onCloseEdit={this.onCloseModeEdit}
                onCloseDeletePops={this.onCloseAndDeletPops}
              />
          }  
      </View>
    );
  }
}

const mapStateToProps = state => ({ 
  login: state.loginState,
});

export default connect(mapStateToProps, null)(ListPops);

/*
  <ScrollView>
    {popList ? pops.map(item => this.renderPops(item)) : null}
  </ScrollView>

  <Icon name="md-close" size={28} color="#FFF" />
*/