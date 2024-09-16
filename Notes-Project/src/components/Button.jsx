export default function Button({children,onClick}){
    return(
        <button 
          className="mt-4 text-white py-2 rounded-lg hover:bg-opacity-90 transition-colors w-full"
          style={{ backgroundColor: '#089da1' }} onClick={onClick}>
          {children}
        </button>
    );
}