import React from 'react'
import ReactDOM from 'react-dom'

const Portal = ({ selector, children }) => {
   const ref = React.useRef()
   const [mounted, setMounted] = React.useState(false)

   React.useEffect(() => {
      ref.current = document.querySelector(selector)
      setMounted(true)
   }, [selector])

   return mounted ? ReactDOM.createPortal(children, ref.current) : null
}

export default Portal
