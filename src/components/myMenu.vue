<template>
  <div class="layout">
      <Layout>
          <Sider ref="side1" hide-trigger collapsible :collapsed-width="78" v-model="isCollapsed">
              <Menu active-name="1-2" theme="dark" width="auto" :class="menuitemClasses">
                  <MenuItem name="1-1">
                      <Icon type="ios-navigate"></Icon>
                      <span>Option 1</span>
                  </MenuItem>
              </Menu>
          </Sider>
          <Layout>
              <Header class="layout-header-bar">
                  <Icon @click.native="collapsedSider" :class="rotateIcon" :style="{margin: '20px 20px 0',cursor:'pointer'}" type="navicon-round" size="24"></Icon>
                  <Input v-model="value"  
                  @on-enter="search"
                  @on-click="search"
                  placeholder="请输入姓名" icon="ios-search-strong" 
                  :style="{margin: '20px 50px 0',width: '200px', float: 'right'}"></Input>
              </Header>
              <Content class="layout-content" id="content">
                <dataTable :data='data' :loading='loading'></dataTable>
                <Page :total='length' show-total :page-size='pageSize' class="paging" @on-change="handleChange"></Page>
              </Content>
              <Footer class="layout-footer">
                Copyright&nbsp;&copy;&nbsp;cdw - 2017 All rights reserved<br />
                地点:{{addr}}&nbsp;&nbsp;天气:{{txt}}&nbsp;&nbsp;温度:{{temperature}}℃ &nbsp;&nbsp;&nbsp;天气数据由心知天气提供
              </Footer>
          </Layout>
      </Layout>
  </div>
</template>
<script>
import Vue from "vue";
import { Page, Layout, Content, Card, Sider, Col, Input } from "iview";
import dataTable from "./dataTable";
require("../mock/mock");
Vue.component("Page", Page);
Vue.component("Layout", Layout);
Vue.component("Content", Content);
Vue.component("Card", Card);
Vue.component("Sider", Sider);
Vue.component("Col", Col);
Vue.component("Input", Input);
export default {
  name: "myMenu",
  data() {
    return {
      isCollapsed: false,
      data: [],
      historyData: [],
      length: 0,
      pageSize: 6,
      loading: true,
      value: ""
    };
  },
  methods: {
    getData() {
      this.$ajax.get("/user").then(res => {
        this.historyData = res.data.Users;
        this.length = res.data.Users.length;
        this.loading = false;
        if (res.data.Users.length < this.pageSize) {
          this.data = this.historyData;
        } else {
          this.data = res.data.Users.slice(0, this.pageSize);
        }
      });
    },
    handleChange(index) {
      var _start = (index - 1) * this.pageSize;
      var _end = index * this.pageSize;
      this.data = this.historyData.slice(_start, _end);
    },
    collapsedSider() {
      this.$refs.side1.toggleCollapse();
    },
    search() {
      var arr = [];
      for (var i = 0; i < this.historyData.length; i++) {
        if (this.historyData[i].name.indexOf(this.value) > 0) {
          arr.push(this.historyData[i]);
          this.data = arr;
          this.length = arr.length;
          this.pageSize = arr.length;
        }
      }
      if (arr.length > 6) {
        var content = document.getElementById("content");
        content.style.overflowY = "scroll";
        content.style.height = "500px";
      }

      if (this.value == "") {
        this.length = this.historyData.length;
        this.pageSize = 6;
        if (this.historyData.length < this.pageSize) {
          this.data = this.historyData;
        } else {
          this.data = this.historyData.slice(0, this.pageSize);
        }
      }
    },
    getWeather(){
      this.$store.dispatch('getApi');
    }
  },
  created() {
    this.getData();
    this.getWeather();
  },
  computed: {
    rotateIcon() {
      return ["menu-icon", this.isCollapsed ? "rotate-icon" : ""];
    },
    menuitemClasses() {
      return ["menu-item", this.isCollapsed ? "collapsed-menu" : ""];
    },
    addr(){
      return this.$store.state.addr
    },
    txt(){
      return this.$store.state.txt
    },
    temperature(){
      return this.$store.state.temperature
    }
  },
  components: {
    dataTable
  }
};
</script>

<style scoped>
.layout {
  border: 1px solid #d7dde4;
  background: #f5f7f9;
  height: 100vh;
  position: relative;
  border-radius: 4px;
  overflow: hidden;
}
.layout-header-bar {
  background: #fff;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
  padding: 0;
}
.layout-content {
  padding: 60px 20px 40px 20px;
  min-height: 500px;
}
.layout-footer {
  background-color: #fff;
  text-align: center;
}
.ivu-col {
  transition: width 0.2s ease-in-out;
  overflow: hidden;
}
.layout-logo-left {
  width: 90%;
  height: 30px;
  background: #5b6270;
  border-radius: 3px;
  margin: 15px auto;
}
.menu-icon {
  transition: all 0.3s;
}
.rotate-icon {
  transform: rotate(-90deg);
}
.menu-item span {
  display: inline-block;
  overflow: hidden;
  width: 69px;
  text-overflow: ellipsis;
  white-space: nowrap;
  vertical-align: bottom;
  transition: width 0.2s ease 0.2s;
}
.menu-item i {
  transform: translateX(0px);
  transition: font-size 0.2s ease, transform 0.2s ease;
  vertical-align: middle;
  font-size: 16px;
}
.collapsed-menu span {
  width: 0px;
  transition: width 0.2s ease;
}
.collapsed-menu i {
  transform: translateX(5px);
  transition: font-size 0.2s ease 0.2s, transform 0.2s ease 0.2s;
  vertical-align: middle;
  font-size: 22px;
}
.paging {
  text-align: center;
  margin-top: 10px;
}
</style>