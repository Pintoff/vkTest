import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Article from './UI/Article';
import { handleLike, handleUnlike } from '../utils/likeService';

interface Cat {
  id: number;
  uid: string;
  url: string;
}

const LikedCats: React.FC = () => {
  const [cats, setCats] = useState<Cat[]>([]);

  // удаление из понравившихся
  const unlikeWithDelete = async (uid: string) => {
    try {
      await handleUnlike(uid);
      setCats(prevCats => prevCats.filter(cat => cat.uid !== uid));
    } catch (error) {
      console.error('Не получилось анлайкнуть котика:', error);
    }
  };

  useEffect(() => {
    // получение понравившихся котиков
    const fetchLikedCats = async () => {
      try {
        const responseBack = await axios.get(`http://127.0.0.1:8080/api/cats/likes`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const responseData:Array<Cat> = responseBack.data;
        setCats(responseData);
      } catch (error) {
        console.error('Не получилось получить понравившихся котиков:', error);
      }
    };

    fetchLikedCats();
  }, []);

  return (
    <main>
      {cats.map((cat) => (
        <Article
        key={cat.id}
        src={cat.url}
        alt="kitty"
        isLiked={true}
        onLike={() => handleLike(cat.uid, cat.url)}
        onUnlike={() => unlikeWithDelete(cat.uid)}
        />
      ))}
    </main>
  );
};

export default LikedCats;
