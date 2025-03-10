const path = {
  home: '/',
  login: '/login',
  contact: '/contact',
  payment: '/payment',
  profile: '/profile',
  quizSectionDetail: '/quizsection/:id',
  courseDetail: '/course/:id',
  LessonDetail: '/course/:id/chapter/:chapterIndex/lesson/:lessonIndex',
  lab: '/course/:id/chapter/:chapterIndex/lesson/:lessonIndex/lab/:labIndex',
  CourseListTec: '/course-list-teacher',
  StudentList: '/student-list/:id',
  StudentDetail: '/student-detail/:id',
  TeacherDashboard: 'teacherdashboard',
  LessonLogic: '/lessonlogic',
  // ADMIN
  ADMIN: {
    BASE: '/admin',
    DASHBOARD: '/admin/dashboard',
    COURSE: '/admin/course',
    COURSE_DETAIL: '/admin/course/:id',
    PAYOUT: '/admin/payout',
    COURSE_LOG: '/admin/course-log'
  }
  //===================================================================================
}
export default path
