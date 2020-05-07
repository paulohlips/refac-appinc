import React, { Component } from 'react';
import { View, Alert, Text, TouchableOpacity, Dimensions } from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Creators as GroupActions } from '../../store/ducks/group';

import * as Animatable from 'react-native-animatable';

import { responsividade } from '../../styles';

import { RNCamera } from 'react-native-camera';

class Scanner extends Component {

  constructor(props) {
    super(props);
    this.camera = null;
    this.barcodeCodes = [];
    let { width } = Dimensions.get('window');
    this.maskLength = (width * 50) / 100;
  }

  state = {
    vetor: [],
    infoScanner: '',
    showScanner: false,
    showButton: true,
    showButton2: false,
    showCode: false,
    camera: {
      type: RNCamera.Constants.Type.back,
      flashMode: RNCamera.Constants.FlashMode.auto,
      barcodeFinderVisible: true
    },
  }

  componentWillMount() {
  }

  componentDidMount() {
    const { form, data, group, index } = this.props;

    if (data.group === 'true') {
      group.dataGroup.map(item => {
        item.value.map(components => {
          if (components.index === index) {
            Object.keys(components).map(key => {
              if (key === data.data_name) {
                if (components[key].value !== null && components[key].filled === true) {
                  this.setState({ infoScanner: components[key].value, showCode: true })
                }
              }
            })
          }
        })
      });
    } else {
      for (var key in form.step) {
        if (key === data.data_name) {
          if (form.step[key].filled === true) {
            this.setState({ infoScanner: form.step[key].value });
          }
        }
      }
    }
  }

  onPress = () => {
    const { vetor } = this.state;
  }

  saveGroupScanner = info => {
    const { infoScanner } = this.state;
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
    if (infoScanner) {
      saveDataGroup({
        index,
        groupMother,
        name: info.data_name,
        data: infoScanner,
        extra: null,
        type: data.component_type
      })
    }
    startControlArrayGroup(info.data_name)
  }

  saveFormScanner = dataScanner => {
    const { infoScanner } = this.state;
    const { form, getSaveStateForm, startControlArray, index, group, saveDataGroup, data } = this.props;

    if (infoScanner) {
      if (data.group === 'sdfsd') {
        group.dataGroup.map(item => {
          if (item.index === index) {
            saveDataGroup({ index, name: dataScanner.data_name, data: { key: dataScanner.data_name, value: infoScanner, filled: true }, type: dataScanner.component_type, extra: null })
          }
        });
      } else {
        for (var key in form.step) {
          if (key === dataScanner.data_name) {
            const form = {};
            form[dataScanner.data_name] = { key: dataScanner.data_name, value: infoScanner, filled: true };
            getSaveStateForm(form);
          }
        }
      }
    } else {
      for (var key in form.step) {
        if (key === dataScanner.data_name) {
          const form = {};
          form[dataScanner.data_name] = { key: dataScanner.data_name, value: '', filled: false };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }

  onBarCodeRead(scanResult) {
    this.setState({ infoScanner: scanResult.data, showScanner: false, showButton2: true, showCode: true })
    if (scanResult.data != null) {
      if (!this.barcodeCodes.includes(scanResult.data)) {
        this.barcodeCodes.push(scanResult.data);
      }
    }
    return;
  }

  async takePicture() {
    if (this.camera) {
      const options = { quality: 0.5, base64: true };
      const data = await this.camera.takePictureAsync(options);
      //console.log(data.uri);
    }
  }

  pendingView() {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: 'lightgreen',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Text>Waiting</Text>
      </View>
    );
  }

  render() {
    const { data_name, label, hint, default_value, newState } = this.props.data;
    const { showScanner, showButton, showButton2, infoScanner } = this.state;
    const { saveStep, step } = this.props.form;
    const { largura_tela } = responsividade;
    const { group } = this.props;

    if (saveStep) {
      this.saveFormScanner({ data_name, default_value });
    }
    if (group.flagGroup) {
      this.saveGroupScanner({ data_name, default_value })
    }
    return (
      <View style={{ justifyContent: 'center', alignItem: 'center' }}>
        {
          showButton && (
            <TouchableOpacity onPress={() => this.setState({ showScanner: true, showButton: false })} style={styles.button}>
              <View style={styles.square}><Icon name="qrcode" size={largura_tela < 430 ? 28 : 40} color="black" style={styles.icon} /></View>
              <View style={styles.parale}><Text style={styles.button_text}>LER {label}</Text></View>
            </TouchableOpacity>
          )}

        {
          showScanner && (
            <View style={{ alignItems: 'center', height: 250 }}>
              {
                <RNCamera
                  ref={ref => {
                    this.camera = ref;
                  }}
                  barcodeFinderVisible={this.state.camera.barcodeFinderVisible}
                  barcodeFinderWidth={280}
                  barcodeFinderHeight={220}
                  barcodeFinderBorderColor="white"
                  barcodeFinderBorderWidth={2}
                  defaultTouchToFocus
                  flashMode={this.state.camera.flashMode}
                  mirrorImage={false}
                  onBarCodeRead={this.onBarCodeRead.bind(this)}
                  onFocusChanged={() => { }}
                  onZoomChanged={() => { }}
                  permissionDialogTitle={'Permission to use camera'}
                  permissionDialogMessage={'We need your permission to use your camera phone'}
                  style={{ width: 330, height: 250 }}
                  type={this.state.camera.type}
                >
                  <View style={styles.overlay} />
                  <View style={[styles.contentRow, { height: this.maskLength }]} >
                    <View styel={styles.overlay} />
                    <View style={[styles.content, { width: this.maskLength, height: this.maskLength }]} >
                      <Animatable.View
                        style={[styles.scanline, { top: this.maskLength / 4 }]}
                        animation="slideInUp"
                        iterationCount="infinite"
                        direction="alternate"
                      />
                    </View>
                    <View style={styles.overlay} />
                  </View>
                  <View style={styles.overlay} />
                </RNCamera>
              }
            </View>

          )}
        {
          this.state.showCode && (
            <View style={styles.codecontainer}>
              <Text style={styles.code}> Código: {this.state.infoScanner} </Text>
            </View>
          )
        }

        {
          showButton2 && (
            <TouchableOpacity onPress={() => this.setState({ showScanner: true, showCode: false })} style={styles.button}>
              <Text style={styles.button_text}>LER {label}</Text>
            </TouchableOpacity>
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
  bindActionCreators({ ...FormActions, ...GroupActions }, dispatch);;

export default connect(mapStateToProps, mapDispatchToProps)(Scanner);