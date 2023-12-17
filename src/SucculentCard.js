
import React, { useState } from 'react';
import { Card, CardMedia, Typography, CardContent, Button } from '@mui/material';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';


function SucculentCard({ succulent }) {
  const [liked, setLiked] = useState(false);

  const handleLike = () => {
    setLiked(!liked);
  };

  return (
    <Card >
      <CardMedia
        component="img"
        alt={succulent.pid}
        height="500"
        image={succulent.image}
      />
      <CardContent>
        <Typography variant="h5" component="div">
          {succulent.display_pid}
        </Typography>
        <Typography color="textSecondary">
          Category: {succulent.basic.category.join(', ')}
        </Typography>
        <Typography color="textSecondary">
          Description: {succulent.basic.floral_language}
        </Typography>
        <Typography color="textSecondary">
          Origin: {succulent.basic.origin}
        </Typography>
        <Typography color="textSecondary">
          Production: {succulent.basic.production}
        </Typography>
        <Typography color="textSecondary">
          Blooming: {succulent.basic.blooming}
        </Typography>
        <Typography color="textSecondary">
          Size: {succulent.maintenance.size}
        </Typography>
        <Typography color="textSecondary">
          Soil: {succulent.maintenance.soil}
        </Typography>
        <Button variant="contained" onClick={handleLike}>
          <ThumbUpIcon sx={{ fontSize: 20, marginRight: 1 }} />
          {liked ? 'Liked' : 'Like'}
        </Button>
      </CardContent>
    </Card>
  );
}

export default SucculentCard;
