import { Ionicons } from "@expo/vector-icons";

export type ReportFeaturesType = {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  slug: string;
};

export const ReportFeatures: ReportFeaturesType[] = [
  {
    title: "Laporan Keuangan",
    description: "Melihat laporan keuangan perusahaan",
    icon: "pricetag-outline",
    slug: "moneyReport",
  },
  {
    title: "Laporan Armada",
    description: "Melihat laporan armada perusahaan",
    icon: "bus-outline",
    slug: "vehicleReport",
  },
  {
    title: "Laporan Kayu Kebun",
    description: "Melihat laporan kayu kebun perusahaan",
    icon: "leaf-outline",
    slug: "woodReport",
  },
];
