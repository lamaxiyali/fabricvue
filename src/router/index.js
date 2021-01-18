import Vue from 'vue'
import Router from 'vue-router'
import AppIndex from '../components/home/AppIndex'
import Login from '../views/Login/Login'
import Header from '../components/test/Header'
import Register from '../views/Login/Register'
import Repass from '../views/Login/Repass'
import Repass2 from '../views/Login/Repass2'
import Repass3 from '../views/Login/Repass3'
import ManageHome from '../components/ManageHome'
import TaskIndex from '../views/task/TaskIndex'
import Echart from '../components/test/Echart'
import Task from '../views/task/Task'
import AddTask from '../views/task/task/AddTask'
import SeeTask from '../views/task/task/SeeTask'
import AnalyseTask from '../views/task/task/AnalyseTask'
import BlockchainIndex from '../views/blockchain/BlockchainIndex'
import Ledger from '../views/blockchain/blockchain/Ledger'
import Channel from '../views/blockchain/blockchain/Channel'
import Chaincode from '../views/blockchain/blockchain/Chaincode'
import UserInfo from '../views/User/UserInfo'
import PersonInfo from '../views/User/usercomponet/PersonInfo'
import PersonMessage from '../views/User/usercomponet/PersonMessage'
import SystemMessage from '../views/User/usercomponet/SystemMessage'
import PersonAllMessage from '../views/User/usercomponet/PersonAllMessage'
import UserOnBlockchain from '../views/blockchain/blockchain/UserOnBlockchain'
Vue.use(Router)
export default new Router({
  mode: 'history',
  routes: [
    {
      path: '',
      redirect: 'login'
    },
    {
      path: '/header',
      name: 'Header',
      component: Header,
      children: [
        {
          path: '/login',
          name: 'Login',
          component: Login
        },
        {
          path: '/register',
          name: 'Register',
          component: Register
        },
        {
          path: '/repass',
          name: 'Repass',
          component: Repass
        },
        {
          path: '/repass2',
          name: 'Repass2',
          component: Repass2
        },
        {
          path: '/repass3',
          name: 'Repass3',
          component: Repass3
        }
      ]
    },
    {
      path: '/manage',
      name: 'ManageHome',
      component: ManageHome,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'AppIndex',
          component: AppIndex,
          meta: {
            requireAuth: true
          }
        },
        {
          path: '/user',
          name: 'UserInfo',
          component: UserInfo,
          redirect: '/user/personinfo',
          children: [
            {path: 'personinfo', name: 'PersonInfo', component: PersonInfo},
            {path: 'personmessage', name: 'PersonMessage', component: PersonMessage},
            {path: 'systemmessage', name: 'SystemMessage', component: SystemMessage},
            {path: 'personallmessage', name: 'PersonAllMessage', component: PersonAllMessage}
          ]
        },
        {
          path: '/task',
          name: 'TaskIndex',
          component: TaskIndex,
          redirect: '/task/alltask',
          children: [
            {path: 'alltask', name: 'AllTask', component: Task, meta: {name: '全部任务'}},
            {path: 'addtask', name: 'AddTask', component: AddTask, meta: {name: '添加任务'}},
            {path: 'seetask', name: 'SeeTask', component: SeeTask, meta: {name: '查看任务'}},
            {path: 'analysetask', name: 'AnalyseTask', component: AnalyseTask, meta: {name: '任务分析'}}
          ]
        },
        {
          path: '/blockchain',
          name: 'BlockchainIndex',
          component: BlockchainIndex,
          redirect: '/blockchain/ledger',
          children: [
            {path: 'ledger', name: 'Ledger', component: Ledger, meta: {name: '账本信息'}},
            {path: 'channel', name: 'Channel', component: Channel, meta: {name: '通道信息'}},
            {path: 'chaincode', name: 'Chaincode', component: Chaincode, meta: {name: '链码信息'}},
            {path: 'useronchain', name: 'UserOnchain', component: UserOnBlockchain, meta: {name: '链上用户'}}
          ]
        },
        {
          path: '/echart',
          name: 'Echart',
          component: Echart
        }
      ]
    }
  ]
})
