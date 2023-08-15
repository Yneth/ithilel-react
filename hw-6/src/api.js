import axios from "axios";

const client = axios.create({
    baseURL: `https://api.github.com`,
});

const errorHandler = (error) => {
    console.error(error);
    return Promise.reject({name: error.name, message: error.message});
}

export function fetchPopularRepositories(language) {
    const url = window.encodeURI(`/search/repositories?q=stars:>1000+language:${language}&sort=stars&order=desc&type=Repositories`);
    return client.get(url)
        .then(response => response.data.items)
        .then(items => items.map(({id, name, stargazers_count, owner, description, html_url}) => ({
            id,
            name,
            stars: stargazers_count,
            avatarUrl: owner && owner.avatar_url,
            description,
            url: html_url
        })))
        .catch(errorHandler);
}

export function getUserRepositories(userName) {
    const url = window.encodeURI(`/users/${userName}/repos?per_page=100`)
    return client.get(url)
        .then(response => response.data)
        .catch(errorHandler);
}

export function getUserProfile(userName) {
    const url = window.encodeURI(`/users/${userName}`)
    return client.get(url)
        .then(response => response.data)
        .catch(errorHandler);
}

export async function getUserRepositoriesAndProfile(userName) {
    const responses = await Promise.all([
        getUserProfile(userName)
            .then(data => ({profile: {data}}))
            .catch(error => ({profile: {error}})),
        getUserRepositories(userName)
            .then(data => ({repos: {data}}))
            .catch(error => ({repos: {error}}))
    ]);
    return responses.reduce((acc, x) => ({...acc, ...x}), {userName});
}