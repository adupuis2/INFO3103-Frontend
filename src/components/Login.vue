<template>
    <div>
        <div class="form-group text-center">
            <input class="col-4 mx-auto form-control margin-bottom-05em" type="text" name="username" v-model="input.username"
                   placeholder="Username"/>
            <input class="col-4 mx-auto form-control margin-bottom-05em" type="password" name="password" v-model="input.password"
                   placeholder="Password"/>
            <button @click="login()" class="col-4 btn btn-outline-success" type="button">Login</button>
        </div>
    </div>
</template>

<script>
    import { loginController } from "../api/endpointInterfaces";

    export default {
        data() {
            return {
                status: null,
                input: {
                    username: '',
                    password: ''
                }
            }
        },
        name: "Login",
        methods: {
            login: async function () {
                const response = await loginController.post(this.input.username, this.input.password);
                if(response.status === 201) {
                    this.$emit('login');
                }
                // todo: invalid credentials
                // todo: bad request
            }
        }
    }
</script>

<style scoped>

</style>