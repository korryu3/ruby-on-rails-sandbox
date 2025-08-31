const API_BASE = "http://localhost:3000/api/v1";

export async function fetchPosts() {
    const res = await fetch(`${API_BASE}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}
