import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

interface Barang {
  id: number;
  attributes: {
    namabarang: string;
    jenisbarang: string;
    stokbarang: number;
    hargabarang: number;
    supplyer: string;
  };
}

const EditBarangPage = () => {
  const [formData, setFormData] = useState({
    namabarang:'',
    jenisbarang:'',
    stokbarang:'',
    hargabarang:'',
    supplyer:'',
  });

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:1337/api/barangs/${id}`);
        const barangData = response.data.data as Barang;
        setFormData({
          namabarang: barangData.attributes.namabarang,
          jenisbarang: barangData.attributes.jenisbarang,
          stokbarang: barangData.attributes.stokbarang,
          hargabarang: barangData.attributes.hargabarang,
          supplyer: barangData.attributes.supplyer,
        });
      } catch (error) {
        console.error('Error fetching Barang:', error);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

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
      await axios.put(`http://localhost:1337/api/mahasiswas/${id}`, {
        data: formData,
      });
      // Redirect to the Barang list page after successful submission
      router.push('/barang');
    } catch (error) {
      console.error('Error updating Barang:', error);
    }
  };

  return (
    <div>
      <h1>Edit Barang</h1>
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
          Harga Barang:
          <input type="text" name="hargabarang" value={formData.hargabarang} onChange={handleChange} />
        </label>
        <label>
          Supplyer:
          <input type="text" name="supplyer" value={formData.supplyer} onChange={handleChange} />
        </label>
        <br />
        <button type="submit">Update Mahasiswa</button>
      </form>
    </div>
  );
};

export default EditBarangPage;
