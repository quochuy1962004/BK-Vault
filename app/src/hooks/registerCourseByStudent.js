import { doc, updateDoc, getDoc } from 'firebase/firestore';
import { db } from 'services/firebase';
import { loadScheduleByStudent } from './loadScheduleByStudent';

export function checkDuplicateCourse(courseCode, currentSchedule) {
  return currentSchedule.filter((item) => item.courseID === courseCode).length === 0;
}

export const checkDuplicate = (course, classID, currentSchedule) => {
  //get new time
  const courseInfo = course.classArray?.filter((item) => item.classID === classID)[0];
  const newStartTime = courseInfo?.startTime;
  const newEndTime = courseInfo?.endTime;
  const newDate = courseInfo?.date;

  const sameDateClasses = currentSchedule.filter((item) => item.date === newDate);

  const flag = sameDateClasses.map((item) => {
    if (
      (item.startTime >= newStartTime && item.startTime < newEndTime) ||
      (item.endTime > newStartTime && item.endTime <= newEndTime) ||
      (item.startTime < newStartTime && item.endTime > newEndTime)
    )
      return false;
    return true;
  });
  return !flag.includes(false);
};

export const registerCourse = async (course, student) => {
  // const classID = course.classArray.filter((item) => item.teacherID === teacherId)[0].classID;
  const classID = "L01"
  const listCourses = student.listCourses || {};
  const updatedListCourses = { ...listCourses };
  const courseCode = course.courseCode;

  updatedListCourses[courseCode] = {
    final: 0,
    average: 0,
    midterm: 0,
    classID: classID
  };

  await updateDoc(doc(db, 'users', student.uid), {
    listCourses: updatedListCourses
  });

  // const teacherRef = doc(db, 'users', teacherId);
  // const teacherDoc = await getDoc(teacherRef);
  // if (teacherDoc.exists()) {
  //   const listStudents = teacherDoc.data().listStudents || {};
  //   const updatedListStudents = { ...listStudents };
  //   if (updatedListStudents[course.courseCode]) {
  //     updatedListStudents[course.courseCode] = [...updatedListStudents[course.courseCode], student.uid];
  //   } else {
  //     updatedListStudents[course.courseCode] = [student.uid];
  //   }
    // await updateDoc(doc(db, 'users', teacherId), {
    //   listStudents: updatedListStudents
    // });
  // }
};

export const deleteCourse = async (course, student) => {
  const listCourses = student.listCourses || {};
  const updatedListCourses = { ...listCourses };
  const courseCode = course.courseCode;
  // Remove the course from the list of courses
  delete updatedListCourses[courseCode];

  await updateDoc(doc(db, 'users', student.uid), {
    listCourses: updatedListCourses
  });
  console.log("list course", listCourses )
  


  // const teacherRef = doc(db, 'users', teacherId);
  // const teacherDoc = await getDoc(teacherRef);
  // if (teacherDoc.exists()) {
  //   const listStudents = teacherDoc.data().listStudents || {};
  //   const updatedListStudents = { ...listStudents };
  //   if (updatedListStudents[course.courseCode]) {
  //     updatedListStudents[course.courseCode] = updatedListStudents[course.courseCode].filter((uid) => uid !== student.uid);
  //   }
  //   await updateDoc(doc(db, 'users', teacherId), {
  //     listStudents: updatedListStudents
  //   });
  // }
};

export const courseSignin = async (courseCode, classID, uid) => {
  const currentSchedule = await loadScheduleByStudent(uid);
  if (currentSchedule.length > 0 && !checkDuplicateCourse(courseCode, currentSchedule)) {
    return { status: 'error', message: 'You have followed this course!' };
  }
    

  const studentRef = doc(db, 'users', uid);
  const studentDoc = await getDoc(studentRef);
  const student = studentDoc.data();

  if (!student?.isActive) {
    return {
      status: 'error',
      message: 'student is not active!'
    };
  }

  const courseRef = doc(db, 'courses', courseCode);
  const courseDoc = await getDoc(courseRef);
  const course = courseDoc.data();

  // if (currentSchedule.length > 0 && !checkDuplicate(course, classID, currentSchedule))
  // return { status: "error", message: "Time overlapped!" };

  // const courseInfo = course.classArray.filter((item) => item.classID === classID)[0];

  try {
    await registerCourse(course, student);
    return { status: 'success', message: 'Follow Successfully!' };
  } catch (error) {
    return { status: 'error', message: 'Error: ' + error };
  }
};

export const courseSignOut = async (courseCode,classID, uid) => {
  const currentSchedule = await loadScheduleByStudent(uid);

  if (currentSchedule.length === 0) {
    return { status: 'error', message: 'Your schedule is blank!' };
  }
  // if (checkDuplicateCourse(courseCode, currentSchedule)) return { status: 'error', message: 'You have not followed this course yet!' };

  // const classOfCourse = currentSchedule.filter((item) => item.courseID === courseCode)[0];

  // if (classOfCourse.classID !== classID) {
  //   return { status: 'error', message: 'You have not registered this class. Please double-check with your schedule!' };
  // }

  const studentRef = doc(db, 'users', uid);
  const studentDoc = await getDoc(studentRef);
  const student = studentDoc.data();

  // if (student.listCourses[courseCode].average !== 0) {
  //   return { status: 'error', message: 'This course already had average score. You cannot signout!' };
  // }

  if (!student?.isActive) {
    return {
      status: 'error',
      message: 'student is not active!'
    };
  }

  const courseRef = doc(db, 'courses', courseCode);
  const courseDoc = await getDoc(courseRef);
  const course = courseDoc.data();

  // const courseInfo = course.classArray[0];

  try {
    await deleteCourse(course, student);
    return { status: 'success', message: 'Delete Successfully!' };
  } catch (error) {
    console.log(">>>l loi ")
    return { status: 'error', message: 'Error: ' + error };
  }
};
