import { createSlice } from "@reduxjs/toolkit";

const compareSlice = createSlice({
    name: 'compare',
    initialState: {
        comparedProducts: []
    },
    reducers: {
        addForComparison: (state,action)=>{

            let copyComparedProducts =[...state.comparedProducts];
            copyComparedProducts.push(action.payload);
            state.comparedProducts = copyComparedProducts;

            localStorage.setItem(
                'zu_compare',
                JSON.stringify(state.comparedProducts)
            )
        },

        deleteFromComparison: (state,action)=>{

            let copyComparedProducts =[...state.comparedProducts];

            if(Number.isInteger(action.payload)){
                copyComparedProducts.splice(action.payload,1);
            }else{
                copyComparedProducts.splice(1,1);
            }




            state.comparedProducts = copyComparedProducts;

            localStorage.setItem(
                'zu_compare',
                JSON.stringify(state.comparedProducts)
            )
        },

        restoreComparedProducts: (state,action)=>{
            state.comparedProducts = action.payload;
        }
    }
})



export const {addForComparison, deleteFromComparison,restoreComparedProducts} = compareSlice.actions;
export default compareSlice.reducer;