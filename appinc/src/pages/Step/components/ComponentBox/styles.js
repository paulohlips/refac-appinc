import { StyleSheet } from "react-native";
import { responsividade } from "../../../../styles";

const styles = StyleSheet.create({
  buttonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 28
  },
  numberType: {
    alignItems: "center",
    justifyContent: "center",
    fontSize: responsividade.fonts.descriptionSize,
    color: "black",
    fontWeight: "bold",
    width: responsividade.LARGURABOLA * 0.8,
    textAlign: "center"
    // backgroundColor: '#8484'
  },
  ball: {
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
    borderRadius: 30,
    width: responsividade.LARGURABOLA,
    height: responsividade.LARGURABOLA,
    backgroundColor: "#F9AA33",
    margin: 15,
    marginLeft: responsividade.margin.mainMargin,
    flexDirection: "row"
  },

  textType: {
    fontSize: responsividade.fonts.descriptionSize,
    color: "black",
    fontWeight: "bold",
    //right: 30
  },

  textTypeView: {
    //backgroundColor: 'green',
    width: responsividade.largura_tela*0.7,
    justifyContent: 'flex-start',
    //alignItems: 'center',
  },

  coluna: {
    flexDirection: "column",
    paddingBottom: 40,
    borderBottomWidth: 0.5,
    borderBottomColor: 'black',
  },

  linha: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },

  icon: {
    marginRight: 5,
    padding: 15
  }
});

export default styles;
