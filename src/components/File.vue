<template>
    <div class="margin-bottom-1em col-xs-12 col-md-6 col-lg-4 col-xl-3">
        <div class="card height100">
            <div class="card-header">
                <input
                        v-if="editing"
                        v-model="fileDetails.name"
                        @blur="renameFile"
                        @keyup.enter="renameFile"
                        v-focus
                >
                <span v-else>
                    <strong>{{fileDetails.name}}</strong>
                </span>
            </div>
            <div class="card-body">
                <div class="info-message">
                    <span v-if="message.error === true" class="text-danger">
                        {{message.body}}
                    </span>
                    <span v-if="message.error === false" class="text-success disappearing">
                        {{ message.body}}
                    </span>
                </div>
                <table>
                    <tr>
                        <td class="text-light pad-right">Size</td>
                        <td>{{fileDetails.size}}B</td>
                    </tr>
                    <tr>
                        <td class="text-light pad-right">Date</td>
                        <td>{{fileDetails.lastModified}}</td>
                    </tr>
                </table>
            </div>
            <div class="card-footer space-btwn">
                <!-- These svg icons were pulled from Bootstrap Icons https://icons.getbootstrap.com/ -->
                <button class="col-3 btn btn-outline-success" @click.prevent="$emit('download')">
                    <svg class="bi bi-download" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M.5 8a.5.5 0 01.5.5V12a1 1 0 001 1h12a1 1 0 001-1V8.5a.5.5 0 011 0V12a2 2 0 01-2 2H2a2 2 0 01-2-2V8.5A.5.5 0 01.5 8z"
                              clip-rule="evenodd"/>
                        <path fill-rule="evenodd"
                              d="M5 7.5a.5.5 0 01.707 0L8 9.793 10.293 7.5a.5.5 0 11.707.707l-2.646 2.647a.5.5 0 01-.708 0L5 8.207A.5.5 0 015 7.5z"
                              clip-rule="evenodd"/>
                        <path fill-rule="evenodd" d="M8 1a.5.5 0 01.5.5v8a.5.5 0 01-1 0v-8A.5.5 0 018 1z"
                              clip-rule="evenodd"/>
                    </svg>
                </button>
                <button class="col-3 btn btn-outline-danger" @click.prevent="$emit('delete')">
                    <svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path d="M5.5 5.5A.5.5 0 016 6v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm2.5 0a.5.5 0 01.5.5v6a.5.5 0 01-1 0V6a.5.5 0 01.5-.5zm3 .5a.5.5 0 00-1 0v6a.5.5 0 001 0V6z"/>
                        <path fill-rule="evenodd"
                              d="M14.5 3a1 1 0 01-1 1H13v9a2 2 0 01-2 2H5a2 2 0 01-2-2V4h-.5a1 1 0 01-1-1V2a1 1 0 011-1H6a1 1 0 011-1h2a1 1 0 011 1h3.5a1 1 0 011 1v1zM4.118 4L4 4.059V13a1 1 0 001 1h6a1 1 0 001-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"
                              clip-rule="evenodd"/>
                    </svg>
                </button>
                <button class="col-3 btn btn-outline-info" @click.prevent="editing = true">
                    <svg class="bi bi-pencil" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor"
                         xmlns="http://www.w3.org/2000/svg">
                        <path fill-rule="evenodd"
                              d="M11.293 1.293a1 1 0 011.414 0l2 2a1 1 0 010 1.414l-9 9a1 1 0 01-.39.242l-3 1a1 1 0 01-1.266-1.265l1-3a1 1 0 01.242-.391l9-9zM12 2l2 2-9 9-3 1 1-3 9-9z"
                              clip-rule="evenodd"/>
                        <path fill-rule="evenodd"
                              d="M12.146 6.354l-2.5-2.5.708-.708 2.5 2.5-.707.708zM3 10v.5a.5.5 0 00.5.5H4v.5a.5.5 0 00.5.5H5v.5a.5.5 0 00.5.5H6v-1.5a.5.5 0 00-.5-.5H5v-.5a.5.5 0 00-.5-.5H3z"
                              clip-rule="evenodd"/>
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
    import { fileManagerController } from "../api/endpointInterfaces";

    export default {
        data() {
            return {
                fileDetails: {
                    id: null,
                    name: null,
                    lastModified: null,
                    size: null
                },
                editing: false,
                nameBackup: null,
                message: {
                    error: null,
                    body: null
                }
            }
        },
        mounted() {
            this.applyData(this.$props.fileProp);
        },
        name: "File",
        methods: {
            renameFile: async function () {
                this.editing = false;
                const result = await fileManagerController.put(this.$props.user, this.fileDetails.id, this.fileDetails.name);
                if (result.status === 200)
                    this.saveSuccess();
                else
                    this.saveFailure(result);
            },
            saveSuccess: async function () {
                const newMetaData = await fileManagerController.head(this.$props.user, this.fileDetails.id);
                this.fileDetails.lastModified = new Date(newMetaData.headers["last-modified"]).toLocaleString();
                this.nameBackup = this.fileDetails.name;
                this.message = {
                    error: false,
                    body: 'File successfully renamed'
                };
                await new Promise(r => setTimeout(r, 2000));
                this.message = {
                    error: null,
                    body: null
                }
            },
            saveFailure: function (result) {
                this.fileDetails.name = this.nameBackup;
                let body = '';
                switch(result.status){
                    case 400:
                        body = 'Bad request';
                        break;
                    case 403:
                        body = 'Permission denied';
                        break;
                    case 404:
                        body = 'File not found...?';
                        break;
                    case 409:
                        body = 'File name already in use' ;
                        break;
                }
                this.message = {
                    error: true,
                    body
                }
            },
            applyData: function (newVal) {
                const fileDetails = {
                    id: newVal.id,
                    name: newVal.name,
                    lastModified: new Date(newVal.last_modified).toLocaleString(),
                    size: newVal.size
                };
                this.fileDetails = fileDetails;
                this.nameBackup = newVal.name;
            }
        },
        props: ['fileProp', 'user'],
        watch: {
            fileProp(newVal) {
                this.applyData(newVal);
            }
        },
        directives: {
            focus: {
                inserted(el) {
                    el.focus()
                }
            }
        }
    }
</script>

<style scoped>
    .height100 {
        height: 100%;
    }
    .disappearing {
        animation: disappear 2s ease-in;
    }

    @keyframes disappear {
        0% {
            opacity: 100%;
        }
        100% {
            opacity: 0%;
        }
    }
</style>