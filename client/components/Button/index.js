const Button = ({ children }) => {
   return (
      <button className="text-white bg-blue w-full p-2">
         {children.toUpperCase()}
      </button>
   )
}

export default Button
