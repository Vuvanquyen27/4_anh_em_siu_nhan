const express = require('express');
const app = express();
app.use(express.json());

// GET
app.get('/api/users', (req, res) => {
    res.send('Lấy danh sách người dùng');
});

// POST
app.post('/api/users', (req, res) => {
    const newUser = req.body;
    res.send(`Tạo người dùng mới: ${JSON.stringify(newUser)}`);
});

// PUT
app.put('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    res.send(`Cập nhật người dùng có ID ${userId}: ${JSON.stringify(updatedUser)}`);
});

// DELETE
app.delete('/api/users/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`Xóa người dùng có ID ${userId}`);
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server chạy tại http://localhost:${PORT}`));
