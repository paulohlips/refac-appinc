import { StyleSheet, PixelRatio } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 20,
        // backgroundColor: 'pink',
        // borderWidth: 2,
        // borderColor: 'white',
        // borderRadius: 10,
        padding: 10,
        borderBottomWidth: 0,
        borderBottomColor: 'black',
        paddingBottom: 40,
        //   width: responsividade.LARGURAFOTO,
    },

    avatarContainer: {
        width: responsividade.LARGURA_INPUT * 0.48,
        height: responsividade.ALTURA_BUTTON,
        flexDirection: 'row',
        // margin: 10,
        backgroundColor: "#FAAB1A",
        padding: 15,
        // distância entre foto e título do input text
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarContainer1: {
        width: responsividade.LARGURA_INPUT * 0.48,
        height: responsividade.ALTURA_BUTTON,
        flexDirection: 'row',
        // margin: 10,
        backgroundColor: "#344955",
        padding: 15,
        // distância entre foto e título do input text
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },

    avatarContainer2: {
        flexDirection: 'row',
        //backgroundColor: "white",
    },

    txt: {
        color: colors.dark,
        fontSize: 18,
        fontWeight: '200',
    },

    text_foto: {
        marginLeft: 4,
        justifyContent: 'center',
        alignItems: 'center',

    },

    text1: {
        color: 'black',
        fontSize: 18,
        fontWeight: '200',
    },

    text: {
        color: 'white',
        fontSize: 18,
        fontWeight: '200',
    },



    //input text
    containerText: {
        flex: 1,
        width: responsividade.LARGURA_INPUT,
        //alignItems: 'center',
        //justifyContent: 'center',
    },
    Name: {
        width: responsividade.LARGURABOX,
        height: 30,
        backgroundColor: colors.transparent,
        color: '#000000',
        fontSize: 18,
        fontWeight: '400',
        lineHeight: 21,
    },

    input: {
        backgroundColor: 'white',
        height: responsividade.ALTURA_INPUT,
        width: responsividade.LARGURA_INPUT,
        borderRadius: responsividade.BORDER_RADIUS_INPUT,
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 10,
        fontSize: 16,
    },

    avatar: {
        width: responsividade.LARGURA_BUTTON,
        height: responsividade.LARGURA_BUTTON,
        margin: 10,
    },

    buttonsView: {
        width: responsividade.LARGURA_INPUT,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        margin: responsividade.margin.mainMargin,
    }
});

export default styles;
