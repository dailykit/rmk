import Portal from './portal'

const Modal = ({ show, children }) => {
   const [isVisible, setIsVisible] = React.useState(show)

   return (
      <Portal selector="#modal">
         {isVisible && (
            <div className="modal absolute z-40 h-screen w-screen bg-modal flex justify-center items-center">
               <div className="relative bg-white w-6/12 h-6/12">
                  {children}
                  <span
                     className="absolute text-white cursor-pointer"
                     id="close"
                     onClick={() => setIsVisible(false)}
                  >
                     close
                  </span>
               </div>
            </div>
         )}
         <style jsx>
            {`
               #close {
                  right: -50px;
               }
            `}
         </style>
      </Portal>
   )
}

export default Modal
