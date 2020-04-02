<template>
    <div class="max-height" id="app" @drop="addFile" @drop.prevent @dragover.prevent>
        <Header :loggedIn="loggedIn" @logout="getLoggedIn"/>
        <Login v-cloak v-if="loggedIn === false" @login="getLoggedIn"/>
        <FileList v-cloak v-if="loggedIn === true" :user="username" :userFiles="userFiles" @refresh="refresh"/>
    </div>
</template>

<script>
    import Header from "./components/Header";
    import Login from "./components/Login";
    import FileList from "./components/FileList";
    import { fileCollectionController, loginController } from "./api/endpointInterfaces";

    export default {
        data() {
            return {
                loggedIn: null,
                username: '',
                userFiles: []
            };
        },
        async mounted() {
            // On application initialization, check if user is already logged in
            this.getLoggedIn();
        },
        methods: {
            async getLoggedIn() {
                const response = await loginController.get();
                if (response.status !== 200)
                    this.loggedIn = false;
                else {
                    this.loggedIn = true;
                    this.username = response.data.username;
                    this.userFiles = await fileCollectionController.get(this.username);
                }
            },
            async addFile(e) {
                let formData = new FormData();
                const files = e.dataTransfer.files;
                for (let i = 0; i < files.length; i++)
                    formData.append('file' + i, files[i]);

                await fileCollectionController.post(this.username, formData);
            },
            async refresh(){
                this.userFiles = await fileCollectionController.get(this.username);
            }
        },
        name: "app",
        components: { Header, Login, FileList },
    };
</script>

<style>
    .max-height {
        height: 100%;
    }

    button {
        background: #009435;
        border: 1px solid #009435;
    }
</style>