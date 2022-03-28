export default {
    getCategories(context){
        return this.$axios.$get('categories')
    },
    deleteCategory(context,id){
        console.log(id,'trying to delete this catogory')
        return this.$axios.$delete(`categories/${id}`)
    },
    updateCategory(context,{id, data}){
        return this.$axios.$patch(
                `categories/${id}`,
                data
            )
    },
    addCategory(context,data){
        return this.$axios.$post(
                `categories`,
                data
            )

    }
}