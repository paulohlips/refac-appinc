import { Platform, StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#344955',
    //alignItems: 'center',
    //paddingTop: Platform.OS === 'ios' ? 30 : 0,
  },
  bodyS: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: "#344955",
  },
  halfBody: {
    height: responsividade.largura_tela < 430 ? 170 : 200,
    //justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#344955"
  },
  tokenView: {
    marginTop: 25,
    width: responsividade.largura_tela < 430 ? responsividade.largura_tela * 0.7 : responsividade.largura_tela * 0.55,
    height: responsividade.largura_tela < 430 ? 55 : 70,
    borderRadius: 50,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  token: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#ffffff"
  },
  tokenD: {
    fontSize: 16,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#2afe3f",
  },

  info: {
    alignSelf: 'center',
    justifyContent: 'center',
  },

  profile: {
    alignSelf: 'center',
    margin: metrics.baseMargin,
    elevation: 1,
    width: responsividade.largura_tela < 430 ? 150 : 300,
    height: responsividade.largura_tela < 430 ? 150 : 300,
    justifyContent: 'center',
    alignItems: 'center',
  },

  ImageStyle: {
    width: responsividade.largura_tela < 430 ? 150 : 250,
    height: responsividade.largura_tela < 430 ? 150 : 250,
    borderColor: 'white',
    borderWidth: 3,
    borderRadius: Platform.OS === 'ios' ? responsividade.largura_tela < 430 ? 75 : 300 : responsividade.largura_tela < 430 ? 100 : 300,
  },

  name_view:{
    alignItems: 'center',
    justifyContent: 'center',
    margin: 15,
  },
  name: {
    fontSize: 24,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "white",
  },

  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.baseMargin,
    width: responsividade.largura_tela < 430 ? responsividade.LARGURABUTTON  :  responsividade.LARGURABUTTON * 0.55,
    height: responsividade.largura_tela < 430 ? responsividade.ALTURABUTTON : responsividade.largura_tela * 0.11,
    borderRadius: 200,
    backgroundColor: "#F9AA33",
    // marginHorizontal: responsividade.largura_tela < 430 ? 10 : 30,
  },

  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.baseMargin,
    width: responsividade.largura_tela < 430 ? responsividade.LARGURABUTTON :  responsividade.LARGURABUTTON ,
    height: responsividade.largura_tela < 430 ? responsividade.ALTURABUTTON : responsividade.largura_tela * 0.11,
    borderRadius: 200,
    backgroundColor: "red",
  },

  button3: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: metrics.baseMargin,
    width: responsividade.largura_tela < 430 ? responsividade.LARGURABUTTON :  responsividade.LARGURABUTTON * 0.55,
    height: responsividade.largura_tela < 430 ? responsividade.ALTURABUTTON : responsividade.largura_tela * 0.11,
    borderRadius: 200,
    backgroundColor: "#F9AA33",
  },

  button_text2: {
    fontSize: 18,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#F9AA33",
  },

  button_text: {
    fontSize: responsividade.fonts.button,
    fontWeight: "bold",
    fontStyle: "normal",
    letterSpacing: 0,
    color: "#344955",
  },

  icon:{
    padding: 10,
    borderRadius: 100,
    justifyContent: 'center',
    alignItems: 'center',
 },

 buttons_view: {
   //backgroundColor: 'red',"
   flexDirection:  responsividade.largura_tela < 430 ? "column" : "row",
   alignItems: "center",
   width: responsividade.largura_tela * 0.9,
   justifyContent: 'space-around',
   marginBottom: responsividade.margin.secondMargin,
 },


});

export default styles;