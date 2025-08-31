// const API_BASE = "http://localhost:3000/api/v1";
// Viteのプロキシ設定を利用し、リクエストを Vite -> Rails に転送し、CORS を回避
const API_BASE = "/api/v1";

export async function fetchPosts() {
    const res = await fetch(`${API_BASE}/posts`);
    if (!res.ok) throw new Error("Failed to fetch posts");
    return res.json();
}

export async function createPost(title: string, body: string) {
    const res = await fetch(`${API_BASE}/posts`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ post: { title, body } }),
    });
    if (!res.ok) throw new Error("Failed to create post");
    return res.json();
}
