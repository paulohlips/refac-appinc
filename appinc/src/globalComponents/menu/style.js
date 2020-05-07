import { Platform, StyleSheet } from 'react-native';
import { colors, responsividade } from '../../styles';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: responsividade.LARGURA_MENU,
        backgroundColor: colors.primary,
    },
    profile: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        borderBottomWidth: 0.5,
        borderColor: colors.regular,
        paddingVertical: 30,
        paddingLeft: 15,
        marginTop: responsividade.margin.mainMargin / 2,
    },
    profileImage: {
        width: responsividade.LARGURA_PHOTO,
        height: responsividade.LARGURA_PHOTO, 
        borderRadius: Platform.OS === 'ios' ? 35 : 100,
        marginRight: 15,
        elevation: 1
    },
    profileName: {
        fontSize: responsividade.fonts.descriptionSize*1.1,
        fontWeight: 'bold',
        width: responsividade.LARGURA_MENU * 0.5,
        color: colors.white,
    },
    buttonsView: {
        marginTop: 30,
        alignItems: 'flex-start',
        justifyContent: 'space-around',
        flexDirection: 'column',
        paddingLeft: 15,
    },
    buttonBox: {
        height: 50,
        alignItems: 'center',
        justifyContent: 'flex-start',
        marginBottom: 0,
        flexDirection:'row',
    },
    textButton: {
        fontSize: responsividade.fonts.descriptionSize,
        fontWeight: 'bold',
        color: colors.white,
    },
    button: {
        marginTop: responsividade.margin.secondMargin * 0.3,
        fontWeight: 'bold',
        fontSize: responsividade.fonts.descriptionSize,
        color: colors.white,
    },
    icon: {
        marginRight: 20,
    }
});

export default styles;