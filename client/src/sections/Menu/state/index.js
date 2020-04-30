export const initialState = {
   lunch: [],
   lunchDefault: {},
   lunchCustomizableProductId: null,
   lunchComboProductComponentId: null,

   dinner: [],
   dinnerDefault: {},
   dinnerCustomizableProductId: null,
   dinnerComboProductComponentId: null,
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
