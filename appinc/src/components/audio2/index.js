import React, { Component } from "react";
import AudioRecorderPlayer from "react-native-audio-recorder-player";
import { TouchableOpacity, Text, View, Platform } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as FormActions } from "../../store/ducks/form";
import { Creators as NoteActions } from "../../store/ducks/notes";

class AudioRec extends Component {
  state = {
    savedNote: false,
    recordSecs: null,
    recordTime: null,
    name: "noname"
  };
  audioRecorderPlayer = new AudioRecorderPlayer();

  componentWillMount = () => {
    const { noteState, form, data, newState } = this.props;
    const { note, data_name } = data;
    if (note) {
      this.setState({ name: `note_${newState.reference}_${data_name}` });
      noteState.data.map(item => {
        if (item.key === data_name) {
          if (item.value) {
            if (
              `note_${newState.reference}_${data_name}` ===
              item.value.stateAudio.name
            ) {
              this.setState({
                savedNote: item.value.stateAudio.savedNote,
                recordSecs: item.value.stateAudio.recordSecs,
                recordTime: item.value.stateAudio.recordTime,
                name: item.value.stateAudio.name,
                filePath: item.value.stateAudio.filePath,
                currentPositionSec: item.value.stateAudio.currentPositionSec,
                currentDurationSec: item.value.stateAudio.currentDurationSec,
                playTime: item.value.stateAudio.playTime,
                duration: item.value.stateAudio.duration
              });
            }
          }
        }
      });
    } else {
      this.setState({ name: `${newState.reference}_${data_name}` });
      Object.keys(form.step).map(key => {
        if (key === data_name) {
          if (form.step[key].value) {
            this.setState(form.step[key].value.stateAudio);
          }
        }
      });
    }
  };

  onStartRecord = async () => {
    const { name } = this.state;
    const result = await this.audioRecorderPlayer.startRecorder(
      Platform.OS === "ios"
        ? `${name}.m4a`
        : `/storage/emulated/0/Music/${name}.mp3`
    );
    this.audioRecorderPlayer.addRecordBackListener(e => {
      this.setState({
        recordSecs: e.current_position,
        recordTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position)
        )
      });
      return;
    });
    this.setState({ filePath: result });
  };

  onStopRecord = async () => {
    const result = await this.audioRecorderPlayer.stopRecorder();
    this.audioRecorderPlayer.removeRecordBackListener();
    this.setState({
      recordSecs: 0
    });
  };

  onStartPlay = async () => {
    const { name } = this.state;
    const msg = await this.audioRecorderPlayer.startPlayer(
      Platform.OS === "ios"
        ? `${name}.m4a`
        : `/storage/emulated/0/Music/${name}.mp3`
    );
    this.audioRecorderPlayer.addPlayBackListener(e => {
      if (e.current_position === e.duration) {
        this.audioRecorderPlayer.stopPlayer();
      }
      this.setState({
        currentPositionSec: e.current_position,
        currentDurationSec: e.duration,
        playTime: this.audioRecorderPlayer.mmssss(
          Math.floor(e.current_position)
        ),
        duration: this.audioRecorderPlayer.mmssss(Math.floor(e.duration))
      });
      return;
    });
  };

  onPausePlay = async () => {
    await this.audioRecorderPlayer.pausePlayer();
  };

  onStopPlay = async () => {
    this.audioRecorderPlayer.stopPlayer();
    this.audioRecorderPlayer.removePlayBackListener();
  };

  // save audio in form
  saveFormAudio = data => {
    const { filePath } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;
    const { data_name } = data;

    if (filePath) {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = {
            key: data.data_name,
            value: {
              uri: filePath,
              type: "audio/mp3",
              name: `${data_name}.mp3`,
              stateAudio: this.state
            },
            filled: true,
            type: data.component_type
          };
          getSaveStateForm(form);
        }
      }
    } else {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = {
            key: data.data_name,
            value: {
              uri: "",
              type: "",
              name: ""
            },
            filled: false,
            type: data.component_type
          };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  };

  saved() {
    this.setState({ savedNote: true });
    let that = this;
    setTimeout(function() {
      that.setState({ savedNote: false });
    }, 4000);
  }

  render() {
    const { filePath, savedNote, recordTime } = this.state;
    const { data, noteState, form, resetSaveNote } = this.props;
    const { data_name, default_value, note, component_type } = data;
    const { saveStep } = form;

    if (note) {
      if (noteState.saveNote) {
        noteState.data.map(note => {
          if (note.key === data_name) {
            this.props.addNote({
              key: data_name,
              value: {
                uri: filePath,
                type: "audio/mp3",
                name: `note_${data_name}.mp3`,
                stateAudio: this.state
              }
            });
          }
        });
        this.saved();
        resetSaveNote();
      }
    }

    if (saveStep) {
      this.saveFormAudio({ data_name, default_value, component_type });
    }
    return (
      <View style={styles.container}>
        {savedNote && <Text style={styles.msgsave}>Nota Salva</Text>}
        <View style={styles.controls}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onStartRecord()}
          >
            <Icon name="md-microphone" size={28} style={{ color: "#000" }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onStopRecord()}
          >
            <Icon name="md-square" size={28} style={{ color: "#000" }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onStartPlay()}
          >
            <Icon name="md-play" size={28} style={{ color: "#000" }} />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => this.onPausePlay()}
          >
            <Icon name="md-pause" size={28} style={{ color: "#000" }} />
          </TouchableOpacity>
        </View>
        {recordTime && (
          <View style={styles.seconds}>
            <Text style={styles.progressText}>{recordTime} s</Text>
          </View>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
  noteState: state.noteState,
  newState: state.newState
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      ...FormActions,
      ...NoteActions
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(AudioRec);
