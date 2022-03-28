export default {
    getTransactions(){
        return this.$axios.$get('transactions?_expand=category')
    },
    addTransactions(context, data){
        console.log('Saving new transaction',data)
        return this.$axios.$post(
            'transactions',
            data
        )
    },
    updateTransaction({ commit }, {id,data}){
        console.log('Updating a transaction',data)
        return this.$axios.$put(
            `transactions/${id}`,
            data
        )
    }
}