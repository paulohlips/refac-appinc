import React, { Component } from 'react';
import { View, Text, TouchableOpacity, Animated, FlatList } from 'react-native';
import styles from './styles';
import { colors, responsividade } from '../../styles';

class PickerItem extends Component {
    state = {
        shift: new Animated.Value(responsividade.ALTURA_INPUT),
        setPicker: false,
        valueText: 'Escolha uma opção',
        valuePicker: null,
        configPicker: [],
    }

    componentWillMount() {
        const { arrayConfig } = this.props;
        this.setState({ configPicker: arrayConfig })
    }
    setPicker = item => {
        const { setPicker, shift, configPicker, valueText } = this.state
        const { receiveProps } = this.props;
        const size = configPicker.length;
        if (item !== undefined) {
            this.setState({ valueText: item.name, valuePicker: item.value });
            receiveProps(item.value);
        }

        if (setPicker) {
            this.setState({ setPicker: false })
            Animated.timing(shift, {
                toValue: responsividade.ALTURA_INPUT,
                duration: 200,
            }).start();
        } else {
            this.setState({ setPicker: true })
            Animated.timing(shift, {
                toValue: (size + 1) * responsividade.ALTURA_INPUT,
                duration: 200,
            }).start();
        }

    }

    renderPicker = props => {
        return (
            <TouchableOpacity onPress={() => this.setPicker(props.item)}>
                <View style={styles.onePicker}>
                    <Text>{props.item.name}</Text>
                </View>
            </TouchableOpacity>
        );
    }

    render() {
        const { valueText, valuePicker, configPicker } = this.state;
        return (
            <Animated.View style={{ ...styles.container, height: this.state.shift }}>
                <TouchableOpacity onPress={() => this.setPicker()}>
                    <View style={styles.onePicker}>
                        <Text>{valueText}</Text>
                    </View>
                </TouchableOpacity>
                <FlatList
                    data={configPicker}
                    keyExtractor={key => key.text}
                    renderItem={item => this.renderPicker(item)}
                />
            </Animated.View>
        );
    }
}

export default PickerItem;