const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const createTables = async () => {
  const client = await pool.connect();
  try {
    await client.query(`
      CREATE TABLE IF NOT EXISTS users (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        name VARCHAR(100) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS quizzes (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        title VARCHAR(255) NOT NULL,
        topic VARCHAR(255) NOT NULL,
        host_id VARCHAR(255),
        host_name VARCHAR(100),
        room_code VARCHAR(10) UNIQUE NOT NULL,
        status VARCHAR(20) DEFAULT 'waiting',
        current_question INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT NOW()
      );

      CREATE TABLE IF NOT EXISTS questions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        quiz_id UUID REFERENCES quizzes(id) ON DELETE CASCADE,
        question_text TEXT NOT NULL,
        options JSONB NOT NULL,
        correct_answer INT NOT NULL,
        difficulty VARCHAR(20) DEFAULT 'medium',
        order_num INT NOT NULL
      );

      CREATE TABLE IF NOT EXISTS sessions (
        id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
        quiz_id UUID REFERENCES quizzes(id),
        player_name VARCHAR(100) NOT NULL,
        player_id VARCHAR(100) NOT NULL,
        score INT DEFAULT 0,
        streak INT DEFAULT 0,
        answers JSONB DEFAULT '[]',
        joined_at TIMESTAMP DEFAULT NOW()
      );
    `);
    console.log('✅ Database tables created!');
  } catch (err) {
    console.error('❌ Database error:', err.message);
  } finally {
    client.release();
  }
};

module.exports = { pool, createTables };
