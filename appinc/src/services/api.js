import axios from 'axios';
// import { LoginToken } from '../store/ducks/login';
// import store from '../store';

var URL = 'http://35.198.17.69/api';

const changeBaseURL = (baseUrl) => {
  URL = baseUrl;
  console.log('console do URL', URL)
}
const api = axios.create({
  baseURL: URL,
});


const setToken = (token, matricula) => { 
  axios.defaults.headers.common['X-Token'] = `${token}`;
  axios.defaults.headers.common['matricula'] = `${matricula}`;
}


const setTokenTest = () => { 
  axios.defaults.headers.common['X-Token'] = '4e6e179ba5deda20d62bd030e21d475d';
  axios.defaults.headers.common['matricula'] = 10;
}


const user = {
  // realiza o login do usuario
  loginUser: data => {
    console.log('user request', URL)
    return axios.post(`${URL}/pericia/usuario/login`, data, {
      headers: {}
    },
    )
  },
  // envia matricula pra receber codigo por email
  postCadastroId: data => {
    return api.post('/pericia/usuario/cadastro', data, {
      headers: {}
    },
    )
  },
  //confirma o pin recebido por email para validação do usuario
  postConferePIN: data => {
    return api.post('/pericia/usuario/validaPin', data, {
      headers: {}
    },
    )
  },

  createPassword: data => {
    return api.post('/pericia/usuario/geraSenha', data, {
      headers: {}
    },
    )
  },
  // requisição para ter historico de pericias
  getHist: data => {
    return axios.post(`${URL}/pericia/formulario/recebidos`, null, {
      headers: {
        'matricula': data.id,
        'token': data.token,
      }
    },
    )
  },
}

const form = {
  // requisiçao para obter um novo pop atraves de um numero identificador
  getNewForm: number => {
    return axios.get(`${URL}/pericia/formularios/${number}`)
  },
  getHierarchyPops: () => {
    return api.post('/pericia/formulario/hierarquia')
  },
  getAllPops: () => {
    return api.get('/pericia/formularios')
  },
  // requisição para enviar um formulario
  postForm: data => {
    return api.post('/pericia/formulario/envio', data.body,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'matricula': data.matricula,
          'referencia': data.ref,
        }
      },
    )
  },
}

export default Api = {
  api,
  user,
  form,
  setToken,
  setTokenTest,
  changeBaseURL,
};
