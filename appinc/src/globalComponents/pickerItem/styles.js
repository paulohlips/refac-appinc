import { StyleSheet } from 'react-native';
import { colors, responsividade } from '../../styles';

const styles = StyleSheet.create({
    container: {
        //height: responsividade.ALTURA_INPUT,
        width: responsividade.largura_tela * 0.8,
        alignItems: 'center',
        //justifyContent: 'center',
        flexDirection: 'column',
        borderRadius: responsividade.BORDER_RADIUS_INPUT,
    },
    onePicker: {
        height: responsividade.ALTURA_INPUT,
        width: responsividade.largura_tela * 0.8,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
    }
});

export default styles;