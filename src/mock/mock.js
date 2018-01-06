import {LoginUsers,Users} from './data/user'
const Mock = require('mockjs')

Mock.mock('/user', { Users })