import { StyleSheet } from 'react-native';
import { colors, responsividade } from '../../styles';

const styles = StyleSheet.create({
    container: { 
        flex: 1,   
        paddingBottom: 60,
    },
    main: {
        padding: 10,   
        justifyContent: 'center',
        alignItems: 'center',  
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
        fontSize: responsividade.fonts.nameSize,
        color: colors.darker,
    },
    name: {
        fontSize: responsividade.fonts.descriptionSize,
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
        width: responsividade.LARGURACARD,
        height: responsividade.ALTURACARD * 0.7,
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
        fontSize:  responsividade.fonts.nameSize * 0.8,
        fontWeight: '400',
        lineHeight: 21,
        opacity: 0.6,
        marginTop: responsividade.margin.mainMargin
    
      },
      statusEnviado:{

        height: 20,
        color: 'green',
        fontSize:  responsividade.fonts.nameSize * 0.8,
        fontWeight: '400',
        lineHeight: 21,
        opacity: 0.6,
        marginTop: responsividade.margin.mainMargin
    
      },
      status1: {     
        height: 20,
        fontSize:  responsividade.fonts.nameSize,
        fontWeight: '500',
        lineHeight: 21,
        // opacity: 0.6,
        marginTop: responsividade.margin.mainMargin,
    
      }, 
      
      ref: {
        height: 20,
        fontSize:  responsividade.fonts.nameSize,
        fontWeight: '300',
        lineHeight: 21,
        marginTop: responsividade.margin.mainMargin
      },

      row: {
        flexDirection: "row",
      },

      loading: {

        paddingBottom: 100,
      },

      erro : {

        padding: 10,
        width: responsividade.LARGURABOX,
        height: responsividade.ALTURABOX*0.8,
        //backgroundColor: '#FE3636',
        borderRadius: 4,
        marginTop: 10,
        justifyContent: 'center',
        alignItems: 'center',



      },

      errot: {
        //fontWeight: 'bold',
        color: "#B83E3E",
      },

});

export default styles;