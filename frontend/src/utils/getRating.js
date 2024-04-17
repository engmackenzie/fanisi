import StarIcon from '@mui/icons-material/Star';
import StarBorderIcon from '@mui/icons-material/StarBorder';

const getRating = (rating) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(<span>{i <= rating ? <StarIcon /> : <StarBorderIcon />}</span>);
  }
  return stars;
}

export default getRating;