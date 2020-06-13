import React from 'react'

import { Header } from '../../sections'
import { ProfileLayout } from '../../components'

import { fetcher } from '../../utils'
import { useAuth } from '../../context/auth'

const Orders = () => {
   const { user } = useAuth()
   const [orders, setOrders] = React.useState([])
   const [status, setStatus] = React.useState('LOADING')
   React.useEffect(() => {
      ;(async () => {
         const { success, data } = await fetcher(
            `${process.env.REACT_APP_RMK_URI}/users/${user.id}/orders`
         )
         if (success && data) {
            setStatus('SUCCESS')
            setOrders(data)
         } else {
            setStatus('NO_DATA')
         }
      })()
   }, [])
   return (
      <div>
         <Header />
         <ProfileLayout>
            <h1 className="flex items-center text-2xl text-gray-700">Orders</h1>
            <div className="mt-4">
               {status === 'LOADING' && (
                  <span className="text-gray-500 text-sm">Loading orders!</span>
               )}
               {status === 'NO_DATA' && (
                  <span className="text-gray-500 text-sm">
                     Looks like you haven't placed any orders
                  </span>
               )}
               {status === 'SUCCESS' && (
                  <ul className="space-y-2">
                     {orders.map(order => (
                        <li
                           key={order._id}
                           className="border rounded-lg h-auto p-4"
                        >
                           <section className="mb-3 flex flex-1 text-gray-800">
                              <h4 className="uppercase text-sm text-gray-600 tracking-wider font-medium">
                                 Date:
                              </h4>
                              <p className="text-sm font-medium">
                                 {order.date}
                              </p>
                           </section>
                           <section className="mb-3 flex flex-1 text-gray-800">
                              <h4 className="uppercase text-sm text-gray-600 tracking-wider font-medium">
                                 Status:
                              </h4>
                              <p className="text-sm font-medium">
                                 {order.details.status}
                              </p>
                           </section>
                           <section className="flex flex-1 text-gray-800">
                              <h4 className="uppercase text-sm text-gray-600 tracking-wider font-medium">
                                 Payment Status:
                              </h4>
                              <p className="text-sm font-medium">
                                 {order.details.payment.status}
                              </p>
                           </section>
                        </li>
                     ))}
                  </ul>
               )}
            </div>
         </ProfileLayout>
      </div>
   )
}

export default Orders
