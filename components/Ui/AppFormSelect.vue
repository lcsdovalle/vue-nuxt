<template>
  <select
    class="block w-full transition ease-in-out duration-150 text-gray-800 bg-white placeholder-gray-300 border border-gray-300 focus:border-blue-300 focus:ring focus:ring-opacity-50 focus:ring-blue-200 shadow-sm text-sm px-4 py-2 rounded"
    @change="onChange"
  >
    <option v-if="value" value="takenCategory.id">{{takenCategory ? takenCategory.name : 'Selectione'}}</option>
    <option v-else value="">Selecione</option>
    <option
      v-for="option in options"
      :key="option.name"
      :value=option.id
      :selected="value === option.name"
    >
      {{ option.name }}
    </option>
  </select>
</template>

<script>
  export default {
    name: 'AppFormSelect',

    props: {
      value: {
        type: [String, Number, Object, Boolean],
        default: undefined,
      },
      options: {
        type: Array,
        default: () => [],
      },
    },

    data() {
      return {
        localValue: this.value,
      };
    },

    watch: {
      value(value) {
        this.localValue = value;
      },
    },

    methods: {
      onChange($evt) {
        this.$emit('input', $evt.target.value);
      }
    },
    computed:{
      takenCategory(){
        return this.options.find((it) => it.id == this.value)
      }
    }
  };
</script>
