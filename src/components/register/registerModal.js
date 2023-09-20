import React from 'react';
import { Modal, Box } from '@mui/material';
import Register from './registerForm';

const RegisterModal = ({ open, onClose }) => {
  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
        }}
      >
        <Register onClose={onClose} />
      </Box>
    </Modal>
  );
};

export default RegisterModal;