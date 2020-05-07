import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { RadioButton } from 'react-native-paper';
import { colors } from '../../styles';

import { TouchableOpacity, Text } from 'react-native';
import { ViewButtons, ViewButtonNo, ViewButtonYes, RadioText } from './styles';

export default CheckBall = ({ handleCheck, checked }) => (
    <ViewButtons>
        <RadioText>FOTO LEGÍVEL?</RadioText>
        <ViewButtonYes>
            <RadioButton
                value="yes"
                status={checked === 'yes' ? 'checked' : 'unchecked'}
                onPress={() => { handleCheck({ checked: 'yes' }) }}
                color={colors.secundary}
                uncheckedColor={colors.black}
            />
            <RadioText onPress={() => { handleCheck({ checked: 'yes' }) }}>SIM</RadioText>
        </ViewButtonYes>
        <ViewButtonNo>
            <RadioButton
                value="no"
                status={checked === 'no' ? 'checked' : 'unchecked'}
                onPress={() => { handleCheck({ checked: 'no' }) }}
                color={colors.secundary}
                uncheckedColor={colors.black}
            />
            <RadioText onPress={() => { handleCheck({ checked: 'no' }) }}>NÃO</RadioText>
        </ViewButtonNo>
    </ViewButtons>
);