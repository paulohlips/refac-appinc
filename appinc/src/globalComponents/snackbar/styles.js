import { StyleSheet } from 'react-native';
import {responsividade} from './../../styles'

const styles = StyleSheet.create({
    container: {
        justifyContent: 'flex-end',
        alignItems: 'center',
        position: 'absolute',
        elevation: 1,
        zIndex: 1,
      },
  
      card: {
  
          justifyContent: 'space-between',
          width: 330,
          borderRadius: 5,
          alignItems: 'center',
          backgroundColor: 'white',
          margin: 20,
          flexDirection: 'row',
          paddingHorizontal : 20, 
      },
  
      text_view: {
          //backgroundColor: 'red',
      },
  
      text: {
          fontSize: 16,
          color: 'grey',
          //fontWeight: 'bold',
      },
  
      action: {
          fontSize: 16,
          color: '#6200EE',
          //fontWeight: 'bold',
      },
  
      action_view: {
          backgroundColor: 'pink',
          marginHorizontal: 8,
          padding: 10,
      }
});

export default styles;
