
import React, { Component } from 'react';
//redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as FormsActions } from '../../../../store/ducks/form';
import { Creators as GroupActions } from '../../../../store/ducks/group';
import { Creators as NotesActions } from '../../../../store/ducks/notes';

// styles
import { View, Text, TouchableOpacity, ProgressBarAndroid, Animated } from 'react-native';
import { withNavigation } from 'react-navigation';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { responsividade } from '../../../../styles';
import ProgressBar from './../../../../components/progressbar'


class StepBoxComponent extends Component {
  state = {
    functionConstructor: null,
    callFunction: null,
    createdForms: null,
    arrayProgress: {},
    progress: 0,
    countProgress: '',
    array: '',
    paolo: 2,

    move: new Animated.Value(0),
  }

  componentDidMount() {
    Animated.timing(this.state.move, {
      toValue: 0,
      duration: 300,
      delay: this.props.index * 150,
    }).start();
  }

  createFormsSave = async () => {
    const {
      getCreateForm,
      steps,
      formState,
      createDataGroup,
      creteArrayNotes,
    } = this.props;

    this.setState({ createdForms: true });
    const arrayProgress = {
      name: steps.item.step_name,
      array: [],
      length: 0,
    };

    if (formState.formEdit) {
      steps.item.components.forEach(component => {

        const form = {};

        if (component.component_type === 'date') {
          for (var key1 in formState.step) {
            if (component.data_name === key1.key) {
              form[component.data_name] = key1;
            }
          }
        } else {
          for (var key in formState.step) {
            if (component.data_name === key.key) {
              form[component.data_name] = key;
            }
          }
        }

        getCreateForm(form);
        arrayProgress.array.push(component.data_name);
        const lengthArray = arrayProgress.array.length;
        arrayProgress.length = lengthArray;
        this.setState({ arrayProgress, callFunction: true });
      });
    } else {
      steps.item.components.forEach(component => {

        const form = {};
        let notes = {};
        let group = {};
        let prototype = {};

        if (component.component_type === 'date') {
          form[component.data_name] = { key: component.data_name, value: '1980-01-21', filled: null, type: component.component_type };
        } else if (component.component_type === 'group') {
          component.components_group.map(item => {
            prototype[item.data_name] = {
              key: item.data_name,
              value: null,
              filled: false,
              extra: null,
            };
          })
          form[component.data_name] = { 
            key: component.data_name, 
            value: component.default_value, 
            filled: null, 
            type: component.component_type
          };
          createDataGroup(component.data_name, prototype);
        } else if (component.component_type === 'camera') {
          form[`leg_${component.data_name}`] = {
            key: component.data_name,
            value: component.default_value,
            filled: null,
            type: 'text',
          };
          getCreateForm(form);
          form[component.data_name] = {
            key: component.data_name,
            value: [],
            filled: null,
            type: component.component_type,
          };
          getCreateForm(form);
        } else if (component.component_type === 'audiorec') {
          form[component.data_name] = {
            key: component.data_name,
            value: component.default_value,
            filled: null,
            type: component.component_type
          };
        } else {
          form[component.data_name] = {
            key: component.data_name,
            value: component.default_value,
            filled: null,
            type: component.component_type
          };
        }

        notes = {
          key: component.data_name,
          value: null
        }
        creteArrayNotes(notes);
        getCreateForm(form);
        arrayProgress.array.push(component.data_name);
        const lengthArray = arrayProgress.array.length;
        arrayProgress.length = lengthArray;
        this.setState({ arrayProgress, callFunction: true });
      });
    }
  }

  compareProgress = async () => {
    this.setState({ callFunction: null, functionConstructor: true })
    this.props.finishUpdateProgress();
    const { step } = this.props.formState;
    const { arrayProgress } = this.state;
    var progress = 0;
    var countProgress = 0;
    var variable = 0;

    if (arrayProgress.length > 0) {
      for (var key in step) {
        arrayProgress.array.map(item => {
          if (item === key && step[key].filled === true) {
            countProgress++;
          }
        })
      }
    }
    progress = countProgress / arrayProgress.length;

    variable = (responsividade.LARGURACARD * 0.82) * progress;


    this.setState({ progress, count: countProgress, array: arrayProgress.length, paolo: variable });
  }

  render() {
    const { steps, form, formState, index } = this.props;
    const { createdForms, arrayProgress, callFunction, progress, paolo } = this.state;
    const { item } = steps;
    let group = false;
    if(item.components[0].component_type === 'group') {
      group = true
    }
    
    if (!createdForms) {
      this.createFormsSave();
    }
    if (callFunction || formState.updateProgress) {
      this.compareProgress();
    }

    return (
      <Animated.View style={{
        ...styles.container,
        left: this.state.move,
        opacity: this.state.move.interpolate({
          inputRange: [0, 40],
          outputRange: [1, 0],
        }),
      }}>
        <TouchableOpacity onPress={() => this.props.navigation.navigate('StepPage', { step: item })}>
          <View style={styles.card_titulo}>
            <Text style={styles.titulo}>{item.step_name}</Text>
          </View>
          <View style={styles.card_descricao}>
            <Text style={styles.descricao}>{item.step_description}</Text>
          </View>
          <View style={styles.row}>
            <View style={styles.bar}>
              {
                !group &&
                  <ProgressBar progress={paolo} />
              }
              
            </View>
            <View style={styles.number_view}>
              {
                !group &&
                  <Text style={styles.number}>
                    {this.state.count + "/" + this.state.array}
                  </Text>
              }              
            </View>
          </View>

        </TouchableOpacity>
      </Animated.View>
    );
  }
}

const mapStateToProps = state => ({
  formState: state.formState,
  form: state.formState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators({
    ...FormsActions,
    ...GroupActions,
    ...NotesActions,
  }, dispatch);

const StepBox = connect(mapStateToProps, mapDispatchToProps)(StepBoxComponent);

export default withNavigation(StepBox);
