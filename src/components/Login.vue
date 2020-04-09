<template>
    <div>
        <div class="form-group text-center">
            <div class="info-message">
                <div v-if="status !== null" class="text-danger">
                    Login failed –
                    <span v-if="status === 400">Bad request</span>
                    <span v-if="status === 401">Invalid credentials</span>
                    <span v-if="status === 500">You broke something, good job</span>
                </div>
            </div>
            <input class="col-4 mx-auto form-control margin-bottom-05em" type="text" name="username"
                   v-model="input.username"
                   placeholder="Username"
                   @keydown.enter="login"
            />
            <input class="col-4 mx-auto form-control margin-bottom-05em" type="password" name="password"
                   v-model="input.password"
                   placeholder="Password"
                   @keydown.enter="login"
            />
            <button @click="login" class="col-4 btn btn-outline-success" type="submit">Login</button>
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
                if (response.status === 201)
                    this.$emit('login');
                else
                    this.status = response.status;
            }
        }
    }
</script>

<style scoped>

</style>