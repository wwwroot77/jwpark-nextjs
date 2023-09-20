import React, { useEffect, useState } from 'react';
import Image from 'next/image'
import { Button, TextField, Paper, Typography, Container, Grid, Box, Link } from '@mui/material';
import axios from 'axios';
import RegisterModal from '../../components/register/registerModal';
import { useRouter } from 'next/router'

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [open, setOpen] = useState(false);
  const router = useRouter()

  const handleOpen = () => { // 이 함수를 정의합니다.
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogin = async (e) => {
  e.preventDefault();

  // 서버에서 데이터를 가져올 URL 주소
  const apiUrl = '../api/logincheck'; // 서버의 실제 URL을 입력하세요.

  axios.post(apiUrl, { password }, { params: { username } })
    .then((response) => {
      const responseString = response.data[0].user_name; //JSON.stringify(response.data);     
      setError('사용자 이름 : ' + responseString);
      router.push('../dashboard')
    })
    .catch((error) => {
      console.error('Error fetching data:', error);
      setError('로그인 실패: 유저 이름이 없습니다.' );
    });
  };


  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
      }}
    >
      <Container component="main" maxWidth="md">
        <Grid container sx={{ border: '1px solid #ccc' }}>
          
          <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>


            <Image src="/images/login.jpg" alt="login" width={420} height={350} />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Paper elevation={3} sx={{ padding: 3, display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'calc(100vh / 3)', justifyContent: 'center' }}>
              <Typography variant="h5">Login</Typography>
              <form onSubmit={handleLogin} noValidate sx={{ mt: 1, width: '100%' }}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="username"
                  label="Username"
                  autoComplete="username"
                  autoFocus
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <TextField
                  variant="outlined"
                  margin="normal"
                  required
                  fullWidth
                  id="password"
                  label="Password"
                  type="password"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                  Login
                </Button>
                <Grid container justifyContent="space-between">
                    <Grid item>
                        <Link href="#" variant="body1" onClick={handleOpen}>
                            사용자 등록
                        </Link>
                    </Grid>
                    <Grid item>
                        <Link href="#" variant="body2">
                            비밀번호찾기
                        </Link>
                    </Grid>
                </Grid>
                <RegisterModal open={open} onClose={handleClose} />
                {error && <Typography variant="body2" color="error">{error}</Typography>}
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;
