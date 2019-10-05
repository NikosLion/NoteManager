import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loggingIn: false,
    loginError: null,
    loginSuccessful: false,
    userId: '',
    username: '',
    notesVisible: false
  },

  mutations: {
    loginStart: state => state.loggingIn = true,
    loginStop: (state, errorMessage) => {
      state.loggingIn = false;
      state.loginError = errorMessage;
      state.loginSuccessful = !errorMessage;
    },
    updateUserId: (state, userId) => {
      state.userId = userId;
    },
    toggleNotes: state => state.notesVisible = true
  },

  actions: {
    doLogin({commit}, loginData) {
      commit('loginStart');

      axios.post('https://bowtie.mailbutler.io/api/v2/users/login', loginData)
      .then((response) => {
        commit('loginStop', null);
        commit('updateUserId', response.data.token);
        console.log(this.state.userId);
      })
      .catch(error => {
        commit('loginStop', 'Invalid email/password combination. Please try again.');
        console.log(this.state.loginSuccessful);
      })
    },

    toggleNotesVisible({commit}) {
      commit('toggleNotes');
      //console.log('state.notesVisible: ' + this.state.notesVisible);
    }
  }
})
