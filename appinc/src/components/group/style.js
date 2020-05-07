import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'pink',
    width: responsividade.largura_tela,
    //padding: 20,
    alignItems: 'center',
    paddingBottom: 20,   
    borderBottomColor: 'black',             
    borderBottomWidth: 0,
  },
  boxGroup: {
    width: responsividade.largura_tela * 0.95,
    padding: 5,
    backgroundColor: 'lightgrey',
    borderRadius: 5,    
    elevation: 2,
    margin: 10,
    alignItems: 'center',
  },
  hint: {
    fontSize: responsividade.fonts.descriptionSize * 0.9,
    fontWeight: 'bold',
    color: 'black',
    opacity: 0.3,
    paddingVertical: 10,
  },
  viewPlus: {
    backgroundColor: colors.secundary,
    marginTop: 15,
    width:  40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
  },
  viewMinus: {
    backgroundColor: colors.danger,
    marginTop: 20,
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    margin: 20,
  },
  viewIndicator: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 12,
    flexDirection: 'row',
  },
  indicator: {
    backgroundColor: colors.dark,
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3.    
  }
});

export default styles;