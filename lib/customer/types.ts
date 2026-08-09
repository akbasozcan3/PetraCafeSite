/** Müşteri (storefront) — admin'den tamamen ayrı */

export type CustomerAddress = {
  id: string;
  title: string;
  fullName: string;
  phone: string;
  city: string;
  district: string;
  addressLine: string;
  notes?: string;
  isDefault?: boolean;
};

export type CustomerRecord = {
  id: string;
  email: string;
  passwordHash: string;
  name: string;
  phone: string;
  emailVerifiedAt?: string | null;
  verifyTokenHash?: string | null;
  verifyExpiresAt?: string | null;
  resetTokenHash?: string | null;
  resetExpiresAt?: string | null;
  addresses: CustomerAddress[];
  active: boolean;
  createdAt: string;
  updatedAt: string;
};

export type CartLine = {
  slug: string;
  ad: string;
  fiyat?: string;
  qty: number;
};

export type WebOrderStatus =
  | "pending"
  | "confirmed"
  | "preparing"
  | "ready"
  | "delivered"
  | "cancelled";

export type PaymentMethod = "cash_on_delivery" | "store_pickup" | "whatsapp";

export type WebOrder = {
  id: string;
  publicCode: string;
  accessToken: string;
  customerId?: string | null;
  guestEmail?: string | null;
  guestName?: string | null;
  guestPhone?: string | null;
  items: CartLine[];
  address?: CustomerAddress | null;
  paymentMethod: PaymentMethod;
  note?: string;
  status: WebOrderStatus;
  totalText?: string;
  createdAt: string;
  updatedAt: string;
};

export type PublicCustomer = {
  id: string;
  email: string;
  name: string;
  phone: string;
  emailVerified: boolean;
  addresses: CustomerAddress[];
};
