export const syncLikeInArray = (arr, postId, liked, likes) =>
  arr.map((it) => ((it._id || it.id) === postId ? { ...it, liked, likes } : it));
