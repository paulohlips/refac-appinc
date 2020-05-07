import { StyleSheet } from 'react-native';
import { colors } from '../../styles';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.darkTransparent,
        padding: 15,
    },
    buttonContainer: {
        width: 300,
        alignItems: 'flex-end',       
        
    },
    iconClose: {
        color: colors.white,
    },
    box: {
        flex: 1,  
        padding: 15,
        width: 275,
        height: 300,
        marginTop: 10,
        backgroundColor: colors.white,
        borderRadius: 15,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
    },
    text: {
        color: colors.black,
        fontSize: 16,
        textAlign: 'justify',
    }
});

export default styles;
