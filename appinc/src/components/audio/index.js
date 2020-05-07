import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  TouchableOpacity,
  Text,
  View,
  TouchableHighlight,
  Platform,
  PermissionsAndroid,
  Image,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import Sound from 'react-native-sound';
import { AudioRecorder, AudioUtils } from 'react-native-audio';
import styles from './styles';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormActions } from '../../store/ducks/form';
import { Creators as NoteActions } from '../../store/ducks/notes';


class AudioRec extends Component {

  state = {
    currentTime: 0.0,
    recording: false,
    paused: false,
    stoppedRecording: false,
    finished: false,
    audioPath:  AudioUtils.MusicDirectoryPath + '/test.aac',
    hasPermission: true,
    gravarcor: 'black',
    stopcor: 'black',
    playcor: 'black',
    savedNote: false,
  };

  gravar = () => {

    this.setState({ gravarcor: 'red' });

  }

  stop = () => {

    this.setState({ gravarcor: 'black' });
    this.setState({ stopcor: 'grey' });

  }

  play = () => {

    this.setState({ stopcor: 'black' });
    this.setState({ playcor: 'grey' });

  }


  pausar = () => {

    this.setState({ gravarcor: 'black' });

  }


  prepareRecordingPath(audioPath) {
    AudioRecorder.prepareRecordingAtPath(audioPath, {
      SampleRate: 22050,
      Channels: 1,
      AudioQuality: "Low",
      AudioEncoding: "aac",
      AudioEncodingBitRate: 32000
    });
  }

  componentDidMount() {
    const { data, noteState } = this.props;
    if (data.note) {
      noteState.data.map(note => {
        if (note.key === data.data_name && note.value !== null) {
          this.setState(note.value.stateAudio);                 
        } else {
          this._checkPermission().then((hasPermission) => {
            this.setState({ hasPermission });
            this.prepareRecordingPath(this.state.audioPath);
      
            AudioRecorder.onProgress = (data) => {
              this.setState({ currentTime: Math.floor(data.currentTime) });
            };
            AudioRecorder.onFinished = (data) => {
              if (Platform.OS === 'ios') {
                this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
              }
            };
          });
        }        
      }) 
    } else {
      this._checkPermission().then((hasPermission) => {
          this.setState({ hasPermission });
          this.prepareRecordingPath(this.state.audioPath);
    
          AudioRecorder.onProgress = (data) => {
            this.setState({ currentTime: Math.floor(data.currentTime) });
          };
          AudioRecorder.onFinished = (data) => {
            if (Platform.OS === 'ios') {
              this._finishRecording(data.status === "OK", data.audioFileURL, data.audioFileSize);
            }
          };
        });
    }
    
  }

