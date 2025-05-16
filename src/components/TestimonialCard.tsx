
interface Testimonial {
  name: string;
  role: string;
  avatar: string;
  text: string;
}

interface TestimonialCardProps {
  testimonial: Testimonial;
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <div className="testimonial-card card">
      <div className="testimonial-avatar">
        <img src={testimonial.avatar} alt={testimonial.name} />
      </div>
      <p className="testimonial-text">"{testimonial.text}"</p>
      <h4 className="testimonial-name">{testimonial.name}</h4>
      <p className="testimonial-role">{testimonial.role}</p>
    </div>
  );
};

export default TestimonialCard;
