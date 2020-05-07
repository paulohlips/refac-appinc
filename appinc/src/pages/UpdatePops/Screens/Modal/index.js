import React, { Component } from 'react';
import { Modal, TouchableOpacity, View, Text} from 'react-native';

import styles from './styles';

class CheckModal extends Component {
    state = {}
    render() {
        const { viewModal, onClose, onCloseEdit, onCloseDeletePops} = this.props;
        return (
            <Modal
                animationType="slide"
                transparent={true}
                visible={viewModal}
                onRequestClose={() => onClose()}
            >
                <View style={styles.container}>
                   <View style={styles.box}>
                    <Text style={styles.title}>Atenção!</Text>
                    <Text style={styles.description}>Tem certeza que deseja apagar os itens selecionados?</Text>
                    <View style={styles.containerButton}>                        
                        <TouchableOpacity style={styles.buttonNo} onPress={() => onClose()}>
                            <Text style={styles.textNo}>NÃO</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.buttonYes} onPress={() => onCloseDeletePops()}>
                            <Text style={styles.textYes}>SIM</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity style={styles.buttonExit} onPress={() => onCloseEdit()}>
                        <Text style={styles.textNo}>Sair da Edição</Text>
                    </TouchableOpacity>
                   </View>
                </View>
            </Modal>
        );
    }
};

export default CheckModal;