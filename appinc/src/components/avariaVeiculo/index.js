import React, { Component } from "react";

// styles
import { View, Text, Image, Picker } from "react-native";
import { CheckBox } from "react-native-elements";

import styles from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as avariaVeiculoActions }  from "../../store/ducks/avariaVeiculo";
import { Creators as FormActions } from '../../store/ducks/form';


class AvariaVeiculo extends Component {
  
  state = {
    progress: false,
    checked1: false,
    checked2: false,
    checked3: false,
    checked4: false,
    checked5: false,
    checked6: false,
    checked7: false,
    checked8: false,
    image: 1,
  };

  componentWillMount() {

    const { avariaVeiculo,  startUpdateProgress} = this.props;
    startUpdateProgress()
    this.setState({
      checked1: avariaVeiculo.checked1,
      checked2: avariaVeiculo.checked2,
      checked3: avariaVeiculo.checked3,
      checked4: avariaVeiculo.checked4,
      checked5: avariaVeiculo.checked5,
      checked6: avariaVeiculo.checked6,
      checked7: avariaVeiculo.checked7,
      checked8: avariaVeiculo.checked8,
      checked9: avariaVeiculo.checked9,
      checked10: avariaVeiculo.checked10,
      checked11: avariaVeiculo.checked11,
      checked12: avariaVeiculo.checked12,
    });

    const { form, data, group, index } = this.props;

    if (data.group === 'true') {
      group.dataGroup.map(item => {
        item.value.map(components => {
          if (components.index === index) {
            Object.keys(components).map(key => {
              if (key === data.data_name) {
                this.setState({ inputSave: components[key].value })
              }
            })
          }
        })
      });
    } else {
      for (var key in form.step) {
        if (key === data.data_name) {
          if (form.step[key].filled === true) {
            this.setState({ inputSave: form.step[key].value });
          }
        }
      }
    } 

  }
  componentWillUnmount() {
    const { setavariaVeiculoState, startUpdateProgress } = this.props;
    startUpdateProgress()
    const {
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checked7,
      checked8,
      checked9,
      checked10,
      checked11,
      checked12,
      image,
    } = this.state;

    const data = {
      checked1,
      checked2,
      checked3,
      checked4,
      checked5,
      checked6,
      checked7,
      checked8,
      checked9,
      checked10,
      checked11,
      checked12,
    };

    setavariaVeiculoState(data);
    
  }

  saveFormInput = info => {
    const { inputSave } = this.state;
    const {
      form,
      getSaveStateForm,
      startControlArray,
      data,
    } = this.props;

    if (inputSave) {
      if (data.note === true) {
      } else {
        for (var key in form.step) {
          if (key === info.data_name) {
            const form = {};
            form[info.data_name] = { key: info.data_name, value: inputSave, filled: true };
            getSaveStateForm(form);
          }
        }
      }
    } else {
      for (var key in form.step) {
        if (key === info.data_name) {
          const form = {};
          form[info.data_name] = { key: info.data_name, value: inputSave, filled: true };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }
 
  render() {
    const { avariaVeiculo, setavariaVeiculoState } = this.props;
    const { 
      data_name,
      label, hint,
      default_value,
    } = this.props.data;
    const { saveStep, step } = this.props.form;
    
    if (saveStep) {
      this.saveFormInput({ data_name, default_value });
    }
 

    return (
      <View style={styles.container}>
        <Text style={styles.header}>Estado Geral do Veículo</Text>

        <View style={styles.geralState}>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked1}
            onPress={() => this.setState({ checked1: !this.state.checked1 })}
          />
          <Text style={styles.titulo}>
            Novo
          </Text>
        </View>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked2}
            onPress={() => this.setState({ checked2: !this.state.checked2 })}
          />
          <Text style={styles.titulo}>
            Bom
          </Text>
        </View>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked3}
            onPress={() => this.setState({ checked3: !this.state.checked3 })}
          />
          <Text style={styles.titulo}>
           Péssimo
          </Text>
        </View>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked4}
            onPress={() => this.setState({ checked4: !this.state.checked4 })}
          />
          <Text style={styles.titulo}>
            Ruim
          </Text>
        </View>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked5}
            onPress={() => this.setState({ checked5: !this.state.checked5 })}
          />
          <Text style={styles.titulo}>
           Sucata
          </Text>
        </View>
        </View>

        <Text style={styles.header}>Avarias</Text>

        <View style={styles.problems}>

          <View style={styles.box}>
            <CheckBox
              checkedColor={"#cdad00"}
              checked={this.state.checked6}
              onPress={() => this.setState({ checked6: !this.state.checked6 })}
            />
            <Text style={styles.titulo}>
              Painel
            </Text>
          </View>

          <View style={styles.box}>
            <CheckBox
              checkedColor={"#cdad00"}
              checked={this.state.checked7}
              onPress={() => this.setState({ checked7: !this.state.checked7 })}
            />
            <Text style={styles.titulo}>
            Pintura
            </Text>
          </View>

          <View style={styles.box}>
            <CheckBox
              checkedColor={"#cdad00"}
              checked={this.state.checked8}
              onPress={() => this.setState({ checked8: !this.state.checked8 })}
            />
            <Text style={styles.titulo}>
              Para-choque
            </Text>
          </View>

          <View style={styles.box}>
            <CheckBox
              checkedColor={"#cdad00"}
              checked={this.state.checked9}
              onPress={() => this.setState({ checked9: !this.state.checked9 })}
            />
            <Text style={styles.titulo}>
            Lataria
            </Text>
          </View>

          <View style={styles.box}>
            <CheckBox
              checkedColor={"#cdad00"}
              checked={this.state.checked10}
              onPress={() => this.setState({ checked10: !this.state.checked10 })}
            />
            <Text style={styles.titulo}>
              Acabamento Interno
            </Text>
          </View>

          <View style={styles.box}>
            <CheckBox
              checkedColor={"#cdad00"}
              checked={this.state.checked11}
              onPress={() => this.setState({ checked11: !this.state.checked11 })}
            />
            <Text style={styles.titulo}>
            Vidros
            </Text>
          </View>

          <View style={styles.box}>
            <CheckBox
              checkedColor={"#cdad00"}
              checked={this.state.checked12}
              onPress={() => this.setState({ checked12: !this.state.checked12 })}
            />
            <Text style={styles.titulo}>
              Para-brisa
            </Text>
          </View>
        </View>

      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  avariaVeiculo: state.avariaVeiculoState,
  form: state.formState,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...avariaVeiculoActions,
      ...FormActions, 
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AvariaVeiculo);
