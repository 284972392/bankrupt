export default {
  components: {},
  data() {
    return {
      queryParams: {},
      PAGINATION: {
        pageSize: 20,
        currentPage: 1,
        total: 0
      },
    }
  },
  computed: {},
  methods: {
    getIndex(index) {
      var rowIndex =
        this.PAGINATION.pageSize * (this.PAGINATION.currentPage - 1) +
        index +
        1;
      return rowIndex < 10 ? `0${rowIndex}` : rowIndex
    },
    getDay(day){
      var today = new Date();
      var targetday_milliseconds=today.getTime() + 1000*60*60*24*day;
      today.setTime(targetday_milliseconds); //注意，这行是关键代码
      var tYear = today.getFullYear();
      var tMonth = today.getMonth();
      var tDate = today.getDate();
      tMonth = doHandleMonth(tMonth + 1);
      tDate = doHandleMonth(tDate);
      return tYear+"-"+tMonth+"-"+tDate;
    },
    check() {
  
      this.PAGINATION = {
        ...this.PAGINATION,
        currentPage: 1
      }
      this.queryParams = this.getParams()
      this.useMethod()
    },
    handleSizeChange(pageSize) {
      this.PAGINATION = {
        ...this.PAGINATION,
        pageSize
      }
      this.queryParams = {
        ...this.queryParams,
        // start: (this.PAGINATION.currentPage - 1) * this.PAGINATION.pageSize,
        limit: this.PAGINATION.pageSize
      }
      this.useMethod()
    },
    handleCurrentChange(currentPage) {
      this.PAGINATION = {
        ...this.PAGINATION,
        currentPage
      }
      this.queryParams = {
        ...this.queryParams,
        // start: (this.PAGINATION.currentPage - 1) * this.PAGINATION.pageSize
        page:this.PAGINATION.currentPage
      }
      this.useMethod()
    },
    changeTime(param){
      var d = new Date(param);
      function changeLenth(i){     
          if(i < 10){
              i = '0'+ i
          }
          return i;
      }
     var times=d.getFullYear() + '-' + (changeLenth(d.getMonth() + 1)) + '-' + changeLenth(d.getDate());
      return times;
    },
    useMethod() {
     
      switch (this.method) {
        case 'getUserlist'://用户列表
          this.getUserlist()
          break
        case 'getAdverlist'://广告列表
          this.getAdverlist()
          break
        case 'getAdverDatalist'://广告数据列表
          this.getAdverDatalist()
          break 
         case 'qualificationList'://广告列表
          this.qualificationList()
          break 
          case 'financeRecordRecord'://财务记录
          this.financeRecordRecord()
          break 
        case 'getRechargeRecordList'://充值列表
          this.getRechargeRecordList()
          break
        case 'getMediaList'://媒体列表
          this.getMediaList()
          break
        case 'getAdvertisePositionList'://广告位列表
          this.getAdvertisePositionList()
          break
      
      }
    },
    back() {
      this.$router.back()
    },
    beforeAvatarUpload(file) {
      const isLt2M = file.size / 1024 < 500
      const isJPG = file.type === 'image/jpeg' || file.type === 'image/png'
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 500kb!');
      }
      if (!isJPG) {
        this.$message.error('上传图片暂支持 JPG/JPEG/PNG 格式!');
      }
      return isJPG && isLt2M;
    },
    beforeFileUpload(file) {
      const isJPG = file.type === 'application/pdf' || file.type === 'application/msword' || file.type === 'application/wps-writer' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      const isLt2M = file.size / 1024 / 1024 < 10

      if (!isJPG) {
        this.$message.error('上传文件暂支持.doc .pdf .docx 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传文件大小不能超过 10mb!')
      }
      return isJPG && isLt2M;
    },
  }
}

function doHandleMonth(month){
  var m = month;
  if(month.toString().length == 1){
   m = "0" + month;
  }
  return m;
}


