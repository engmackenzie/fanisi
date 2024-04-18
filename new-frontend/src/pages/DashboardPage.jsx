import React, { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '../components/Table';
import NavBar from '../components/NavBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const DashboardPage = props => {
  const token = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQ1NGJiNTE3LTI1MDgtNDFjOC1iMDc2LTAxOTAzNTk1Yjg5OSIsImlhdCI6MTcxMzQ1NDI0MCwiZXhwIjoxNzEzNTQwNjQwfQ.Khqa2E40Rlutu8OW33jz4ET-4rmSVoRKNKhY8PRGUJw';
  const serverUrl = 'http://localhost:2000'; // this can be move to a .env
  const [data, setData] = useState([
    { id: 1, name: 'James Orengo', email: 'james@email.com', phone_number : '0712345678', company: 'Safaricom' },
    { id: 2, name: 'Stephen Kimani', email: 'steve@email.com', phone_number : '0712345678', company: 'Airtel' },
    { id: 3, name: 'Stephen Kimani', email: 'steve@email.com', phone_number : '0712345678', company: 'Airtel' },
    { id: 4, name: 'Stephen Kimani', email: 'steve@email.com', phone_number : '0712345678', company: 'Airtel' },
    { id: 5, name: 'Stephen Kimani', email: 'steve@email.com', phone_number : '0712345678', company: 'Airtel' },
    { id: 6, name: 'Stephen Kimani', email: 'steve@email.com', phone_number : '0712345678', company: 'Airtel' },
    { id: 7, name: 'Stephen Kimani', email: 'steve@email.com', phone_number : '0712345678', company: 'Airtel' },
    { id: 8, name: 'Eliud Kipchoge', email: 'kipchoge@email.com', phone_number : '0712345678', company: 'Telkom' },
    { id: 9, name: 'Eliud Kipchoge', email: 'kipchoge@email.com', phone_number : '0712345678', company: 'Telkom' },
    { id: 10, name: 'Eliud Kipchoge', email: 'kipchoge@email.com', phone_number : '0712345678', company: 'Telkom' },
  ]);
  const getUsers = async () => {
    try {
      const response = await fetch(serverUrl + '/users', {
        headers: {
          Authorization: token,
        }
      });

      if (!response.ok) {
        throw new Error((await response.json()).message);
      }
      //toast.success('Retrieved users successfully');
      setData((await response.json()).data);
    } catch (error) {
      toast.error(error.message || 'Error while fetching users');
    }
  };

  useEffect(() => {
    getUsers(); // Fetch users when component mounts
  }, []); // Empty dependency array to run effect only once

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone_number: '',
    company: '',
    password: '',
    is_admin: false,
  });

  const handleAddUser = () => {
    setOpenModal(true);
    setFormData({ id: '', name: '', email: '', phone: '', company: '', is_admin: false, password: '' });
  };

  const handleEditUser = (row) => {
    setOpenModal(true);
    delete row.password;
    setFormData(row);
  };

  const handleDeleteUser = async (row) => {
    try {
      const options = {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
          Authorization: token,
        },
      };
      let url = serverUrl + `/users/${row.id}`;

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(( await response.json()).message);
      }

      toast.success((await response.json()).message);
      setOpenModal(false);
      getUsers();
    } catch(error) {
      toast.error(error.message || 'An error ocurred')
    }
  };

  const handleSubmitUser = async () => {
    try {
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Specify content type as JSON
          Authorization: token,
        },
        body: JSON.stringify(formData), // Convert request body to JSON string
      };
      let url = serverUrl + '/users';

      if (formData.id !== '') {
        url += `/${formData.id}`;
        options.method = 'PUT';
      }

      const response = await fetch(url, options);
      if (!response.ok) {
        throw new Error(( await response.json()).message);
      }

      toast.success((await response.json()).message);
      setOpenModal(false);
      getUsers();
    } catch(error) {
      toast.error(error.message || 'An error ocurred')
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh'}}>
      <ToastContainer
        position="bottom-right"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        draggable
        pauseOnHover
        theme="colored"
      />
      <NavBar heading={'Dashboard'}/>
      <Paper style={{ width: '80%', margin: 'auto', minHeight: '98vh',  padding: '20px', borderRadius: '0px' }} >
        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddUser}
          >
            Add User
          </Button>
        </Box>
        <TableContainer
          style={{
            marginTop: '20px',
            border: '1px solid rgba(0,0,0,0.12)',
            borderRadius: '6px',
          }}
        >
          <Table data={data} onDeleteUser={handleDeleteUser} onEditUser={handleEditUser}/>
        </TableContainer>
      </Paper>

      {/* Modal for adding/editing user */}
      <Dialog open={openModal} onClose={handleCloseModal}>
        <DialogTitle>{formData.id ? 'Edit User' : 'Add User'}</DialogTitle>
        <DialogContent>
          <TextField
            label="Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Phone"
            value={formData.phone_number}
            onChange={(e) => setFormData({ ...formData, phone_number: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Company"
            value={formData.company}
            onChange={(e) => setFormData({ ...formData, company: e.target.value })}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Password"
            value={formData.password}
            onChange={(e) => setFormData({ ...formData, password: e.target.value })}
            fullWidth
            margin="normal"
          />
          <FormControlLabel
            control={<Checkbox checked={formData.is_admin} 
            onChange={(e) => setFormData({ ...formData, is_admin: e.target.checked })} />}
            label="Is Admin"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={() => handleSubmitUser()} variant="contained" color="primary">
            {formData.id ? 'Save Changes' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  )
}

export default DashboardPage;