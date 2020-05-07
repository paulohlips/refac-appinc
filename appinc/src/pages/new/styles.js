import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light2,
    alignItems: 'center',
    justifyContent: 'center',
    //backgroundColor: '#784657',
  },
  icon: {
    color: colors.white,
    alignSelf: 'flex-start',
  },

  viewIcon: {
    marginLeft: 4,
  },

  viewTitle: {
    flex: 1,
    //marginLeft: 120,
  },

  headerTitle: {
    color: colors.white,
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
  },

  concerto: {
    width: 15,
    height: 15,
  },
  forms: {
    marginTop: 30,
    width: responsividade.WIDTH_MAIN,

  },
  forms1: {
    marginTop: 60,
    width: responsividade.WIDTH_MAIN,
    //backgroundColor: '#784687',
 },

  forms2: {
  },
  numberType: {
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: responsividade.fonts.descriptionSize,
    color: colors.halfblack,
    fontWeight: 'bold',
  },
  ball: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 75,
    width: responsividade.LARGURABOLA,
    height: responsividade.LARGURABOLA,
    backgroundColor: colors.secundary,
  },
  title: {
    alignItems: 'center',
    flexDirection: 'row',
    height: responsividade.LARGURABOLA,
    //backgroundColor: '#784657',
  },
  textType: {
    marginLeft: responsividade.largura_tela < 430 ? responsividade.margin.mainMargin : responsividade.margin.mainMargin * 0.7,
    //marginTop: responsividade.margin.mainMargin * 0.4,
    fontSize: responsividade.fonts.nameSize,
    color: colors.halfblack,
    fontWeight: 'bold',
  },

  Picker: {
    backgroundColor: colors.white,
    //height: responsividade.ALTURA_INPUT,
    width: responsividade.largura_tela * 0.9,
    borderRadius: responsividade.BORDER_RADIUS_INPUT,
    //paddingHorizontal: 35,
    marginTop: responsividade.margin.mainMargin * 1.5,
    alignItems: 'center',
    flexDirection: 'column',
  },

  estiloPicker: {
    backgroundColor: colors.white,
    color: colors.tercery,
  },

  button: {
    backgroundColor: colors.secundary,
    height: responsividade.ALTURA_BUTTON,
    width: responsividade.LARGURA_BUTTON,
    marginTop: responsividade.margin.secondMargin,
    marginBottom: responsividade.margin.secondMargin,
    //marginHorizontal: metrics.baseMargin * 2,
    paddingHorizontal: metrics.basePadding,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: responsividade.BORDER_RADIUS_BUTTON,
    elevation: 1,
  },

  buttonText: {
    color: 'black',
    fontSize: responsividade.fonts.nameSize,
    //fontWeight: 'bold',
  },
  input: {
    backgroundColor: colors.transparent,
    height: responsividade.ALTURA_INPUT,
    width: responsividade.LARGURA_INPUT,
    borderBottomWidth: 1,
    marginTop: responsividade.margin.mainMargin,
    color: colors.tercery,
    fontSize: 16,
   },
   scrollview: {
    alignItems: 'center',
    justifyContent: 'center',
    width: responsividade.largura_tela,
   },

   preViewContainer: {
     //backgroundColor: 'transparent',
     justifyContent: 'center',
     alignItems: 'center',

   },
   
   preView: {
    width: responsividade.largura_tela * 0.9,
    padding: 15,
    justifyContent: 'center',
    alignItems: 'center',
    //backgroundColor: 'green',
     
   },

});

export default styles;