const updatePostForm = document.querySelector('#updatePostForm');

const updatePostHandler = async (event) => {
  event.preventDefault();

  const postId = window.location.pathname.split('/').pop();
  const title = document.querySelector('#title').value.trim();
  const content = document.querySelector('#content').value.trim();
  if (!title || !content) {
    alert('Please fill all fields.');
  }

    if (title && content) {
  const response = await fetch(`/api/dashboard/post/${postId}`, {
    method: 'PUT',
    body: JSON.stringify({ title, content }),
    headers: { 'Content-Type': 'application/json' },
  });

  console.log('title:::', title);
  console.log('content:::', content);
  if (response.ok) {
    document.location.href = '/dashboard';
  } else {
    alert('Failed to update the post');
  }
  }
};
const deleteBtn = document.querySelector('#deleteBtn');

const deletePostHandler = async (event) => {
    event.preventDefault();
  
    const postId = window.location.pathname.split('/').pop();
  
    const response = await fetch(`/api/dashboard/post/${postId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
  
    if (response.ok) {
      document.location.href = '/dashboard';
    } else {
      alert('Failed to delete the post');
    }
  };

updatePostForm.addEventListener('submit', updatePostHandler);

deleteBtn.addEventListener('click', deletePostHandler);