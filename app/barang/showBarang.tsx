'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import Modal from 'react-modal';

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

async function getData(): Promise<Barang[]> {
  try {
    const response = await axios.get('http://localhost:1337/api/barangs');
    return response.data.data as Barang[];
  } catch (error) {
    throw new Error("Gagal Mendapat Data");
  }
}

export default function Page() {
  const [data, setData] = useState<Barang[]>([]);
  const [selectedBarang, setSelectedBarang] = useState<Barang | null>(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  useEffect(() => {
    async function fetchData() {
      try {
        const fetchedData = await getData();
        setData(fetchedData || []);
      } catch (error) {
        console.error('Error:', error);
      }
    }

    fetchData();
  }, []);

  const handleShow = (barang: Barang) => {
    setSelectedBarang(barang);
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setSelectedBarang(null);
    setModalIsOpen(false);
  };

  return (
    <main>
      <h1 style={{ color: "blue" }}>Daftar Barang</h1>
      <ul>
        {data.map((barang) => (
          <li key={barang.id}>
            {barang.attributes.stokbarang} - {barang.attributes.namabarang}
            <button onClick={() => handleShow(barang)}>Show</button>
          </li>
        ))}
      </ul>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Barang Details"
      >
        {selectedBarang && (
          <div>
            <h2>Barang Details</h2>
            <p>NamaBarang: {selectedBarang.attributes.namabarang}</p>
            <p>JenisBarang: {selectedBarang.attributes.jenisbarang}</p>
            <p>StokBarang: {selectedBarang.attributes.stokbarang}</p>
            <p>HargaBarang: {selectedBarang.attributes.hargabarang}</p>
            <p>Supplyer: {selectedBarang.attributes.supplyer}</p>
            {/* Add other details as needed */}
            <button onClick={closeModal}>Close</button>
          </div>
        )}
      </Modal>
    </main>
  );
}

