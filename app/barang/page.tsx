// 'use client'
// import { useState, useEffect } from "react";
// import axios from 'axios';

// interface Barang {
//     id: number;
//     attributes: {
//         namabarang: string;
//         jenisbarang: string;
//         stokbarang: number;
//         hargabarang: number;
//         supplyer: string;
//     };
// }

// async function getData(): Promise<Barang[]>{
//    try{
//     const response = await axios.get('http://localhost:1337/api/barangs');
//     return response.data.data as Barang[];
//    } catch (error){
//     throw new Error("Gagal Mendapat Data");
//    };
// }

// export default function Page(){
//     const [data, setData] = useState<Barang[]>([]);

//     useEffect(() => {
//         async function fetchData() {
//             try {
//                 const fetchedData = await getData();
//                 setData(fetchedData || []);
//             } catch (error) {
//                 console.error('Error:', error);
//             }
            
//         }
//         fetchData();
//     }, []);

//     //button handle
//     const handleShow = (barang: Barang) => {
//         // <Link href="/addMahasiswa">Fetch</Link>
//         alert(`Showing Barang: ${barang.attributes.namabarang} - ${barang.attributes.jenisbarang}`);
//     };
//     const handleEdit = (barang: Barang) => {
//         // <Link href="/addMahasiswa">Fetch</Link>
//         alert(`Editing Barang: ${barang.attributes.namabarang} - ${barang.attributes.jenisbarang}`);
//     };
//     const handleDelete = (barang: Barang) => {
//         // <Link href="/addMahasiswa">Fetch</Link>
//         alert(`Deleting Barang: ${barang.attributes.namabarang} - ${barang.attributes.jenisbarang}`);
//         //implement your delete logic here
//     };

//     return(
//         <main>
//             <h1 className="color=blue">Daftar Barang</h1>
//             <button className="btn btn-pink">Tambah Data</button>
//             <table className="table-auto border-collapse border-2 border-gray-500">
//                 <thead>
//                     <tr>
//                         <th>No</th>
//                         <th>Nama Barang</th>
//                         <th>Jenis Barang</th>
//                         <th>Stok Barang</th>
//                         <th>Harga Barang</th>
//                         <th>Supplyer</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {data.map((item, index) =>(
//                         <tr key={index}>
//                             <td>{index + 1}</td>
//                             <td>{item.attributes.namabarang}</td>
//                             <td>{item.attributes.jenisbarang}</td>
//                             <td>{item.attributes.stokbarang}</td>
//                             <td>{item.attributes.hargabarang}</td>
//                             <td>{item.attributes.supplyer}</td>
//                             <td>
//                                 <button className="btn btn-blue" onClick={() => handleShow(item)}>Show</button>
//                                 <button className="btn btn-yellow" onClick={() => handleEdit(item)}>Edit</button>
//                                 <button className="btn btn-red" onClick={() => handleDelete(item)}>Delete</button>
//                             </td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </main>
//     );
// }

'use client'
import { useState, useEffect } from "react";
import axios from 'axios';
import Modal from 'react-modal';
import router, { useRouter } from 'next/router';


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
    const handleCreate = (barang: Barang) => {
        setSelectedBarang(barang);
        router.push('/addBarang');
    };

    const handleEdit = (barang: Barang) => {
        setSelectedBarang(barang);
        router.push(`/editBarang/${barang.id}`);
    };

    const handleDelete = async (barang: Barang) => {
        try {
        // Implement your delete logic here
        await axios.delete(`http://localhost:1337/api/barangs/${barang.id}`);
        // Fetch updated data after deletion
        const updatedData = await getData();
        setData(updatedData || []);
        } catch (error) {
        console.error('Error deleting Barang:', error);
        }
    };


    const closeModal = () => {
        setSelectedBarang(null);
        setModalIsOpen(false);
    };

    return (
        <main>
        <h1 style={{ color: "blue" }}>Daftar Barang</h1>
        {data.map((barang) => (
            <table className="table" key={barang.id}>
                <thead>
                    <td>NO</td>
                    <td>Nama</td>
                    <td>Aksi</td>
                </thead>
                <tbody>
                <td>{barang.id}</td>
                <td>{barang.attributes.namabarang}</td>
                <td>
                    <button className="btn btn-blue" onClick={() => handleShow(barang)}>Detail</button>
                    <button className="btn btn-green" onClick={() => handleCreate(barang)}>Tambah</button>
                    <button className="btn btn-yellow" onClick={() => handleEdit(barang)}>Edit</button>
                    <button className="btn btn-red" onClick={() => handleDelete(barang)}>Hapus</button>
                    </td>
                </tbody>
            </table>
            ))}
        
    {/*         
        
        <ul>
            
            {data.map((mahasiswa) => (
            <li key={mahasiswa.id}>
                {mahasiswa.attributes.nim} - {mahasiswa.attributes.nama}
                <button onClick={() => handleShow(mahasiswa)}>Show</button>
            </li>
            ))}
        </ul> */}

        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Detail Barang"
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
                <button className="btn btn-red" onClick={closeModal}>Tutup</button>
            </div>
            )}
        </Modal>
        </main>
    );
}
