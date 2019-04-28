<script>
import { mapGetters } from 'vuex'
import login from '@/pages/login'
export default {
  name: 'App',
  components: { login },

  computed: {
    ...mapGetters(['isLogin']),
  },
  mounted() {
 
  },
  render(h) {

	// return h('router-view')
    if (this.isLogin) {
    	if (sessionStorage.getItem("userInfo") == null) {
     	 return h(login)
    	}else{
      	return h('router-view')    		
    	}

      
    } else {
      return h(login)
    }
  },
}
</script>

<style>
#app {
  width: 100%;
  height: 100%;
}
</style>
