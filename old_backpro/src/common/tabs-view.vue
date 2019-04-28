<template>
  <div class="tabs-container">
    <router-link class="tags-view-item" :class="isActive(tag) ? 'active' : '' " v-for="(tag, index) in visitedTabsView" :to="tag.path" :key="index">
                         <Tag
                            style="margin-right:20px;"
                            type="dot"
                             @on-close.prevent.stop="handleClose(tag)"
                            :closable="tag.name==='首页'?false:true"
                             :color="tag.path==currentpage?'blue':'default'"
                            >
                        {{ tag.name }}</Tag>
    </router-link>
  </div>
</template>

<script>
  import { mapActions, mapGetters } from 'vuex'
  export default {
    data() {
      return {
        currentpage:''
      }
    },
    created() {
      this.addTabsView()
    },
    computed: {
      ...mapGetters([
        'visitedTabsView'
      ])
    },
    methods: {
      ...mapActions([
        'addVisitedTabsView',
        'delVisitedTabsView'
      ]),
      addTabsView() {
        const route = this.generateRoute()
        if (!route) {
          return false
        }
        this.addVisitedTabsView(this.generateRoute())
      },
      generateRoute() {
        if (this.$route.name) {
          return this.$route
        }
        return false
      },
      isActive(route) {
        return route.path === this.$route.path || route.name === this.$route.name
      },
      handleClose(tag) {
        this.delVisitedTabsView(tag).then((tags) => {
          if (this.isActive(tag)) {
            const lastTag = tags.slice(-1)[0]
            if (lastTag) {
              this.$router.push(lastTag.path)
            } else {
              this.$router.push('/')
            }
          }
        })
      }
    },
    watch: {
      $route() {
        this.currentpage = this.$route.path
        this.addTabsView()
      }
    },
    beforeMount() {
        this.currentpage = this.$route.path
    },
  }
</script>

<style scoped lang="scss">
  .tabs-container {
    height: 40px;
    padding: 5px;

    .tags-view-item {
      .el-tag {
        margin: 0 3px;
        &:first-child {
          margin-left: 0;
        }
      }
      &.active {
        .el-tag {
          background-color: #00b4aa;
          color: #fff;
          /deep/ .el-icon-close {
            color: #fff;
          }
          &::before {
            content: '';
            background: #fff;
            display: inline-block;
            width: 8px;
            height: 8px;
            border-radius: 50%;
            position: relative;
            margin-right: 2px;
          }
        }
      }
    }
  }
</style>