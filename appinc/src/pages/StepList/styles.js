import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#EDF0F2',
  },

  message: {
    width: responsividade.largura_tela,
    height: 30,
    position: 'relative',
    backgroundColor: '#FFBABA',
    alignItems: 'center',
    justifyContent: 'center',
  },

  messageError: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#D8000C',
  },

  saved: {
    width: responsividade.largura_tela,
    height: 30,
    position: 'relative',
    backgroundColor: '#DFF2BF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  messagesaved: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#4F8A10',
  },

  salvarbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 15,
    width: responsividade.LARGURA_BUTTON,
    height: responsividade.ALTURA_BUTTON,
    borderRadius: responsividade.BORDER_RADIUS_BUTTON,
    //borderWidth: responsividade.largura_tela < 430 ? 1.5 : 3,
    fontWeight: 'bold',
    backgroundColor: 'green',
    marginBottom: responsividade.margin.mainMargin,
    elevation: 1,
  },

  enviarbutton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: responsividade.margin.mainMargin * 2,
    width: responsividade.LARGURA_BUTTON,
    height: responsividade.ALTURA_BUTTON,
    borderRadius: responsividade.BORDER_RADIUS_BUTTON,
    backgroundColor: '#F9AA33',
    elevation: 1,

  },
  buttonText: {
    color: 'black',
    fontSize: responsividade.fonts.nameSize,
    fontWeight: '400',
    lineHeight: 28,
  },

  buttonTextsalvar: {
    color: 'white',
    fontSize: responsividade.fonts.nameSize,
    fontWeight: '400',
    lineHeight: 28,

  },
  //modal
  masterContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.45)',
  },
  containerModal: {
    width: 310,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 15,
  },
  tituloModal: {
    fontSize: 24,
    marginBottom: 20,
    fontWeight: 'bold',
    color: '#000',
  },
  textModal: {
    fontSize: 18,
    color: '#202020',
    textAlign: 'center',
    marginBottom: 10,
  },
  containerButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonYes: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 130,
    borderRadius: 100,
    backgroundColor: '#127510',
    margin: 10,
  },
  buttonNo: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 45,
    width: 130,
    borderRadius: 100,
    backgroundColor: '#cb1010',
    margin: 10,
  },

});

export default styles;