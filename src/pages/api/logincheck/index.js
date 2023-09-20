import { Pool } from 'pg';
import MybatisMapper from 'mybatis-mapper';

const pool = new Pool({
    //connectionString: "postgres://default:wjDaO1Gd0BhP@ep-holy-recipe-99329247-pooler.us-east-1.postgres.vercel-storage.com:5432/verceldb" + "?sslmode=require"
    user: 'default', // 사용자 이름
    host: 'ep-holy-recipe-99329247-pooler.us-east-1.postgres.vercel-storage.com', // 호스트 주소
    database: 'verceldb', // 데이터베이스 이름
    password: 'wjDaO1Gd0BhP', // 비밀번호
    port: 5432, // 포트 번호
    ssl: {
      rejectUnauthorized: false // 인증서를 검증하지 않도록 설정 (안전하지 않을 수 있으므로 실제 환경에서는 인증서 검증을 고려해야 합니다.)
  }
});

MybatisMapper.createMapper(['src/pages/api/mybatisMapper.xml']);

export default async function handler(req, res) {
    try {
      const connection = await pool.connect();
      const username = req.query.username;
      var param = {
        user_id : username
      }
      console.log("username" + username);
      const sql = MybatisMapper.getStatement("namespace1", "login_check", param);
      const { rows } = await connection.query(sql);         
      connection.release();
      return res.send(rows);
    } catch (error) {
      console.error('Error executing query:', error);
      res.status(500).json({ error: 'Internal server error' });
    } finally {
      // 연결 해제
      
    }
}