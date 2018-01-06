import Mock from "mockjs";
const LoginUsers = [
    {
        id: 1,
        username: 'admin',
        password: '123456',
        name: 'cdw'
    }
];

const Users = [];

for(let i=0;i<90;i++){
    Users.push(Mock.mock({
        admin: '@name',
        id: Mock.Random.guid(),
        name: Mock.Random.cname(),
        addr: Mock.mock('@county(true)'),
        'age|18-60': 1,
        // birth: Mock.Random.date(),
        // sex: Mock.Random.integer(0, 1),
        // email: Mock.mock('@EMAIL()'),
        // 'moblie|1': /^1[0-9]{10}$/,
        // 'num1|1-100.2': 1,
        // 'num2|100-300.2': 1,
        // 'classroom|1': ['精品语文班','精品作业A班','英语班','语文班'],
        // 'from|1': ['到店咨询','微店','壹家教','学习服务平台'],
        // 'status|1': ['意识强烈','预报名','意向一般','暂无意向'],
        // time: Mock.Random.date('yyyy-MM-dd')
    }));
}

export {LoginUsers, Users};