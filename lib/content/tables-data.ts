export type TableZoneId = "loca" | "masalar";

export interface RestaurantTable {
  id: string;
  tableNumber: string;
  name: string;
  zoneId: TableZoneId;
  zoneName: string;
  capacity: number;
  minGuests: number;
  isVip?: boolean;
  shape: "circle" | "rect";
  cx?: number;
  cy?: number;
  r?: number;
  x?: number;
  y?: number;
  width?: number;
  height?: number;
  description?: string;
}

export interface TableZone {
  id: TableZoneId;
  name: string;
  description: string;
  badge: string;
}

export const TABLE_ZONES: TableZone[] = [
  {
    id: "loca",
    name: "VIP Localar & Aile Masaları",
    description: "Geniş oturumlu, havuz manzaralı özel localar (6-8 Kişilik)",
    badge: "✦ VIP LOCA",
  },
  {
    id: "masalar",
    name: "Havuz Başı Masalar",
    description: "Havuz etrafındaki standart masalar (2-4 Kişilik)",
    badge: "MASA",
  },
];

/**
 * Kullanıcının yüklediği gerçek Petra Havuz Planına (media_1787219097607.jpg)
 * %100 sadık kalan masa ve loca koordinat haritası.
 */
export const RESTAURANT_TABLES: RestaurantTable[] = [
  // ─── VİP LOCALAR (6-8 Kişilik) ───
  {
    id: "loca-1",
    tableNumber: "Loca 1",
    name: "Loca 1 (Sol Üst VIP)",
    zoneId: "loca",
    zoneName: "VIP Localar",
    capacity: 8,
    minGuests: 2,
    isVip: true,
    shape: "circle",
    cx: 104,
    cy: 38,
    r: 35,
    description: "Sol üst köşe, geniş ve ferah VIP Loca (6–8 Kişilik)",
  },
  {
    id: "loca-2",
    tableNumber: "Loca 2",
    name: "Loca 2 (Sağ Üst VIP)",
    zoneId: "loca",
    zoneName: "VIP Localar",
    capacity: 8,
    minGuests: 2,
    isVip: true,
    shape: "circle",
    cx: 566,
    cy: 38,
    r: 35,
    description: "Sağ üst köşe, geniş ve ferah VIP Loca (6–8 Kişilik)",
  },
  {
    id: "loca-6",
    tableNumber: "Loca 6",
    name: "Loca 6 (Sol Orta VIP)",
    zoneId: "loca",
    zoneName: "VIP Localar",
    capacity: 8,
    minGuests: 2,
    isVip: true,
    shape: "circle",
    cx: 48,
    cy: 454,
    r: 35,
    description: "Sol orta, havuz cepheli geniş VIP Loca (6–8 Kişilik)",
  },
  {
    id: "loca-3",
    tableNumber: "Loca 3",
    name: "Loca 3 (Sağ Orta VIP)",
    zoneId: "loca",
    zoneName: "VIP Localar",
    capacity: 8,
    minGuests: 2,
    isVip: true,
    shape: "circle",
    cx: 602,
    cy: 454,
    r: 35,
    description: "Sağ orta, havuz cepheli geniş VIP Loca (6–8 Kişilik)",
  },
  {
    id: "loca-5",
    tableNumber: "Loca 5",
    name: "Loca 5 (Sol Alt VIP)",
    zoneId: "loca",
    zoneName: "VIP Localar",
    capacity: 8,
    minGuests: 2,
    isVip: true,
    shape: "circle",
    cx: 104,
    cy: 825,
    r: 35,
    description: "Sol alt köşe, çocuk havuzu yakını VIP Loca (6–8 Kişilik)",
  },
  {
    id: "loca-4",
    tableNumber: "Loca 4",
    name: "Loca 4 (Sağ Alt VIP)",
    zoneId: "loca",
    zoneName: "VIP Localar",
    capacity: 8,
    minGuests: 2,
    isVip: true,
    shape: "circle",
    cx: 830,
    cy: 860,
    r: 46,
    description: "Sağ alt köşe VIP Loca, çocuk havuzu cepheli (6–8 Kişilik)",
  },
  {
    id: "havuz-yani",
    tableNumber: "Havuz Yanı",
    name: "Havuz Yanı Aile Masası",
    zoneId: "loca",
    zoneName: "VIP Localar",
    capacity: 6,
    minGuests: 2,
    isVip: false,
    shape: "circle",
    cx: 330,
    cy: 870,
    r: 36,
    description: "Çocuk havuzu bitişiği özel aile masası (4–6 Kişilik)",
  },

  // ─── A GRUBU KÜÇÜK MASALAR (Sol Üst Yan) ───
  {
    id: "masa-a3",
    tableNumber: "A-3",
    name: "Masa A-3 (Sol Üst)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 155,
    cy: 165,
    r: 32,
    description: "A Grubu 4 kişilik havuz başı masası",
  },
  {
    id: "masa-a2",
    tableNumber: "A-2",
    name: "Masa A-2 (Sol Üst)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 155,
    cy: 250,
    r: 32,
    description: "A Grubu 4 kişilik havuz başı masası",
  },
  {
    id: "masa-a1",
    tableNumber: "A-1",
    name: "Masa A-1 (Sol Üst)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 155,
    cy: 335,
    r: 32,
    description: "A Grubu 4 kişilik havuz başı masası",
  },

  // ─── D GRUBU KÜÇÜK MASALAR (Sol Alt Yan) ───
  {
    id: "masa-d3",
    tableNumber: "D-3",
    name: "Masa D-3 (Sol Alt)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 155,
    cy: 560,
    r: 32,
    description: "D Grubu 4 kişilik havuz başı masası",
  },
  {
    id: "masa-d2",
    tableNumber: "D-2",
    name: "Masa D-2 (Sol Alt)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 155,
    cy: 645,
    r: 32,
    description: "D Grubu 4 kişilik havuz başı masası",
  },
  {
    id: "masa-d1",
    tableNumber: "D-1",
    name: "Masa D-1 (Sol Alt)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 155,
    cy: 730,
    r: 32,
    description: "D Grubu 4 kişilik havuz başı masası",
  },

  // ─── B GRUBU KÜÇÜK MASALAR (Sağ Üst Yan) ───
  {
    id: "masa-b1",
    tableNumber: "B-1",
    name: "Masa B-1 (Sağ Üst)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 865,
    cy: 165,
    r: 32,
    description: "B Grubu 4 kişilik havuz başı masası",
  },
  {
    id: "masa-b2",
    tableNumber: "B-2",
    name: "Masa B-2 (Sağ Üst)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 865,
    cy: 250,
    r: 32,
    description: "B Grubu 4 kişilik havuz başı masası",
  },
  {
    id: "masa-b3",
    tableNumber: "B-3",
    name: "Masa B-3 (Sağ Üst)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 865,
    cy: 335,
    r: 32,
    description: "B Grubu 4 kişilik havuz başı masası",
  },

  // ─── C GRUBU KÜÇÜK MASALAR (Sağ Alt Yan) ───
  {
    id: "masa-c1",
    tableNumber: "C-1",
    name: "Masa C-1 (Sağ Alt)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 865,
    cy: 560,
    r: 32,
    description: "C Grubu 4 kişilik havuz başı masası",
  },
  {
    id: "masa-c2",
    tableNumber: "C-2",
    name: "Masa C-2 (Sağ Alt)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 865,
    cy: 645,
    r: 32,
    description: "C Grubu 4 kişilik havuz başı masası",
  },
  {
    id: "masa-c3",
    tableNumber: "C-3",
    name: "Masa C-3 (Sağ Alt)",
    zoneId: "masalar",
    zoneName: "Havuz Masaları",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 865,
    cy: 730,
    r: 32,
    description: "C Grubu 4 kişilik havuz başı masası",
  },
];

export function findTableById(id?: string | null): RestaurantTable | undefined {
  if (!id) return undefined;
  return RESTAURANT_TABLES.find((t) => t.id === id);
}