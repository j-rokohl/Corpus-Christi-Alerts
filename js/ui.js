document.addEventListener("DOMContentLoaded", function () {
    // Sidenav Initialization
    const menus = document.querySelector(".mobile-menu");
    M.Sidenav.init(menus, { edge: "right"})
});
    

if ("serviceWorker" in navigator){
    navigator.serviceWorker.register('/serviceworker.js')
    .then(req => console.log('Service Worker Registered', req))
    .catch(err => console.log('Service Worker Registration Failed', err));
}

