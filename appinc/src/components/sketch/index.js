import React, { Component } from "react";
import {
  AppRegistry,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
  Modal,
  Picker,
  Image
} from "react-native";

import styles from "./styles";
import Icon from "react-native-vector-icons/MaterialIcons";
import { responsividade } from "../../styles";

import RNSketchCanvas from "@terrylinla/react-native-sketch-canvas";

// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Creators as GroupActions } from '../../store/ducks/group';

onPress = () => {
  const { vetor } = this.state;
};

class Sketch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showScanner: false,
      showButton: true,
      fundo: "",
      uri: null
    };
  }

  componentWillMount() {
    const { form, data, group, index } = this.props;
    for (var key in form.step) {
      if (key === data.data_name) {
        if (form.step[key].filled === true) {
          this.setState({ uri: form.step[key].value });
        }
      }
    }
  }

  saveFormSketch = info => {
    const { uri } = this.state;
    const {
      form,
      getSaveStateForm,
      startControlArray,
      data,
      index,
      saveDataGroup,
      group,
      groupMother,
      startControlArrayGroup,
    } = this.props;
    if (uri) {
      for (var key in form.step) {
        if (key === info.data_name) {
          const form = {};
          form[info.data_name] = { key: info.data_name, value: `file://${uri}`, filled: true };
          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if (key === info.data_name) {
          const form = {};
          form[info.data_name] = { key: info.data_name, value: uri, filled: false };
          //console.log(form[info.data_name])
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
    // await startControlArrayGroup();
  }

  renderImage(image) {
    return <Image resizeMode="contain" style={styles.avatar} source={{ uri: 'file://' + image }} />
  }
  
  renderAsset(image) {
    return this.renderImage(image);
  }

  render() {
    const { showScanner, showButton } = this.state;
    const { largura_tela } = responsividade;

    const { data_name, label, hint, default_value, newState, groupFlag } = this.props.data;
    const { saveStep, step } = this.props.form;

    if (saveStep) {
      this.saveFormSketch({ data_name, default_value });
    }

    return (
      <View style={{ justifyContent: "center", alignItem: "center" }}>

        {this.state.uri ? this.renderAsset(this.state.uri) : null}

        {showButton && (
          <TouchableOpacity
            onPress={() =>
              this.setState({ showScanner: true, showButton: false })
            }
            style={styles.button}
          >
            <View style={styles.square}>
              <Icon
                name="create"
                size={largura_tela < 430 ? 28 : 40}
                color="black"
                style={styles.icon}
              />
            </View>
            <View style={styles.parale}>
              <Text style={styles.button_text}>FAZER CROQUI</Text>
            </View>
          </TouchableOpacity>
        )}
        {showScanner && (
          <View style={{ width: 330, height: 250, rigth: 50 }}>
            <Modal
              animationType="slide"
              transparent={false}
              visible={showScanner}
              onRequestClose={() => { }}
            >
              <View style={styles.container}>
                <View style={{ flex: 1, flexDirection: "row" }}>
                  <RNSketchCanvas
                    containerStyle={{ backgroundColor: "transparent", flex: 1 }}
                    canvasStyle={{ backgroundColor: "transparent", flex: 1 }}
                    defaultStrokeIndex={0}
                    defaultStrokeWidth={5}
                    onSketchSaved={async (success, path) => {
                      await this.setState({ uri: path })
                    }}
                    changeImg={
                      <View style={styles.functionButton}>
                        <Picker
                          selectedValue={this.state.fundo}
                          style={{ height: 50, width: 50 }}
                          onValueChange={value =>
                            this.setState({ fundo: value })
                          }
                        >
                          <Picker.Item label="Croqui" value="croqui.png" />
                          <Picker.Item label="Vítima" value="img.jpg" />
                        </Picker>
                      </View>
                    }
                    closeComponent={
                      <View style={styles.functionButton}>
                        <Text
                          onPress={() =>
                            this.setState({
                              showScanner: false,
                              showButton: true
                            })
                          }
                          style={{ color: "red", fontWeight: "bold" }}
                        >
                          Fechar
                        </Text>
                      </View>
                    }
                    saveComponent={
                      <View style={styles.functionButton}>
                        <Text style={{ color: "green", fontWeight: "bold" }}>
                          Salvar
                        </Text>
                      </View>
                    }
                    undoComponent={
                      <View style={styles.functionButton}>
                        <Text style={{ color: "white" }}>Desfazer</Text>
                      </View>
                    }
                    clearComponent={
                      <View style={styles.functionButton}>
                        <Text style={{ color: "white" }}>Limpar</Text>
                      </View>
                    }
                    eraseComponent={
                      <View style={styles.functionButton}>
                        <Text style={{ color: "white" }}>Apagar</Text>
                      </View>
                    }
                    strokeComponent={color => (
                      <View
                        style={[
                          { backgroundColor: color },
                          styles.strokeColorButton
                        ]}
                      />
                    )}
                    strokeSelectedComponent={(color, index, changed) => {
                      return (
                        <View
                          style={[
                            { backgroundColor: color, borderWidth: 2 },
                            styles.strokeColorButton
                          ]}
                        />
                      );
                    }}
                    strokeWidthComponent={w => {
                      return (
                        <View style={styles.strokeWidthButton}>
                          <View
                            style={{
                              backgroundColor: "white",
                              marginHorizontal: 2.5,
                              width: Math.sqrt(w / 3) * 10,
                              height: Math.sqrt(w / 3) * 10,
                              borderRadius: (Math.sqrt(w / 3) * 10) / 2
                            }}
                          />
                        </View>
                      );
                    }}
                    localSourceImage={{
                      filename: this.state.fundo,
                      directory: "android/app/src/main/res/drawable",
                      mode: "AspectFill"
                    }}
                    savePreference={() => {
                      return {
                        folder: "Câmera",
                        filename: String(Math.ceil(Math.random() * 100000000)),
                        transparent: false,
                        imageType: "png"
                      };
                    }}
                  />
                </View>
              </View>
            </Modal>
          </View>
        )}


      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
  group: state.groupState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({ ...FormActions, ...GroupActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Sketch);