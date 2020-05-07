import { Platform, StyleSheet } from 'react-native';
import { colors, responsividade } from '../../../../styles';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
    },
    main: {
        flex: 1,
    },

    picker: {
        backgroundColor: colors.white,
        width: responsividade.largura_tela * 0.9,
        borderRadius: responsividade.BORDER_RADIUS_INPUT,
        //paddingHorizontal: 35,
        marginTop: responsividade.margin.mainMargin * 1.5,
        alignItems: 'center',
        flexDirection: 'column',
    },

    viewCard: {
        marginTop: 15,
        paddingTop: 15,
        borderTopWidth: 1,
        borderTopColor: '#777',
    },

    card: {
        width: responsividade.largura_tela * 0.9,
        borderRadius: responsividade.BORDER_RADIUS_INPUT,
        backgroundColor: colors.white,
        alignItems: 'flex-start',
        justifyContent: 'center',
        flexDirection: 'column',
        padding: 15,
        marginBottom: 5,
    },

    title: {
        fontSize: 16,
        fontWeight: 'bold'
    },

    version: {
        fontSize: 14,        
    },

    baixado: {
        fontSize: 14,
        fontWeight: 'bold',
        color: '#099f09',
    },
});

export default styles;