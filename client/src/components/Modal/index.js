import React from 'react'
import ReactDOM from 'react-dom'

const Modal = ({ show, closeHandler, children }) => {
   const [isVisible, setIsVisible] = React.useState(show)

   React.useEffect(() => {
      setIsVisible(show)
   }, [show])

   return ReactDOM.createPortal(
      <React.Fragment>
         {isVisible && (
            <div className="modal absolute z-40 h-screen w-screen flex justify-center items-center">
               <div className="relative bg-white w-6/12 h-6/12 p-4">
                  {children}
                  <span
                     className="absolute text-white cursor-pointer"
                     id="close"
                     onClick={closeHandler}
                  >
                     close
                  </span>
               </div>
            </div>
         )}
         <style jsx>
            {`
               .modal {
                  background: rgba(0, 0, 0, 0.5);
               }
               #close {
                  top: 0;
                  right: -50px;
               }
            `}
         </style>
      </React.Fragment>,
      document.getElementById('root')
   )
}

export default Modal
