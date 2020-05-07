import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const styles = StyleSheet.create({

  backgroundImage: {
    flex: 1,
    //alignItems: 'center',
  },

  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: metrics.basePadding * 2,
    // backgroundColor: colors.lighter,
    backgroundColor: 'rgba(45, 45, 45, 0.8)',
  },

  image: {
    marginBottom: metrics.baseMargin * 6,
    alignSelf: 'center',
    height: 210,
    width: 170,
    padding: metrics.basePadding,
  },

  title: {
    fontSize: responsividade.largura_tela < 430 ? 34 : 45,
    fontWeight: 'bold',
    color: colors.white,
  },

  descript: {
    fontSize: responsividade.largura_tela < 430 ? 15 : 20,
    color: colors.lighter,
    marginBottom: metrics.baseMargin,
    marginTop: metrics.baseMargin / 2,
  },

  input: {
     backgroundColor: 'rgba(255, 255, 255, 0.6)',
     borderRadius: 40,
     marginTop: metrics.baseMargin * 2,
     height: responsividade.largura_tela < 430 ? 50 : 60,
     width: responsividade.largura_tela < 430 ? responsividade.largura_tela * 0.7 : responsividade.largura_tela * 0.55,
     paddingHorizontal: metrics.basePadding,

   },

   testebutton: {
     backgroundColor: 'rgba(41, 42, 41, 0.65)',
     borderWidth: 2,
     borderColor: 'rgb(225, 200, 133)',
     borderRadius: 40,
     height: responsividade.largura_tela < 430 ? 50 : 60,
     width: responsividade.largura_tela < 430 ? responsividade.largura_tela * 0.7 : responsividade.largura_tela * 0.55,
     marginTop: metrics.baseMargin,
     paddingHorizontal: metrics.basePadding,
     justifyContent: 'center',
     alignItems: 'center',

   },

   cadastrobutton: {
     height: 50,
     marginTop: metrics.baseMargin,
     paddingHorizontal: metrics.basePadding,
     justifyContent: 'center',
     alignItems: 'center',

   },

   buttonText: {
     color: 'rgb(225, 200, 133)',
     fontWeight: 'bold',
     fontSize: responsividade.largura_tela < 430 ? 16 : 20,
   },

   estiloPicker: {
     //height: 50,
     //paddingHorizontal: metric.basePadding,
     flex: 7,
     },

   forms2: {
     height: 50,
     justifyContent: 'center',
     alignItems: 'center',
     alignSelf: 'center',
     flexDirection: 'row',
     padding: metrics.basePadding,
     borderRadius: metrics.baseRadius,
     marginTop: metrics.baseMargin / 3,
     backgroundColor: colors.whiteTransparent
   },

   serverbutton: {
    borderRadius: 100,
    //backgroundColor: 'rgb(225, 200, 133)',
    borderWidth: 1.5,
    borderColor: 'rgb(225, 200, 133)',
    position: 'absolute',
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    right: 20,
    bottom: 30,

   },
});

export default styles;
