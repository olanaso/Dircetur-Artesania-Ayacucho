export async function loadPartial(path) {
    const response = await fetch(path);

    if (!response.ok) {
        throw new Error("HTTP error " + response.status);
    }

    const text = await response.text();
    const parser = new DOMParser();
    const doc = parser.parseFromString(text, "text/html");
    return doc.body.firstChild;
}

export async function loadPartials(partials) {
    for (let partial of partials) {
        const element = await loadPartial(partial.path);
        document.getElementById(partial.container).appendChild(element);
    }
}