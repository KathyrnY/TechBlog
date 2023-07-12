const saveChanges = document.querySelector('#saveBtn');
const backBtn = document.querySelector('#backBtn');

const saveCommentHandler = async () => {
  const commentsInput = document.querySelector('input[name="comments"]');
  const commentText = commentsInput.value.trim();

  if (commentText) {
    const postId = window.location.pathname.split('/').pop();

    const response = await fetch(`/api/homepage/comments/${postId}`, {
      method: 'POST',
      body: JSON.stringify({ content: commentText }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
console.log('comment:', commentText);
    if (response.ok) {
      document.location.replace(`/homepage/comments/${postId}`);
    } else {
      alert('Failed to post comment');
    }
  }
};
const backToDashboard = () => {
    document.location.href = '/homepage';
  };
  console.log(saveChanges);
  saveChanges.addEventListener('click', saveCommentHandler);
  backBtn.addEventListener('click', backToDashboard);

