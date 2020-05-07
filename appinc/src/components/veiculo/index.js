import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, AsyncStorage, Image, ScrollView, Picker, ActivityIndicator } from 'react-native';
import styles from './styles';
import axios from 'axios';
import { PickerItem } from '../../globalComponents';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';


import Icon from 'react-native-vector-icons/Ionicons';
import { responsividade } from '../../styles';


class Veiculos extends Component {

  state = {
    dadosVeiculo: '',
    dadosFipe: '',
    urlFipe: '',
    placa: '',
    marcas: null,
    marcaAtual: '',
    dadosAno: [],
    dadosMarcas: [],
    viewDenatran: false,
    viewFipe: false,
    dadosModelos: '',
    modelos: '',
    renderPickerModelos: false,
    renderPickerAno: false,
    renderPicker: false,
    ano: '',
    consulta: true,
    loading: false,
    loadingfipe: false,
    erroconsulta: false,
    naoexiste: false,
    tipo: '',
    erroFipeAPI: false,

    dadosEnvio: {
      id: '',
      placa: '',
      marca: '',
      modelo: '',
      procedencia: '',
      ano_fab: '',
      ano_mod: '',
      combustivel: '',
      chassi: '',
      numero_motor: '',
      etiquetas: '',
      referencia: '',
      preco: '',
      veiculo: '',
    },
    infopicker: [
      {
        name: 'Carro',
        value: 'carro',
      },
      {
        name: 'Moto',
        value: 'motos',
      },
      {
        name: 'Caminhão ou Microônibus',
        value: 'caminhao',
      },
    ],
  }

  async componentWillMount() {
    const { form, data } = this.props;

    for (let key in form.step) {
      if (key === data.data_name) {
        if (form.step[key].filled === true) {
          await this.setState({
            dadosVeiculo: form.step[key].dadosVeiculo,
            dadosFipe: form.step[key].dadosFipe,
            viewDenatran: form.step[key].dadosVeiculo === '' ? null : true,
            viewFipe: form.step[key].dadosFipe === '' ? null : true,
          });
        }
      }
    }
  }

  loading() {
    this.setState({ consulta: false });
    this.setState({ loading: true });
  }

  consultaPlaca = async () => {
    this.setState({
      consulta: false,
      loading: true,
      erroconsulta: false,
      naoexiste: false,
    });
    axios.get(`http://35.198.17.69/api/pericia/denatran/${this.state.placa}`)
      .then((resp) => {
        if (resp.data.placa !== null) {
          const dadossinesp = resp.data;
          this.getDadosPlaca(resp.data);
          this.setState({ consulta: true, loading: false, viewDenatran: true });
        } else {
          this.setState({ naoexiste: true, loading: false, consulta: true, viewDenatran: false });
        }
      }).catch(err => {
        this.setState({ erroconsulta: true, loading: false, consulta: true, viewDenatran: false });
      });
  }

  async getDadosPlaca(data) {
    this.setState({ dadosVeiculo: data });
  }

  consultaFipe = async () => {
    this.setState({
      //consultafipe: false
      loadingfipe: true,
    });
    const urlFipe = `http://fipeapi.appspot.com/api/1/${this.state.tipo}/veiculo/${this.state.marca}/${this.state.modelo}/${this.state.anos}.json`;
    axios.get(urlFipe)
      .then(async resp => {
        if (resp.status === 200) {
          const dadosPuro = resp.data;
          await this.setState({ erroFipeAPI: false, dadosFipe: dadosPuro, viewFipe: true, loadingfipe: false });
        } else if (resp.status === 0) {
          this.setState({ erroFipeAPI: true });
        }
      }).catch(err => {
        this.setState({ erroFipeAPI: true, loadingfipe: false });
      });
  }

  consultaMarcas = (value) => {
    this.setState({ tipo: value });
    axios.get(`http://fipeapi.appspot.com/api/1/${value}/marcas.json`)
      .then((resp) => {
        if (resp.status === 200) {
          this.getMarcas(resp.data);
          this.setState({ erroFipeAPI: false });
        } else if (resp.state === 0) {
          this.setState({ erroFipeAPI: true });
        }
      }).catch(err => {
        this.setState({ erroFipeAPI: true });
      });
  }

