import React, { Component } from 'react';
import { View, ScrollView, Animated } from 'react-native';
import {
  InputText,
  AudioRec,
  Camera,
  MyDatePicker,
  GeoLocation,
  Veiculos,
  Check,
  Scanner,
  Sketch,
  Vestigios,
  OCR,
  DifDatas,
  Group,
  VeiculoCheck,
  InfoVeiculo,
  AvariaVeiculo
} from '../../../../components';
import styles from './styles';

class ComponentList extends Component {
  state = {
    move: new Animated.Value(5),
  }

  componentDidMount() {
    Animated.timing(this.state.move, {
      toValue: 0,
      duration: 200,
      delay: 300
    }).start();
  }
  render() {
    return (
      <Animated.View style={{
        ...styles.container,
        right: this.state.move,
        opacity: this.state.move.interpolate({
          inputRange: [0, 20],
          outputRange: [1, 0],
        })
      }}>
        <ScrollView>
          {
            this.props.data.component_type === 'group' && (
              <View style={styles.component}>
                <Group data={this.props.data} />
              </View>
            )
          }
          {
            this.props.data.component_type === 'infoveiculo' && (
              <View style={styles.component}>
                <InfoVeiculo data={this.props.data} />
              </View>
            )
          }
                    {
            this.props.data.component_type === 'avariaveiculo' && (
              <View style={styles.component}>
                <AvariaVeiculo data={this.props.data} />
              </View>
            )
          }
          {
            this.props.data.component_type === 'periodo' && (
              <View style={styles.component}>
                <DifDatas data={this.props.data} index={this.props.data.group ? this.props.index : null} />
              </View>
            )
          }
          {
            this.props.data.component_type === 'ocr' && (
              <View style={styles.component}>
                <OCR data={this.props.data} index={this.props.data.group ? this.props.index : null} />
              </View>
            )
          }
          {
            this.props.data.component_type === 'cameraVeiculo' && (
              <View style={styles.component}>
                <Camera
                  data={this.props.data}
                  index={this.props.data.group ? this.props.index : null}
                  groupMother={this.props.data.group ? this.props.groupName : null}
                  cameraVeiculo
                />
              </View>
            )
          }
          {
            this.props.data.component_type === 'scanner' && (
              <View style={styles.component}>
                <Scanner
                  data={this.props.data}
                  index={this.props.data.group ? this.props.index : null}
                  groupMother={this.props.data.group ? this.props.groupName : null}
                />
              </View>
            )
          }

          {
            this.props.data.component_type === 'croqui' && (
              <View style={styles.component}>
                <Sketch data={this.props.data} />
              </View>
            )
          }

          {
            this.props.data.component_type === 'vestigio' && (
              <View style={styles.component}>
                <Vestigios data={this.props.data} />
              </View>
            )
          }

          {
            this.props.data.component_type === 'camera' && (
              <View style={styles.component}>
                <Camera
                  data={this.props.data}
                  index={this.props.data.group ? this.props.index : null}
                  groupMother={this.props.data.group ? this.props.groupName : null}
                />
              </View>
            )
          }
          {
            this.props.data.component_type === 'text' && (
              <View style={styles.component}>
                <InputText
                  data={this.props.data}
                  index={this.props.data.group ? this.props.index : null}
                  groupMother={this.props.data.group ? this.props.groupName : null}
                />
              </View>
            )
          }
          {
            this.props.data.component_type === 'audiorec' && (
              <View style={styles.component}>
                <AudioRec data={this.props.data} index={this.props.data.group ? this.props.index : null} />
              </View>
            )
          }
          {
            this.props.data.component_type === 'date' && (
              <View style={styles.component}>
                <MyDatePicker
                  data={this.props.data}
                  index={this.props.data.group ? this.props.index : null}
                  groupMother={this.props.data.group ? this.props.groupName : null}
                />
              </View>
            )
          }
          {
            this.props.data.component_type === 'geoloc' && (
              <View style={styles.component}>
                <GeoLocation data={this.props.data} index={this.props.data.group ? this.props.index : null} />
              </View>
            )
          }
          {
            this.props.data.component_type === 'veiculo' && (
              <View style={styles.component}>
                <Veiculos data={this.props.data} index={this.props.data.group ? this.props.index : null} />
              </View>
            )
          }
          {
            this.props.data.component_type === 'checkbox' && (
              <View style={styles.component}>
                <Check data={this.props.data} />
              </View>
            )
          }

        </ScrollView>
      </Animated.View>
    );
  }
}

export default ComponentList;
