import { AddFormTypes } from "@/components/forms/AddForm";
import { userModels } from "@/models/zustand/authModels";

export type DummyTasksType = AddFormTypes & {
  createdAt: Date;
};

export type DummyPemilikType = {
  nama: string;
  jumlahTransaksi: number;
};

export const dummyUser: userModels = {
  name: "John Doe",
  role: "admin",
};

export const dummyTasks: DummyTasksType[] = [
  {
    pemilik: "John Doe",
    armada: "Mobil A",
    jenisKayu: "Kayu A",
    jumlahKayu: 10,
    gambar: require("@/assets/images/others/icon.png"),
    createdAt: new Date(),
    bk: "BK1234",
    kebun: "Kebun A",
  },
  {
    pemilik: "Jane Smith",
    armada: "Mobil B",
    jenisKayu: "Kayu B",
    jumlahKayu: 15,
    gambar: require("@/assets/images/others/icon.png"),
    bk: "BK1234",
    createdAt: new Date(),
    kebun: "Kebun B",
  },
  {
    pemilik: "Alice Johnson",
    armada: "Mobil C",
    jenisKayu: "Kayu C",
    jumlahKayu: 20,
    gambar: require("@/assets/images/others/icon.png"),
    createdAt: new Date(),
    bk: "BK1234",
    kebun: "Kebun C",
  },
  {
    pemilik: "John Doe",
    armada: "Mobil A",
    jenisKayu: "Kayu A",
    jumlahKayu: 10,
    gambar: require("@/assets/images/others/icon.png"),
    createdAt: new Date(),
    bk: "BK1234",
    kebun: "Kebun A",
  },
  {
    pemilik: "Jane Smith",
    armada: "Mobil B",
    jenisKayu: "Kayu B",
    jumlahKayu: 15,
    gambar: require("@/assets/images/others/icon.png"),
    createdAt: new Date(),
    bk: "BK1234",
    kebun: "Kebun B",
  },
  {
    pemilik: "Alice Johnson",
    armada: "Mobil C",
    jenisKayu: "Kayu C",
    jumlahKayu: 20,
    gambar: require("@/assets/images/others/icon.png"),
    createdAt: new Date(),
    bk: "BK1234",
    kebun: "Kebun C",
  },
  {
    pemilik: "John Doe",
    armada: "Mobil A",
    jenisKayu: "Kayu A",
    jumlahKayu: 10,
    gambar: require("@/assets/images/others/icon.png"),
    createdAt: new Date(),
    bk: "BK1234",
    kebun: "Kebun A",
  },
  {
    pemilik: "Jane Smith",
    armada: "Mobil B",
    jenisKayu: "Kayu B",
    jumlahKayu: 15,
    gambar: require("@/assets/images/others/icon.png"),
    createdAt: new Date(),
    bk: "BK1234",
    kebun: "Kebun B",
  },
  {
    pemilik: "Alice Johnson",
    armada: "Mobil C",
    jenisKayu: "Kayu C",
    jumlahKayu: 20,
    gambar: require("@/assets/images/others/icon.png"),
    createdAt: new Date(),
    bk: "BK1234",
    kebun: "Kebun C",
  },
];

export const dummyPemilik: DummyPemilikType[] = [
  {
    nama: "John Doe",
    jumlahTransaksi: 5,
  },
  {
    nama: "Jane Smith",
    jumlahTransaksi: 3,
  },
  {
    nama: "Alice Johnson",
    jumlahTransaksi: 8,
  },
  {
    nama: "Bob Brown",
    jumlahTransaksi: 0,
  },
];

export const DummyUsers: userModels[] = [
  {
    name: "John Doe",
    role: "admin",
  },
  {
    name: "Jane Smith",
    role: "mandor",
  },
  {
    name: "Alice Johnson",
    role: "mandor",
  },
  {
    name: "Bob Brown",
    role: "spv",
  },
];

export type DummyWoodType = {
  nama: string;
  harga: number;
  satuan: "kg" | "batang" | "armada";
};

export const DummyWood: DummyWoodType[] = [
  { nama: "Kayu A", harga: 10000, satuan: "kg" },
  { nama: "Kayu B", harga: 15000, satuan: "batang" },
  { nama: "Kayu C", harga: 20000, satuan: "armada" },
  { nama: "Kayu D", harga: 25000, satuan: "kg" },
  { nama: "Kayu E", harga: 30000, satuan: "batang" },
];

export type DummyKebunType = {
  nama: string;
  lokasi: string;
  jumlahKayu: number;
};

export const DummyKebun: DummyKebunType[] = [
  { nama: "Kebun A", lokasi: "Lokasi A", jumlahKayu: 100 },
  { nama: "Kebun B", lokasi: "Lokasi B", jumlahKayu: 150 },
  { nama: "Kebun C", lokasi: "Lokasi C", jumlahKayu: 200 },
  { nama: "Kebun D", lokasi: "Lokasi D", jumlahKayu: 250 },
  { nama: "Kebun E", lokasi: "Lokasi E", jumlahKayu: 300 },
];
