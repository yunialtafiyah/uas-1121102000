// pages/addMahasiswa.tsx

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddMahasiswaPage = () => {
  const [formData, setFormData] = useState({
    nim: '',
    nama: '',
    angkatan: '',
    prodi: '',
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post('http://localhost:1337/api/mahasiswas', {
        data: formData,
      });
      // Redirect to the Mahasiswa list page after successful submission
      router.push('/mahasiswa');
    } catch (error) {
      console.error('Error adding Mahasiswa:', error);
    }
  };

  return (
    <div>
      <h1>Add Mahasiswa</h1>
      <form onSubmit={handleSubmit}>
        <label>
          NIM:
          <input type="text" name="nim" value={formData.nim} onChange={handleChange} />
        </label>
        <br />
        <label>
          Nama:
          <input type="text" name="nama" value={formData.nama} onChange={handleChange} />
        </label>
        <br />
        <label>
          Angkatan:
          <input type="text" name="angkatan" value={formData.angkatan} onChange={handleChange} />
        </label>
        <label>
          Prodi:
          <input type="text" name="prodi" value={formData.prodi} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Tambah Mahasiswa</button>
      </form>
    </div>
  );
};

export default AddMahasiswaPage;
