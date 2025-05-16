import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

export function ArticleCard({ title, content, category, key }) {
  const navigate = useNavigate();
  return (
    <Card key={key} className="max-w-96">
      <CardBody>
        <Chip
          size="sm"
          value={category}
          variant="ghost"
          className="w-24 mb-3 text-center rounded-full"
        />
        <hr className="w-28 bg-blue-gray-200 rounded-lg mb-4" />
        <Typography variant="h5" color="blue-gray" className="mb-2">
          {title}
        </Typography>
        <Typography className="!line-clamp-4">{content}</Typography>
      </CardBody>
      <CardFooter className="pt-0">
        <Button onClick={() => navigate(`/articles/${2}`)}>Read More</Button>
      </CardFooter>
    </Card>
  );
}
