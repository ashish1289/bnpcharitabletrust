import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Calendar, User, ArrowRight } from "lucide-react";

// Dummy blog data
const blogPosts = [
  {
    id: 1,
    title: "Empowering Communities Through Education",
    excerpt: "Discover how BNP Charitable Trust is transforming lives through our comprehensive education programs, providing access to quality learning for underprivileged children across Odisha.",
    content: `
      <p>Education is the cornerstone of social transformation. At BNP Charitable Trust, we believe that every child deserves access to quality education, regardless of their socio-economic background. Our comprehensive education programs have been making a significant impact in communities across Odisha.</p>
      
      <h2>Our Educational Initiatives</h2>
      <p>We have established multiple learning centers in rural and urban areas, providing free education to children who would otherwise be unable to attend school. Our programs include:</p>
      <ul>
        <li>Primary and secondary education support</li>
        <li>Scholarship programs for meritorious students</li>
        <li>Digital literacy training</li>
        <li>Vocational skill development</li>
      </ul>
      
      <h2>Impact Stories</h2>
      <p>Over the past year, we have successfully enrolled over 500 children in our education programs. Many of our students have gone on to pursue higher education and secure meaningful employment, breaking the cycle of poverty in their families.</p>
      
      <p>One such success story is Priya, a 12-year-old girl from a remote village who, with our support, is now excelling in her studies and dreams of becoming a doctor. Her determination and our consistent support have made this dream achievable.</p>
      
      <h2>Looking Forward</h2>
      <p>We are committed to expanding our reach and ensuring that no child is left behind. With your support, we can continue to build a brighter future for the next generation.</p>
    `,
    author: "BNP Trust Team",
    date: "2024-01-15",
    image: "/community.jpg",
    category: "Education",
    images: ["/community.jpg", "/Niranjan.jpg"]
  },
  {
    id: 2,
    title: "Healthcare for All: Our Medical Mission",
    excerpt: "Learn about our mobile health clinics and free medical camps that bring essential healthcare services to remote villages, ensuring that distance and poverty don't prevent anyone from receiving medical care.",
    content: `
      <p>Healthcare is a fundamental right, yet millions in rural India lack access to basic medical facilities. BNP Charitable Trust has been working tirelessly to bridge this gap through our innovative healthcare initiatives.</p>
      
      <h2>Mobile Health Clinics</h2>
      <p>Our mobile health clinics travel to remote villages, bringing doctors, medicines, and diagnostic equipment directly to communities that need them most. These clinics provide:</p>
      <ul>
        <li>General health check-ups</li>
        <li>Free medicines for common ailments</li>
        <li>Maternal and child healthcare services</li>
        <li>Health awareness programs</li>
      </ul>
      
      <h2>Free Medical Camps</h2>
      <p>We organize regular free medical camps in collaboration with local hospitals and healthcare professionals. These camps have treated over 2,000 patients in the past six months, addressing issues ranging from minor infections to chronic conditions.</p>
      
      <h2>Preventive Care</h2>
      <p>Beyond treatment, we focus on preventive care through awareness programs about hygiene, nutrition, and disease prevention. Our health educators work with communities to build sustainable health practices.</p>
      
      <p>The impact has been remarkable. Many villagers who had never seen a doctor are now receiving regular medical care, and we've seen a significant reduction in preventable diseases in the areas we serve.</p>
    `,
    author: "Dr. Anjali Patnaik",
    date: "2024-01-10",
    image: "/community.jpg",
    category: "Healthcare",
    images: ["/community.jpg", "/Niranjan.jpg"]
  },
  {
    id: 3,
    title: "Women Empowerment: Building Stronger Communities",
    excerpt: "Explore our women's empowerment programs that provide skill training, microfinance support, and leadership development opportunities, helping women become self-reliant and confident.",
    content: `
      <p>When women are empowered, entire communities thrive. BNP Charitable Trust's women empowerment programs are designed to create opportunities for women to become economically independent and socially confident.</p>
      
      <h2>Skill Development Programs</h2>
      <p>We offer comprehensive training in various skills including:</p>
      <ul>
        <li>Tailoring and garment making</li>
        <li>Handicrafts and traditional arts</li>
        <li>Food processing and preservation</li>
        <li>Computer literacy and digital skills</li>
      </ul>
      
      <h2>Microfinance Support</h2>
      <p>Through our microfinance initiative, we provide small loans to women entrepreneurs to start or expand their businesses. These loans come with minimal interest rates and flexible repayment terms, making entrepreneurship accessible to women from all backgrounds.</p>
      
      <h2>Leadership Development</h2>
      <p>We conduct regular workshops on leadership, communication, and financial literacy. These programs help women gain confidence, develop decision-making skills, and take on leadership roles in their communities.</p>
      
      <h2>Success Stories</h2>
      <p>Meera, a mother of three, started a small tailoring business with our support. Today, she employs five other women and has become a role model in her village. Her success story inspires many others to take the first step toward financial independence.</p>
      
      <p>We believe that empowering women is the key to building stronger, more resilient communities. Every woman we support creates a ripple effect that benefits her family and her community.</p>
    `,
    author: "Ms. Adyasha Patnaik",
    date: "2024-01-05",
    image: "/community.jpg",
    category: "Women Empowerment",
    images: ["/community.jpg", "/Niranjan.jpg"]
  },
  {
    id: 4,
    title: "Environmental Conservation: Our Green Initiative",
    excerpt: "Read about our tree plantation drives, waste management programs, and environmental awareness campaigns that are helping create a sustainable future for our communities.",
    content: `
      <p>Environmental conservation is not just about protecting nature—it's about securing a livable future for generations to come. BNP Charitable Trust has launched several green initiatives to promote environmental sustainability.</p>
      
      <h2>Tree Plantation Drives</h2>
      <p>We organize regular tree plantation drives across various locations, involving local communities, schools, and volunteers. In the past year, we've planted over 5,000 trees, contributing to:</p>
      <ul>
        <li>Improved air quality</li>
        <li>Soil conservation</li>
        <li>Biodiversity preservation</li>
        <li>Climate change mitigation</li>
      </ul>
      
      <h2>Waste Management Programs</h2>
      <p>Our waste management initiatives focus on reducing, reusing, and recycling. We work with communities to establish proper waste segregation systems and promote composting of organic waste.</p>
      
      <h2>Environmental Awareness</h2>
      <p>Through workshops and campaigns, we educate people about the importance of environmental conservation. We teach sustainable practices like rainwater harvesting, solar energy usage, and organic farming.</p>
      
      <h2>Community Participation</h2>
      <p>The success of our environmental programs depends on community participation. We're proud that thousands of volunteers have joined our green initiatives, making environmental conservation a community movement.</p>
      
      <p>Together, we can create a greener, healthier planet for future generations. Every small action counts, and every tree planted is a step toward a sustainable future.</p>
    `,
    author: "Shri Parthajit Patnaik",
    date: "2023-12-28",
    image: "/community.jpg",
    category: "Environment",
    images: ["/community.jpg", "/Niranjan.jpg"]
  },
  {
    id: 5,
    title: "Celebrating Our Volunteers: The Heart of Our Mission",
    excerpt: "Meet the incredible volunteers who dedicate their time and energy to make our programs successful. Their stories of compassion and commitment inspire us every day.",
    content: `
      <p>Volunteers are the backbone of BNP Charitable Trust. Without their dedication, passion, and selfless service, none of our programs would be possible. Today, we celebrate these amazing individuals who make a difference every day.</p>
      
      <h2>Who Are Our Volunteers?</h2>
      <p>Our volunteers come from all walks of life—students, professionals, retirees, homemakers, and community leaders. What unites them is their shared commitment to making a positive impact in their communities.</p>
      
      <h2>Volunteer Activities</h2>
      <p>Our volunteers contribute in numerous ways:</p>
      <ul>
        <li>Teaching at our education centers</li>
        <li>Assisting in medical camps</li>
        <li>Organizing community events</li>
        <li>Fundraising and awareness campaigns</li>
        <li>Administrative support</li>
      </ul>
      
      <h2>Stories of Impact</h2>
      <p>Ramesh, a college student, volunteers every weekend at our education center. He teaches mathematics to underprivileged children and has helped many students improve their grades significantly.</p>
      
      <p>Sunita, a retired teacher, dedicates her time to our women's empowerment programs, teaching literacy and life skills. Her experience and patience have transformed the lives of many women.</p>
      
      <h2>Join Our Volunteer Family</h2>
      <p>If you're inspired to make a difference, we welcome you to join our volunteer family. Every contribution, no matter how small, creates a meaningful impact. Together, we can build a better tomorrow.</p>
      
      <p>To our volunteers: Thank you for being the heart of our mission. Your compassion and dedication inspire us every day.</p>
    `,
    author: "BNP Trust Team",
    date: "2023-12-20",
    image: "/community.jpg",
    category: "Community",
    images: ["/community.jpg", "/Niranjan.jpg"]
  },
  {
    id: 6,
    title: "Annual Report 2023: A Year of Growth and Impact",
    excerpt: "Review our annual achievements, financial transparency, and the milestones we've reached in 2023. See how your support has helped us create lasting change.",
    content: `
      <p>As we reflect on 2023, we're filled with gratitude for the incredible progress we've made together. This annual report highlights our achievements, challenges, and the impact we've created in communities across Odisha.</p>
      
      <h2>Key Achievements</h2>
      <p>In 2023, we reached significant milestones:</p>
      <ul>
        <li>Educated over 1,200 children through our programs</li>
        <li>Provided healthcare services to 3,500+ individuals</li>
        <li>Empowered 450 women through skill development</li>
        <li>Planted 5,000+ trees in our green initiative</li>
        <li>Organized 25+ community development programs</li>
      </ul>
      
      <h2>Financial Transparency</h2>
      <p>We maintain complete transparency in our financial operations. In 2023, 85% of our funds went directly to program implementation, with only 15% allocated to administrative and operational costs. We're committed to ensuring that every donation creates maximum impact.</p>
      
      <h2>Program Highlights</h2>
      <p>Our education programs expanded to 8 new locations, bringing quality learning to more children. Our healthcare initiatives reached remote villages that had never had access to medical services. Our women's empowerment programs helped hundreds of women start their own businesses.</p>
      
      <h2>Looking Ahead</h2>
      <p>As we move into 2024, we're excited about new opportunities to expand our reach and deepen our impact. We're planning to launch new programs in digital literacy, mental health support, and sustainable agriculture.</p>
      
      <p>Thank you to all our donors, volunteers, and partners who made 2023 a year of remarkable growth and impact. Together, we're building a brighter future.</p>
    `,
    author: "Shri Tara Ranjan Patnaik",
    date: "2023-12-15",
    image: "/community.jpg",
    category: "Report",
    images: ["/community.jpg", "/Niranjan.jpg"]
  }
];

