import React, { Component } from 'react';
import { Text, View , StyleSheet, Animated , TouchableOpacity} from 'react-native';
import styles from './styles';
import {responsividade} from './../../styles'

/*<TouchableOpacity onPress = { () => {}} style = {styles.action_view}>
<Text style = {{ color : this.props.fontcolor }}>OK</Text>
</TouchableOpacity>*/



export default class SnackBar extends Component {

    state = {
        x: new Animated.Value(responsividade.largura_tela),
    }


  componentDidMount () {
        Animated.sequence([
            Animated.timing(this.state.x , {
                toValue: 0,
                duration: 400,
            }),
            Animated.delay(2000),
        Animated.timing(this.state.x , {
                toValue: responsividade.largura_tela,
                duration: 400,
            })
        ]
        ).start()
  

  }

    closeSnack = () =>  {

        Animated.timing(this.state.x , {
            toValue: -100,
            duration: 200,
        }).start()

    }
  

  render() {
      const { inside , outside , Login } = this.props;
    return (
      <View style = {styles.container}>
      
      {
          inside && (
           
            <Animated.View style = {{ 
                justifyContent: 'space-between',
                width: responsividade.largura_tela*0.9,
                height: 60,
                left: this.state.x,
                top: responsividade.largura_tela * 0.2,
                borderRadius: 5,
                alignItems: 'center',
                backgroundColor: this.props.color,
                margin: 20,
                elevation: 1,
                flexDirection: 'row',
                paddingHorizontal : 20,
                //position: 'absolute',
            }}>
                <View style = {styles.text_view}>
                    <Text style = {{ fontSize: 16 , color: this.props.fontcolor,}}>{this.props.content}</Text>
                </View>
                
            </Animated.View> 
          )
      }


{
          outside && (
            <Animated.View style = {{ 
                justifyContent: 'space-between',
                width: 330,
                height: 60,
                left: this.state.x,
                top: responsividade.largura_tela*0.15,
                borderRadius: 5,
                alignItems: 'center',
                backgroundColor: this.props.color,
                margin: 20,
                elevation: 1,
                flexDirection: 'row',
                paddingHorizontal : 20,
                //position: 'absolute',
            }}>
                <View style = {styles.text_view}>
                    <Text style = {{ fontSize: 16 , color: this.props.fontcolor,}}>{this.props.content}</Text>
                </View>
            
            </Animated.View> 
          )
      }

{
          Login && (
           
            <Animated.View style = {{ 
                justifyContent: 'space-between',
                width: responsividade.largura_tela*0.9,
                height: 60,
                left: this.state.x,
                top: responsividade.largura_tela * 0.05,
                borderRadius: 5,
                alignItems: 'center',
                backgroundColor: this.props.color,
                margin: 20,
                elevation: 1,
                flexDirection: 'row',
                paddingHorizontal : 20,
                //position: 'absolute',
            }}>
                <View style = {styles.text_view}>
                    <Text style = {{ fontSize: 16 , color: this.props.fontcolor,}}>{this.props.content}</Text>
                </View>
                
            </Animated.View> 
          )
      }
       </View>

        
    )
  }
}

  