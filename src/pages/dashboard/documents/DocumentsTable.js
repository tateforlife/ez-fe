import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { collection, getDocs, getFirestore } from "firebase/firestore";
import moment from 'moment';
import { DD_MM_YYYY, YYYY_MM_DD } from 'utils/constants';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// material-ui
import { IconButton, Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// third-party
// import NumberFormat from 'react-number-format';

// project import
import Dot from 'components/@extended/Dot';

// function descendingComparator(a, b, orderBy) {
//   if (b[orderBy] < a[orderBy]) {
//     return -1;
//   }
//   if (b[orderBy] > a[orderBy]) {
//     return 1;
//   }
//   return 0;
// }

// function getComparator(order, orderBy) {
//   return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
// }

// function stableSort(array, comparator) {
//   const stabilizedThis = array.map((el, index) => [el, index]);
//   stabilizedThis.sort((a, b) => {
//     const order = comparator(a[0], b[0]);
//     if (order !== 0) {
//       return order;
//     }
//     return a[1] - b[1];
//   });
//   return stabilizedThis.map((el) => el[0]);
// }

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'id',
    align: 'left',
    disablePadding: false,
    label: 'ID'
  },
  {
    id: 'from',
    align: 'left',
    disablePadding: true,
    label: 'From'
  },
  {
    id: 'to',
    align: 'left',
    disablePadding: false,
    label: 'To'
  },
  {
    id: 'username',
    align: 'left',
    disablePadding: false,
    label: 'Name'
  },
  {
    id: 'tel',
    align: 'left',
    disablePadding: false,
    label: 'Number'
  },
  {
    id: 'carName',
    align: 'left',
    disablePadding: false,
    label: 'Car name'
  },
  {
    id: 'status',
    align: 'left',
    disablePadding: false,
    label: 'Status'
  },
  {
    id: 'actions',
    align: 'left',
    disablePadding: false,
    label: ''
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}

OrderTableHead.propTypes = {
  order: PropTypes.string,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case false:
      color = 'error';
      title = 'Not Signed';
      break;
    case true:
      color = 'success';
      title = 'Signed';
      break;
    default:
      color = 'primary';
      title = 'None';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.string
};

// ==============================|| ORDER TABLE ||============================== //


export default function DocumentsTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('trackingNo');
  const [selected] = useState([]);
  const [applications, setApplications] = useState([]);
  const navigate = useNavigate();

  const isSelected = (trackingNo) => selected.indexOf(trackingNo) !== -1;

  const getDocuments = () => {
    getDocs(collection(db, "documents"))
      .then((querySnapshot)=>{               
        const applications = querySnapshot.docs
        .map((doc) => ({...doc.data() }));
        setApplications(applications);
      });
  };

  React.useEffect(() => {
    getDocuments();
  }, []);

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-of-type': {
              pr: 3
            }
          }}
        >
          <OrderTableHead order={order} orderBy={orderBy} />
          <TableBody>
            {applications
              .sort((a, b) => b.id - a.id)
              .map((row, index) => {
              const isItemSelected = isSelected(row.trackingNo);
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  aria-checked={isItemSelected}
                  tabIndex={-1}
                  key={row.id}
                  selected={isItemSelected}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.id}
                    </Link>
                  </TableCell>
                  <TableCell align="left">{moment(row.from, DD_MM_YYYY).format(DD_MM_YYYY)}</TableCell>
                  <TableCell align="left">{moment(row.to, DD_MM_YYYY).format(DD_MM_YYYY)}</TableCell>
                  <TableCell align="left">{row.username}</TableCell>
                  <TableCell align="left">{row.tel}</TableCell>
                  <TableCell align="left">{row.car}</TableCell>
                  <TableCell align="left">
                    <OrderStatus status={!!row.isSigned} />
                  </TableCell>
                  <TableCell align="left">
                  <IconButton aria-label="change application status" onClick={() => navigate(`/dashboard/documents/${row.id}`)}>
                    <EditIcon />
                  </IconButton>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
