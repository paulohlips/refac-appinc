import { Dimensions } from 'react-native';

export const largura_tela = Dimensions.get('window').width;
export const altura_tela = Dimensions.get('window').height;

//export const largura_tela = largura < 430 ? largura : largura * 0.65;
//export const altura_tela = altura < 810 ? altura : altura * 0.55;



//BOTÕES PADRÃO TELA INICIAL
export const LARGURABUTTON = largura_tela < 430 ? largura_tela * 0.9 : largura_tela * 0.75;
export const ALTURABUTTON = largura_tela * 0.16;

// FORMS



//BOX FORMULÁRIO - tela em pé
export const LARGURABOX = largura_tela*0.92;
export const ALTURABOX = largura_tela*0.15;

//BUTTON - tela em pé
export const LARGURAFOTO = largura_tela*0.92;
export const ALTURAFOTO = largura_tela*0.2;

//BOTÃO FORMULÁRIO
export const LARGURAFORM = largura_tela*0.92;
export const ALTURAFORM = largura_tela*0.13;

//BOTÃO ENVIAR/SALVAR
export const LARGURASUBMIT = largura_tela*0.9;
export const ALTURASUBMIT = largura_tela * 0.15;

//Bola icone
export const LARGURABOLA = largura_tela < 430 ? largura_tela * 0.1 : largura_tela * 0.07;


/*----------------------------------------------------*/

//Button padrao
export const LARGURA_BUTTON = largura_tela < 430 ? largura_tela * 0.9 : largura_tela * 0.75;
export const ALTURA_BUTTON = largura_tela < 430 ? 50 : 60;
export const BORDER_RADIUS_BUTTON = 150;

//Input Info padrao
export const LARGURA_INPUT = largura_tela < 430 ? largura_tela * 0.9 : largura_tela * 0.85;
export const ALTURA_INPUT = largura_tela < 430 ? 50 : 60;
export const BORDER_RADIUS_INPUT = 4;

//Width MainView padrao
export const WIDTH_MAIN = largura_tela < 430 ? largura_tela * 0.9 : largura_tela * 0.85;
export const WIDTH_SECOND = largura_tela < 430 ? largura_tela : largura_tela * 0.85;
//Header padrão
export const LARGURA_HEADER = largura_tela < 430 ? largura_tela * 0.9 : largura_tela * 0.75;
export const ALTURA_HEADER = largura_tela < 430 ? 56 : 70;

//Menu Padrão
export const LARGURA_MENU = largura_tela < 430 ? largura_tela * 0.65 : largura_tela * 0.45;
export const ALTURA_MENU = largura_tela < 430 ? 50 : 60;
export const LARGURA_PHOTO = largura_tela < 430 ? largura_tela * 0.18 : largura_tela * 0.15;

//CARD STEPLIST/MINHAS PERÍCIAS
export const LARGURACARD = largura_tela < 430 ? largura_tela*0.95 : largura_tela * 0.85;
export const ALTURACARD = largura_tela < 430 ? largura_tela*0.40 : largura_tela * 0.25;

/*---------------------------------------------------*/

export const fonts = {
    titleSize: largura_tela < 430 ? 20 : 24,
    descriptionSize: largura_tela < 430 ? 15 : 20,
    button: largura_tela < 430 ? 15 : 20,
    nameSize: largura_tela < 430 ? 18 : 22,
    errorSize: largura_tela < 430 ? 14 : 18,
};

export const margin = {
    mainMargin: largura_tela < 430 ? 10 : 25,
    secondMargin: largura_tela < 430 ? 100 : 110,
};

export const padding = {
    mainPadding: largura_tela < 430 ? 10 : 20,
    secondPadding: largura_tela < 430 ? 100 : 110,
};
