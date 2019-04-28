
//let base = '/api' //天成本地
//    let base = "http://testwelfare.xiafukeji.com"
let base = "http://welfare.xiafukeji.com"
//    let base = 'http://192.168.2.192:8033' //天成本地
// let base = 'http://192.168.2.190:8034' //李斌本地


const allUrlThree = {
    getAfterTaskList : base +'/task/getAfterTaskList',//公众号列表
    addTask: base + '/task/addTask',//添加公众号
    findTaskById: base + '/task/findTaskById',//查询单个公众号
    updateTask: base + '/task/updateTask',//修改公众号
    updateTaskStatus: base + '/task/updateTaskStatus',//修改公众号状态
    getAfterTaskRecordList:base+'/taskRecord/getAfterTaskRecordList',//获取任务列表
    getEasyMakeRecordPage:base + '/easyMakeRecord/getEasyMakeRecordPage',//获取简单赚记录列表
    getEasyMakePage: base + '/easyMake/getEasyMakePage',//获取简单赚任务列表
    updateEasyMakeStatus: base + '/easyMakeRecord/updateEasyMakeStatus',//改变状态
    easyMakeupdateEasyMakeStatus: base + '/easyMake/updateEasyMakeStatus',//修改简单赚任务状态
    addEasyMake:base + '/easyMake/addEasyMake',//添加简单赚任务
    updateEasyMake: base + '/easyMake/updateEasyMake',//修改简单赚任务
    uploadPic:base + '/uploadPic/uploadPic',//上传图片
}

export { allUrlThree }