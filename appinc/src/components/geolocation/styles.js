import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    width: responsividade.largura_tela,
    padding: 20,
    paddingBottom: 40,
    borderBottomWidth: 0,
    borderBottomColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',

  },
  cabecalho: {
    width: responsividade.LARGURABOX,
    height: responsividade.ALTURABOX,
    flexDirection: 'row',
    margin: 10,
    backgroundColor: "white",
    padding: 15,
    borderRadius: 4,

  },

  texto_geo: {
    marginLeft: 10,
  },
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 9,
    height: 25,
    width: 25,
  },
  label: {
    fontSize: 18,
    color: '#000'
  },
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

  button_text:{

    //color: 'black',
    //color: 'white',
    color: "#344955",
    fontSize: responsividade.fonts.descriptionSize,
    fontWeight: 'bold',
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
    opacity: 0.5,
  },
  button_view: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: 'blue'
  },

  input: {
    backgroundColor: 'white',
    height: responsividade.ALTURA_INPUT,
    width: responsividade.LARGURA_INPUT,
    margin: responsividade.margin.mainMargin,
    borderRadius: responsividade.BORDER_RADIUS_INPUT,
    paddingLeft: responsividade.padding.mainPadding,
    fontSize: responsividade.fonts.descriptionSize,
    justifyContent: 'center',
    alignItems: 'flex-start',
   },
   main:
   {
    justifyContent: 'center',
    alignItems: 'center',
   },

   erro: {
    color: "#B83E3E",
    fontSize: responsividade.fonts.errorSize,
    margin: 10,
  },
  
  errov: {
    height: responsividade.ALTURABOX*0.62,
    width: responsividade.LARGURABOX,
    borderRadius: 4,
    //paddingLeft: 20,
    fontSize: 16,
    justifyContent: 'center',
    alignItems: 'flex-start',
    marginBottom: 5,
   
  }
  

});

export default styles;