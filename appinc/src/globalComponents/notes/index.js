import React, { Component } from 'react';
import { Modal, View, Text, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome5';
import styles from './styles';
import { AudioRec, InputText } from '../../components';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as NotesActions } from '../../store/ducks/notes';

const dataInput = {
  hint: 'Nota de texto',
  note: true,
}
class NotesForm extends Component {
  state = {
    viewAudio: false,
    viewInput: false,
    viewSaveButton: false,
    viewMenu: true,
  }

  recordAudio = () => {
    this.setState({ viewAudio: true, viewMenu: false });
  }

  saveInputNote = () => {
    const { setSaveNote } = this.props;
    setSaveNote()
    // this.setState({ viewAudio: false, viewMenu: true });
  }

  onClose = () => {
    const { setSaveNote, onCloseNotes } = this.props;
    setSaveNote()
    onCloseNotes()
  }

  render() {
    const { viewNotes, onCloseNotes, data } = this.props;
    const { viewAudio, viewInput, viewMenu } = this.state;
    return (
      <Modal
        animationType="fade"
        transparent
        visible={viewNotes}
        onRequestClose={() => onCloseNotes()}
      >
        <TouchableOpacity style={styles.container} onPress={() => this.onClose()}>
          <View style={styles.box}>
            {
              viewMenu && (
                <View style={styles.box}>
                  <TouchableOpacity style={styles.button} onPress={() => this.recordAudio()}>
                    <Icon name="microphone-alt" size={20} color="black" style={styles.icon} />
                    <Text style={styles.textButton}>Gravar Audios</Text>
                  </TouchableOpacity>
                </View>
              )
            }
            {
              viewInput && (
                <View style={styles.box}>
                  <View style={styles.input}>
                    <InputText data={{ ...dataInput, data_name: data.data_name }} />
                  </View>
                  <TouchableOpacity style={styles.buttonSave} onPress={() => this.saveInputNote()}>
                    <Text style={styles.textButton}>SALVAR NOTA</Text>
                  </TouchableOpacity>
                </View>
              )
            }
            {
              viewAudio && (
                <View style={styles.box}>
                  <View style={styles.input}>
                    <AudioRec data={{ ...dataInput, data_name: data.data_name }} />
                  </View>
                  <TouchableOpacity style={styles.buttonSave} onPress={() => this.saveInputNote()}>
                    <Text style={styles.textButton}>SALVAR NOTA</Text>
                  </TouchableOpacity>
                </View>
              )
            }
          </View>
        </TouchableOpacity>
      </Modal>
    );
  }
}

const mapStateToProps = state => ({
  noteState: state.noteState,
});

const mapDispatchToProps = dispatch => bindActionCreators(NotesActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NotesForm);