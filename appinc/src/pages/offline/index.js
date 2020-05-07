import React, { Component } from 'react';
import { View, Text, AsyncStorage, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { Header } from '../../globalComponents';
import { NavigationActions, withNavigation } from 'react-navigation';
import styles from './styles';
import Icon from 'react-native-vector-icons/Ionicons';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Creators as NewActions } from '../../store/ducks/new';

class Offline extends Component {

    state = {
        arrayRef: null,
        modalVisible: false,
        form: null,
    }
    async componentWillMount() {
        const arrayRef = await AsyncStorage.getItem('arrayRef');
        const array = JSON.parse(arrayRef);
        this.setState({ arrayRef: array });
    }

    restoreForm = async name => {
        const { navigation, restoreFormState, setForm } = this.props;
        const formAsync = await AsyncStorage.getItem(name);
        const form = JSON.parse(formAsync);
        await setForm(form.form);
        await restoreFormState(form);
        navigation.navigate('StepList');
    }

    renderCard = item => {
        return (
            <TouchableOpacity style={styles.box} onPress={() => this.restoreForm(item)}>
                <Text style={styles.status1}>{" Minha Perícia" + " - " + item}</Text>
                <View style={styles.row}>
                    <Text style={styles.status1}> Status :</Text>
                    <Text style={styles.status}> Em andamento</Text>
                </View>
                <Text style={styles.status1}> Última modificação : 07/02/2019</Text>
            </TouchableOpacity>
        );
    }


    render() {
        const { arrayRef, modalVisible, form } = this.state;
        const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <Header
                    showMenu
                    showClear
                    openMenu={navigation.toggleDrawer}
                    title='Minhas Perícias Offline'
                />
                <Modal
                    animationType="slide"
                    transparent={false}
                    visible={modalVisible}
                    onRequestClose={() => { }}
                >
                    <View style={styles.containerModal}>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity onPress={() => this.setState({ modalVisible: false })}>
                                <Icon name="md-close" size={28} style={styles.iconClose} />
                            </TouchableOpacity>
                        </View>
                        <ScrollView>
                            <View style={styles.box}>
                                {
                                    form && (
                                        <Text style={styles.text}>{form}</Text>
                                    )
                                }

                            </View>
                        </ScrollView>
                    </View>
                </Modal>
                <View style={styles.main}>
                    <ScrollView>
                        {
                            arrayRef && (
                                arrayRef.map(item => this.renderCard(item))
                            )
                        }
                    </ScrollView>
                </View>
            </View>
        );
    }
}


const mapStateToProps = state => ({
    form: state.formState,
});

const mapDispatchToProps = dispatch =>
    bindActionCreators({ ...FormActions, ...NewActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Offline);
