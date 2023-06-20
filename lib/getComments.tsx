export default async function getComments() {
    const res = await fetch(`https://jsonplaceholder.typicode.com/comments`);

    if (!res.ok) return undefined;

    return res.json();
}
