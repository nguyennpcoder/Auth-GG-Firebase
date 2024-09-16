import { createSlice } from '@reduxjs/toolkit'

export const counterSlice = createSlice(
    {
        name: 'counter',
        // gia tri state ban dau
        initialState: {
            value: 0,
            number: 1,
            name: 'xinchao',
        },
        // reducer con có các hàm tính toán dùng để thay đổi hay update state của reducer đó
        reducers: {
            // ham redercer tăng giá trị satte một đơn vị
            increment: state => {
                state.value += 1
                state.number += 1;
            },

            // ham redercer giam giá trị satte một đơn vị
            decrement: state => {
                state.value -= 1
            },

            //   // ham redercer tăng lên một giá trị state bất kỳ
            incrementByAmount: (state, action) => {
                state.value += action.payload
            },
            updateName: (state) => {
                state.name = "default"
            }

            // hàm lưu vào đâu
            // hàm call api nào đo
        }
    })

// Action creators are generated for each case reducer function
// hành động gọi được export ra để sử dụng

// const  a = {
//     name: 12
// }

// function a2(a){
//     return {
//         action: 'something',
//         state: 'state',
//         reducer: 'adsad'
//     }
// }

// a2(a).action;


export const { increment, decrement, incrementByAmount, updateName } = counterSlice.actions

export default counterSlice.reducer