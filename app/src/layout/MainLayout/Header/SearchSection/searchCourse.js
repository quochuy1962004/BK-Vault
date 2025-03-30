import { collection, getDocs } from 'firebase/firestore';
import { db } from 'services/firebase';

export const searchCourses = async (searchQuery) => {
  try {
    if (!searchQuery.trim()) {
      console.log("Không có từ khóa tìm kiếm, trả về toàn bộ danh sách khóa học.");
      return await getAllCourses();
    }

    const coursesRef = collection(db, 'courses');
    const querySnapshot = await getDocs(coursesRef);

    const searchLower = searchQuery.toLowerCase();
    let results = [];

    querySnapshot.forEach((doc) => {
      const courseID = doc.id.toLowerCase(); // Lấy ID của document (mã môn học)
      const courseName = doc.data().courseName?.toLowerCase() || "";

      // Kiểm tra nếu `courseID` hoặc `courseName` chứa từ khóa tìm kiếm
      if (courseID.includes(searchLower) || courseName.includes(searchLower)) {
        results.push({
          courseID: doc.id, // Giữ nguyên định dạng mã môn học
          ...doc.data()
        });
      }
    });

    return results;
  } catch (error) {
    console.error("Lỗi khi tìm kiếm khóa học:", error);
    throw error;
  }
};

// Hàm lấy tất cả khóa học nếu không có từ khóa tìm kiếm
const getAllCourses = async () => {
  const coursesRef = collection(db, 'courses');
  const querySnapshot = await getDocs(coursesRef);
  let allCourses = [];

  querySnapshot.forEach((doc) => {
    allCourses.push({ courseID: doc.id, ...doc.data() });
  });

  return allCourses;
};
