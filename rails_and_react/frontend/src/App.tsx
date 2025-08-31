import { useEffect, useState } from 'react'
import { createPost, fetchPosts } from './lib/api';
import type { Post } from './types/post';

import './App.css'

function App() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [title, setTitle] = useState<string>("");
  const [body, setBody] = useState<string>("");

  useEffect(() => {
    // useEffectはPromiseを返せないため、thenで受け取る
    fetchPosts().then(setPosts).catch(console.error);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();  // フォームのデフォルトの送信動作を防止(画面リロード防止)
    try {
      const newPost = await createPost(title, body);
      setPosts([...posts, newPost]);
      setTitle("");
      setBody("");
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
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder='body'
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
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
