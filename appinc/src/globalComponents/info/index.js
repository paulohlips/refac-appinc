import React, { Component } from 'react';
import { View, Text, Modal, TouchableHighlight, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from './styles';

class Info extends Component {        

    render() {        
        const { closeModalInfo, modalVisible, textInfo } = this.props;
        return (            
            <Modal
                animationType="slide"
                transparent={false}
                visible={modalVisible}
                onRequestClose={() => {}}
            >
                <View style={styles.container}>
                    <View style={styles.buttonContainer}>
                        <TouchableHighlight onPress={() => closeModalInfo()}>
                            <Icon name="md-close" size={28} style={styles.iconClose} />
                        </TouchableHighlight>
                    </View>
                    <ScrollView>
                        <View style={styles.box}>                        
                                <Text style={styles.text}>{textInfo}</Text>                       
                        </View>
                    </ScrollView>
                </View>
            </Modal>
        );
    }    
}

export default Info;
