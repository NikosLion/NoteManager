<template>
  <div class="notes-container" v-if='showContent'>
    <h3 class="msg">Your Notes</h3>
    <ul class="notes-list">
        <li class="note" v-for="(note, index) in noteList" :key="index">
            <p class="description">{{note.description}}</p>
            <div class="button-container">
                <button class="button edit-note">Edit</button>
                <button class="button delete-note">Delete</button>
            </div>
        </li>
    </ul>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    computed: {
        ...mapState([
            'notesVisible'
        ]),
        showContent: function() {
          return this.notesVisible;
        },
        noteList: function() {
            return this.$store.getters.noteList;
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
    }  
  }
  .notes-container::-webkit-scrollbar { width: 0 !important }

</style>