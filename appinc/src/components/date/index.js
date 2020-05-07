import React, { Component } from 'react';
import DatePicker from 'react-native-datepicker';
import { View, Image, Text, TouchableOpacity, AsyncStorage, NativeModules, Alert } from 'react-native';
import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Creators as GroupActions } from '../../store/ducks/group';
import moment from 'moment';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { responsividade } from '../../styles';

// var DatePicker = NativeModules.DatePicker;


class MyDatePicker extends Component {

  state = {
    date: null,
    formattedDate: "DD/MM/AAAA",
    dataAtual: '2019-01-21',
    showDate: false,
    call: true,
  }


  componentDidMount() {
    const { form, data, group, index } = this.props;

    if (data.group === 'true') {
      group.dataGroup.map(item => {
        item.value.map(components => {
          if (components.index === index) {
            Object.keys(components).map(key => {
              if (key === data.data_name) {
                this.setState({ date: components[key].value })
              }
            })
          }
        })
      });
    } else {
      for (var key in form.step) {
        if (key === data.data_name) {
          if (form.step[key].filled === true) {
            this.setState({ date: form.step[key].value });
          }
        }
      }
    }
  }

  getNewDate = () => {
    const { form } = this.props;

    const oldDate = new Date(this.state.date);
    const newDate = moment.utc(oldDate).format("DD/MM/YYYY");

    if (this.state.call) {
      this.state.formattedDate = newDate;
      this.setState({ formattedDate: newDate, call: false });
    }

  }

  saveGroupDate = info => {
    const { dataAtual, date } = this.state;
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
    if (date) {
      saveDataGroup({
        index,
        groupMother,
        name: info.data_name,
        data: date,
        extra: null,
        type: data.component_type
      })
    }
    startControlArrayGroup(info.data_name)
  }


  saveFormInput = data => {
    const { dataAtual, date } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;

    if (date) {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: date, filled: true, type: data.component_type };
          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = { key: data.data_name, value: '2100-01-21', filled: false, type: data.component_type };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }


  render() {
    const { data_name, label, hint, default_value, newState, component_type } = this.props.data
    const { saveStep } = this.props.form;
    const { group } = this.props
    const { showDate } = this.state;
    const { largura_tela } = responsividade;

    if (saveStep) {
      this.saveFormInput({ data_name, default_value, component_type });
    }
    if (group.flagGroup) {
      this.saveGroupDate({ data_name, default_value })
    }
    return (
      <View style={styles.container}>

        <View style={styles.button}>
          <View style={styles.square}><Icon name="date-range" size={largura_tela < 430 ? 28 : 40} color="black" style={styles.icon} /></View>
          <View style={styles.parale}>
            <DatePicker
              mode="date"
              placeholder={this.state.formattedDate}
              format="YYYY-MM-DD"
              minDate="2018-01-01"
              maxDate="2100-01-01"
              confirmBtnText="Confirm"
              cancelBtnText="Cancel"
              customStyles={{
                dateIcon: {
                  width: 0,
                  height: 0,
                },
                dateInput: {
                  //height: 320,
                  //width: 300,
                  borderWidth: 0,
                  borderRadius: 60,
                  backgroundColor: 'white',
                  color: 'blue'
                },
              }}
              onDateChange={(date) => { this.setState({ date, showDate: true, call: true }); }}
            />
          </View>
        </View>
        {
          this.state.date && (
            this.getNewDate()

          )
        }
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

export default connect(mapStateToProps, mapDispatchToProps)(MyDatePicker);
