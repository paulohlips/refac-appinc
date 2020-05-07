import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const stylesGroup = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    width: responsividade.largura_tela,
    padding: 20,
    paddingBottom: 40,
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
     backgroundColor: colors.light,
     height: responsividade.ALTURA_INPUT * 1.1,
     borderRadius: 4,
     paddingLeft: 20,
     fontSize: 16,
  },

  hint: {
    fontSize: responsividade.fonts.descriptionSize * 0.9,
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.3,
    paddingVertical: 10,
  }

});

export default stylesGroup;