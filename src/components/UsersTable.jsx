import * as React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import Button from '@mui/material/Button'
import { ButtonGroup, Toolbar } from '@mui/material';
import PersonRemoveIcon from '@mui/icons-material/PersonRemove';
import BlockIcon from '@mui/icons-material/Block';
import { blockUser, unblockUser, deleteUser, getUsers, selectUserId } from '../redux/slices/authSlice';
import { useDispatch, useSelector } from 'react-redux';


const columns = [
  { field: '_id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 200},
  { field: 'registrationTime', headerName: 'Registration time', width: 200},
  { field: 'lastLoginTime', headerName: 'Last login time', width: 200},
  { field: 'status', headerName: 'Status', width: 100},

];

export default function DataTable({users, fetchUsers}) {
  const [selectedRows, setSelecterRows] = React.useState([])
  const userId = useSelector(selectUserId)
  const dispatch = useDispatch()

  const selectionHandler = (selectedIdArr) => {
    setSelecterRows(selectedIdArr)
  }

  const blockUserHandler = () => {
    selectedRows.forEach(async(blockId) => {
      await dispatch(blockUser({userId, blockId}))
      dispatch(getUsers())
    })
  }

  const unblockUserHandler = () => {
    selectedRows.forEach(async(unblockId) => {
      await dispatch(unblockUser(unblockId))
      dispatch(getUsers())
    })
  }

  const deleteUserHandler = () => {
    selectedRows.forEach(async(delId) => {
    await dispatch(deleteUser({userId, delId}))
    dispatch(getUsers())
    })
  }


  return (
    <div style={{ height: 400, width: '100%' }}>
      <Toolbar >
      <ButtonGroup>
      <Button onClick={deleteUserHandler} variant="outlined" color="error">
        <PersonRemoveIcon />
      </Button>
      <Button onClick={blockUserHandler} variant="outlined" color="error">
        <BlockIcon />
      </Button>
      <Button onClick={unblockUserHandler} variant="outlined" color="primary">
        unblock
      </Button>
      </ButtonGroup>
      </Toolbar>
      


      <DataGrid
        sx={{
            "&.MuiDataGrid-root .MuiDataGrid-cell:focus-within": {
              outline: "none !important",
            },
        }}
        rows={users}
        columns={columns}
        pageSize={10}
        rowsPerPageOptions={[10]}
        checkboxSelection
        disableColumnMenu
        onSelectionModelChange={selectionHandler}
      />
    </div>
  );
}