  _checkPermission() {
    if (Platform.OS !== 'android') {
      return Promise.resolve(true);
    }

    const rationale = {
      'title': 'Microphone Permission',
      'message': 'AudioExample needs access to your microphone so you can record audio.'
    };

    return PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.RECORD_AUDIO, rationale)
      .then((result) => {
        console.log('Permission result:', result);
        return (result === true || result === PermissionsAndroid.RESULTS.GRANTED);
      });
  }

  _renderButton(title, onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;

    if (title === 'GRAVAR') {
      return (
        <TouchableHighlight style={styles.button} onPress={onPress}>
          <Icon name="md-microphone" size={28} style={{ color: this.state.gravarcor }} />
        </TouchableHighlight>
      );
    }

    if (title === 'PARAR') {
      return (
        <TouchableHighlight style={styles.button} onPress={onPress}>
          <Icon name="md-square" size={28} style={{ color: this.state.stopcor }} />
        </TouchableHighlight>
      );
    }

    if (title === 'PLAY') {
      return (
        <TouchableHighlight style={styles.button} onPress={onPress}>
          <Icon name="md-play" size={28} style={{ color: this.state.playcor }} />
        </TouchableHighlight>
      );
    }

  }

  _renderPauseButton(onPress, active) {
    var style = (active) ? styles.activeButtonText : styles.buttonText;
    var title = this.state.paused ? "RESUME" : "PAUSE";

    if (title === 'RESUME') {
      return (
        <TouchableHighlight style={styles.button} onPress={onPress}>
          <Text>Cont.</Text>
        </TouchableHighlight>
      );
    }

    if (title === 'PAUSE') {
      return (
        <TouchableHighlight style={styles.button} onPress={onPress}>
          <Icon name="md-pause" size={28} style={styles.icon} />
        </TouchableHighlight>
      );
    }

  }

  async _pause() {
    if (!this.state.recording) {
      console.warn('Can\'t pause, not recording!');
      return;
    }

    try {
      const filePath = await AudioRecorder.pauseRecording();
      this.setState({ paused: true });
    } catch (error) {
      console.error(error);
    }
  }

  async _resume() {
    if (!this.state.paused) {
      console.warn('Can\'t resume, not paused!');
      return;
    }

    try {
      await AudioRecorder.resumeRecording();
      this.setState({ paused: false });
    } catch (error) {
      console.error(error);
    }
  }

  async _stop() {
    if (!this.state.recording) {
      console.warn('Can\'t stop, not recording!');
      return;
    }

    this.setState({ stoppedRecording: true, recording: false, paused: false });

    try {
      const filePath = await AudioRecorder.stopRecording();

      if (Platform.OS === 'android') {
        this._finishRecording(true, filePath);
        //this.props.submitAudio(filePath)
      }
      this.setState({ filePath });
      return filePath;
    } catch (error) {
      console.error(error);
    }
  }

  async _play() {
    if (this.state.recording) {
      await this._stop();
    }

    // These timeouts are a hacky workaround for some issues with react-native-sound.
    // See https://github.com/zmxv/react-native-sound/issues/89.
    setTimeout(() => {
      var sound = new Sound(this.state.audioPath, '', (error) => {
        if (error) {
        }
      });

      setTimeout(() => {
        sound.play((success) => {
          if (success) {
          } else {
          }
        });
      }, 100);
    }, 100);
  }

  async _record() {
    if (this.state.recording) {
      console.warn('Already recording!');
      return;
    }

    if (!this.state.hasPermission) {
      console.warn('Can\'t record, no permission granted!');
      return;
    }

    if (this.state.stoppedRecording) {
      this.prepareRecordingPath(this.state.audioPath);
    }

    this.setState({ recording: true, paused: false });

    try {
      const filePath = await AudioRecorder.startRecording();
    } catch (error) {
      console.error(error);
    }
  }

  _finishRecording(didSucceed, filePath, fileSize) {
    this.setState({ finished: didSucceed });
  }

  saveFormAudio = data => {
    const { filePath, audioPath } = this.state;
    const { form, getSaveStateForm, startControlArray } = this.props;

    if (filePath) {
      for (var key in form.step) {
        if (key === data.data_name) {
          const form = {};
          form[data.data_name] = {
            key: data.data_name,
            value: {
              uri: 'file://' + filePath,
              type: 'audio/amr',
              name: audioPath,
            },
            filled: true
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
              uri: '',
              type: '',
              name: '',
            },
            filled: false,
          };
          getSaveStateForm(form);
        }
      }
    }
    startControlArray();
  }

  saved() {
    this.setState({ savedNote: true });
    let that = this;
    setTimeout(function () { that.setState({ savedNote: false }); }, 4000);
  }


  render() {
    const { 
      data_name, 
      label, 
      hint, 
      default_value, 
      newState,
      note,
    } = this.props.data;
    const { noteState, resetSaveNote } = this.props;
    const { saveStep, step } = this.props.form;
    const { filePath, audioPath, savedNote } = this.state;
    if (note){
      if (noteState.saveNote) {
        noteState.data.map(note => {
          if (note.key === data_name) {
            this.props.addNote({
              key: data_name,
              value: {
                uri: 'file://' + filePath,
                type: 'audio/amr',
                name: audioPath,
                stateAudio: this.state,
              },
            });
          }
        })
        this.saved();        
        resetSaveNote();
      }  
    }

    if (saveStep) {
      this.saveFormAudio({ data_name, default_value });
    }
    return (

      <View style={styles.container}>
        {
          savedNote && (
            <Text style={styles.msgsave}>Nota Salva</Text>
          )
        }
        <View style={styles.controls}>
          {this._renderButton('GRAVAR', () => { this._record(); this.gravar() }, this.state.recording)}
          {this._renderButton('PARAR', () => { this._stop(); this.stop() })}
          {this._renderButton('PLAY', () => { this._play(); this.play() })}
          {this._renderPauseButton(() => { this.state.paused ? this._resume() : this._pause(); this.pausar() })}
          <View style={styles.seconds}>
            <Text style={styles.progressText}>{this.state.currentTime}s</Text>
          </View>
        </View>
      </View>



    );
  }
}

const mapStateToProps = state => ({
  form: state.formState,
  noteState:  state.noteState,
});

const mapDispatchToProps = dispatch => bindActionCreators({ ...FormActions, ...NoteActions }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AudioRec);
