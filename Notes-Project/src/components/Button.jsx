export default function Button({children, onClick}) {
  return (
    <button
      className="mt-4 text-white py-2 rounded-lg w-full transition-colors bg-[#089da1] hover:bg-[#077b7e]"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
