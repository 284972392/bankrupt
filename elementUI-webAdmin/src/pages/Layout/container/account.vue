<template>
  <section class="fr">
    
   <el-badge :value="3" class="item" v-if="showBell">
    <img class="bell" src="../../../assets/images/bell.png">
  </el-badge>

    <el-popover class="userName" placement="bottom" width="200" trigger="click">
      <ul>
        <!-- <li>
          <el-button type="text" @click="openDialog">修改密码</el-button>
        </li> -->
        <li>
          <el-button type="text" @click="logout">退出</el-button>
        </li>
      </ul>
      <template slot="reference">
        <span class="mr10 pointer">
          <img class="user-logo" src="../../../../static/img/img.jpg">
          <!-- {{this.$store.getters.userInfo.admin.name}} -->
          admin
          <i class="el-icon-arrow-down pointer"></i>
        </span>
      </template>
    </el-popover>
    <edit-dialog :show.sync="show" @listen="listen" :form="form"></edit-dialog>
    <!-- :show.sync="show" 等于 @update:show=”bol=>show=bol -->
  </section>
</template>

<script>
import { logout,userInfo } from '@/api/account'
import editDialog from './editDialog'
export default {
  name: 'account',
  components: {
    editDialog
  },
  data() {
    return {
      show: false,
      form: {},
      showBell:false
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    openDialog() {
      this.form = {}
      this.show = true
    },
    listen() {
      let res = logout()
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ path: '/login' })
      })
      this.$message({
        type: 'success',
        message: '修改成功'
      })
    },
     async userInfo() {
                let res = await userInfo()           
                if(res.data.user.type == 'media'){
                  this.showBell = true
                }
              },
    async logout() {
//    let res = await logout()
      this.$store.dispatch("logout").then(() => {
        this.$router.push({ path: '/login' })
      })
      this.$message({
        type: 'warning',
        message: '退出成功'
      })
    },
  },
  created() {

  },
  mounted() {
    this.userInfo()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
.user-logo{
        width:40px;
        height:40px;
        border-radius: 50%;
    }
    .bell{
      position: absolute;
      top: -6px;
      left: 10px;
       width:40px;
        height:40px;
        border-radius: 40%;
    }
.item{
  position: relative;
   margin-right: 20px;
   height: 25px;
   width: 40px;
   line-height: 0;
   cursor: pointer;
}

</style>
