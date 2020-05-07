import { StyleSheet } from 'react-native';
import { colors } from '../../styles';
const styles = StyleSheet.create({
    container: { 
        flex: 1,    
    },
    main: {
        padding: 10,     
    },
    card: {
        marginHorizontal: 20,
        marginVertical: 10, 
        padding: 15,
        borderRadius: 5,
        elevation: 3,   
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center',
        backgroundColor: colors.white,
    },
    title: {
        fontSize: 16,
        color: colors.darker,
    },
    name: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.black
    },
    containerModal: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkTransparent,
        padding: 15,
    },
    buttonContainer: { 
        width: 300,
        alignItems: 'flex-end',        
        backgroundColor: "#67382643",
    },
    iconClose: {
        color: colors.white,
    },
    box:{
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 5,
        // justifyContent: "flex-start",
        // alignItems: "center",
        padding: 20,
    
      },
    text: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'justify',
    },
    status:{

        height: 20,
        color: '#002F7F',
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 21,
        opacity: 0.6,
        marginTop: 3,
    
      },
      status1: {     
        height: 20,
        fontSize: 16,
        fontWeight: '500',
        lineHeight: 21,
        // opacity: 0.6,
        marginTop: 3,
    
      },    
      row: {
        flexDirection: "row",
      }

});

export default styles;