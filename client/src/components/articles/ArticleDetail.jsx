import {
  Typography,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Chip,
  Breadcrumbs,
} from "@material-tailwind/react";

export default function ArticleDetailPage() {
  // Sample article data - in a real app, this would come from props or an API
  const article = {
    title: "The Future of Web Development: Trends to Watch in 2025",
    category: "Technology",
    publishedDate: "May 4, 2025",
    readTime: "8 min read",
    content: [
      "The landscape of web development is constantly evolving, with new technologies and methodologies emerging at a rapid pace. As we move further into 2025, several key trends are shaping the future of how we build and interact with web applications.",
      "Artificial Intelligence integration has become mainstream, with more developers leveraging AI-powered tools to automate repetitive tasks and enhance user experiences. From intelligent code completion to automated testing, AI is revolutionizing the development workflow.",
      "WebAssembly continues to gain traction, enabling high-performance applications that were once only possible in native environments. This technology allows developers to run code written in languages like C, C++, and Rust directly in the browser at near-native speed.",
      "The rise of edge computing is changing how we think about deployment and data processing. By moving computation closer to the end user, applications can achieve lower latency and better performance, especially for users in regions with limited connectivity.",
      "Design systems have evolved beyond simple component libraries to become comprehensive platforms that ensure consistency across products while accelerating development. These systems now often include accessibility guidelines, interaction patterns, and even AI-assisted design tools.",
      "As privacy concerns continue to grow, developers are implementing more sophisticated approaches to data protection. Zero-knowledge proofs and other cryptographic techniques are becoming essential tools for building trust with users while still delivering personalized experiences.",
    ],
    author: {
      name: "Alex Johnson",
      role: "Senior Technology Editor",
      avatar: "/placeholder.svg?height=200&width=200",
    },
  };

  return (
    <div className="max-w-full px-4 pt-24 pb-8 bg-blue-gray-50">
      {/* Breadcrumbs navigation */}
      <Breadcrumbs className="mb-6 bg-white rounded">
        <a href="#" className="opacity-60">
          Home
        </a>
        <a href="#" className="opacity-60">
          Blog
        </a>
        <a href="#">{article.category}</a>
      </Breadcrumbs>

      <Card className="overflow-hidden">
        {/* Article Header */}
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="m-0 p-6 pb-0"
        >
          {/* Category and metadata */}
          <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between mb-4">
            <Chip
              value={article.category}
              color="blue"
              size="sm"
              className="w-fit"
            />
            <div className="flex items-center gap-2 text-gray-600">
              <Typography variant="small">{article.publishedDate}</Typography>
              <span>•</span>
              <Typography variant="small">{article.readTime}</Typography>
            </div>
          </div>

          {/* Article Title */}
          <Typography
            variant="h1"
            color="blue-gray"
            className="mb-4 text-3xl md:text-4xl lg:text-5xl"
          >
            {article.title}
          </Typography>

          {/* Author information (top placement option) */}
          <div className="flex items-center gap-4 mb-6">
            <img
              src={article.author.avatar || "/placeholder.svg"}
              alt={article.author.name}
              className="h-10 w-10 rounded-full object-cover"
            />
            <div>
              <Typography variant="h6">{article.author.name}</Typography>
              <Typography variant="small" color="gray" className="font-normal">
                {article.author.role}
              </Typography>
            </div>
          </div>
        </CardHeader>

        {/* Article Content */}
        <CardBody className="p-6">
          {/* Main content paragraphs */}
          <article className="prose max-w-none">
            {article.content.map((paragraph, index) => (
              <Typography
                key={index}
                variant="paragraph"
                className="mb-4 text-base md:text-lg"
              >
                {paragraph}
              </Typography>
            ))}
          </article>
        </CardBody>
      </Card>
    </div>
  );
}

// {/* Article Footer - Alternative author placement */}
// <CardFooter className="p-6 border-t border-gray-200">
// <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
//   {/* Share and like buttons would go here */}
//   <div className="flex gap-2">
//     <Chip value="Web Development" size="sm" />
//     <Chip value="AI" size="sm" />
//     <Chip value="Technology" size="sm" />
//   </div>

//   {/* You can uncomment this if you prefer author info at the bottom */}
//   {/*
//   <div className="flex items-center gap-4">
//     <img
//       src={article.author.avatar || "/placeholder.svg"}
//       alt={article.author.name}
//       className="h-10 w-10 rounded-full object-cover"
//     />
//     <div>
//       <Typography variant="h6">{article.author.name}</Typography>
//       <Typography variant="small" color="gray" className="font-normal">
//         {article.author.role}
//       </Typography>
//     </div>
//   </div>
//   */}
// </div>
// </CardFooter>
