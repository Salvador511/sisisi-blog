import {Typography as T } from '@mui/material'
const PostModal = ({ post }) => {
  return (
    <div>
      <T variant="h6">{post.title}</T>
      <T variant="body1">{post.content}</T>
    </div>
  )
}

const Wrapper = ({ post }) => {
  return (
    <PostModal post={post} />
  )
}

export default Wrapper