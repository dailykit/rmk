import React from 'react'
import { Minus, PlusIcon } from '../../../assets/icons'
import Button from '../../Button'

const FAQ = () => {
   const [active, setActive] = React.useState('orders')
   const [view, setView] = React.useState(1)

   React.useEffect(() => {
      setView(1)
   }, [active])

   return (
      <section className="lg:p-32">
         <h1 className="mb-16 text-4xl text-extrabold">
            Frequently Asked Questions
         </h1>
         <div className="flex justify-evenly border-bottom">
            <span
               className={
                  active === 'orders'
                     ? 'text-primary cursor-pointer p-2'
                     : 'cursor-pointer p-2'
               }
               onClick={() => setActive('orders')}
            >
               Orders
            </span>
            <span
               className={
                  active === 'delivery'
                     ? 'text-primary cursor-pointer p-2'
                     : 'cursor-pointer p-2'
               }
               onClick={() => setActive('delivery')}
            >
               Delivery
            </span>
            <span
               className={
                  active === 'subscription'
                     ? 'text-primary cursor-pointer p-2'
                     : 'cursor-pointer p-2'
               }
               onClick={() => setActive('subscription')}
            >
               Subscription
            </span>
            <span
               className={
                  active === 'payment'
                     ? 'text-primary cursor-pointer p-2'
                     : 'cursor-pointer p-2'
               }
               onClick={() => setActive('payment')}
            >
               Payment
            </span>
         </div>
         <div className="p-8">
            <section hidden={active !== 'orders'}>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(1)}
                  >
                     {view === 1 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     How do I place my order?
                  </div>
                  <div hidden={view !== 1} className="pl-6">
                     Simply goto restaurantmealkits.com, create an account, add
                     your card details, save the card details on file and then
                     add your lunch & dinner meal kits into the cart. Choose
                     lunch and dinner recipes from the host of recipes from a
                     single restaurant and make the amount will get deducted
                     from the card that you would have stored on file with us.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(2)}
                  >
                     {view === 2 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     Should I only order from one single restaurant?
                  </div>
                  <div hidden={view !== 2} className="pl-6">
                     Yes, the Meal Kits of lunch and dinner both of which need
                     to be from a single restaurant. You cannot choose lunch
                     from one and dinner from the other.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(3)}
                  >
                     {view === 3 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     Should I choose both lunch and dinner in an order?
                  </div>
                  <div hidden={view !== 3} className="pl-6">
                     Yes, since we are presenting it as a combo, you have to
                     choose both lunch and dinner from a single order.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(4)}
                  >
                     {view === 4 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     How many servings will I get from an order?
                  </div>
                  <div hidden={view !== 4} className="pl-6">
                     You will get 4 servings each from lunch and dinner. When
                     combined, its 8 servings per order.
                  </div>
               </div>
            </section>
            <section hidden={active !== 'delivery'}>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(1)}
                  >
                     {view === 1 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     Do I have to pay delivery charges?
                  </div>
                  <div hidden={view !== 1} className="pl-6">
                     No, the delivery is free.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(2)}
                  >
                     {view === 2 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     How soon will my order be delivered?
                  </div>
                  <div hidden={view !== 2} className="pl-6">
                     Any order received before 4pm on a given day will be
                     delivered the NEXT DAY. Any order received after 4pm on the
                     same day will be delivered the DAY AFTER as the delivery
                     slots for the next day delivery would already be finalised.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(3)}
                  >
                     {view === 3 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     Is there contactless delivery?
                  </div>
                  <div hidden={view !== 3} className="pl-6">
                     Yes, we do have the option of contactless delivery where
                     the person will place the order on a clean surface in front
                     of your home.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(4)}
                  >
                     {view === 4 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     Is my delivery guaranteed?
                  </div>
                  <div hidden={view !== 4} className="pl-6">
                     Yes, we offer guaranteed delivery within the time frames
                     mentioned in the earlier question.
                  </div>
               </div>
            </section>
            <section hidden={active !== 'subscription'}>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(1)}
                  >
                     {view === 1 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     How do I subscribe to restaurantmealkits.com?
                  </div>
                  <div hidden={view !== 1} className="pl-6">
                     Its simple, when you create your profile, you’re credit
                     card details will be stored on file. The amount will get
                     deducted and your order will be placed at 4pm everyday when
                     you place the lunch and dinner recipes in your cart.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(2)}
                  >
                     {view === 2 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     How do I stop my subscription?
                  </div>
                  <div hidden={view !== 2} className="pl-6">
                     There’s no need to stop the subscription. Unless the
                     customer adds a new Meal Kit to the Cart the next day, the
                     amount will not be deducted. The amount will only be
                     deducted when the Lunch and Dinner Meal Kits are added into
                     the Cart.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(3)}
                  >
                     {view === 3 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     How do I start a new subscription?
                  </div>
                  <div hidden={view !== 3} className="pl-6">
                     Once your first order is delivered, you will have to add a
                     new Meal Kit manually into the cart.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(4)}
                  >
                     {view === 4 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     Does Restaurant Meal Kits automatically subscribe me to the
                     same Meal Kit I ordered the previous day for the next day?
                  </div>
                  <div hidden={view !== 4} className="pl-6">
                     No, for the next day, you will have to come to the site and
                     place Meal Kits into the cart.
                  </div>
               </div>
            </section>
            <section hidden={active !== 'payment'}>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(1)}
                  >
                     {view === 1 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     Is my Card Info Safe?
                  </div>
                  <div hidden={view !== 1} className="pl-6">
                     Yes, since we work with Stripe and since they use state of
                     the art encryption and security measures, your Credit Card
                     details will be completely 100% safe.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(2)}
                  >
                     {view === 2 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     Can I pay using Paypal?
                  </div>
                  <div hidden={view !== 2} className="pl-6">
                     No but it will be available in the coming days, when it is,
                     we will notify you.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(3)}
                  >
                     {view === 3 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     How do I remove a card on file?
                  </div>
                  <div hidden={view !== 3} className="pl-6">
                     You just have to go into your profile, click on card and
                     click ‘remove card’.
                  </div>
               </div>
               <div className="mb-8">
                  <div
                     className="font-semibold flex cursor-pointer"
                     onClick={() => setView(4)}
                  >
                     {view === 4 ? (
                        <span className="mr-2">
                           <Minus />
                        </span>
                     ) : (
                        <span className="mr-2">
                           <PlusIcon stroke="#D8355C" />
                        </span>
                     )}
                     Can I add a new card?
                  </div>
                  <div hidden={view !== 4} className="pl-6">
                     Yes, when you create a profile and want to place an order,
                     it is mandatory to have atleast one payment method on file.
                  </div>
               </div>
            </section>
            <div className="mt-16 w-1/4">
               <Button>Show all FAQs</Button>
            </div>
         </div>
         <style>
            {`
                    .border-bottom {
                        border-bottom: 1px solid #f3f3f3;
                    }
                 `}
         </style>
      </section>
   )
}

export default FAQ