const BlogSection = () => {
  const navigate = useNavigate();

  const handleBlogClick = (blogId) => {
    navigate(`/blog/${blogId}`);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <section className="w-full py-24 md:py-32 relative overflow-hidden bg-gradient-to-b from-[#F8FBFF] to-white">
      {/* Decorative assets */}
      <img
        src="/hirondelle-4.png"
        className="absolute top-10 right-10 w-40 opacity-20"
        alt=""
      />
      <img
        src="/brush-patch.webp"
        className="absolute bottom-0 left-0 w-60 opacity-30"
        alt=""
      />

      <div className="max-w-7xl mx-auto px-6 lg:px-10 relative z-10">
        {/* Heading */}
        <div className="text-center mb-14">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-extrabold text-[#0A4C8B] mb-4"
            style={{ fontFamily: "'Gloria Hallelujah', cursive" }}
          >
            Our Blog
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-600 max-w-2xl mx-auto text-lg"
          >
            Stories of impact, inspiration, and transformation from BNP Charitable Trust
          </motion.p>
        </div>

        {/* Blog Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((blog, idx) => (
            <motion.div
              key={blog.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer group"
              onClick={() => handleBlogClick(blog.id)}
            >
              {/* Blog Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#0F72CE] text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {blog.category}
                  </span>
                </div>
              </div>

              {/* Blog Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-[#0A4C8B] mb-3 group-hover:text-[#0F72CE] transition-colors">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                  {blog.excerpt}
                </p>

                {/* Meta Information */}
                <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                  <div className="flex items-center gap-2">
                    <User size={14} />
                    <span>{blog.author}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={14} />
                    <span>{formatDate(blog.date)}</span>
                  </div>
                </div>

                {/* Read More */}
                <div className="flex items-center text-[#0F72CE] font-semibold text-sm group-hover:gap-2 transition-all">
                  <span>Read More</span>
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
