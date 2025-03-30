import { Grid, Link, Box, Button, Typography, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';
import { searchCourses } from 'layout/MainLayout/Header/SearchSection/searchCourse';

const CoursesSiteinSearch = () => {
  const [courses, setCourses] = useState([]); // Danh sách khóa học tìm được
  const [searchQuery, setSearchQuery] = useState(''); // Từ khóa tìm kiếm

  const courseImage = "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp";

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      const results = await searchCourses(searchQuery);
      setCourses(results);
    } else {
      setCourses([]);
    }
  };

  useEffect(() => {
    handleSearch(); // Gọi API tìm kiếm khi component mount
  }, []);

  const renderCourses = () => {
    if (courses.length) {
      return courses.map(course => (
        <Grid item xs={12} sm={6} md={4} key={course.courseID}>
          <Box
            sx={{
              p: 5,
              height: "100%",
              display: "flex",
              borderRadius: 1,
              textAlign: "center",
              alignItems: "center",
              flexDirection: "column",
              border: theme => `1px solid ${theme.palette.divider}`,
            }}
          >
            <Box sx={{ minHeight: 100, display: "flex" }} mb={4}>
              <img height='100' src={courseImage} alt={course.courseName} />
            </Box>

            <Typography variant='h6' sx={{ mb: 1.5, fontWeight: 600 }}>
              {course.courseName}
            </Typography>
            <Typography
              sx={{
                my: "auto",
                overflow: "hidden",
                WebkitLineClamp: "2",
                display: "-webkit-box",
                color: "text.secondary",
                textOverflow: "ellipsis",
                WebkitBoxOrient: "vertical",
              }}
            >
              {course.courseID}
            </Typography>
            <Button
              sx={{ mt: 4 }}
              component={Link}
              variant='outlined'
              href={`/student/your-documents/${course.courseID}`}
            >
              View Course Content
            </Button>
          </Box>
        </Grid>
      ));
    } else {
      return (
        <Typography variant="body1" sx={{ mt: 2, textAlign: "center", width: "100%" }}>
          Không tìm thấy khóa học nào.
        </Typography>
      );
    }
  };

  return (
    <MainCard title="Search Courses" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
      <Box sx={{ mb: 3, display: 'flex', gap: 2 }}>
        <TextField
          label="Search by Course Name or ID"
          variant="outlined"
          fullWidth
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <Button variant="contained" onClick={handleSearch}>Search</Button>
      </Box>
      
      <Grid container spacing={gridSpacing}>
        {renderCourses()}
      </Grid>
    </MainCard>
  );
};

export default CoursesSiteinSearch;
