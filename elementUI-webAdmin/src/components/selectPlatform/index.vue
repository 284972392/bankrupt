<template>
  <!-- ham -->
 <el-dialog title="选择系统平台" :visible="show" @close='close'>
  <el-select v-model="value" placeholder="请选择">
    <el-option
      v-for="item in options"
      :key="item.value"
      :label="item.label"
      :value="item.value">
    </el-option>
  </el-select>
   <div slot="footer" class="dialog-footer">
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="confirm">确 定</el-button>
    </div>
  </el-dialog>
</template>

<script>
  export default {
       props: {
         show: {
            type: Boolean,
            default: false
          },
       },
    data() {
      return {
        options: [{
          value: '0',
          label: 'Android'
        }, {
          value: '1',
          label: 'IOS'
        }, {
          value: '2',
          label: 'H5'
        }, {
          value: '3',
          label: '公众号'
        }, {
          value: '4',
          label: '小程序'
        }],
        value: '0'
      }
    },
    methods:{
      confirm(){
       this.$store.state.selectPlatform = this.value
       this.$emit("close")
       this.$router.push('/media/addNewMedia')
      },
      close(){
        this.$emit("close")
      }
    }
  }
</script>