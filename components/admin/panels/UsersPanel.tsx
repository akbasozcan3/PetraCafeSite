"use client";

import { useCallback, useEffect, useState } from "react";
import { Loader2, Plus, Trash2, Save, UserPlus } from "lucide-react";
import { api, type PublicAdminUser } from "@/lib/api/client";
import { ROLE_LABELS, type AdminRole } from "@/lib/admin/roles";
import { useAdminSession } from "@/lib/context/AdminSessionContext";
import AdminPageHeader, { AdminAlert } from "@/components/admin/AdminPageHeader";
import Input from "@/components/admin/ui/Input";
import Button from "@/components/admin/ui/Button";

const ROLE_OPTIONS: AdminRole[] = ["owner", "admin", "editor", "viewer"];

export default function UsersPanel() {
  const { user: me, can } = useAdminSession();
  const [users, setUsers] = useState<PublicAdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "editor" as AdminRole,
  });

  const load = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const res = await api.listUsers();
      setUsers(res.users);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Kullanıcılar yüklenemedi");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  if (!can("users:manage")) {
    return (
      <AdminAlert message="Bu sayfaya erişim yetkiniz yok." type="error" />
    );
  }

  const create = async (e: React.FormEvent) => {
    e.preventDefault();
    setBusyId("create");
    setMessage("");
    setError("");
    try {
      await api.createUser(form);
      setForm({ name: "", email: "", password: "", role: "editor" });
      setMessage("Kullanıcı oluşturuldu.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Oluşturulamadı");
    } finally {
      setBusyId(null);
    }
  };

  const patch = async (
    id: string,
    data: { name?: string; role?: AdminRole; active?: boolean; password?: string }
  ) => {
    setBusyId(id);
    setError("");
    try {
      await api.updateUser({ id, ...data });
      setMessage("Güncellendi.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Güncellenemedi");
    } finally {
      setBusyId(null);
    }
  };

  const remove = async (id: string) => {
    if (!confirm("Bu kullanıcı silinsin mi?")) return;
    setBusyId(id);
    setError("");
    try {
      await api.deleteUser(id);
      setMessage("Kullanıcı silindi.");
      await load();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Silinemedi");
    } finally {
      setBusyId(null);
    }
  };

  return (
    <>
      <AdminPageHeader
        title="Kullanıcılar & Roller"
        description="Sahip, yönetici, editör ve izleyici rolleriyle çok kullanıcılı erişim."
      />
      {message && <AdminAlert message={message} />}
      {error && <AdminAlert message={error} type="error" />}

      <form
        onSubmit={create}
        className="mb-8 grid gap-4 rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-6 sm:grid-cols-2"
      >
        <h3 className="sm:col-span-2 flex items-center gap-2 text-lg font-semibold text-[#F8F8F8]">
          <UserPlus className="h-5 w-5 text-[#C8703A]" /> Yeni kullanıcı
        </h3>
        <Input
          label="Ad"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          required
        />
        <Input
          label="E-posta"
          type="email"
          value={form.email}
          onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          required
        />
        <Input
          label="Şifre"
          type="password"
          value={form.password}
          onChange={(e) => setForm((f) => ({ ...f, password: e.target.value }))}
          required
          minLength={8}
        />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#8A9BB0]">Rol</label>
          <select
            value={form.role}
            onChange={(e) =>
              setForm((f) => ({ ...f, role: e.target.value as AdminRole }))
            }
            className="h-11 w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 text-sm text-[#EEE9E0]"
          >
            {ROLE_OPTIONS.filter((r) => r !== "owner" || me?.role === "owner").map(
              (r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              )
            )}
          </select>
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" disabled={busyId === "create"}>
            {busyId === "create" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Plus className="h-4 w-4" />
            )}
            Ekle
          </Button>
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="h-6 w-6 animate-spin text-[#8A9BB0]" />
        </div>
      ) : (
        <div className="space-y-3">
          {users.map((u) => (
            <UserRow
              key={u.id}
              user={u}
              meId={me?.id}
              meRole={me?.role}
              busy={busyId === u.id}
              onSave={(data) => void patch(u.id, data)}
              onDelete={() => void remove(u.id)}
            />
          ))}
        </div>
      )}
    </>
  );
}

function UserRow({
  user,
  meId,
  meRole,
  busy,
  onSave,
  onDelete,
}: {
  user: PublicAdminUser;
  meId?: string;
  meRole?: AdminRole;
  busy: boolean;
  onSave: (data: {
    name?: string;
    role?: AdminRole;
    active?: boolean;
    password?: string;
  }) => void;
  onDelete: () => void;
}) {
  const [name, setName] = useState(user.name);
  const [role, setRole] = useState(user.role);
  const [password, setPassword] = useState("");

  useEffect(() => {
    setName(user.name);
    setRole(user.role);
  }, [user]);

  return (
    <div className="rounded-2xl border border-white/[0.08] bg-[#141E2E]/80 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="font-medium text-[#EEE9E0]">{user.email}</p>
          <p className="text-xs text-[#6B7A94]">
            {ROLE_LABELS[user.role]} · {user.active ? "Aktif" : "Pasif"} ·{" "}
            {new Date(user.createdAt).toLocaleDateString("tr-TR")}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={busy}
            onClick={() => onSave({ active: !user.active })}
            className="rounded-lg border border-white/[0.06] px-3 py-1.5 text-xs text-[#8A9BB0] hover:text-[#EEE9E0]"
          >
            {user.active ? "Pasifleştir" : "Aktifleştir"}
          </button>
          {user.id !== meId && (
            <button
              type="button"
              disabled={busy}
              onClick={onDelete}
              className="rounded-lg border border-red-500/20 px-3 py-1.5 text-xs text-red-400 hover:bg-red-500/10"
            >
              <Trash2 className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        <Input label="Ad" value={name} onChange={(e) => setName(e.target.value)} />
        <div className="space-y-2">
          <label className="block text-sm font-medium text-[#8A9BB0]">Rol</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value as AdminRole)}
            className="h-11 w-full rounded-2xl border border-white/[0.06] bg-[#0D1117] px-4 text-sm text-[#EEE9E0]"
          >
            {ROLE_OPTIONS.filter((r) => r !== "owner" || meRole === "owner").map(
              (r) => (
                <option key={r} value={r}>
                  {ROLE_LABELS[r]}
                </option>
              )
            )}
          </select>
        </div>
        <Input
          label="Yeni şifre (opsiyonel)"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          minLength={8}
        />
      </div>
      <div className="mt-3">
        <Button
          size="sm"
          disabled={busy}
          onClick={() =>
            onSave({
              name,
              role,
              ...(password ? { password } : {}),
            })
          }
        >
          {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}
          Kaydet
        </Button>
      </div>
    </div>
  );
}
