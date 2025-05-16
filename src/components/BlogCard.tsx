
interface BlogPost {
  id?: number;
  title: string;
  date: string;
  image: string;
  excerpt: string;
  url?: string;
}

interface BlogCardProps {
  post: BlogPost;
}

const BlogCard = ({ post }: BlogCardProps) => {
  return (
    <div className="blog-card card">
      <div className="blog-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="blog-content">
        <div className="blog-date">{post.date}</div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <a href={post.url || "#"} className="blog-link">Leia mais</a>
      </div>
    </div>
  );
};

export default BlogCard;
