import { StyleSheet } from 'react-native';
import { metrics, colors, responsividade } from '../../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: responsividade.largura_tela,
        padding: 20,
        paddingBottom: 40,
        borderBottomWidth: 0.5,
        borderBottomColor: 'black',
    },
    titulo: {
        width: responsividade.LARGURABOX,
        height: 22,
        color: '#000000',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 21,
        marginBottom: 15,
    },
    direcao: {
        flexDirection: 'row',
    },
    datecontainer: {
        width: (responsividade.LARGURABOX * 0.46),
        height: (responsividade.ALTURABOX * 0.9),
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10
    },
    date: {
        color: '#000000',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 21,
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
        right: responsividade.largura_tela * 0.04
    },
    picker: {
        width: 10
    },
    button_text: {

        //color: 'black',
        //color: 'white',
        color: "#344955",
        fontSize: responsividade.fonts.descriptionSize,
        fontWeight: 'bold',
        marginLeft: 5,

    },

});

export default styles;