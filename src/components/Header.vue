<template>
    <div class="container margin-bottom-1em header rounded-bottom">
        <!-- Brand and toggle get grouped for better mobile display -->
        <span class="navbar-brand">Rickbox</span>
        <span v-if="this.$props.loggedIn" class="float-right">
            <button @click="logout()" type="button" class="btn btn-outline-danger btn-md">Logout</button>
        </span>
    </div>
</template>

<script>
    import { loginController } from "../api/endpointInterfaces";

    export default {
        name: "Header",
        props: ['loggedIn'],
        methods: {
            logout: async function () {
                await loginController.delete();
                this.$emit('logout');
            }
        }
    }
</script>

<style scoped>
    .header {
        background-color: #141414;
        padding: 1em;
    }
</style>