export const initialState = {
   lunch: [],
   lunchDefault: {},
   lunchCustomizableProductId: null,
   lunchComboProductComponentId: null,
   lunchCustomizableProductOptionId: null,

   dinner: [],
   dinnerDefault: {},
   dinnerCustomizableProductId: null,
   dinnerComboProductComponentId: null,
   dinnerCustomizableProductOptionId: null,
}

export const reducers = (state, { type, payload }) => {
   switch (type) {
      case 'SET_LUNCH':
         return {
            ...state,
            lunch: payload.lunch || [],
            lunchDefault: payload.lunchDefault || {},
            lunchCustomizableProductId: payload.lunchCustomizableProductId,
            lunchComboProductComponentId: payload.lunchComboProductComponentId,
            lunchCustomizableProductOptionId:
               payload.lunchCustomizableProductOptionId,
         }
      case 'SET_LUNCH_DEFAULT':
         return {
            ...state,
            lunchDefault: payload,
         }
      case 'SET_DINNER':
         return {
            ...state,
            dinner: payload.dinner || [],
            dinnerDefault: payload.dinnerDefault || {},
            dinnerCustomizableProductId: payload.dinnerCustomizableProductId,
            dinnerComboProductComponentId:
               payload.dinnerComboProductComponentId,
            dinnerCustomizableProductOptionId:
               payload.dinnerCustomizableProductOptionId,
         }
      case 'SET_DINNER_DEFAULT':
         return {
            ...state,
            dinnerDefault: payload,
         }
      default:
         return state
   }
}
