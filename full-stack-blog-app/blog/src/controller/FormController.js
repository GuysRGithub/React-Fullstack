
const formLogin = document.querySelector(".formLogin")

formLogin.addEventListener("submit", (event) => {
    event.preventDefault();
    const formData = new FormData(formLogin)
    const username = formData.get("username")
    const password = formData.get("password")

    var user = {
        username,
        password
    }

    console.log(user)
})