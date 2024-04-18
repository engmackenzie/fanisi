import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '../components/Table';
import NavBar from '../components/NavBar';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';


const DashboardPage = props => {
  const data = [
    { name: 'James Orengo', email: 'james@email.com', phone : '0712345678', company: 'Safaricom' },
    { name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { name: 'Stephen Kimani', email: 'steve@email.com', phone : '0712345678', company: 'Airtel' },
    { name: 'Eliud Kipchoge', email: 'kipchoge@email.com', phone : '0712345678', company: 'Telkom' },
    { name: 'Eliud Kipchoge', email: 'kipchoge@email.com', phone : '0712345678', company: 'Telkom' },
    { name: 'Eliud Kipchoge', email: 'kipchoge@email.com', phone : '0712345678', company: 'Telkom' },
  ];

  return (
    <div style={{ width: '100%', minHeight: '100vh'}}>
      <NavBar heading={'Dashboard'}/>
      <Paper style={{ width: '80%', margin: 'auto', minHeight: '98vh',  padding: '20px', borderRadius: '0px' }} >
        <Box style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
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
          <Table data={data}/>
        </TableContainer>
      </Paper>
    </div>
    
  )
}

export default DashboardPage;