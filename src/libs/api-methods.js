const dominio = process.env.DOMINIO_API;

export async function loginUser(username, password) {
    const response = await fetch(dominio + "/api/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password
        }),
    });

    const data = await response.json();
    return data
}

export async function signUpUser(username, password, email) {
    const response = await fetch(dominio + "/api/signup/save", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            username: username,
            password: password,
            email: email
        }),
    });

    const data = await response.json();
    return data
}

export async function sendCode(user_id, code) {
    const response = await fetch(dominio + "/api/signup/auth", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            id: user_id,
            code: code
        }),
    });

    const data = await response.json();
    return data
}

export async function getUserShows(user_id) {
    const response = await fetch(dominio + "/api/show/userShow/" + user_id);
    const data = await response.json();
    return data
}

export async function getProtected(){
    const response = await fetch(dominio + "/api/protected");
    const data = await response.json();
    return data
}

export async function logOut(){
    const response = await fetch(dominio + "/api/logout", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    });
    const data = await response.json();
    return data
}

export async function deleteShow(show_id){
    const response = await fetch(dominio + "/api/show/" + show_id, { method: "DELETE" });
    if(response.status === 204){
        return true
    }
    return false
}

export async function updateShow(showData) {
    const response = await fetch(dominio + "/api/show/" + showData.id, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(showData),
    });
    const data = await response.json();
    return data
}

export async function saveShow(showData) {
    const response = await fetch(dominio + "/api/show", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(showData),
    });
    const data = await response.json();
    return data
}