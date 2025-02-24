import { useParams } from 'react-router-dom';

const courses = [
  {
    id: 1,
    title: 'Logic vui nhộn',
    description: 'Giúp bé hiểu logic và cách xâu chuỗi lại với nhau.',
    image: '/docs/images/examples/image-1@2x.jpg',
    chapters: [
      'Introduction to Logic and Critical Thinking',
      'Basic operations in Logic',
      'Logical expressions and truth tables',
      'Propositions and deductive logic',
      'Interesting and challenging logic exercises',
      'Applying Logic in daily life'
    ]
  },
  {
    id: 2,
    title: 'Khoa học thú vị',
    description: 'Khám phá những điều kỳ diệu của khoa học theo cách dễ hiểu.',
    image: '/docs/images/examples/image-1@2x.jpg',
    chapters: [
      ' Introduction to scientific fields',
      ' Physics and magical phenomena',
      'Chemistry and special reactions',
      ' Biology and the biological world',
      'Easy science experiments to do at home'
    ]
  },
  {
    id: 3,
    title: 'Tư duy lập trình',
    description: 'Phát triển tư duy logic và kỹ năng lập trình cơ bản.',
    image: '/path-to-image-3.png',
    chapters: [
      'Giới thiệu về lập trình',
      'Các thuật toán cơ bản',
      'Cấu trúc dữ liệu và biến',
      'Lập trình hướng đối tượng',
      'Dự án thực tế: Viết chương trình đầu tiên'
    ]
  }
];

export default function CourseDetail() {
  const { courseId } = useParams();
  const course = courses.find((c) => c.id === Number(courseId));

  if (!course) {
    return <p className='text-center text-red-500 text-xl'>Khóa học không tồn tại.</p>;
  }

  return (
    <div className='max-w-4xl mx-auto p-6'>
      <h1 className='text-3xl font-bold mb-4'>{course.title}</h1>
      <img src={course.image} alt={course.title} className='w-full h-64 object-cover rounded-lg mb-4' />
      <p className='text-lg mb-4'>{course.description}</p>
      <h2 className='text-2xl font-semibold mb-3'>Nội dung khóa học</h2>
      <ul className='list-disc pl-5'>
        {course.chapters.map((chapter, index) => (
          <li key={index} className='mb-2 text-lg'>{`Chương ${index + 1}: ${chapter}`}</li>
        ))}
      </ul>
    </div>
  );
}
