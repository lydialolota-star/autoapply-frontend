import React, { useState, useEffect } from 'react';
import './App.css';

// 🔥 你的后端地址，确保正确！
const API_URL = 'https://autoapply-backend.vercel.app/api';

function App() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // 页面加载时自动获取数据
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${API_URL}/profile?user_id=user123`);
      const data = await response.json();
      
      if (response.ok) {
        setProfile(data);
        setError(null);
      } else {
        setError(data.error || '获取数据失败');
      }
    } catch (err) {
      setError('网络错误：' + err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="container">加载中...</div>;
  if (error) return <div className="container" style={{color: 'red'}}>错误：{error}</div>;

  return (
    <div className="container">
      <h1>🎯 我的简历</h1>
      
      <div className="card">
        <h2>基本信息</h2>
        <p><strong>姓名：</strong> {profile?.full_name || '未填写'}</p>
        <p><strong>邮箱：</strong> {profile?.email || '未填写'}</p>
        <p><strong>电话：</strong> {profile?.phone || '未填写'}</p>
      </div>

      <div className="card">
        <h2>操作</h2>
        <button onClick={fetchProfile} className="btn">刷新数据</button>
      </div>
      
      <div style={{marginTop: '20px', color: '#666', fontSize: '14px'}}>
        后端连接状态：✅ 正常 | 用户ID: user123
      </div>
    </div>
  );
}

export default App;