  getMarcas = data => {
    data.map(item => {
      this.setState({
        dadosMarcas: [
          ...this.state.dadosMarcas,
          {
            name: item.fipe_name,
            value: item.id,
          }
        ]
      })

    })
    this.setState({
      renderPicker: true,
    });
  }

  pegaModelos = (value) => {
    this.setState({ marca: value });
    axios.get(`http://fipeapi.appspot.com/api/1/${this.state.tipo}/veiculos/${value}.json`)
      .then((resp) => {
        if (resp.status === 200) {
          this.getModelos(resp.data);
          this.setState({ erroFipeAPI: false });
        }
      }).catch(err => {
        //this.setState({ erroFipeAPI: true })
      });
  }

  getModelos = data => {
    data.map(item => {
      this.setState({
        dadosModelos: [
          ...this.state.dadosModelos,
          {
            name: item.name,
            value: item.id,
          }
        ]
      })

    })
    this.setState({
      renderPickerModelos: true,
    });
  }

  pegaAno = value => {
    this.setState({ modelo: value });
    axios.get(`http://fipeapi.appspot.com/api/1/${this.state.tipo}/veiculo/${this.state.marca}/${value}.json`)
      .then((resp) => {
        if (resp.status === 200) {
          this.getAno(resp.data);
          this.setState({ erroFipeAPI: false });
        }
      }).catch(err => {
        //this.setState({ erroFipeAPI: true })
      });
  }

  getAno = data => {
    data.map(item => {
      this.setState({
        dadosAno: [
          ...this.state.dadosAno,
          {
            name: item.key,
            value: item.id,
          }
        ]
      })

    })
    this.setState({
      renderPickerAno: true,
    });
  }

