<template>
  <Table border :columns="columns" :data="data"></Table>
</template>

<script>
import Vue from 'vue';
import { Table } from "iview";
Vue.component('Table', Table);
export default {
        data () {
            return {
                columns: [
                    {
                        title: 'Admin',
                        key: 'admin',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: 'Id',
                        key: 'id'
                    },
                    {
                        title: 'Name',
                        key: 'name',
                    },
                    {
                        title: 'Address',
                        key: 'addr'
                    },
                    {
                        title: 'Age',
                        key: 'age'
                    },
                    {
                        title: 'Action',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, 'Delete')
                            ]);
                        }
                    }
                ],  
            }
        },
        props: ["data"],
        methods: {
            remove(index){
                delete this.data[index];
                console.log(index++)
            }
        }
    }
</script>
<style>

</style>
