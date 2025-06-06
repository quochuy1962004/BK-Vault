import { Grid, Link, Box, Button, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import MainCard from 'ui-component/cards/MainCard';
import SecondaryAction from 'ui-component/cards/CardSecondaryAction';
import { gridSpacing } from 'store/constant';


import { loadScheduleByStudent } from 'hooks/loadScheduleByStudent';
import { searchCourses } from 'layout/MainLayout/Header/SearchSection/searchCourse';
// import { loadScheduleByTeacher } from 'hooks/loadScheduleByTeacher';
// import 
// import { loadAllCourse } from 'hooks/loadAllCourse';
// ==============================|| CoursesSite ||============================== //

const CoursesSite = ({currentRole, uid}) => {
  const [data, setData] = useState([])
  const [searchQuery] = useState('')

  const courseImage = "https://foundr.com/wp-content/uploads/2023/04/How-to-create-an-online-course.jpg.webp";
  // console.log(">>> id in course site", uid)
  // const getData = async() => {
  //   const schedule = currentRole === 'student'? await loadScheduleByStudent(uid) : await loadScheduleByTeacher(uid);
  //   setData(schedule);
  // }
  const getData = async() => {
    const schedule = await loadScheduleByStudent(uid);
    setData(schedule);
  }
  useEffect(() =>{
    // eslint-disable-next-line react-hooks/exhaustive-deps
    getData();
   },[])
   const handleSearch = async () => {
    if (searchQuery.trim()) {
      console.log("SEARCH QUERY", searchQuery)
      const results = await searchCourses(searchQuery);
      setData(results);
    } else {
      setData([]);
    }
  };

  useEffect(() => {
    handleSearch(); // Gọi API tìm kiếm khi component mount
  }, []);

  const renderCourses = () => {
    if (data && data.length) {
      console.log("data schedule", data)
      return data.map(course => {
        return (
          <Grid item xs={12} sm={6} md={4} key={course.courseCode}>
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
                {course.courseCode}
              </Typography>
              <Button
                sx={{ mt: 4 }}
                component={Link}
                variant='outlined'
                href={`/${currentRole}/your-documents/${course.courseCode}`}
              >
                View Course content
              </Button>
            </Box>
          </Grid>
        );
      });
    } else {
      return null;
    }
  };

  return (
    <MainCard title="Courses you have followed" secondary={<SecondaryAction link="https://next.material-ui.com/system/typography/" />}>
      <Grid container spacing={gridSpacing}>
        {renderCourses()}
      </Grid>
    </MainCard>
  )
};

export default CoursesSite;
