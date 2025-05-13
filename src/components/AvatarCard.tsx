type AvatarCardProps = {
  user: {
    id: number;
    firstName: string;
    lastName: string;
    image: string;
  };
  onEdit: () => void;
};

export default function AvatarCard({ user, onEdit }: AvatarCardProps) {
  return (
    <div className="bg-white rounded-xl shadow p-4 flex flex-col items-center hover:shadow-md transition">
      <img
        src={user.image}
        alt="Avatar"
        className="w-24 h-24 rounded-full mb-4"
      />
      <h3 className="font-semibold text-lg text-center">
        {user.firstName} {user.lastName}
      </h3>
      <button
        onClick={onEdit}
        className="mt-3 bg-gray-200 hover:bg-gray-300 text-sm px-4 py-1 rounded transition"
      >
        Edit
      </button>
    </div>
  );
}
