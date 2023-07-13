const newPost = document.querySelector('#addPost');

const addNewPostHandler = async () => {
    const titleInput = document.querySelector('input[name="title"]');
    const contentInput = document.querySelector('textarea[name="content"]');
    const titleText = titleInput.value.trim();
    const contentText = contentInput.value.trim();

    if (!titleInput || !contentInput) {
        alert('Please fill all fields.');
}
if(titleText && contentText) {
    const response = await fetch('/api/dashboard/post', {
        method: 'POST',
        body: JSON.stringify({ title: titleText, content: contentText }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  console.log('title:::', titleText);
  console.log('content:::', contentText);
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to post new post');
      }
    }
  };

  console.log(newPost);
  newPost.addEventListener('click', addNewPostHandler);
