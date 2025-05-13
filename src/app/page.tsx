"use client";

import { useEffect, useState } from "react";
import AvatarCard from "@/components/AvatarCard";
import CreateAvatarModal from "@/components/CreateAvatarModal";

interface User {
  id: number | undefined;
  firstName: string;
  lastName: string;
  image: string;
}

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("https://dummyjson.com/users?limit=3")
      .then((res) => res.json())
      .then((data) => setUsers(data.users))
      .catch(() => setUsers([]));
  }, []);

  const handleCreateUser = (newUser: Omit<User, "id">) => {
    setUsers((prev) => [...prev, { ...newUser, id: Date.now() }]);
    setIsModalOpen(false);
  };

  const handleUpdateUser = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    );
    setIsModalOpen(false);
    setEditUser(null);
  };

  const openEditModal = (user: User) => {
    setEditUser(user);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold mb-4">👋 Welcome back, User!</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {users.map((user) => (
          <AvatarCard
            key={user.id}
            user={{ ...user, id: user.id ?? 0 }}
            onEdit={() => openEditModal(user)}
          />
        ))}
      </div>

      <button
        onClick={() => {
          setEditUser(null);
          setIsModalOpen(true);
        }}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        + Create New Avatar
      </button>

      <CreateAvatarModal
        open={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditUser(null);
        }}
        onCreate={handleCreateUser}
        onEdit={handleUpdateUser}
        editData={editUser ?? undefined}
      />
    </div>
  );
}
