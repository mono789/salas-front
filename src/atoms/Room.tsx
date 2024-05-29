import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function TitlebarBelowImageList() {
  return (
    <ImageList sx={{ width: 500, height: 450 }}>
      {itemData.map((item) => (
        <ImageListItem key={item.img}>
          <img
            srcSet={`${item.img}?w=248&fit=crop&auto=format&dpr=2 2x`}
            src={`${item.img}?w=248&fit=crop&auto=format`}
            alt={item.title}
            loading="lazy"
          />
          <ImageListItemBar
            title={item.title}
            position="below"
          />
        </ImageListItem>
      ))}
    </ImageList>
  );
}

const itemData = [
  {
    img: './room.jpg',
    title: '20-234',
  },
  {
    img: './room.jpg',
    title: '20-238',
  },
  {
    img: './room.jpg',
    title: '20-329',
  },
  {
    img: './room.jpg',
    title: '20-331',
  },
  {
    img: './room.jpg',
    title: ' 20-335',
  },
  {
    img: './room.jpg',
    title: '20-337',
  },
  {
    img: './room.jpg',
    title: '20-339',
  },
  {
    img: './room.jpg',
    title: '20-335',
  },
  {
    img: './room.jpg',
    title: '20-337',
  },
];