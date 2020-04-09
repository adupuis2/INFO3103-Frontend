<template>
    <div class="container full-width" id="app" @drop.prevent="addFileByDrop" @dragover.prevent>
        <Header :loggedIn="loggedIn" @logout="getLoggedIn"/>
        <Login v-cloak v-if="loggedIn === false" @login="getLoggedIn"/>

        <!-- credit: https://serversideup.net/uploading-files-vuejs-axios/ -->
        <div class="text-center">
            <div v-cloak v-if="loggedIn === true">
                Use the browse button to select files to upload <br/>
                or just drag them here! <br />
                <label>
                    <input type="file" id="files" ref="files" class="col-form-label" multiple/>
                </label>
                <button @click="addFileByForm" class="btn btn-outline-success">Upload</button>
            </div>
        </div>

        <FileList v-cloak v-if="loggedIn === true" :user="username" :user-files="userFiles" :last-update="lastUpdate" @refresh="refresh"/>
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
                userFiles: [],
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
                    this.getFiles();
                }
            },
            async getFiles(){
                const files = await fileCollectionController.get(this.username);
                this.userFiles = files.data.items;
            },
            async addFileByForm() {
                await this.addFile(this.$refs.files.files);
            },
            async addFileByDrop(e) {
                await this.addFile(e.dataTransfer.files);
            },
            async addFile(files) {
                let formData = new FormData();
                for (let i = 0; i < files.length; i++)
                    formData.append('file' + i, files[i]);
                await fileCollectionController.post(this.username, formData);
                this.getFiles();
            },
            async refresh() {
                this.getFiles();
            }
        },
        name: "app",
        components: { Header, Login, FileList },
    };
</script>

<style>
</style>