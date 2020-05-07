import React from 'react';
//import { Dimensions } from 'react-native';
import { StackNavigator, DrawerNavigator } from 'react-navigation';
import { Menu } from './globalComponents';
import { responsividade } from './styles';
//import { colors } from './styles';

import Login from './pages/login';
import Main from './pages/main';
import New from './pages/new';
import Testes from './pages/Testes';
import Hist from './pages/hist';
import Offline from './pages/offline';
import Singup from './pages/email';
import Hash from './pages/hash';
import Password from './pages/password';
import UpdatePops from './pages/UpdatePops';
import ChangeService from './pages/changeService';

// Componentes
import GeoLoc from './pages/components/geoloc';
import Audio from './pages/components/audio';
import InputT from './pages/components/input';
import Date from './pages/components/date';
import CameraPage from './pages/components/camera';

import BarCode from './pages/components/scanner';
import Veiculo from './pages/components/veiculo';
import VeiculoTeste from './components/veiculoCheck';
import InfoVeiculo from './components/InfoVeiculo';
import AvariaVeiculo from './components/avariaVeiculo';


// import testes de tela
import StepPage from './pages/Step';
import StepList from './pages/StepList';

const Routes = StackNavigator(
  { 
    Login: { screen: Login },
    SignUp: { screen: Singup },
    Hash: { screen: Hash },
    Password: { screen: Password },
    StepPage: { screen: StepPage },
    ChangeService: { screen: ChangeService },
    Logged: DrawerNavigator(
      {
        Main: { screen: Main },
        NewMenu: { screen: New },
        Hist: { screen: Hist },
        UpdatePops: { screen: UpdatePops },
        Offline: { screen: Offline },
        Exit: { screen: Login },
      },
      {
        contentComponent: props => <Menu props={props} />,
        drawerWidth: responsividade.LARGURA_MENU,
      }
    ),

    StepList: { screen: StepList },
    Testes: { screen: Testes },
    Audio: { screen: Audio },
    InputT: { screen: InputT },
    Geoloc: { screen: GeoLoc },
    Camera: { screen: CameraPage },
    Date: { screen: Date },

    BarCode: { screen: BarCode },
    Veiculo: { screen: Veiculo }
  },
  {
    navigationOptions: {
      /*headerStyle: {
        backgroundColor: colors.light,
        borderBottomWidth: 0,
      },
      headerTintColor: colors.halfblack,
      headerBackTitle: null,*/
      header: null,
    },
  }
);

export default Routes;
