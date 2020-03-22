import { Layout } from '../../sections'
import { ProfileLayout, Modal } from '../../components'

const Addresses = () => {
   const [isModalVisible, setIsModalVisible] = React.useState(false)

   return (
      <Layout>
         <ProfileLayout>
            <h4 className="text-gray-700 font-semibold mb-8">
               Delivery Addresses
            </h4>
            <div className="flex justify-between items-center text-md mb-4">
               <h3 className="text-lg">Saved Addresses</h3>
               <span
                  className="text-blue-500 cursor-pointer"
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
                        <span className="text-white bg-blue-500 border border-blue p-1">
                           Default
                        </span>
                        <span className="text-blue-500 ml-8 cursor-pointer">
                           Edit
                        </span>
                        <span className="text-red-500 ml-8 cursor-pointer">
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
                        <span className="text-blue-500 cursor-pointer border-blue">
                           Make Default
                        </span>
                        <span className="text-blue-500 ml-8 cursor-pointer">
                           Edit
                        </span>
                        <span className="text-red-500 ml-8 cursor-pointer">
                           Remove
                        </span>
                     </div>
                  </div>
               </div>
            </div>
         </ProfileLayout>
         <Modal show={isModalVisible}>Hello</Modal>
      </Layout>
   )
}

export default Addresses
