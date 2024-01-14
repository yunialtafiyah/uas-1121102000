// pages/addMahasiswa.tsx

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const AddBarangPage = () => {
  const [formData, setFormData] = useState({
    namabarang:'',
    jenisbarang:'',
    stokbarang:'',
    hargabarang:'',
    supplyer:'',
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
      await axios.post('http://localhost:1337/api/barangs', {
        data: formData,
      });
      // Redirect to the Barang list page after successful submission
      router.push('/barang');
    } catch (error) {
      console.error('Error adding Barang:', error);
    }
  };

  return (
    <div>
      <h1>Add Barang</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Nama Barang:
          <input type="text" name="namabarang" value={formData.namabarang} onChange={handleChange} />
        </label>
        <br />
        <label>
          Jenis Barang:
          <input type="text" name="jenisbarang" value={formData.jenisbarang} onChange={handleChange} />
        </label>
        <label>
          Stok Barang:
          <input type="text" name="stokbarang" value={formData.stokbarang} onChange={handleChange} />
        </label>
        <br />
        <label>
          HargaBarang:
          <input type="text" name="hargabarang" value={formData.hargabarang} onChange={handleChange} />
        </label>
        <label>
          Supplyer:
          <input type="text" name="supplyer" value={formData.supplyer} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Tambah Barang</button>
      </form>
    </div>
  );
};

export default AddBarangPage;
