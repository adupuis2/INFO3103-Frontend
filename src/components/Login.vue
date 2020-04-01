<template>
    <div>
        <div class="form-group text-center">
            <input class="col-4 mx-auto form-control" type="text" name="username" v-model="input.username"
                   placeholder="Username"/>
            <input class="col-4 mx-auto form-control" type="password" name="password" v-model="input.password"
                   placeholder="Password"/>
            <button class="col-4 btn btn-outline-success" type="button" v-on:click="login()">Login</button>
        </div>
        <div class="text-center">
            <button type="button" class="btn btn-outline-danger" v-on:click="logout()">Logout</button>
            <button type="button" class="btn btn-outline-primary" v-on:click="fetchSchools()">List schools</button>
        </div>
    </div>
</template>

<script>
    import axios from "axios";
    import { api } from "../options";

    export default {
        data() {
            return {
                input: {
                    username: '',
                    password: ''
                }
            }
        },
        name: "Login",
        methods: {
            login: function () {
                axios.defaults.withCredentials = true;
                const url = api + '/login';
                axios
                    .post(url, {
                        username: this.input.username,
                        password: this.input.password
                    })
                    .then((res) => console.log(res.status));
            },
            logout: () => {
                axios.defaults.withCredentials = true;
                axios.get(api + '/login').then(res => console.log(res));
            },
            fetchSchools: () => {
            },
        }
    }
</script>

<style scoped>

</style>