import React from 'react'
import { toast } from 'react-toastify'

import { Layout } from '../../sections'
import { ProfileLayout, Modal, Input, Button } from '../../components'

const Addresses = () => {
   const [isModalVisible, setIsModalVisible] = React.useState(false)
   const [address, setAddress] = React.useState({
      line1: '',
      line2: '',
      zip: '',
      city: '',
   })

   const submit = e => {
      e.preventDefault()
      console.log(address)
      toast.success('Address saved!')
      setIsModalVisible(false)
      setAddress({
         line1: '',
         line2: '',
         zip: '',
         city: '',
      })
   }

   return (
      <Layout>
         <ProfileLayout>
            <h4 className="text-gray-700 font-semibold mb-8">
               Delivery Addresses
            </h4>
            <div className="flex justify-between items-center text-md mb-4">
               <h3 className="text-lg">Saved Addresses</h3>
               <span
                  className="text-primary cursor-pointer"
                  onClick={() => setIsModalVisible(true)}
               >
                  Add Address
               </span>
            </div>
            <div className="flex flex-row">
               <div className="bg-gray-300 flex-col flex-1  p-8 mr-16">
                  <div className="text-md font-semibold h-8 flex items-center">
                     <span className="mr-16">1st Main road</span>
                  </div>
                  <div className="text-md font-semibold h-8 flex items-center">
                     <span className="mr-16">1st Block</span>
                  </div>
                  <div className="text-md font-semibold h-8 flex items-center">
                     <span className="mr-16">340056</span>
                     <span className="mr-16">Bangalore</span>
                  </div>
                  <div className="text-md font-semibold h-8 flex items-center mt-4">
                     <div>
                        <span className="text-white bg-primary border border-blue p-1">
                           Default
                        </span>
                        <span className="text-gray-500 ml-8 cursor-pointer">
                           Edit
                        </span>
                        <span className="text-gray-500 ml-8 cursor-pointer hover:text-red-500">
                           Remove
                        </span>
                     </div>
                  </div>
               </div>
               <div className="bg-gray-300 flex-col flex-1 p-8">
                  <div className="text-md font-semibold h-8 flex items-center">
                     <span className="mr-16">1st Main road</span>
                  </div>
                  <div className="text-md font-semibold h-8 flex items-center">
                     <span className="mr-16">1st Block</span>
                  </div>
                  <div className="text-md font-semibold h-8 flex items-center">
                     <span className="mr-16">340056</span>
                     <span className="mr-16">Bangalore</span>
                  </div>
                  <div className="text-md font-semibold h-8 flex items-center mt-4">
                     <div>
                        <span className="text-primary cursor-pointer border-blue">
                           Make Default
                        </span>
                        <span className="text-gray-500 ml-8 cursor-pointer">
                           Edit
                        </span>
                        <span className="text-gray-500 ml-8 cursor-pointer hover:text-red-500">
                           Remove
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </ProfileLayout>
         <Modal
            show={isModalVisible}
            closeHandler={() => setIsModalVisible(false)}
         >
            <form onSubmit={submit}>
               <div className="mb-4">
                  <Input
                     type="text"
                     placeholder="address line 1"
                     name="line1"
                     value={address.line1}
                     onChange={e =>
                        setAddress({
                           ...address,
                           [e.target.name]: e.target.value,
                        })
                     }
                     required
                     validate={true}
                  />
                  <Input
                     type="text"
                     placeholder="address line 2"
                     name="line2"
                     value={address.line2}
                     onChange={e =>
                        setAddress({
                           ...address,
                           [e.target.name]: e.target.value,
                        })
                     }
                  />
                  <div className="flex">
                     <div className="w-6/12 mr-4">
                        <Input
                           type="text"
                           placeholder="zip code"
                           name="zip"
                           value={address.zip}
                           onChange={e =>
                              setAddress({
                                 ...address,
                                 [e.target.name]: e.target.value,
                              })
                           }
                           pattern="(\d{5}([\-]\d{4})?)"
                           title="Format: nnnnn or nnnnn-nnnn"
                           required
                           validate={true}
                        />
                     </div>
                     <div className="w-full">
                        <Input
                           type="text"
                           placeholder="city"
                           name="city"
                           value={address.city}
                           onChange={e =>
                              setAddress({
                                 ...address,
                                 [e.target.name]: e.target.value,
                              })
                           }
                           required
                           validate={true}
                        />
                     </div>
                  </div>
               </div>
               <Button>Save Address</Button>
            </form>
         </Modal>
      </Layout>
   )
}

export default Addresses
