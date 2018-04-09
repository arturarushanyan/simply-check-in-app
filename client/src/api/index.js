export default class API {
    static postMethodOptions = {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",
        },
    };

    static post(url, data) {
        return fetch(url, { ...this.postMethodOptions, body: JSON.stringify(data)})
            .then(res => res.json())
            .catch(err => console.log(err));
    }
}