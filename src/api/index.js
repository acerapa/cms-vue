const apiHandler = ({url, method = 'GET', data = {}, headers = {} }) => {
    // use fetch to make the request

    // use a baseUrl to make the request
    const baseUrl = 'http://localhost:8000/api'

    // create a config object to store the method, headers, and body
    const config = {
        method,
    }

    // add headers if it has value
    if(Object.keys(headers).length > 0) {
        config.headers = headers
    }

    // add body if it has value
    if(Object.keys(data).length > 0) {
        config.body = JSON.stringify(data)
    }

    return fetch(baseUrl + url, {
        ...config
    })
    .then(res => res.json())
    .catch(err => console.log(err))
}

export default apiHandler;
