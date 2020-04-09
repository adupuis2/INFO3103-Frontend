<template>
    <div>
        <div class="info-message">

        </div>
        <div class="container full-width">
            <div class="row full-width">
                <File v-for="file in parsedFiles"
                      :key="file.id"
                      :file-prop="file"
                      :user="user"
                      :last-update="lastUpdate"
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
                lastUpdate: 0,
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
            saveEdit: async function (e) {
                console.log('saveEdit callback', e);
                if (e.id && e.newName) {
                    await fileManagerController.put(this.$props.user, e.id, e.newName);
                    this.$emit('refresh');
                }
            },
            parseFiles: function (fileArray) {
                if (!fileArray)
                    return;
                const files = [];
                for (let item of fileArray) {
                    item = JSON.parse(item);
                    const lastModified = new Date(item.last_modified);

                    let month = `${lastModified.getMonth() + 1}`;
                    if (month.length === 1)
                        month = '0' + month;

                    let date = `${lastModified.getDate()}`;
                    if (date.length === 1)
                        date = '0' + date;

                    let hours = `${lastModified.getHours()}`;
                    if (hours.length === 1)
                        hours = '0' + hours;

                    let mins = `${lastModified.getMinutes()}`;
                    if (mins.length === 1)
                        mins = '0' + mins;

                    let secs = `${lastModified.getSeconds()}`;
                    if (secs.length === 1)
                        secs = '0' + secs;

                    item.last_modified = `${lastModified.getFullYear()}-${month}-${date} ${hours}:${mins}:${secs}`;
                    files.push(item);
                }
                this.parsedFiles = files;
                this.lastUpdate = Date.now();
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