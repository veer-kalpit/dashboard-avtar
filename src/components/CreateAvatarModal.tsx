"use client";

import { useState, useEffect } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (user: {
    firstName: string;
    lastName: string;
    image: string;
  }) => void;
  onEdit?: (user: {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
  }) => void;
  editData?: {
    id?: number; // Allowing the `id` to be undefined
    firstName: string;
    lastName: string;
    image: string;
  };
};

export default function CreateAvatarModal({
  open,
  onClose,
  onCreate,
  onEdit,
  editData,
}: ModalProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {
    if (editData) {
      setFirstName(editData.firstName);
      setLastName(editData.lastName);
      setImage(editData.image);
    } else {
      setFirstName("");
      setLastName("");
      setImage("");
    }
  }, [editData, open]);

  if (!open) return null;

  const handleSubmit = () => {
    if (!firstName || !lastName) return;

    const fullName = `${firstName}-${lastName}`.replace(/\s+/g, "-");
    const finalImage =
      image.trim() ||
      `https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(
        fullName
      )}`;

    const userData = {
      firstName,
      lastName,
      image: finalImage,
      ...(editData?.id && { id: editData.id }),
    };

    if (editData && onEdit) {
      onEdit(userData as { id: number; firstName: string; lastName: string; image: string }); // edit mode
    } else {
      onCreate(userData); // create mode
    }

    // Reset
    setFirstName("");
    setLastName("");
    setImage("");
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-full max-w-md rounded-xl p-6 shadow-xl relative">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          {editData ? "Edit Avatar" : "Create New Avatar"}
        </h2>
        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Avatar URL (optional)
            </label>
            <input
              type="url"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              className="w-full mt-1 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Leave blank for random avatar"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
            onClick={handleSubmit}
          >
            {editData ? "Update" : "Create"}
          </button>
        </form>
      </div>
    </div>
  );
}
