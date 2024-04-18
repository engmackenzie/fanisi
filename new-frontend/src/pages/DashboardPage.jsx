import React, { useState } from 'react';
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


const DashboardPage = props => {
  const [data, setData] = useState([
    { id: 1, name: 'James Orengo', email: 'james@email.com', phone : '0712345678', company: 'Safaricom' },
    { id: 2, name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { id: 3, name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { id: 4, name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { id: 5, name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { id: 6, name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { id: 7, name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { id: 8, name: 'Eliud Kipchoge', email: 'kipchoge@email.com', phone : '0712345678', company: 'Telkom' },
    { id: 9, name: 'Eliud Kipchoge', email: 'kipchoge@email.com', phone : '0712345678', company: 'Telkom' },
    { id: 10, name: 'Eliud Kipchoge', email: 'kipchoge@email.com', phone : '0712345678', company: 'Telkom' },
  ]);

  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    email: '',
    phone: '',
    company: ''
  });

  const handleAddUser = () => {
    setOpenModal(true);
    setFormData({ id: '', name: '', email: '', phone: '', company: '' });
  };

  const handleEditUser = (row) => {
    setOpenModal(true);
    setFormData(row);
  };

  const handleDeleteUser = (row) => {
    const newData = data.filter(d => d.id !== row.id);
    setData(newData);
  };

  const handleSubmitUser = () => {
    const updatedData = [...data];
    const index = updatedData.findIndex(item => item.id === formData.id);
    if (index !== -1) {
      updatedData[index] = formData; // Edit existing user
    } else {
      updatedData.push({ ...formData, id: data.length + 1 }); // Add new user
    }
    setData(updatedData);
    setOpenModal(false);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div style={{ width: '100%', minHeight: '100vh'}}>
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
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button onClick={handleSubmitUser} variant="contained" color="primary">
            {formData.id ? 'Save Changes' : 'Add User'}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
    
  )
}

export default DashboardPage;