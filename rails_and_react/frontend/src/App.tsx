import { useEffect, useState } from 'react'
import { createPost, fetchPosts } from './lib/api';
import type { Post } from './types/post';
import { PostInputSchema, type PostInput } from "./validation/post";
import './App.css'

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [values, setValues] = useState<PostInput>({ title: "", body: "" });
  const [errors, setErrors] = useState<{ title?: string; body?: string }>({});

  useEffect(() => {
    // useEffectはPromiseを返せないため、thenで受け取る
    fetchPosts().then(setPosts).catch(console.error);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();  // フォームのデフォルトの送信動作を防止(画面リロード防止)
    setErrors({});
    const r = PostInputSchema.safeParse(values);

    if (!r.success) {
      const es: { title?: string; body?: string } = {};
      for (const issue of r.error.issues) {
        const key = issue.path[0] as "title" | "body";
        es[key] = issue.message;
      }
      setErrors(es);
      return;
    }

    try {
      const newPost = await createPost(values.title, values.body);
      setPosts((prev) => [...prev, newPost]);
      setValues({ title: "", body: "" });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div>
      <h1>Posts</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder='title'
          value={values.title}
          onChange={(e) => setValues(v => ({ ...v, title: e.target.value }))}
        />
        {errors.title && <p role="alert">{errors.title}</p>}
        <input
          type="text"
          placeholder='body'
          value={values.body}
          onChange={(e) => setValues(v => ({ ...v, body: e.target.value }))}
        />
        {errors.body && <p role="alert">{errors.body}</p>}
        <button type="submit">Create Post</button>
      </form>

      <ul>
        {posts.map(post => (
          <li key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
