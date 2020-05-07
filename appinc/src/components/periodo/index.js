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


class DifDatas extends Component {

    state = {
        data: null,
        formattedDate: "DD/MM/AAAA",
        formattedDate2: "DD/MM/AAAA",
        dataAtual: '2019-01-21',
        showDate: false,
        call: true,
        dataInicio: "DD/MM/AAAA",
        dataFinal: "DD/MM/AAAA",
        date: null,
        date2: null,
    }


    componentDidMount() {
        const { form, data, group, index } = this.props;

        if (data.group === 'true') {
            group.dataGroup.map(item => {
                item.value.map(components => {
                    if (components.index === index) {
                        Object.keys(components).map(key => {
                            if (key === data.data_name) {
                                this.setState({ 
                                    date: components[key].value.date, 
                                    date2: components[key].value.date,
                                })
                            }
                        })
                    }
                })
            });
        } else {
            for (var key in form.step) {
                if (key === data.data_name) {
                    if (form.step[key].filled === true) {
                        this.setState({ 
                            date: form.step[key].value.date, 
                            date2: form.step[key].value.date2, 
                        });
                    }
                }
            }
        }
    }

    getNewDate = () => {
        const { form } = this.props;
        const oldDate = new Date(this.state.date);
        const newDate = moment.utc(oldDate).format("DD/MM/YYYY");

        const oldDate2 = new Date(this.state.date2);
        const newDate2 = moment.utc(oldDate2).format("DD/MM/YYYY");

        if (this.state.call) {
            this.state.formattedDate = newDate;
            this.setState({ formattedDate: newDate, formattedDate2: newDate2, call: false });
        }
    }

    saveGroupDate = info => {
        const { date } = this.state;
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
        const { date, date2 } = this.state;
        const { form, getSaveStateForm, startControlArray } = this.props;
       
        if (date) {
            for (var key in form.step) {
                if (key === data.data_name) {
                    const form = {};
                    form[data.data_name] = { key: data.data_name, value: { date, date2 }, filled: true };
                    getSaveStateForm(form);
                }
            }
        } else {
            for (var key in form.step) {
                if (key === data.data_name) {
                    const form = {};
                    form[data.data_name] = { key: data.data_name, value: '2100-01-21', filled: false };
                    getSaveStateForm(form);
                }
            }
        }
        startControlArray();
    }


    render() {
        const { data_name, label, hint, default_value, newState } = this.props.data
        const { saveStep } = this.props.form;
        const { group } = this.props
        const { showDate, dataInicio, dataFinal, date, date2, formattedDate } = this.state;
        const { largura_tela } = responsividade;

        if (saveStep) {
            this.saveFormInput({ data_name, default_value });
        }
        if (group.flagGroup) {
            this.saveGroupDate({ data_name, default_value })
        }
        return (
            <View style={styles.container}>
                <Text style={styles.button_text}>Data Inicial</Text>
                <View style={styles.button}>
                    <View style={styles.square}><Icon name="date-range" size={largura_tela < 430 ? 28 : 40} color="black" style={styles.icon} /></View>
                    <View style={styles.parale}>

                        <DatePicker
                            mode="date"
                            date={date}
                            placeholder={formattedDate}
                            format="YYYY-MM-DD"
                            minDate={moment().format()}
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

                <Text style={styles.button_text}>Data Final</Text>
                <View style={styles.button}>
                    <View style={styles.square}><Icon name="date-range" size={largura_tela < 430 ? 28 : 40} color="black" style={styles.icon} /></View>
                    <View style={styles.parale}>
                        <DatePicker
                            mode="date"
                            date={date2}
                            placeholder={formattedDate}
                            format="YYYY-MM-DD"
                            minDate={this.state.date}
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
                            onDateChange={(date2) => { this.setState({ date2, showDate: true, call: true }); }}
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

export default connect(mapStateToProps, mapDispatchToProps)(DifDatas);
