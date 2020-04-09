<template>
    <div>
        <div class="container full-width">
            <div class="row full-width">
                <File v-for="file in parsedFiles"
                      :key="file.id"
                      :file-prop="file"
                      :user="user"
                      @delete="deleteFile(file.id)"
                      @download="downloadFile(file.id, file.name)"
                      @saveEdit="saveEdit"
                >
                </File>
            </div>
        </div>
    </div>
</template>

<script>
    import File from "./File";
    import { fileManagerController } from "../api/endpointInterfaces";

    export default {
        data() {
            return {
                status: null,
                parsedFiles: null,
            }
        },
        updated() {
        },
        methods: {
            deleteFile: async function (fileId) {
                await fileManagerController.delete(this.$props.user, fileId);
                this.$emit('refresh');
            },
            downloadFile: function (fileId, fileName) {
                fileManagerController.get(this.$props.user, fileId, fileName);
            },
            parseFiles: function (fileArray) {
                if (!fileArray)
                    return;
                const files = [];
                for (let item of fileArray) {
                    item = JSON.parse(item);
                    files.push(item);
                }
                this.parsedFiles = files;
            }
        },
        props: ['user', 'userFiles'],
        watch: {
            userFiles(newVal) {
                if (newVal)
                    this.parseFiles(newVal);
            }
        },
        name: "FileList",
        components: { File }
    }
</script>

<style scoped>
</style>