import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Chip,
} from "@material-tailwind/react";
import { useNavigate } from "react-router-dom";

// Helper function to extract plain text from HTML
function extractTextFromHTML(html, maxLength = 150) {
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement("div")
  tempDiv.innerHTML = html

  // Get plain text content
  const textContent = tempDiv.textContent || tempDiv.innerText || ""

  // Truncate text if it's too long
  if (textContent.length > maxLength) {
    return textContent.substring(0, maxLength).trim() + "..."
  }

  return textContent
}

export function ArticleCard({ title, content, category, slug }) {

  // Extract plain text for preview
  const previewText = extractTextFromHTML(content, 150)
  
  const navigate = useNavigate();
  return (
    <Card className="w-full max-w-sm mx-auto h-72 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300">
      <CardBody className="flex-1 p-4">
        {/* Category Chip */}
        <div className="mb-3">
          <Chip
            size="sm"
            value={category}
            variant="ghost"
            className="w-fit text-xs px-2 py-1 rounded-full font-medium"
          />
        </div>

        {/* Decorative Line */}
        <hr className="w-12 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mb-4 border-0" />

        {/* Title */}
        <Typography
          variant="h6"
          color="blue-gray"
          className="mb-3 font-semibold leading-tight line-clamp-2 min-h-[3rem]"
        >
          {title}
        </Typography>

        {/* Content Preview */}
        <div className="flex-1">
          <Typography variant="small" color="gray" className="leading-relaxed line-clamp-4 text-sm">
            {previewText}
          </Typography>
        </div>
      </CardBody>

      {/* Footer */}
      <CardFooter className="pt-0 p-4">
        <Button
          onClick={() => navigate(`/articles/${slug}`)}
          variant="gradient"
          size="sm"
          className="w-full"
        >
          Read More
        </Button>
      </CardFooter>
    </Card>
  )
}
