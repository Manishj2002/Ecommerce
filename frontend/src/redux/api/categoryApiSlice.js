import { apiSlice } from "./apiSlice";
import { CATEGORY_URL } from "../features/constants";


export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        createCategory:builder.mutation({
            query:(newCategory)=>({
                url:`${CATEGORY_URL}`,
                method:"POST",
                body:newCategory,
            })
        }),
        updateCategory:builder.mutation({
            query:({categoryId,updateCategory})=>({
                url:`${CATEGORY_URL}/${categoryId}`,
                method:"PUT",
                body:updateCategory,
            })
        }),
        deleteCategory: builder.mutation({
            query: ({ categoryId }) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: "DELETE",
            })
        }),
        fetchCategories:builder.query({
            query:()=>({
                url:`${CATEGORY_URL}/categories`,
            })
        }),
        
    })
})

export const {useCreateCategoryMutation,useDeleteCategoryMutation,useFetchCategoriesQuery,useUpdateCategoryMutation} = categoryApiSlice

