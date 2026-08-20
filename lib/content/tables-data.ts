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
  // ─── 1. VİP LOCALAR (6 Adet) ───
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
    cx: 97,
    cy: 37,
    r: 32,
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
    cx: 567,
    cy: 37,
    r: 32,
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
    cx: 47,
    cy: 456,
    r: 32,
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
    cx: 604,
    cy: 456,
    r: 32,
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
    cx: 97,
    cy: 832,
    r: 32,
    description: "Sol alt köşe, çocuk havuzu yanı VIP Loca (6–8 Kişilik)",
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
    cx: 567,
    cy: 832,
    r: 32,
    description: "Sağ alt köşe VIP Loca (6–8 Kişilik)",
  },

  // ─── 2. SOL TARAF MASALAR (A Grubu & D Grubu) ───
  {
    id: "a-3",
    tableNumber: "A-3",
    name: "Masa A-3 (Sol Üst)",
    zoneId: "masalar",
    zoneName: "A Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 72,
    cy: 142,
    r: 20,
    description: "Sol üst havuz kenarı 4 kişilik masa",
  },
  {
    id: "a-2",
    tableNumber: "A-2",
    name: "Masa A-2 (Sol Üst)",
    zoneId: "masalar",
    zoneName: "A Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 72,
    cy: 228,
    r: 20,
    description: "Sol üst havuz kenarı 4 kişilik masa",
  },
  {
    id: "a-1",
    tableNumber: "A-1",
    name: "Masa A-1 (Sol Üst)",
    zoneId: "masalar",
    zoneName: "A Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 72,
    cy: 312,
    r: 20,
    description: "Sol üst havuz kenarı 4 kişilik masa",
  },
  {
    id: "d-3",
    tableNumber: "D-3",
    name: "Masa D-3 (Sol Alt)",
    zoneId: "masalar",
    zoneName: "D Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 72,
    cy: 564,
    r: 20,
    description: "Sol alt havuz kenarı 4 kişilik masa",
  },
  {
    id: "d-2",
    tableNumber: "D-2",
    name: "Masa D-2 (Sol Alt)",
    zoneId: "masalar",
    zoneName: "D Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 72,
    cy: 648,
    r: 20,
    description: "Sol alt havuz kenarı 4 kişilik masa",
  },
  {
    id: "d-1",
    tableNumber: "D-1",
    name: "Masa D-1 (Sol Alt)",
    zoneId: "masalar",
    zoneName: "D Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 72,
    cy: 734,
    r: 20,
    description: "Sol alt havuz kenarı 4 kişilik masa",
  },

  // ─── 3. SAĞ TARAF MASALAR (B Grubu & C Grubu) ───
  {
    id: "b-1",
    tableNumber: "B-1",
    name: "Masa B-1 (Sağ Üst)",
    zoneId: "masalar",
    zoneName: "B Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 588,
    cy: 142,
    r: 20,
    description: "Sağ üst havuz kenarı 4 kişilik masa",
  },
  {
    id: "b-2",
    tableNumber: "B-2",
    name: "Masa B-2 (Sağ Üst)",
    zoneId: "masalar",
    zoneName: "B Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 588,
    cy: 228,
    r: 20,
    description: "Sağ üst havuz kenarı 4 kişilik masa",
  },
  {
    id: "b-3",
    tableNumber: "B-3",
    name: "Masa B-3 (Sağ Üst)",
    zoneId: "masalar",
    zoneName: "B Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 588,
    cy: 312,
    r: 20,
    description: "Sağ üst havuz kenarı 4 kişilik masa",
  },
  {
    id: "c-1",
    tableNumber: "C-1",
    name: "Masa C-1 (Sağ Alt)",
    zoneId: "masalar",
    zoneName: "C Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 588,
    cy: 564,
    r: 20,
    description: "Sağ alt havuz kenarı 4 kişilik masa",
  },
  {
    id: "c-2",
    tableNumber: "C-2",
    name: "Masa C-2 (Sağ Alt)",
    zoneId: "masalar",
    zoneName: "C Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 588,
    cy: 648,
    r: 20,
    description: "Sağ alt havuz kenarı 4 kişilik masa",
  },
  {
    id: "c-3",
    tableNumber: "C-3",
    name: "Masa C-3 (Sağ Alt)",
    zoneId: "masalar",
    zoneName: "C Grubu",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 588,
    cy: 734,
    r: 20,
    description: "Sağ alt havuz kenarı 4 kişilik masa",
  },
  {
    id: "havuz-yani",
    tableNumber: "HY",
    name: "Havuz Yanı Masa",
    zoneId: "masalar",
    zoneName: "Havuz Yanı",
    capacity: 4,
    minGuests: 1,
    shape: "circle",
    cx: 202,
    cy: 832,
    r: 20,
    description: "Çocuk havuzu ve Loca 5 yanı 4 kişilik masa",
  },
];

export function findTableById(id?: string | null): RestaurantTable | undefined {
  if (!id) return undefined;
  return RESTAURANT_TABLES.find((t) => t.id === id);
}