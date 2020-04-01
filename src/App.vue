<template>
    <div id="app">
        <Login v-if="!authenticated"></Login>
    </div>
</template>

<script>
    import Login from "./components/Login";

    export default {
        data () {
            return {
                authenticated: false
            };
        },
        mounted() {

        },
        name: "app",
        components: { Login },
    };
</script>

<style>
    button {
        background: #009435;
        border: 1px solid #009435;
    }
</style>