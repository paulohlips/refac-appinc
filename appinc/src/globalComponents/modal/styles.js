import { StyleSheet } from 'react-native';
import { colors, metrics } from '../../styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  box: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    // backgroundColor: 'rgba(0, 0, 0, 0.0)',
    backgroundColor: 'white',
    borderRadius: 5,
    height: 350,
    width: 300,
    opacity: 0.9
  },
  lottie:{
    height: 200,
    width: 200,

  },
  text: {
    fontSize: 24,
    width: 250,
    color: '#3ABC5E',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  texterro:{
    fontSize: 24,
    width: 250,
    color: '#E25C24',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  erro:{
    fontSize: 18,
    width: 250,
    color: '#E25C24',
    textAlign: 'center',
    fontWeight: 'bold',
  },

  okterro:{
    color: '#E25C24',
    fontWeight: 'bold',
  },

  ok:{
    borderWidth: 2,
    borderColor: '#3ABC5E',
    borderRadius: 25,
    height: 50,
    width: 200,
    marginTop: metrics.baseMargin,
    marginBottom: 30,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },

  oke:{
    borderWidth: 2,
    borderColor: '#E25C24',
    borderRadius: 25,
    height: 50,
    width: 200,
    marginTop: metrics.baseMargin,
    marginBottom: 30,
    paddingHorizontal: 5,
    justifyContent: 'center',
    alignItems: 'center',

  },
  okt:{
    color: '#3ABC5E',
    fontWeight: 'bold',
  }
});

export default styles;
