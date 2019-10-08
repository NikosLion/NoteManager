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
    notesVisible: false,
    createVisible: false,
    notes: [{}]
  },

  getters: {
    noteList(state) {
      return state.notes;
    }
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
    toggleNotes: (state, notes) => {
      state.notes = [];
      state.notes = notes;
      if(state.notes.length !== 0){
        state.notesVisible = true;
      }
      state.createVisible = false;
    },
    toggleCreate: state => {
      state.notesVisible = false;
      state.createVisible = true;
    },
    newNote: (state, newNoteDescription) => {
      state.notes.push({description: newNoteDescription});
      state.notesVisible = true;
      state.createVisible = false;
    },
    delNote: (state, index) => {
      state.notes.splice(index,1);
      if(state.notes.length === 0){
        state.notesVisible = false;
      }
    }
  },

  actions: {
    doLogin({commit}, loginData) {
      commit('loginStart');

      axios.post('https://bowtie.mailbutler.io/api/v2/users/login', loginData)
      .then((response) => {
        commit('loginStop', null);
        commit('updateUserId', response.data.token);
        console.log(this.state.userId);
        console.log(response.headers);
        console.log(response.data);
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      })
      .catch(error => {
        commit('loginStop', 'Invalid email/password combination. Please try again.');
        console.log(error);
      })
    },

    toggleNotesVisible({commit}) {
      axios.get('https://bowtie.mailbutler.io/api/v2/notes')
      .then((response) => {
        console.log(response.headers);
        console.log(response.data);

        //Define updated note object.
        let notes = [];
        for(let i=0; i<response.data.length; i++){
          let id = response.data[i].id;
          let text = response.data[i].text;
          let context = response.data[i].context;
          let newNote = {
            id: id,
            text: text,
            context: context
          }
          notes.push(newNote);
        }
        //Pass new note object to mutate state.notes array with updated values.
        commit('toggleNotes', notes);
        for(let i=0; i<this.state.notes.length; i++) {
          console.log('note id: ' + this.state.notes[i].id);
        }
      })
      .catch(error => {
        console.log(error);
      })
    },

    toggleCreateVisible({commit}) {
      commit('toggleCreate');
      //console.log(this.state.createVisible);
    },

    createNote({commit}, newNote) {
      //console.log(newNote.description);
      //POST to 'https://bowtie.mailbutler.io/api/v2/notes'
      axios.post('https://bowtie.mailbutler.io/api/v2/notes', 
      {
        context: 'papapap',
        text: newNote.text //to text na to pairnei apo to newNoteEvent
      })
      .then((response) => {
        console.log('Note Created Succesfully');
        this.dispatch('toggleNotesVisible');
      })
      .catch(error => {
        console.log(error);
      })
    },

    deleteNote({state}, index) {
      axios.delete('https://bowtie.mailbutler.io/api/v2/notes/' + state.notes[index].id)
      .then((response) => {
        console.log(response.headers);
        console.log(response.data);
        this.dispatch('toggleNotesVisible');
      })
      .catch(error => {
        console.log(error);
      })
    }
  }
})
