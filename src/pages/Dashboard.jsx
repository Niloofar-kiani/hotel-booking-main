import UserInfo from '../components/user/UserInfo';
import DashboardTabs from '../components/DashboardTabs';
import { Outlet } from 'react-router';
import { Container } from 'react-bootstrap';

const Dashboard = () => {
  return (
    <>
      <div className="container-fluid bg-secondary p-5 text-center admin dashboard">
        <h2>Dashboard</h2>
      </div>
      <UserInfo />
      <DashboardTabs />
      <Container>
        <Outlet />
      </Container>
    </>
  );
};

export default Dashboard;
