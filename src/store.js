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
    editVisible: false,
    noteToEdit: -1,
    noteForCreate: -1,
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
      state.editVisible = false;
    },
    toggleCreate: (state, index) => {
      state.notesVisible = false;
      state.editVisible = false;
      state.createVisible = true;
      state.noteForCreate = index;
    },
    toggleEdit: (state,index) => {
      state.notesVisible = false;
      state.createVisible = false;
      state.editVisible = true;
      state.noteToEdit = index;
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
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + response.data.token;
      })
      .catch(error => {
        commit('loginStop', 'Invalid email/password combination. Please try again.');
      })
    },

    toggleNotesVisible({commit}) {
      axios.get('https://bowtie.mailbutler.io/api/v2/notes')
      .then((response) => {
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
      })
      .catch(() => {
        //
      })
    },

    toggleCreateVisible({commit}, index) {
      commit('toggleCreate', index);
    },

    createNote({state}, newNote) {
      axios.post('https://bowtie.mailbutler.io/api/v2/notes', 
      {
        context: state.notes[state.noteForCreate].context,
        text: newNote.text
      })
      .then(() => {
        this.dispatch('toggleNotesVisible');
      })
      .catch(() => {
        //
      })
    },

    toggleEditVisible({commit, state}, index) {
      commit('toggleEdit', index);
    },

    deleteNote({state}, index) {
      axios.delete('https://bowtie.mailbutler.io/api/v2/notes/' + state.notes[index].id)
      .then(() => {
        this.dispatch('toggleNotesVisible');
      })
      .catch(() => {
        //
      })
    },

    editNote({state}, editedNote) {
      axios.put('https://bowtie.mailbutler.io/api/v2/notes/' + state.notes[state.noteToEdit].id,
      {
        text: editedNote.text,
        context: state.notes[state.noteToEdit].context,
      })
      .then(() => {
        this.dispatch('toggleNotesVisible');
      })
      .catch(() => {
        this.dispatch('toggleNotesVisible');
      })
    }
  }
})
