const express = require('express');
const app = express();

const PORT = 3000;

app.use(express.json());

let students = [
  { id: 1, nama: "Andi", jurusan: "Informatika" },
  { id: 2, nama: "Budi", jurusan: "Sistem Informasi" },
  { id: 3, nama: "Citra", jurusan: "Teknik Komputer" },
];

app.get('/', (req, res) => {
  res.json('API Mahasiswa Berjalan');
});

app.get('/students', (req, res) => {
  res.json(students);
});

app.get('/students/:id', (req, res) => {
  const student = students.find(u => u.id == req.params.id);

  if (!student) {
    return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }

  res.json(student);
});

app.post('/students', (req, res) => {
  const newUser = {
    id: students.length + 1,
    nama: req.body.nama,
    jurusan: req.body.jurusan
  };

  students.push(newUser);
  res.json(newUser);
});

app.put('/students/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const student = students.find(u => u.id === id);

  if (!student) {
    return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }

  // update data
  student.nama = req.body.nama || student.nama;
  student.jurusan = req.body.jurusan || student.jurusan;

  res.json({
    message: "Mahasiswa berhasil diupdate",
    data: student
  });
});

app.delete('/students/:id', (req, res) => {
  const index = students.findIndex(u => u.id == req.params.id);

  if (index === -1) {
    return res.status(404).json({ message: "Mahasiswa tidak ditemukan" });
  }

  const deleted = students.splice(index, 1);
  res.json(deleted);
});

app.listen(PORT, () => {
  console.log(`Server running di http://localhost:${PORT}`);
});