<template>
    <div>
        <div class="my-4 space-y-4 border-2 border-indigo-200 border-dashed bg-indigo-50 p-5 rounded-xl">
        <div class="grid sm:grid-cols-2 md:grid-cols-4 gap-5">
            <div>
            <AppFormLabel>Data da transação</AppFormLabel>
            <AppFormInput v-model="form.date" type="date" />
            </div>

            <div>
            <AppFormLabel>Valor</AppFormLabel>
            <AppFormInput  v-model="form.amount" type="number" />
            </div>

            <div>
            <AppFormLabel>Descrição</AppFormLabel>
            <AppFormInput  v-model="form.description" />
            </div>

            <div>
            <AppFormLabel>Categoria</AppFormLabel>
            <AppFormSelect  v-model="form.categoryId" :options="categories" />
            </div>
        </div>

        <div class="space-x-4 flex items-center justify-end">
            <a @click="$emit('cancel')" href="" class="inline-flex text-gray-700 text-sm">
            Cancelar
            </a>

            <AppButton
                @click="addTransaction"
            >
            Adicionar
            </AppButton>
        </div>
        </div>   
    </div>
</template>


<script>
    import AppButton from '~/components/Ui/AppButton';
    import AppFormInput from '~/components/Ui/AppFormInput';
    import AppFormLabel from '~/components/Ui/AppFormLabel';
    import AppFormSelect from '~/components/Ui/AppFormSelect';

    export default {
        name:'AddTransactionForm',  
        data(){
            return{
                form:{
                    date:'',
                    amount:0,
                    description:'',
                    categoryId:'',
                }
            }
        },
        props:{
            categories:{
                type:Array,
                default:[{ name: 'Licença de softwares', id: 1 }]
            }
        },
        components:{
            AppButton,
            AppFormInput,
            AppFormLabel,
            AppFormSelect
        },
        mounted(){
            console.log(this.categories)
        },
        methods:{
            addTransaction(){
                console.log('saving form',this.form)
                this.$store.dispatch('transactions/addTransactions', this.form).then(response => this.$emit('after-add-transaction',{...response, category:this.categories.find((item) => item.id == this.form.categoryId)}))
            }
        }           
    }
</script>