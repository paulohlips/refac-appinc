import React, { Component } from "react";

// styles
import { View, Text, Image } from "react-native";
import { CheckBox } from "react-native-elements";
import { PickerItem } from '../../globalComponents';

import styles from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as InfoVeiculoActions } from "../../store/ducks/infoVeiculo";
import { Creators as FormActions } from '../../store/ducks/form';


class InfoVeiculo extends Component {

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
    infopicker: [
      {
        name: 'Carro',
        value: '1',
      },
      {
        name: 'Moto',
        value: '3',
      },
      {
        name: 'Caminhão',
        value: '2',
      },
    ],
  };

  componentWillMount() {
    const { infoVeiculo, startUpdateProgress } = this.props;
    startUpdateProgress()
    this.setState({
      checked1: infoVeiculo.checked1,
      checked2: infoVeiculo.checked2,
      checked3: infoVeiculo.checked3,
      checked4: infoVeiculo.checked4,
      checked5: infoVeiculo.checked5,
      checked6: infoVeiculo.checked6,
      checked7: infoVeiculo.checked7,
      checked8: infoVeiculo.checked8,
      image: infoVeiculo.image,
      progress: true
    });

    const { form, data, group, index, noteState } = this.props;

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
    const { setInfoVeiculoState, startUpdateProgress } = this.props;
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
      image,
    };

    setInfoVeiculoState(data);

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
          const form = {}
          form[info.data_name] = { key: info.data_name, value: inputSave, filled: true };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }

  render() {
    const { infoVeiculo, setInfoVeiculoState } = this.props;
    const {
      data_name,
      label, hint,
      default_value,
    } = this.props.data;
    const { saveStep, step } = this.props.form;
    const { infopicker } = this.state;

    if (saveStep) {
      this.saveFormInput({ data_name, default_value });
    }


    return (
      <View style={styles.container}>
        <Text style={styles.header}>{hint}</Text>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked1}
            onPress={() => this.setState({ checked1: !this.state.checked1 })}
          />
          <Text style={styles.titulo}>
            MARCA/MODELO: <Text style={styles.text}>CITROEN/C3 1.6</Text>
          </Text>
        </View>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked2}
            onPress={() => this.setState({ checked2: !this.state.checked2 })}
          />
          <Text style={styles.titulo}>
            PLACA:<Text style={styles.text}> ABC1D23</Text>
          </Text>
        </View>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked3}
            onPress={() => this.setState({ checked3: !this.state.checked3 })}
          />
          <Text style={styles.titulo}>
            COR:<Text style={styles.text}> VERMELHO</Text>
          </Text>
        </View>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked4}
            onPress={() => this.setState({ checked4: !this.state.checked4 })}
          />
          <Text style={styles.titulo}>
            Nº PORTAS/EIXOS: <Text style={styles.text}>2 PORTAS</Text>
          </Text>
        </View>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked5}
            onPress={() => this.setState({ checked5: !this.state.checked5 })}
          />
          <Text style={styles.titulo}>
            ANO FAB/MODELO: <Text style={styles.text}>2012/2012</Text>{" "}
          </Text>
        </View>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked6}
            onPress={() => this.setState({ checked6: !this.state.checked6 })}
          />
          <Text style={styles.titulo}>
            Nº VIN: <Text style={styles.text}>9BWAB45U4CT000000</Text>
          </Text>
        </View>

        <View style={styles.box}>
          <CheckBox
            checkedColor={"#cdad00"}
            checked={this.state.checked7}
            onPress={() => this.setState({ checked7: !this.state.checked7 })}
          />
          <Text style={styles.titulo}>
            HODÔMETRO: <Text style={styles.text}>99999.9 KM</Text>
          </Text>
        </View>
        <View style={styles.picker}>
          <PickerItem
            receiveProps={(tipo => this.setState({ image: tipo }))}
            arrayConfig={infopicker}
          />
        </View>

        <View style={styles.imageBox}>
          {this.state.image == 1 ? (
            <Image
              style={styles.image}
              source={require("../../assents/imgs/car.png")}
              width={380}
              height={200}
            />
          ) : null}

          {this.state.image == 2 ? (
            <Image
              style={styles.image}
              source={require("../../assents/imgs/truck.png")}
              width={350}
              height={200}
            />
          ) : null}

          {this.state.image == 3 ? (
            <Image
              style={styles.image2}
              width={350}
              height={200}
              source={require("../../assents/imgs/moto.png")}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  infoVeiculo: state.infoVeiculoState,
  form: state.formState,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      ...InfoVeiculoActions,
      ...FormActions,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(InfoVeiculo);
