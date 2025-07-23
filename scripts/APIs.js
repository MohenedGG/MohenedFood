export async function productsList() {
    const data = await fetch(`../data/data.json`);
    if(!data.ok) {
        throw new Error("User not found!");
    }
    return await data.json();
}