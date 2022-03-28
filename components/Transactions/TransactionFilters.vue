<template>
    <div>
        <div class="mt-6 pb-6 flex items-center space-x-4 border-b border-gray-300">
        <div>
            <AppFormLabel>Categoria</AppFormLabel>            
            <AppFormSelect v-model="form.categoryId" :options="categories" />
        </div>

        <div>
            <AppFormLabel>Descrição</AppFormLabel>
            <AppFormInput v-model="form.description" />
        </div>
        </div>
    </div>
</template>

<script>    
    import { debounce } from 'lodash'
    import AppFormSelect from '~/components/Ui/AppFormSelect.vue'
    import AppFormLabel from '~/components/Ui/AppFormLabel.vue'
    import AppFormInput from '~/components/Ui/AppFormInput.vue'
    export default {
        name:'TransactionFilters',
        data(){
            return{
                form:{
                    categoryId:'',
                    description:''
                }
            }
        },
        components:{
            AppFormLabel,
            AppFormSelect,
            AppFormInput
        },
        props:{
            categories:Array
        },
        watch:{
            form:{
                deep:true,
                handler(){
                   this.onFilterDebounce()
                   }
            }
        },
        methods:{
            onFilterDebounce:debounce(function(){this.$emit('filter',this.form)      },2000)
        }
    }
</script>

<style>

</style>