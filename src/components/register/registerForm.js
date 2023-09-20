import React from 'react';
import { Container, TextField, Button, Typography, Box } from '@mui/material';


const Register = ({ onClose }) => {
  const [form, setForm] = React.useState({
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Submitted:', form);
  };

  return (
    <Container maxWidth="xs">
      <Typography variant="h4" align="center" gutterBottom>
        사용자 등록
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="사용자명"
          name="username"
          value={form.username}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="이메일"
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
        />
        <TextField
          fullWidth
          variant="outlined"
          margin="normal"
          label="비밀번호"
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
        />
        <Button
          fullWidth
          variant="contained"
          color="primary"
          type="submit"
          style={{ marginTop: 20 }}
        >
          등록하기
        </Button>
        <Box align="center" style={{ marginTop: 10 }}>
          <Button variant="text" color="secondary" onClick={onClose}>
            닫기
          </Button>
        </Box>
      </form>
    </Container>
  );
};

export default Register;
