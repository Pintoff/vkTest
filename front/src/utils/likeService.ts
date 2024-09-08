import axios from 'axios';



// поставить лайк
export const handleLike = async (imageId: string, url: string) => {
  try {
    await axios.post(`http://127.0.0.1:8080/api/cats/like/${imageId}`, { url: url });
  } catch (error) {
    console.error('Error liking image:', error);
  }
};
// убрать лайк
export const handleUnlike = async (imageId: string) => {
  try {
    await axios.delete(`http://127.0.0.1:8080/api/cats/like/${imageId}`);
  } catch (error) {
    console.error('Error unliking image:', error);
  }
};