"use client";

import React, { useState, useEffect, useCallback } from "react";
import {
  Shield,
  ShieldCheck,
  UserPlus,
  RefreshCw,
  Trash2,
  Edit2,
  Lock,
  Mail,
  User,
  Key,
  AlertCircle,
  CheckCircle2,
  X,
  Search,
} from "lucide-react";
import type { AdminRole } from "@/types/supabase";

interface AdminUser {
  id: string;
  email: string;
  fullName: string;
  role: AdminRole;
  createdAt: string;
  lastSignInAt: string | null;
  isConfirmed: boolean;
}

const ROLE_BADGE_STYLES: Record<AdminRole, string> = {
  superadmin: "bg-emerald-500/10 text-emerald-700 border-emerald-500/30",
  admin: "bg-teal-500/10 text-teal-700 border-teal-500/30",
  recruitment_manager: "bg-indigo-500/10 text-indigo-700 border-indigo-500/30",
  content_manager: "bg-amber-500/10 text-amber-700 border-amber-500/30",
  editor: "bg-blue-500/10 text-blue-700 border-blue-500/30",
};

const ROLE_LABELS: Record<AdminRole, string> = {
  superadmin: "Super Admin (Full Root Access)",
  admin: "Administrator (All Modules)",
  recruitment_manager: "Recruitment Manager (ATS Only)",
  content_manager: "Content Manager (CMS Only)",
  editor: "Editor (Draft / Review)",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [search, setSearch] = useState("");
  const [currentUserId, setCurrentUserId] = useState<string>("");
  const [currentUserRole, setCurrentUserRole] = useState<string>("");

  // Modal states
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<AdminUser | null>(null);

  // Form states
  const [formEmail, setFormEmail] = useState("");
  const [formPassword, setFormPassword] = useState("");
  const [formFullName, setFormFullName] = useState("");
  const [formRole, setFormRole] = useState<AdminRole>("admin");
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const fetchUsers = useCallback(async () => {
    try {
      setLoading(true);
      setError("");
      const res = await fetch("/api/admin/users");
      const data = await res.json();
      if (res.ok && data.success) {
        setUsers(data.users || []);
        setCurrentUserId(data.currentUserId || "");
        setCurrentUserRole(data.currentUserRole || "");
      } else {
        setError(data.message || "Failed to load admin users.");
      }
    } catch {
      setError("Network error while connecting to user service.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleOpenCreate = () => {
    setFormEmail("");
    setFormPassword("");
    setFormFullName("");
    setFormRole("admin");
    setFormError("");
    setIsCreateOpen(true);
  };

  const handleOpenEdit = (user: AdminUser) => {
    setSelectedUser(user);
    setFormFullName(user.fullName);
    setFormRole(user.role);
    setFormPassword("");
    setFormError("");
    setIsEditOpen(true);
  };

  const handleCreateSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError("");
    setFormLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: formEmail,
          password: formPassword,
          fullName: formFullName,
          role: formRole,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsCreateOpen(false);
        setSuccessMsg(`Admin account created for ${formEmail}.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchUsers();
      } else {
        setFormError(data.message || "Failed to create user.");
      }
    } catch {
      setFormError("Network error occurred.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser) return;
    setFormError("");
    setFormLoading(true);

    try {
      const res = await fetch("/api/admin/users", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: selectedUser.id,
          role: formRole,
          fullName: formFullName,
          password: formPassword || undefined,
        }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsEditOpen(false);
        setSuccessMsg(`Account for ${selectedUser.email} updated.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchUsers();
      } else {
        setFormError(data.message || "Failed to update user.");
      }
    } catch {
      setFormError("Network error occurred.");
    } finally {
      setFormLoading(false);
    }
  };

  const handleDelete = async (user: AdminUser) => {
    if (!confirm(`Are you sure you want to revoke access and delete administrator account: ${user.email}?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/users?userId=${user.id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setSuccessMsg(`Access revoked for ${user.email}.`);
        setTimeout(() => setSuccessMsg(""), 4000);
        fetchUsers();
      } else {
        alert(data.message || "Failed to delete user.");
      }
    } catch {
      alert("Network error occurred while attempting deletion.");
    }
  };

  const filteredUsers = users.filter((u) => {
    const q = search.toLowerCase();
    return u.email.toLowerCase().includes(q) || u.fullName.toLowerCase().includes(q) || u.role.includes(q);
  });

  const isSuperadmin = currentUserRole === "superadmin";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-extrabold text-[#142A27] tracking-tight">
              Administrator &amp; Staff Accounts
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-[#E9FFF2] text-[#008F53] border border-[#DFEDE5]">
              RBAC Verified
            </span>
          </div>
          <p className="text-xs sm:text-sm text-[#64736F] mt-1">
            Superadmin management of authorized personnel, role permissions, and platform credentials.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={fetchUsers}
            disabled={loading}
            className="p-2.5 rounded-xl border border-[#DFEDE5] bg-white text-[#64736F] hover:text-[#142A27] hover:bg-neutral-50 transition-colors cursor-pointer"
            title="Refresh list"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>

          {isSuperadmin && (
            <button
              type="button"
              onClick={handleOpenCreate}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs cursor-pointer"
            >
              <UserPlus className="w-4 h-4" />
              <span>Add Staff Member</span>
            </button>
          )}
        </div>
      </div>

      {/* Alerts */}
      {successMsg && (
        <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm flex items-center gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
          <span className="font-medium">{successMsg}</span>
        </div>
      )}

      {error && (
        <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs sm:text-sm flex items-center gap-3">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0" />
          <span className="font-medium">{error}</span>
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#DFEDE5] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
              Total Staff
            </span>
            <div className="w-8 h-8 rounded-lg bg-[#E9FFF2] text-[#008F53] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#142A27] mt-2">
            {users.length}
          </div>
          <span className="text-[11px] text-[#64736F]">Authorized users in system</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DFEDE5] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
              Superadmins
            </span>
            <div className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <ShieldCheck className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#142A27] mt-2">
            {users.filter((u) => u.role === "superadmin").length}
          </div>
          <span className="text-[11px] text-[#64736F]">Full root authorization</span>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-[#DFEDE5] shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-[#64736F] uppercase tracking-wider">
              Security Level
            </span>
            <div className="w-8 h-8 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
              <Lock className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-black text-[#142A27] mt-2">
            Level 4
          </div>
          <span className="text-[11px] text-[#64736F]">SSR Tokens + HTTP Cookies</span>
        </div>
      </div>

      {/* Search and Table */}
      <div className="bg-white border border-[#DFEDE5] rounded-3xl overflow-hidden shadow-2xs">
        <div className="p-4 border-b border-[#DFEDE5] flex flex-col sm:flex-row items-center justify-between gap-3 bg-[#FAFCF9]">
          <div className="relative w-full sm:w-80">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#64736F]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter by name, email, or role..."
              className="w-full pl-10 pr-4 py-2 rounded-xl bg-white border border-[#DFEDE5] text-xs text-[#142A27] placeholder:text-[#A0AEA7] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
            />
          </div>

          <span className="text-xs text-[#64736F]">
            Showing <b>{filteredUsers.length}</b> of <b>{users.length}</b> staff accounts
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#DFEDE5] bg-[#FAFCF9] text-[11px] font-bold text-[#64736F] uppercase tracking-wider">
                <th className="py-3 px-4">Staff Member</th>
                <th className="py-3 px-4">Role</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Last Sign In</th>
                <th className="py-3 px-4">Created Date</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#DFEDE5] text-xs">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#64736F]">
                    <div className="flex flex-col items-center gap-2">
                      <RefreshCw className="w-5 h-5 text-[#008F53] animate-spin" />
                      <span>Loading authorized administrators...</span>
                    </div>
                  </td>
                </tr>
              ) : filteredUsers.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-[#64736F]">
                    No staff accounts match your search filter.
                  </td>
                </tr>
              ) : (
                filteredUsers.map((user) => {
                  const isSelf = user.id === currentUserId;
                  const roleStyle = ROLE_BADGE_STYLES[user.role] || "bg-neutral-100 text-neutral-700";

                  return (
                    <tr key={user.id} className="hover:bg-[#FAFCF9] transition-colors">
                      {/* Name & Email */}
                      <td className="py-3.5 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-[#E9FFF2] text-[#008F53] flex items-center justify-center font-bold text-xs shrink-0">
                            {user.fullName ? user.fullName[0].toUpperCase() : user.email[0].toUpperCase()}
                          </div>
                          <div>
                            <div className="font-bold text-[#142A27] flex items-center gap-1.5">
                              <span>{user.fullName || "Staff Member"}</span>
                              {isSelf && (
                                <span className="px-1.5 py-0.5 rounded text-[10px] bg-neutral-100 text-neutral-600 font-semibold">
                                  You
                                </span>
                              )}
                            </div>
                            <div className="text-[11px] text-[#64736F] font-mono">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Role Badge */}
                      <td className="py-3.5 px-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border capitalize ${roleStyle}`}>
                          <Shield className="w-3 h-3" />
                          <span>{user.role.replace("_", " ")}</span>
                        </span>
                      </td>

                      {/* Status */}
                      <td className="py-3.5 px-4">
                        <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-700">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                          <span>Active</span>
                        </span>
                      </td>

                      {/* Last Sign In */}
                      <td className="py-3.5 px-4 text-[#64736F] font-mono text-[11px]">
                        {user.lastSignInAt
                          ? new Date(user.lastSignInAt).toLocaleString(undefined, {
                              month: "short",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })
                          : "Never"}
                      </td>

                      {/* Created At */}
                      <td className="py-3.5 px-4 text-[#64736F] text-[11px]">
                        {new Date(user.createdAt).toLocaleDateString(undefined, {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </td>

                      {/* Actions */}
                      <td className="py-3.5 px-4 text-right">
                        <div className="flex items-center justify-end gap-1.5">
                          {isSuperadmin && (
                            <button
                              type="button"
                              onClick={() => handleOpenEdit(user)}
                              className="p-1.5 rounded-lg text-[#64736F] hover:text-[#142A27] hover:bg-neutral-100 transition-colors cursor-pointer"
                              title="Edit user role or password"
                            >
                              <Edit2 className="w-3.5 h-3.5" />
                            </button>
                          )}

                          {isSuperadmin && !isSelf && (
                            <button
                              type="button"
                              onClick={() => handleDelete(user)}
                              className="p-1.5 rounded-lg text-rose-500 hover:text-rose-700 hover:bg-rose-50 transition-colors cursor-pointer"
                              title="Revoke access and delete account"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* CREATE USER MODAL */}
      {isCreateOpen && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#DFEDE5] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFEDE5]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-[#E9FFF2] text-[#008F53] flex items-center justify-center">
                  <UserPlus className="w-4 h-4" />
                </div>
                <h3 className="text-base font-bold text-[#142A27]">
                  Provision New Staff Account
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateOpen(false)}
                className="p-1.5 rounded-lg text-[#64736F] hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleCreateSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <User className="absolute left-3 w-4 h-4 text-[#64736F]" />
                  <input
                    type="text"
                    value={formFullName}
                    onChange={(e) => setFormFullName(e.target.value)}
                    placeholder="e.g. Sarah Jenkins"
                    required
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Staff Email Address
                </label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3 w-4 h-4 text-[#64736F]" />
                  <input
                    type="email"
                    value={formEmail}
                    onChange={(e) => setFormEmail(e.target.value)}
                    placeholder="name@deeplayersolutions.com"
                    required
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Initial Password
                </label>
                <div className="relative flex items-center">
                  <Key className="absolute left-3 w-4 h-4 text-[#64736F]" />
                  <input
                    type="password"
                    value={formPassword}
                    onChange={(e) => setFormPassword(e.target.value)}
                    placeholder="Minimum 8 characters"
                    required
                    minLength={8}
                    className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Access Level &amp; Role
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] bg-white cursor-pointer"
                >
                  <option value="superadmin">{ROLE_LABELS.superadmin}</option>
                  <option value="admin">{ROLE_LABELS.admin}</option>
                  <option value="recruitment_manager">{ROLE_LABELS.recruitment_manager}</option>
                  <option value="content_manager">{ROLE_LABELS.content_manager}</option>
                  <option value="editor">{ROLE_LABELS.editor}</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#DFEDE5]">
                <button
                  type="button"
                  onClick={() => setIsCreateOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#DFEDE5] text-xs font-semibold text-[#64736F] hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {formLoading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* EDIT USER MODAL */}
      {isEditOpen && selectedUser && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-md bg-white rounded-3xl p-6 sm:p-7 shadow-2xl border border-[#DFEDE5] space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#DFEDE5]">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                  <Edit2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-base font-bold text-[#142A27]">
                    Edit Account Privileges
                  </h3>
                  <p className="text-[11px] text-[#64736F]">{selectedUser.email}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsEditOpen(false)}
                className="p-1.5 rounded-lg text-[#64736F] hover:bg-neutral-100 cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {formError && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <form onSubmit={handleEditSubmit} className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formFullName}
                  onChange={(e) => setFormFullName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Access Level &amp; Role
                </label>
                <select
                  value={formRole}
                  onChange={(e) => setFormRole(e.target.value as AdminRole)}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53] bg-white cursor-pointer"
                >
                  <option value="superadmin">{ROLE_LABELS.superadmin}</option>
                  <option value="admin">{ROLE_LABELS.admin}</option>
                  <option value="recruitment_manager">{ROLE_LABELS.recruitment_manager}</option>
                  <option value="content_manager">{ROLE_LABELS.content_manager}</option>
                  <option value="editor">{ROLE_LABELS.editor}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#142A27] mb-1">
                  Change Password (Optional)
                </label>
                <input
                  type="password"
                  value={formPassword}
                  onChange={(e) => setFormPassword(e.target.value)}
                  placeholder="Leave blank to keep current password"
                  minLength={8}
                  className="w-full px-3 py-2 rounded-xl border border-[#DFEDE5] text-xs text-[#142A27] focus:outline-none focus:ring-2 focus:ring-[#008F53]"
                />
                <span className="text-[10px] text-[#64736F] mt-1 block">
                  Only fill this if you want to reset the user&apos;s password.
                </span>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-[#DFEDE5]">
                <button
                  type="button"
                  onClick={() => setIsEditOpen(false)}
                  className="px-4 py-2 rounded-xl border border-[#DFEDE5] text-xs font-semibold text-[#64736F] hover:bg-neutral-50 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={formLoading}
                  className="px-4 py-2 rounded-xl bg-[#008F53] hover:bg-[#007443] text-white text-xs font-semibold transition-all shadow-xs disabled:opacity-50 cursor-pointer"
                >
                  {formLoading ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
