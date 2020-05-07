import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';
import { bold } from 'ansi-colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: responsividade.largura_tela,
    padding: 20,
    paddingBottom: 40,
    borderBottomWidth: 0,
    borderBottomColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },

  Name: {
    width: responsividade.LARGURABOX,
    height: 30,
    backgroundColor: colors.transparent,
    color: '#000000',
    fontSize: responsividade.fonts.nameSize,
    fontWeight: '400',
    lineHeight: 21,
  },

  input: {
    backgroundColor: 'white',
    height: responsividade.ALTURA_INPUT,
    width: responsividade.LARGURA_INPUT,
    margin: 5,
    borderRadius: responsividade.BORDER_RADIUS_INPUT,
    paddingLeft: 20,
    fontSize: responsividade.fonts.descriptionSize,
  },

  input_o: {
    backgroundColor: 'white',
    height: responsividade.ALTURABOX,
    width: responsividade.LARGURABOX,
    margin: responsividade.margin.mainMargin / 2,
    borderRadius: 4,
    paddingLeft: 20,
    fontSize: responsividade.fonts.descriptionSize,
    justifyContent: 'center',
    alignItems: 'flex-start',
  }
  ,
  square: {
    backgroundColor: "#FAAB1A",
    height: responsividade.ALTURA_BUTTON,
    width: responsividade.LARGURA_INPUT * 0.3,    
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,


  },

  parale: {
    backgroundColor: "transparent",
    height: responsividade.ALTURA_BUTTON,
    width: responsividade.LARGURA_INPUT * 0.7,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  button: {
    //backgroundColor: "#344955",
    //backgroundColor: "#FAAB1A",
    backgroundColor: 'white',
    elevation: 1,
    //borderRadius: 50,
    borderRadius: 60,
    height: responsividade.ALTURA_BUTTON,
    width: responsividade.LARGURA_INPUT,    
    margin: 10,
    paddingHorizontal: metrics.basePadding,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    elevation: 1,
  },
 picker:{
  width: 10
 },
  button_text:{

    //color: 'black',
    //color: 'white',
    color: "#344955",
    fontSize: responsividade.fonts.descriptionSize,
    //fontWeight: 'bold',
    marginLeft: 5,

  },
  info: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  info_text: {
    fontSize: responsividade.fonts.descriptionSize,
    alignItems: 'center',
    justifyContent: 'center',
    color: "black",
    //opacity: 0.5,
  },
  button_view: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'blue'
  },

  main:
  {
    justifyContent: 'center',
    alignItems: 'center',
  },

  Picker: {
    backgroundColor: 'white',
    width: responsividade.LARGURA_INPUT,
    margin: responsividade.margin.mainMargin / 2,
    borderRadius: responsividade.BORDER_RADIUS_INPUT,   
    fontSize: responsividade.fonts.descriptionSize,
  },

  estiloPicker: {
    backgroundColor: colors.white,
    borderRadius: 5,
    fontSize: 15,
    alignItems: 'center',
    justifyContent: 'center',
    color: "black",
    opacity: 0.5,
  },

  hintview: {
    margin: responsividade.margin.mainMargin,
    width: responsividade.LARGURA_INPUT,
    marginTop: responsividade.margin.mainMargin,
  },

  hint: {
    fontSize: responsividade.fonts.descriptionSize,
    fontWeight: 'bold',
    width: responsividade.LARGURA_INPUT * 0.8,
  },

  numberType: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: responsividade.fonts.descriptionSize * 0.8,
    color: 'black',
    fontWeight: 'bold',
    width: responsividade.LARGURABOLA * 0.53,
    textAlign: 'center',
  },
  miniball: {
    alignItems: 'center',
    justifyContent: 'center',
    //padding: 10,
    borderRadius: 30,
    width: responsividade.LARGURABOLA * 0.73,
    height: responsividade.LARGURABOLA * 0.73,
    backgroundColor: '#F9AA33',
    //marginLeft: responsividade.largura_tela < 430 ? 20 : 0,
  },


  hint_title: {
    alignItems: 'center',
    flexDirection: 'row',
    height: responsividade.ALTURA_INPUT,
    width: responsividade.LARGURA_INPUT,
    justifyContent: 'flex-start',     
  },

  erro: {
    color: '#B83E3E',
    fontSize: responsividade.fonts.errorSize,
    margin: responsividade.margin.mainMargin * 0.5,
  },

  errov: {
    height: responsividade.ALTURA_INPUT,
    width: responsividade.LARGURA_INPUT,
    borderRadius: 4,
    //paddingLeft: 20,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    //marginBottom: responsividade.margin.mainMargin / 5,

  }


});

export default styles;