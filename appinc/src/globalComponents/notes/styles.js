import { StyleSheet } from 'react-native';
import { responsividade, colors } from '../../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0, 0.3)'
    },
    box: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        borderRadius: 6,
    },
    button: {
        width: 275,
        height: 55,
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
    },
    textButton: {
        fontSize: 18,
        color:  '#000',
        margin: 5,
    },
    icon: {
        marginRight: 5,
    },

    input: {        
        height: 150,
        width: responsividade.largura_tela *0.95,
    },

    buttonSave: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: responsividade.margin.mainMargin * 2,
        width: responsividade.LARGURA_BUTTON * 0.7,
        height: responsividade.ALTURA_BUTTON,
        borderRadius: responsividade.BORDER_RADIUS_BUTTON,
        backgroundColor: '#F9AA33',
        elevation: 1,
    }

});

export default styles;