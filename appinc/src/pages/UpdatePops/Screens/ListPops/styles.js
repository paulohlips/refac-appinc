import { Platform, StyleSheet } from 'react-native';
import { colors, responsividade } from '../../../../styles';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //backgroundColor: '#a09545',
        //paddingTop: Platform.OS === 'ios' ? 30 : 0
    },
    box: {
        backgroundColor: 'white',
        borderRadius: 5,
        margin: 5,
        width: responsividade.LARGURACARD * 0.99,
        height: responsividade.ALTURACARD * 0.7,
        alignItems: "center",
        flexDirection: 'row',
        padding: 20,

    },
    styleScroll: {
        paddingBottom: 40,
    },
    text: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'justify',
    },
    status1: {
        height: 20,
        fontSize: responsividade.fonts.descriptionSize,
        fontWeight: '500',
        lineHeight: 21,
        // opacity: 0.6,
        marginTop: responsividade.margin.mainMargin,

    },

    status: {
        height: 20,
        fontSize: responsividade.fonts.nameSize,
        fontWeight: '500',
        lineHeight: 21,
        // opacity: 0.6,
        marginTop: responsividade.margin.mainMargin,

    },
    removeButton: {
        height: 30,
        width: 30,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 15,
       

    },
    iconRemove: {
        color: 'white',
    },
    trash: {
        position: 'absolute',
        //backgroundColor: 'white',
        height: 55,
        width: 55,        
        borderRadius: 28,
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 6,
        top: (responsividade.altura_tela * 0.9) - responsividade.ALTURA_HEADER - 115,
        left: (responsividade.largura_tela * 0.98) - 75,
        //margin: 20,
        zIndex: 10,
    },
    removeText: {
        color: colors.white,
        fontSize: 16,
        textAlign: 'justify',
        
    }
});

export default styles;