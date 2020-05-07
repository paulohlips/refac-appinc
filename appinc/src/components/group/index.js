import React, { Component } from 'react';
// redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Creators as GroupActions } from '../../store/ducks/group';
import ComponentList from '../../pages/Step/components/ComponentsList';

// styles
import { View, TextInput, Text, ScrollView, TouchableOpacity } from 'react-native';
import styles from './style';
import Icons from 'react-native-vector-icons/FontAwesome5';

const TEST = [
  {
    key: 'data_ref1',
    value: {
      hint: 'data_amostra',
      group: true,
      label: 'Identificação de material',
      required: true,
      data_name: 'data_ref1',
      lenght_max: 60,
      length_min: 3,
      invalid_text: "",
      default_value: 'Fulano',
      component_type: 'date',
      required_message: 'O campo é obrigatório',
    }
  },
  {
    key: 'data_ref1',
    value: {
      hint: 'data_amostra',
      group: true,
      label: 'Identificação de material',
      required: true,
      data_name: 'data_ref1',
      lenght_max: 60,
      length_min: 3,
      invalid_text: "",
      default_value: 'Fulano',
      component_type: 'text',
      required_message: 'O campo é obrigatório',
    }
  }
]
class Group extends Component {
  state = {
    prototype: [],
    dataGroup: [],
    arrayGroup: [],
    groupName: '',
  }

  componentWillReceiveProps(nextProps) {
    const { group, data } = this.props;

    group.dataGroup.map(item => {
      if (item.key === data.data_name) {
        const array = Object.values(item.value);
        this.setState({ arrayGroup: item.value, groupName: item.key })
      }
    }
    )
  }

  componentWillMount() {
    const { group, data } = this.props;

    group.dataGroup.map(item => {
      if (item.key === data.data_name) {
        const array = Object.values(item.value);
        this.setState({ arrayGroup: item.value, groupName: item.key })
      }
    }
    )

    if (!group.flag) {
      //this.readGroup();
    }

    //this.decrementDataGroup();
  }



  renderOneGroupTest = group => {
    // array = Object.values(group)
    //array.map(item => <ComponentList data={item.value} />)
    Object.keys(group).map(item => { return <ComponentList data={group[item].value} /> })

  };

  renderOneGroup = (index, groupName) => {
    const { group, resetUpdateView } = this.props;
    if (group.updateViewGroup) {
      //resetUpdateView();
      return this.props.data.components_group.map(item => <ComponentList data={item} index={index} groupName={groupName} />);

    }
  }



  increment = () => {
    const { groupName } = this.state;
    this.props.incrementDataGroup(groupName);

    /*const { group } = this.props;
    const { dataGroup, prototype } = this.state;
    const size = group.dataGroup.length;
    var prototypeVar = prototype;
    prototypeVar = {
      ...prototype,
      index: Math.random(),
    }
    this.props.incrementDataGroup(prototypeVar)*/
  }

  readGroup = () => {
    this.props.activeFlag();
    const { components_group } = this.props.data;
    const { dataGroup } = this.state;
    const array = {}
    let count = 0;

    components_group.map(item => {
      array[item.data_name] = null;
      this.setState({ prototype: array });
    });
    array['index'] = Math.random();
    array['extra'] = null;
    this.props.incrementDataGroup(array);
    this.setState({ prototype: array, dataGroup: [...dataGroup, array] });
  }

  decrement = (id) => {
    const { groupName } = this.state;
    this.props.decrementDataGroup(id, groupName);
  };

  render() {
    const { group, data, resetUpdateView } = this.props
    const { dataGroup, arrayGroup, groupName } = this.state;
    let lastItem = 0;
    return (
      <View style={styles.container}>
        <ScrollView
          horizontal
          pagingEnabled
          ref={ref => this.scrollView = ref}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.scrollView.scrollToEnd({ animated: true, duration: 3000 });
          }}
        >
          {
            arrayGroup.map(item2 => {
              lastItem += 1;
              return (
                <View style={styles.boxGroup}>
                  {this.renderOneGroup(item2.index, groupName)}

                  {
                    arrayGroup.length === lastItem
                      ? <TouchableOpacity style={styles.viewMinus} onPress={() => this.decrement(item2.index)}>
                        <Icons name="minus" size={18} color="#FFF" />
                      </TouchableOpacity>
                      : null
                  }
                </View>
              )
            }
            )
          }
        </ScrollView>

        <TouchableOpacity style={styles.viewPlus} onPress={() => this.increment()}>
          <Icons name="plus" size={18} color="#232f34" />
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  group: state.groupState,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(GroupActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Group);

/*
<View style={styles.viewIndicator}>
          {
            group.dataGroup.map(item => <View style={styles.indicator} />)
          }
        </View>


            arrayGroup.map(item =>
              <View style={styles.boxGroup}>
                {this.renderOneGroup(item.index, groupName)}
                <TouchableOpacity style={styles.viewMinus} onPress={() => this.decrement(item.index)}>
                  <Icons name="minus" size={18} color="#FFF" />
                </TouchableOpacity>
              </View>
            )
*/