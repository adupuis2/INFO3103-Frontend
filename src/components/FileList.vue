<template>
    <div class="container space-btwn">
        <div class="row full-width">
            <File v-for="file in parsedFiles"
                  :key="file.id"
                  :id="file.id"
                  :name="file.name"
                  :lastModified="file.last_modified"
                  :size="file.size"
                  @delete="deleteFile(file.id)"
                  @download="downloadFile(file.id, file.name)"
            >
            </File>
        </div>
    </div>
</template>

<script>
    import File from "./File";
    import { fileManagerController } from "../api/endpointInterfaces";

    export default {
        data() {
            return {
                rawFiles: null,
                parsedFiles: null,
                lastUpdate: 0,
            }
        },
        updated() {
            if (Date.now() - this.lastUpdate > 250)
                this.refresh();
        },
        methods: {
            refresh: function () {
                this.lastUpdate = Date.now();
                const files = [];
                for (let item of this.rawFiles) {
                    item = JSON.parse(item);
                    const lastModified = new Date(item.last_modified);

                    item.last_modified = `${lastModified.getFullYear()}-${lastModified.getMonth() + 1}-${lastModified.getDate()} ${lastModified.getHours()}:${lastModified.getMinutes()}:${lastModified.getSeconds()}`;
                    files.push(item);
                }
                this.parsedFiles = files;
            },
            deleteFile: async function (fileId) {
                await fileManagerController.delete(this.$props.user, fileId);
                this.$emit('refresh');
            },
            downloadFile: function (fileId, fileName) {
                // Credit for this goes to dreamyguy on github:
                //      https://gist.github.com/dreamyguy/6b4ab77d2f118adb8a63c4a03fba349d
                fileManagerController.get(this.$props.user, fileId).then(res => {
                    const data = res.data;
                    const blob = new Blob([data],
                        {
                            type: 'application/force-download',


                        });
                    const blobUrl = window.URL.createObjectURL(blob);
                    const tempLink = document.createElement('a');
                    tempLink.style.display = 'none';
                    tempLink.href = blobUrl;
                    tempLink.setAttribute('download', fileName);
                    if (typeof tempLink.download === 'undefined') {
                        tempLink.setAttribute('target', '_blank');
                    }
                    document.body.appendChild(tempLink);
                    tempLink.click();
                    document.body.removeChild(tempLink);
                    setTimeout(() => {
                        window.URL.revokeObjectURL(blobUrl);
                    }, 100);
                })
            }
        },
        props: ['user', 'userFiles'],
        watch: {
            userFiles(newVal, oldVal) {
                console.log("oldVal:", oldVal);
                console.log("newVal:", newVal);
                console.log(Date.now() - this.lastUpdate);
                if (newVal && newVal.data && newVal.data.items)
                    this.rawFiles = newVal.data.items;
                this.refresh();
            }
        },
        name: "FileList",
        components: { File }
    }
</script>

<style scoped>
    .full-width {
        width: 100%
    }
</style>