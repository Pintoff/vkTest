import React, { useEffect, useState, useRef, useCallback } from 'react';
import axios from 'axios';
import Article from './UI/Article';
import { handleLike, handleUnlike } from '../utils/likeService';
import Aside from './UI/Aside';

interface CatImage {
  id: string;
  url: string;
}

const Main: React.FC = () => {
  const [catImages, setCatImages] = useState<CatImage[]>([]);
  const [likedImages, setLikedImages] = useState<string[]>([]);
  const [page, setPage] = useState(1);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastImageRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      // бесконечная лента просмотра котиков
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) observer.current.observe(node);
    },
    []
  );

  useEffect(() => {
    const fetchLikedImages = async () => {
      try {
        const response = await axios.get(`http://127.0.0.1:8080/api/cats/likes`);
        setLikedImages(response.data);
      } catch (error) {
        console.error('Error fetching liked images:', error);
      }
    };

    const fetchCatImages = async (page: number) => {
      try {
        const response = await axios.get(
          `https://api.thecatapi.com/v1/images/search?limit=10&page=${page}&api_key=${import.meta.env.API_KEY}`
        );
        setCatImages((prevImages) => [...prevImages, ...response.data]);
      } catch (error) {
        console.error('Error fetching cat images:', error);
      }
    };

    fetchLikedImages();
    fetchCatImages(page);
  }, [page]);

  const onLike = async (imageId: string, url: string) => {
    try {
      await handleLike(imageId, url);
      setLikedImages((prevLikedImages) => [...prevLikedImages, imageId]);
    } catch (error) {
      console.error('Error liking image:', error);
    }
  };

  const onUnlike = async (imageId: string) => {
    try {
      await handleUnlike(imageId);
      setLikedImages((prevLikedImages) => prevLikedImages.filter((id) => id !== imageId));
    } catch (error) {
      console.error('Error unliking image:', error);
    }
  };

  return (
    <>
      <main>
        {catImages.map((image, index) => {
          if (catImages.length === index + 1) {
            return (
              <div ref={lastImageRef} key={image.id}>
                <Article
                  src={image.url}
                  alt="kitty"
                  isLiked={likedImages.includes(image.id)}
                  onLike={() => onLike(image.id, image.url)}
                  onUnlike={() => onUnlike(image.id)}
                />
              </div>
            );
          }
          return (
            <Article
              key={image.id}
              src={image.url}
              alt="kitty"
              isLiked={likedImages.includes(image.id)}
              onLike={() => onLike(image.id, image.url)}
              onUnlike={() => onUnlike(image.id)}
            />
          );
        })}
      </main>
      <Aside />
    </>
  );
};

export default Main;