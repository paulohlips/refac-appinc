import { Platform, StyleSheet } from 'react-native';
import { colors, responsividade } from '../../styles';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        //paddingTop: Platform.OS === 'ios' ? 30 : 0
    },

    main: {
        justifyContent: 'flex-start',
        alignItems: 'center',
        flex: 1,
    },

    tabMenu: {
        height: 50,
        width: responsividade.largura_tela,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        elevation: 5,
        marginBottom: 15, 
    },

    tabButton1: {
        height: 50,
        width: responsividade.largura_tela * 0.5,
        justifyContent: 'center',
        alignItems: 'center',       
    },

    tabButton2: {
        height: 50,
        width: responsividade.largura_tela * 0.5,
        justifyContent: 'center',
        alignItems: 'center',        
    }
});

export default styles;