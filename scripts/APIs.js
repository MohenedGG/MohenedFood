export async function productsList() {
    const data = await fetch(location.pathname.includes('pages') ? '../data/data.json' : './data/data.json');
    if(!data.ok) {
        throw new Error("User not found!");
    }
    return await data.json();
}