import React from 'react';
import HeartIcon from './Heart';

interface ArticleProps {
  src: string;
  alt: string;
  isLiked: boolean;
  onLike: () => void;
  onUnlike: () => void;
}

const Article: React.FC<ArticleProps> = ({ src, alt, isLiked, onLike, onUnlike }) => (
  <article className="article">
    <img src={src} alt={alt} />
    <HeartIcon 
      isLiked={isLiked ? true : false} 
      onClick={isLiked ? onUnlike : onLike}
      className="heart-icon" 
    />
  </article>
);

export default Article;