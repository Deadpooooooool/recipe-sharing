// AdminDashboard.js
import React, { useEffect } from 'react';
import { Container, ListGroup, ListGroupItem, Button } from 'reactstrap';
import useAdminStore from '../store/adminStore'; // Import your adminStore
import AdminCard from '../components/AdminCard';

const AdminDashboard = () => {
  const {
    users,
    reports,
    fetchAdminData,
    handleUserAction,
    handleReportAction,
    checkAdminStatus,
    isAdmin,
  } = useAdminStore();

  useEffect(() => {
    fetchAdminData(); // Fetch data when the component mounts
    checkAdminStatus(); // Check if the user is an admin (you can implement actual authentication)
  }, [fetchAdminData, checkAdminStatus]);
  

  // console.log("users",users);
  return (
    <Container>
      <h2 style={{textAlign:'center'}}>Admin Dashboard</h2>
      <AdminCard/>
      {isAdmin && (
        <>
          {/* Users List */}
          <ListGroup>
            {/* {users.map((user) => (
              <ListGroupItem key={user.id}>
                {user.name}
                <Button color="primary" onClick={() => handleUserAction(user.id)}>
                  Manage User
                </Button>
              </ListGroupItem>
            ))} */}
          </ListGroup>
          {/* Reports List */}
          <ListGroup>
            {/* {reports.map((report) => (
              <ListGroupItem key={report.id}>
                {report.content}
                <Button color="danger" onClick={() => handleReportAction(report.id)}>
                  Manage Report
                </Button>
              </ListGroupItem>
            ))} */}
          </ListGroup>
        </>
      )}
    </Container>
  );
};

export default AdminDashboard;
