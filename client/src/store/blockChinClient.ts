import { VuexModule, Module, Mutation, Action } from "vuex-class-modules";
import TodoList from '../assets/TodoList.json';
import Web3 from "web3";
import store from "./index"
@Module
export class BcClient extends VuexModule {
    web3inst: Web3;
    contract: any;
    mainAccount = {}
    _conected=false;
    info = {
        isConnected: false,
        networkId: 0,
        coinbase: null,
        mainAccount: null,
        balance: 0,
        addressUrl: null
    };
    constructor(op:any) {

        super(op);
        this.web3inst = new Web3("HTTP://127.0.0.1:8545");
        this.web3inst.eth.getAccounts().then(x => {
            this.mainAccount = x[0]
            this.contract = new this.web3inst.eth.Contract(TodoList["abi"], "0xb389Ac07Ecc5f04172E562A5A81A4A5B20b19f4C");
            this._conected=true;
            /*    for (let i = 0; i <= 5; i++) {
            
            a.methods.createTask("Task "+i).send({from:this.mainAccount}).then(console.log)//.createTask("new Task").call().then(console.log);
            }*/
          /*  this.contract.methods.taskCount().call().then((countTask: number) => {
                for (let i = 0; i <= countTask; i++) {
                    this.contract.methods.tasks(i).call().then(console.log);
                }
            })*/
         }
        );       
    }
// public get getMethods(){
  //     return this.contract.methods;
   //}*/
get conected(){
    return this._conected;
}
}
export default   new BcClient({ store, name: "user" });