export const ajax = (url, data) => (
    new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        const method = data ? 'POST' : 'GET';
        xhr.open(method, url, true);
        xhr.onload = () => resolve(xhr.responseText);
        xhr.onerror = () => reject(xhr.statusText);
        if (method === 'POST' && data) {
            xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
            xhr.send(JSON.stringify(data));
        } else xhr.send();
    })
);
