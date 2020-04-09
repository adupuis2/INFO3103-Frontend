<template>
    <div class="margin-bottom-1em col-xs-12 col-md-6 col-lg-4 col-xl-3">
        <div class="card height">
            <div class="card-header">
                <input
                        v-if="editing"
                        v-model="fileDetails.name"
                        @blur="saveEdit"
                        @keyup.enter="saveEdit"
                        v-focus
                >
                <span v-else>
                    <strong>{{fileDetails.name}}</strong>
                </span>
            </div>
            <div class="card-body">
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
    export default {
        data() {
            return {
                fileDetails: {
                    id: null,
                    name: null,
                    lastModified: null,
                    size: null
                },
                editing: false
            }
        },
        mounted() {
            this.applyData(this.$props.fileProp);
        },
        name: "File",
        methods: {
            saveEdit: async function () {
                this.editing = false;
                this.$emit('saveEdit', {id: this.fileDetails.id, newName: this.fileDetails.name});
            },
            applyData: function (newVal) {
                const fileDetails = {
                    id: newVal.id,
                    name: newVal.name,
                    lastModified: newVal.last_modified,
                    size: newVal.size
                };
                this.fileDetails = fileDetails;
            }
        },
        props: ['fileProp', 'user', 'lastUpdate'],
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
    .height {
        height: 100%;
    }
</style>