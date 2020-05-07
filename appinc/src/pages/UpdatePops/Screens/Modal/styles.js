import { Platform, StyleSheet } from 'react-native';
import { colors, responsividade } from '../../../../styles';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(43, 43, 43, 0.3)',
        alignItems: 'center',
        justifyContent: 'center',
    },
    box: {        
        width: 310,
        backgroundColor: 'white',
        alignItems: 'center',
        borderRadius: 10,
        paddingBottom: 10,
        paddingTop: 10,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 10,
    },
    description: {
        fontSize: 16,
        textAlign: 'center',
        margin: 10,
    },
    containerButton: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        margin: 10
    },
    buttonNo: {
        width: 135,
        borderRadius: 23,
        height: 45,
        borderColor: colors.secundary,
        borderWidth: 2,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
        marginRight: 10
    },    
    buttonYes: {
        width: 135,
        borderRadius: 23,
        height: 45,
        backgroundColor: colors.secundary,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5
    },
    textNo: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.secundary,       
    },
    textYes: {
        fontSize: 16,
        fontWeight: 'bold',
        color: colors.white,
    },
    buttonExit: {
        width: 200,
        height: 30,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },

});

export default styles;