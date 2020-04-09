<template>
    <div class="margin-bottom-1em header rounded-bottom">
        <span class="third"></span>

        <span class="third centered">
            <span class="navbar-brand">Rickbox</span>
        </span>

        <span class="third">
            <span v-if="this.$props.loggedIn" class="float-right">
                <button @click="logout()" type="button" class="btn btn-outline-danger btn-md">Logout</button>
            </span>
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
        width: 100%;
        display: flex;
    }

    .third {
        width: 33vw;
    }

    .centered {
        text-align: center;
    }
</style>