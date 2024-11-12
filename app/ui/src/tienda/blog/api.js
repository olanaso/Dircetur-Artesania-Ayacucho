// File: app/ui/src/lista-artesanos/api.js
import { URL_GLOBAL, categoryNews, sizeNews } from '../../utils/config';


export function dateToString (date) {
    const event = new Date(date);
    return event.toLocaleDateString('es-PE', { hour: '2-digit', minute: '2-digit' });
}

//request
export async function getCategories (category, size) {
    try {
        const categories = await fetch(`${URL_GLOBAL}/wp-json/wp/v2/posts?per_page=${size}&offset=0`)
        if (!categories.ok) {
            console.log("No se encontró la data")
            return;
        }
        const data = await categories.json();
        return data;
    } catch (error) {
        console.error(error)
    }
}
export async function getMedia (category) {
    try {
        const media = await fetch(`${URL_GLOBAL}/wp-json/wp/v2/media/${category.featured_media}`)
        if (!media.ok) {
            console.log("No se encontró la data");
            return;
        }
        const data = await media.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}
//search
export function search (text = '') {
    if (text.trim() !== '') {
        window.open(`${URL_GLOBAL}/index.php?s=${text}`);
        searchText.value = "";
    }
}
