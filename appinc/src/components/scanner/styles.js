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
  },
   Name: {
    width: responsividade.LARGURABOX,
    height: 30,
    backgroundColor: colors.transparent,
    color: '#000000',
    fontSize: 18,
    fontWeight: '400',
    lineHeight: 21,
   },

  input: {
     backgroundColor: 'white',
     height: responsividade.ALTURABOX,
     borderRadius: 4,
     paddingLeft: 20,
     fontSize: 16,
  },

  overlay: {
    flex: 1,
  },

  contentRow: {
    alignItems: 'center',
    justifyContent: 'center'
  },

  content: {
    borderWidth: 3,
    borderColor: colors.secundary,
  },

  scanline: {
    backgroundColor: colors.secundary,
    height: 1,
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
    //fontWeight: 'bold',
    marginLeft: 5,

  },
  hint: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.3,
    paddingVertical: 10,
  },
  codecontainer: {
    width: (responsividade.LARGURABOX),
    height:  (responsividade.ALTURABOX),
    borderRadius: 10,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 10
  },
  code: {
    color: '#000000',
    fontWeight: 'bold',
    fontSize: 18,
    //fontWeight: '400',
    lineHeight: 21,
  }

});

export default styles;