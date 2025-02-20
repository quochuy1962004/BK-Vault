import { useEffect, useState, useContext } from 'react';

// material-ui
import { Grid} from '@mui/material';

// project imports
import { gridSpacing } from 'store/constant';
import { AuthContext } from 'context/AuthContext';
import { getDoc, doc } from 'firebase/firestore';
import { db } from 'services/firebase';
import MainCard from 'ui-component/cards/MainCard';
import CoursesSite from 'views/utilities/CoursesSite';
const userId = localStorage.getItem('userId');

// ==============================|| DEFAULT DASHBOARD ||============================== //
const loadRole = async (currentUser) => {
  const docRef = doc(db, 'users', currentUser.uid);
  const docSnap = await getDoc(docRef);
  return await docSnap.data()?.role;
};

const Dashboard = () => {
  const [role, setRole] = useState(null);

  const currentUser = useContext(AuthContext);
  useEffect(() => {
    const fetchRole = async () => {
      if (currentUser) {
        const roleData = await loadRole(currentUser);
        if (roleData) {
          setRole(roleData);
          localStorage.setItem('role', roleData);
        }
      }
    };
    fetchRole();
  }, [currentUser]);

  console.log(role);

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12}>
        <MainCard title={`Hello ${role}`}>
          <CoursesSite currentRole="student" uid={userId} />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
