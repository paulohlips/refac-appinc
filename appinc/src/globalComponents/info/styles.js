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
        backgroundColor: "#67382643",
    },
    iconClose: {
        color: colors.white,
    },
    box: {
        flex: 1,  
        padding: 15,
        marginTop: 10,
        backgroundColor: colors.white,
        borderRadius: 5,
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
