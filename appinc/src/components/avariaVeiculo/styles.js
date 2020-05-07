import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
       },
    header: { 
        marginVertical: 30,
        alignSelf: "center",
        color: '#000000',
        fontSize: 20,
        fontWeight: '800',       
    },
  titulo: {
    marginTop: 12,
    color: '#000000',
    fontSize: 18,
    fontWeight: '400',
  },
  text: {
    marginTop: 12,
    color: '#000000',
    fontSize: 18,
    fontWeight: '400',
  },
  customText: {
    paddingLeft:10,
    color: '#000000',
    fontSize: 18,
    fontWeight: '400',
    marginTop:5

  },
  box: {
    flexDirection: 'row',
  },

  imageBox: {
    width: "100%",
    height: 300, 
    justifyContent: 'center',
    alignItems: 'center'
  },

  image: {
      width: "90%",
      height: "90%"
      
  },

picker: {
    flexDirection: "row",
    fontSize: 12,
    height: 40, 
    width: "90%",
    justifyContent: "flex-start",

  },

  pickerView: {
    flexDirection: "row",
    fontSize: 20,
    height: 40, 
    width: 40,
    borderWidth: 3,
    borderColor:'#cdad00',
    borderRadius: 50,
    marginLeft: 10
  },

  geralState: {
   flexDirection: 'row', flexWrap: 'wrap', 
  },

  problems: {
    flexDirection: 'column'
  }

 
});

export default styles;