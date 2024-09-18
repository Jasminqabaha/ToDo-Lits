export default function DeleteButton({children,onClick}){
  return(
      <button 
        className="mt-4 text-white bg-red-700 py-2 rounded-lg hover:bg-opacity-90 transition-colors w-full"
        onClick={onClick}>
        {children}
      </button>
  );
}