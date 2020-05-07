import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

class Alert extends Component {        

    render() {        
        const { alertVisible, textInfo, goBack, closeModalAlert } = this.props;
        return (            
            <Modal
                animationType="slide"
                transparent={false}
                visible={alertVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight onPress={() => {
                          closeModalAlert(); 
                          goBack();
                          }}>
                            <Icon name="md-close" size={28} style={styles.iconClose} />
                        </TouchableHighlight>
                    </View>
                    <View style={styles.box}>                        
                      <Text style={styles.text}>Deseja salvar suas alterações</Text>                       
                    </View>                    
                </View>
            </Modal>
        );
    }    
}

export default Alert;
