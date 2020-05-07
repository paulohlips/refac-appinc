import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, Image, ScrollView, Picker} from 'react-native';
import styles from './styles';
import { CheckBox } from 'react-native-elements';

class Check extends Component {

    state = {
        checked1: false,
        checked2: false,
        checked3: false,
        checked4: false,
        checked5: false,
    }

    /*checkItem(elements){
      let itemChecked = this.state.checked;
      itemChecked = elements.target.checked;
      this.setState({checked: itemChecked});
    }*/

render() {
    const { hint } = this.props.data;
    return(
    <View>

        <CheckBox
            title={"Assumir o local"}
            checked={this.state.checked1}
            onPress={() => this.setState({checked1: !this.state.checked1})} 
        />

        <CheckBox
            title={"Segurança do local"}
            checked={this.state.checked2}
            onPress={() => this.setState({checked2: !this.state.checked2})} 
        />

        <CheckBox
            title={"Desligar energia elétrica"}
            checked={this.state.checked3}
            onPress={() => this.setState({checked3: !this.state.checked3})} 
        />

        <CheckBox
            title={"Verificar impressões digitais"}
            checked={this.state.checked4}
            onPress={() => this.setState({checked4: !this.state.checked4})} 
        />

        <CheckBox
            title={"Verificar perímetro da área de perícia"}
            checked={this.state.checked5}
            onPress={() => this.setState({checked5: !this.state.checked5})} 
        />

    </View>
    );
}
}

export default Check; 