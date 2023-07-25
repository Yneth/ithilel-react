const API_ROOT = 'https://jsonplaceholder.typicode.com';
const POSTS_API = `${API_ROOT}/posts`;

export async function fetchAll() {
    const response = await fetch(`${POSTS_API}`);
    if (!response.ok) {
        return Promise.reject(await formatErrorResponse(response));
    }
    return await response.json();
}

export async function create(postBody) {
    const response = await fetch(`${POSTS_API}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postBody)
    })
    if (!response.ok) {
        return Promise.reject(await formatErrorResponse(response));
    }
    return await response.json();
}

export async function update(postId, postBody) {
    const response = await fetch(`${POSTS_API}/${postId}`, {
        method: 'PATCH',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(postBody)
    })
    if (!response.ok) {
        return Promise.reject(await formatErrorResponse(response));
    }
    return await response.json();
}

export async function remove(postId) {
    const response = await fetch(`${POSTS_API}/${postId}`, {
        headers: {'Content-Type': 'application/json'},
        method: 'DELETE'
    })
    if (!response.ok) {
        return Promise.reject(await formatErrorResponse(response));
    }
    return await response.json();
}

async function formatErrorResponse(resp) {
    return `Failed to query resource, reason: ${resp.status} ${resp.statusText} ${await resp.text()}`;
}
