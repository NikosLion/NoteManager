<template>
  <div class="notes-container" >
    <div v-if='showContent'>
        <h3 class="msg">Your Notes</h3>
        <ul class="notes-list">
            <li class="note" v-for="(note, index) in noteList" :key="index">
                <p class="description">{{note.text}}</p>
                <div class="button-container">
                    <button v-on:click="displayEdit(index)">Edit</button>
                    <button v-on:click="deleteNoteEvent(index)">Delete</button>
                    <button v-on:click="displayCreate(index)">Create New</button>
                </div>
            </li>
        </ul>
    </div>
    <div class="create" v-if='showCreate'>
        <textarea placeholder="New Note..." cols="60" rows="1" v-model="note"></textarea>
        <button id="create-button" v-on:click='newNoteEvent'>Create</button>
    </div>
    <div class="edit" v-if='showEdit'>
        <textarea placeholder="Edit your note here..." cols="60" rows="1" v-model="editedText"></textarea>
        <button id="update-button" v-on:click='editNoteEvent()'>Update</button>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    data() {
      return {
        note: '',
        editedText: ''
      }
    },
    computed: {
        ...mapState([
            'notesVisible',
            'createVisible',
            'editVisible'
        ]),
        showContent: function() {
          return this.notesVisible;
        },
        showCreate: function() {
            return this.createVisible;
        },
        showEdit: function() {
            return this.editVisible;
        },
        noteList: function() {
            return this.$store.getters.noteList;
        }
    },
    
    methods: {
        ...mapActions([
            'createNote',
            'deleteNote',
            'toggleEditVisible',
            'toggleCreateVisible',
            'editNote'
        ]),
        newNoteEvent: function() {
            if(this.note) {
                this.createNote({text: this.note});
            }
        },
        deleteNoteEvent: function(index) {
            this.deleteNote(index);
        },
        displayEdit: function(index) {
            this.toggleEditVisible(index);
        },
        editNoteEvent: function() {
            if(this.editedText) {
                this.editNote({text: this.editedText});
            }
            
        },
        displayCreate(index) {
            this.toggleCreateVisible(index);
        }
    }
  }
</script>

<style scoped lang="scss">
  .notes-container { 
    width: 70%;
    display: flex;
    flex-direction: column;
    align-content: stretch;
    overflow: auto;
    margin: 2% 6% 0% 6%;
    border-radius: 6px;
    color: #343a40;
    background: #fbfbfb;
    .msg{
        margin-left: 4%;
    }
    .notes-list {
        width: 90%;
        margin: 2% auto;
        list-style: none;
        .note {
            background-color: #ffffff;
            border: 2px solid #dfdfdf;
            border-radius: 6px;
            margin: 2%;
            display: block;
            padding: 0.75rem 1rem;
            text-decoration: none;
            .description{
                background-color: #f1d47d;
                font-family: "Open Sans", Helvetica, Arial, sans-serif;
                font-size: 0.875rem;
                font-weight: 400;
                line-height: 1.5;
                color: #212529;
                text-align: left;
            }
            .button-container{
                margin-top: 2%;
                margin-bottom: 2px;
                display: flex;
                flex-direction: row;
            }
        }
    }
    .create {
        display: flex;
        flex-direction: column;
        align-content: stretch;
        textarea{
            outline: none;
            resize: none;
            border: none;
            padding: 1%;
            font-size: 1.3rem;
            background-color: #f1d47d;
        }

        #create-button {
            max-width: 60px;
            margin-top: 1%;
        }
    }

    .edit {
        display: flex;
        flex-direction: column;
        align-content: stretch;
        textarea{
            outline: none;
            resize: none;
            border: none;
            padding: 1%;
            font-size: 1.3rem;
            background-color: #f1d47d;
        }

        #update-button {
            max-width: 60px;
            margin-top: 1%;
        }
    }

    button {
        margin-right: 1%;
        padding: .5rem;
        background-color: #96cebc;
        border: none;
        border-radius: 2px;
        cursor: pointer;
        &:hover {
            background-color: rgb(96, 194, 161);
            transition: background-color 0.5s ease;
        }
    } 
  }
  .notes-container::-webkit-scrollbar { width: 0 !important }

</style>