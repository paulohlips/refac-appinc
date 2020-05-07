import React, { Component } from "react";
import Icon from "react-native-vector-icons/FontAwesome5";
// redux
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { Creators as FormActions } from "../../store/ducks/form";
import { Header, NotesForm } from "../../globalComponents";

// styles
import {
  View,
  FlatList,
  ScrollView,
  TouchableOpacity,
  Text,
  ProgressBarAndroid,
  BackHandler,
  Animated
} from "react-native";
import styles from "./styles";
import ComponentList from "./components/ComponentsList";
import ComponentBox from "./components/ComponentBox";

import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

const COMPONENT_EXAMPLE = [
  {
    hint: "Componente data",
    group: "true",
    label: "Informações do veículo",
    required: "true",
    data_name: "info_veiculo",
    lenght_max: "",
    length_min: "",
    invalid_text: "",
    default_value: "",
    component_type: "scanner",
    required_message: ""
  }
];

var i = 1;

class StepPage extends Component {
  state = {
    move: new Animated.Value(0),
    viewModal: false,
    viewModalArray: [],
  };
  componentDidMount() {
    BackHandler.addEventListener("hardwareBackPress", this.saveStep);
    Animated.timing(this.state.move, {
      toValue: 0,
      duration: 200,
      delay: 250
    }).start();
  }
  componentWillMount() {
    BackHandler.removeEventListener("hardwareBackPress", this.saveStep);  
  }

  componentWillUnmount() {
    BackHandler.removeEventListener("hardwareBackPress", this.saveStep);
  }

  onCloseModal = () => {
    const { viewModal } = this.state;
    if (viewModal) {
      this.setState({ viewModal: false });
    } else {
      this.setState({ viewModal: true });
    }
  };

  saveStep = () => {
    this.props.saveStepState();
    this.props.startUpdateProgress();
    this.props.navigation.navigate("StepList");
    return true;
  };

  render() {
    const { navigation } = this.props;
    const { viewModal, viewModalArray } = this.state;
    const step = navigation.getParam("step"); // pra testar group comentar essa linha

    return (
      <View style={styles.container}>
        <Header
          title={this.props.navigation.state.params.step.step_name}
          showArrow
          showProgress
          showInfo
          info={this.props.navigation.state.params.step.info_step}
          goBack={this.props.navigation.goBack}
        />

        <KeyboardAwareScrollView scrollEnabled={true} extraScrollHeight={50}>
          {//troca step.components por COMPONENT_EXAMPLE para testar group
          step.components.map((item, i) => {
            i = i + 1;
            return (
              <ComponentBox data={item} num={i} />
            );
          })}
        </KeyboardAwareScrollView>        
      </View>
    );
  }
}

StepPage.navigationOptions = ({ navigation }) => ({
  // title: navigation.state.params.step.titulo,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(FormActions, dispatch);

export default connect(
  null,
  mapDispatchToProps
)(StepPage);

/*
 <Header
        title={this.props.navigation.state.params.step.step_name}
        showArrow
        showProgress
        showInfo
        info={this.props.navigation.state.params.step.info_step}
        goBack={this.props.navigation.goBack}
      />
*/
