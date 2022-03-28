<template>
        <div class="my-4 mt-10 space-y-4">
            <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
                <div>
                <AppFormLabel>Data da transação</AppFormLabel>
                <AppFormInput v-model="transaction.date" type="date" />
                </div>

                <div>
                <AppFormLabel>Valor</AppFormLabel>
                <AppFormInput v-model="transaction.amount" type="number" />
                </div>

                <div>
                <AppFormLabel>Descrição</AppFormLabel>
                <AppFormInput v-model="transaction.description" />
                </div>

                <div>
                <AppFormLabel>Categoria</AppFormLabel>            
                <AppFormSelect  v-model="transaction.categoryId" :value="transaction.categoryId"  :options="categories" />
                </div>
            </div>

            <div class="space-x-4 flex items-center justify-end">
                <a @click="$emit('cancel')" href="" class="inline-flex text-gray-700 text-sm">
                Cancelar
                </a>

                <AppButton @click="updateTransaction" >
                Editar
                </AppButton>
            </div>
            </div>
</template>
<script>
    import AppButton from '~/components/Ui/AppButton';
    import AppFormInput from '~/components/Ui/AppFormInput';
    import AppFormLabel from '~/components/Ui/AppFormLabel';
    import AppFormSelect from '~/components/Ui/AppFormSelect';
    export default {
        name:'TransactionEdit',
        data(){
            return {
                localTransaction:this.transaction
            }
        },
        components:{
            AppButton,
            AppFormInput,
            AppFormLabel,
            AppFormSelect
        },
        props:{
            transaction:Object,
            categories:Array
        },
        methods:{
            updateTransaction(){
                console.log('The changed transaction',this.localTransaction)
                this.$store.dispatch(
                    'transactions/updateTransaction',
                    {
                        id:this.localTransaction.id,
                        data:this.localTransaction
                    }
                ).then(response => {
                    this.$emit('updateTransaction',{
                        ...response,
                        category:this.categories.find(ctg => ctg.id == this.localTransaction.categoryId)
                    })
                    this.$emit('cancel')
                })
            }
        }
    }
</script>