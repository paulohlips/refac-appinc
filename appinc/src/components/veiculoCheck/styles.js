import { StyleSheet } from 'react-native';
import { colors, metrics, responsividade } from '../../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: responsividade.largura_tela,
        padding: 20,
        paddingBottom: 40,
        borderBottomWidth: 0,
        borderBottomColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default styles;