<template>
  <v-container>
        <v-row><v-col>ToDo Application</v-col></v-row>
    <v-row><v-col>
  
      <v-text-field outlined dense v-model="newTodo" hide-details/>
      </v-col>
      <v-col>
      <v-btn outlined @click="addTodoList">add todo</v-btn>
      </v-col>
      </v-row>
    <v-row>
  <v-col class="home">
    <table>
      <tbody>
        <tr v-for="(todom,i) in listTodos" :key="i">
          <td class="d-flex">
            <v-checkbox :input-value="todom.completed" hide-details @change="changeChekbox(todom.id)"/>
           <span class="d-flex" style="align-items: end;" > {{todom.content}}</span></td>
        </tr>
      </tbody>
    </table>
  </v-col>
  </v-row>
  </v-container>
</template>

<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import TodoList from '../assets/TodoList.json';
import Web3 from "web3";
@Component({
  components: {},
})
export default class Home extends Vue {
    listTodos: any[]=[];
    web3inst: any;
    contract: any;
    mainAccount = {}
  newTodo=""
  mounted() {

        this.web3inst = new Web3("HTTP://127.0.0.1:8545");
        console.log(this.web3inst)
        this.web3inst.eth.getAccounts().then((x: any) => {
            this.mainAccount = x[0]
            console.log( this.mainAccount)
            this.contract = new this.web3inst.eth.Contract(TodoList["abi"], "0x22EDc0d3B502B162e4D6B264b89036DA4Dee9F86");
          console.log(this.contract)
  this.reloadData();       }
        );       
                }
  reloadData(){
        this.contract.methods.taskCount().call().then((countTask: number) => {
this.listTodos=[];
for (let i = 1; i <= countTask; i++) {
                    this.contract.methods.tasks(i).call().then((x: any)=>this.listTodos.push(x));
                }
            })
       
  }
addTodoList(){

this.contract.methods.createTask(this.newTodo).send({from:this.mainAccount}).then((x: any)=>{console.log(x); this.reloadData();});
    }
    changeChekbox(id: number){
this.contract.methods.toggleCompleted(id).send({from:this.mainAccount}).then((x: any)=>{console.log(x); this.reloadData();});
    }
}
</script>
