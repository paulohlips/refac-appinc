import React, { Component } from 'react';
import { Text, View , StyleSheet} from 'react-native';
import styles from './styles';
import {responsividade} from './../../styles'


export default class ProgressBar extends Component {

  render() {
      const { progress } = this.props;
    return (
        <View style = {styles.container}>
            <View style = {styles.bar}>
                <View style = {{...styles.progress , width: progress}}>

                </View>
            </View>

            

            <View style = {styles.number}>

            </View>


        </View>

        
    )
  }
}

  