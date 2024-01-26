import { defineStore } from "pinia";
import { ref } from "vue";

export const useUserStore = defineStore('user', () => {
    const isAuthenticated = ref(false);
    const authenticatedUser = ref('');

    const setAuthentication = (authVal: boolean) => {
        isAuthenticated.value = authVal;
    }

    const setUserAuthentication = (userVal: string) => {
        authenticatedUser.value = userVal;
    }

    return { isAuthenticated, authenticatedUser, setAuthentication, setUserAuthentication };
})



