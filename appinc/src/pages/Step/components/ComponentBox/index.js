import React, { Component } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Animated
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import styles from "./styles";
import { NotesForm } from "../../../../globalComponents";

import ComponentList from "../ComponentsList";

class ComponentBox extends Component {
  state = {
    viewModal: false
  };

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
    const { data, num } = this.props;
    const { viewModal } = this.state;
    return (
      <View style={styles.coluna}>
        <View style={styles.linha}>
          <View style={styles.ball}>
            <Text style={styles.numberType}>{num}</Text>
          </View>
          <View style={styles.textTypeView}>
            <Text style={styles.textType}> {data.label}: </Text>
          </View>

          <TouchableOpacity onPress={() => this.onCloseModal()}>
            <Icon
              name="ellipsis-h"
              size={15}
              color="black"
              style={styles.icon}
            />
          </TouchableOpacity>
        </View>
        <ComponentList data={data} index={num} />
        {viewModal && (
          <NotesForm
            viewNotes={viewModal}
            onCloseNotes={this.onCloseModal}
            data={data}
          />
        )}
      </View>
    );
  }
}

export default ComponentBox;
