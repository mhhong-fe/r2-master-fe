export default defineNuxtRouteMiddleware((to, from) => {
    if (to.path === "/") {
        return "/home";
    }
});
