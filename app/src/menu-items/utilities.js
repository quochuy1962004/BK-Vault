// assets
import {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconBrandSuperhuman,
  IconNotebook,
  IconUserShield
} from '@tabler/icons-react';

// constant
const icons = {
  IconTypography,
  IconPalette,
  IconShadow,
  IconWindmill,
  IconBrandSuperhuman,
  IconNotebook,
  IconUserShield
};

// ==============================|| UTILITIES MENU ITEMS ||============================== //

const utilities = {
  id: 'utilities',
  title: 'Utilities',
  type: 'group',
  children: [
    {
      id: 'admin',
      title: 'Admin',
      type: 'collapse',
      icon: icons.IconBrandSuperhuman,
      children: [
        {
          id: 'student-management',
          title: 'Student Management',
          type: 'item',
          url: 'admin/student-management',
          breadcrumbs: false
        },
        // {
        //   id: 'teacher-management',
        //   title: 'Teacher Management',
        //   type: 'item',
        //   url: 'admin/teacher-management',
        //   breadcrumbs: false
        // },
        {
          id: 'course-management',
          title: 'Course Management',
          type: 'item',
          url: 'admin/course-management',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'student',
      title: 'Student',
      type: 'collapse',
      icon: icons.IconNotebook,
      children: [
        // {
        //   id: 'schedule',
        //   title: 'Schedule',
        //   type: 'item',
        //   url: 'student/schedule',
        //   breadcrumbs: false
        // },
        {
          id: 'student-transcript',
          title: 'Public documents',
          type: 'item',
          url: 'student/public-documents',
          breadcrumbs: false
        },
        {
          id: 'courses-site',
          title: 'Your documents',
          type: 'item',
          url: 'student/your-documents',
          breadcrumbs: false
        },
        {
          id: 'course-registration',
          title: 'Follow new course',
          type: 'item',
          url: 'student/follow-course',
          breadcrumbs: false
        }
      ]
    },
    // {
    //   id: 'teacher',
    //   title: 'Teacher',
    //   type: 'collapse',
    //   icon: icons.IconUserShield,
    //   children: [
    //     // {
    //     //   id: 'grade',
    //     //   title: 'Grading',
    //     //   type: 'item',
    //     //   url: 'teacher/grading',
    //     //   breadcrumbs: false
    //     // },
    //     {
    //       id: 'courses-site',
    //       title: 'Courses Site',
    //       type: 'item',
    //       url: 'teacher/courses-site'
    //     },
    //     // {
    //     //   id: 'schedule',
    //     //   title: 'Schedule',
    //     //   type: 'item',
    //     //   url: 'teacher/schedule',
    //     //   breadcrumbs: false
    //     // }
    //   ]
    // }
  ]
};

export default utilities;
