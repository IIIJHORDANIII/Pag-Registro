import React from 'react';
import { Navbar, Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Header.css';

interface HeaderProps {
  adminName: string;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ adminName, onLogout }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout();
    navigate('/login');
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="header">
      <Container>
        <div className="d-flex flex-column">
          <Navbar.Brand href="#home" className="mb-0">{adminName}</Navbar.Brand>
          <span className="admin-badge">Administrador</span>
        </div>
        <div className="d-flex align-items-center">
          <Button 
            variant="outline-light" 
            onClick={handleLogout}
            className="logout-button"
          >
            Sair
          </Button>
        </div>
      </Container>
    </Navbar>
  );
};

export default Header; 