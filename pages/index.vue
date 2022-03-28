<template>
  <div>
    <div class="flex items-center justify-between">
      <h1 class="font-bold text-2xl">
        Transações
      </h1>

      <AppButton @click="isAdding = !isAdding">
        Nova transação
      </AppButton>
    </div>

    <AddTransactionForm 
      v-if="isAdding" 
      @cancel="isAdding=false" 
      :categories="categories" 
      @after-add-transaction="afterTransaction"  
    />

    <TransactionFilters  
      @filter="onFilter" 
      :categories="categories" 
    />

    <div class="mt-4">
      <div class="space-y-8">
        <div
        v-for="(group, index) in groupedTransactions" :key="index"
        >
          <div class="mb-1">
            <div class="font-bold text-sm">
              {{ formateDate(index) }}
            </div>
          </div>

          <Transaction  
            v-for="(transaction, index) in group" 
            :key="index"  
            :transaction="transaction" 
            :categories="categories" 
            @updateTransaction="updateTransaction"
          />
        </div>

        
      </div>
    </div>
  </div>
</template>

<script>

import AddTransactionForm from '~/components/Transactions/AddTransaction'
import TransactionFilters from '~/components/Transactions/TransactionFilters'
import Transaction from '~/components/Transactions/Transaction'
import AppButton from '~/components/Ui/AppButton';
import AppFormInput from '~/components/Ui/AppFormInput';
import AppFormLabel from '~/components/Ui/AppFormLabel';
import AppFormSelect from '~/components/Ui/AppFormSelect';
import { groupBy, orderBy } from 'lodash'

export default {
  name: 'IndexPage',
  components: {
    TransactionFilters,
    Transaction,
    AddTransactionForm,
    AppButton,
    AppFormInput,
    AppFormLabel,
    AppFormSelect
  },

  data() {
    return {
      isAdding:false
    }
  },

  computed:{
    groupedTransactions(){
      return groupBy(orderBy(this.transactions,'date','desc'),'date')
    },
  },
  methods:{
    formateDate(date){
      return this.$dayjs(date).format('DD/MM/YYYY')
    },
    afterTransaction(transaction){
      console.log('After Transaction added',transaction)
      this.transactions.push(transaction)
    },
    updateTransaction(transaction){
        const index = this.transactions.findIndex(tr => tr.id === transaction.id)
        this.transactions.splice(index,1,transaction)
    },
    
    onFilter(filters){
      console.log(filters)
      if(filters.description){
        this.transactions = this.transactions.filter((tr) => tr.description.includes(filters.description))
      }
      if(filters.categoryId){
        this.transactions = this.transactions.filter((tr) => tr.categoryId == filters.categoryId)        
      }
    }    
  },  
  mounted(){
    console.log('mounted')
  },
  async asyncData({ store }) {
      return{
        transactions: await store.dispatch(
          'transactions/getTransactions'
        ),
        categories: await store.dispatch(
          'categories/getCategories' 
          )
      }
  },
}
</script>