  saveFormVeiculo = data => {
    const { dadosVeiculo, dadosFipe, dadosEnvio } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;
    let dados = dadosEnvio;

    Object.keys(dados).map(key => {
      if (dadosVeiculo) {
        Object.keys(dadosVeiculo).map(key1 => {
          if (key === key1) {
            dados[key] = dadosVeiculo[key1];
          }
        });
      }
      if (dadosFipe) {
        Object.keys(dadosFipe).map(key2 => {
          if (key === key2) {
            dados[key] = dadosFipe[key2];
          }
        });
      }
    });

    const dv = JSON.stringify(dados);
    if (dadosVeiculo || dadosFipe) {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: dv, dadosVeiculo, dadosFipe, filled: true };
          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: dv, dadosVeiculo: null, dadosFipe: null, filled: false };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }



  render() {
    const { data_name, label, hint, default_value, newState } = this.props.data;
    const { saveStep } = this.props.form;
    const {
      dadosVeiculo,
      dadosModelos,
      dadosAno,
      dadosFipe,
      dadosMarcas,
      renderPicker,
      renderPickerModelos,
      erroFipeAPI,
      erroconsulta,
      renderPickerAno,
      loading,
      loadingfipe,
      infopicker,
    } = this.state;
    const { largura_tela } = responsividade;
    if (saveStep) {
      this.saveFormVeiculo({ data_name, default_value });
    }
    return (
      <View style={styles.container}>
        <View style={styles.main}>
          <View style={styles.hint_title}>
            <View style={styles.miniball}>
              <Text style={styles.numberType}>1</Text>
            </View>
            <View style={styles.hintview}>
              <Text style={styles.hint}>Consulta à tabela FIPE</Text>
            </View>
          </View>
          {
            erroFipeAPI && (
              <View style={styles.errov}>
                <Text style={styles.erro}>API FIPE não responde. Tente mais tarde.</Text>
              </View>
            )
          }
          <View style={styles.Picker}>
            <PickerItem
              receiveProps={(tipo => this.consultaMarcas(tipo))}
              arrayConfig={infopicker}
            />
          </View>
          {
            renderPicker && (
              <View style={styles.Picker}>
                <PickerItem
                  receiveProps={(tipo => this.pegaModelos(tipo))}
                  arrayConfig={dadosMarcas}
                />
              </View>
            )
          }
          {
            renderPickerModelos && (
              <View style={styles.Picker}>
                <PickerItem
                  receiveProps={(tipo => this.pegaAno(tipo))}
                  arrayConfig={dadosModelos}
                />
              </View>
            )
          }
          {
            renderPickerAno && (
              <View style={styles.Picker}>
                <PickerItem
                  receiveProps={(anos => this.setState({ anos }))}
                  arrayConfig={dadosAno}
                />
              </View>
            )
          }
        </View>

        <View>
          <View style={styles.cabecalho} />

          {
            this.state.error && (
              <View style={styles.input}>
                <Text style={styles.info_text}>Error: {this.state.error}</Text>
              </View>
            )
          }
          {
            this.state.viewFipe && (
              <View style={styles.info}>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Data deferência: {dadosFipe.referencia}</Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Código Fipe: {dadosFipe.fipe_codigo}</Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Modelo: {dadosFipe.name} </Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Combustível: {dadosFipe.combustivel} </Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Fabricante: {dadosFipe.marca}</Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Ano Modelo: {dadosFipe.ano_modelo}</Text>
                </View>
                <View style={styles.input_o}>
                  <Text style={styles.info_text}>Preço: {dadosFipe.preco} </Text>
                </View>
              </View>
            )
          }
        </View>
        <View styles={styles.main}>
          <TouchableOpacity onPress={this.consultaFipe} style={styles.button}>

            <View style={styles.button}><View style={styles.square}>
              {loadingfipe
                ? <ActivityIndicator size={largura_tela < 430 ? "small" : "large"} color="#FFF" />
                : <Icon name="ios-car" size={largura_tela < 430 ? 28 : 40} color="black" style={styles.icon} />

              }

            </View>

              <View style={styles.parale}><Text style={styles.button_text}>CONSULTAR FIPE</Text></View></View>

          </TouchableOpacity>
        </View>
        <View style={styles.hint_title}>
          <View style={styles.miniball}>
            <Text style={styles.numberType}>2</Text>
          </View>
          <View style={styles.hintview}>
            <Text style={styles.hint}>Consulta ao DENATRAN</Text>
          </View>
        </View>
        <View style={styles.cabecalho} >
          {
            this.state.erroconsulta && (
              <View style={styles.errov}>
                <Text style={styles.erro}>Consulta falhou.Tente novamente!</Text>
              </View>
            )
          }

          {
            this.state.naoexiste && (
              <View style={styles.errov}>
                <Text style={styles.erro}>Veículo não encontrado</Text>
              </View>
            )
          }
          <View style={styles.texto_geo}>
            <TextInput
              style={styles.input}
              autoCapitalize="none"
              autoCorrect={false}
              placeholder="Digite..."
              maxLength={72}
              autoCapitalize="characters"
              underlineColorAndroid="rgba(0,0,0,0)"
              onChangeText={(placa) => this.setState({ placa })}
            />
          </View>
        </View>
        <View styles={styles.main}>
          <TouchableOpacity onPress={this.consultaPlaca} style={styles.button}>

            <View style={styles.button}><View style={styles.square}>
              {loading
                ? <ActivityIndicator size={largura_tela < 430 ? "small" : "large"} color="#FFF" />
                : <Icon name="ios-car" size={largura_tela < 430 ? 28 : 40} color="black" style={styles.icon} />

              }

            </View>

              <View style={styles.parale}><Text style={styles.button_text}>CONSULTAR "DENATRAN"</Text></View></View>

          </TouchableOpacity>

        </View>
        {
          this.state.error && (
            <View style={styles.input}>
              <Text style={styles.info_text}>Error: {this.state.error}</Text>
            </View>
          )
        }
        {
          this.state.viewDenatran && !erroconsulta && (
            <View style={styles.info}>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Placa: {dadosVeiculo.placa}</Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Marca: {dadosVeiculo.marca}</Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Modelo: {dadosVeiculo.modelo} </Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Cor: {dadosVeiculo.cor} </Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Procedência: {dadosVeiculo.procedencia} </Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Ano Fabricação: {dadosVeiculo.ano_fab}</Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Ano Modelo: {dadosVeiculo.ano_mod}</Text>
              </View>
              <View style={styles.input_o}>
                <Text style={styles.info_text}>Chassi: ***{dadosVeiculo.chassi} </Text>
              </View>
            </View>
          )
        }
      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FormActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Veiculos);
