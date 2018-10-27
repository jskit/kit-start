<template>
  <div v-if="!item.hidden&&item.children" class="menu-wrapper">

    <router-link
      v-if="hasOneShowingChild(item.children) && !onlyOneChild.children&&!item.alwaysShow"
      :to="resolvePath(onlyOneChild.path)"
      :key="onlyOneChild.name">
      <el-menu-item
        :class="{'submenu-title-noDropdown':!isNest}"
        :index="resolvePath(onlyOneChild.path)">
        <icon-svg v-if="onlyOneChild.meta&&onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.icon"></icon-svg>
        <span v-if="onlyOneChild.meta&&onlyOneChild.meta.title" slot="title">{{generateTitle(onlyOneChild.meta.title)}}</span>
      </el-menu-item>
    </router-link>

    <el-submenu v-else :index="item.name||item.path" :key="item.name">
      <template slot="title">
        <icon-svg v-if="item.meta&&item.meta.icon" :icon-class="item.meta.icon"></icon-svg>
        <span v-if="item.meta&&item.meta.title" slot="title">{{generateTitle(item.meta.title)}}</span>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          class="nest-menu"
          v-if="child.children&&child.children.length>0"
          :is-nest="true"
          :item="child"
          :base-path="resolvePath(child.path)"
          :key="child.path">
        </sidebar-item>

        <router-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <icon-svg v-if="child.meta&&child.meta.icon" :icon-class="child.meta.icon"></icon-svg>
            <span v-if="child.meta&&child.meta.title" slot="title">{{generateTitle(child.meta.title)}}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>

  </div>
</template>

<script>
import path from 'path';
import { generateTitle } from '@/utils/i18n';

export default {
  name: 'SidebarItem',
  props: {
    // route配置json
    item: {
      type: Object,
      required: true,
    },
    isNest: {
      type: Boolean,
      default: false,
    },
    basePath: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      onlyOneChild: null,
    };
  },
  methods: {
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false;
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item;
          return true;
        }
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths);
      // return path.resolve('', ...paths)
    },
    // hasOneShowingChildren(children) {
    //   const showingChildren = children.filter((item) => {
    //     return !item.hidden
    //   })
    //   if (showingChildren.length === 1) {
    //     return true
    //   }
    //   return false
    // },
    generateTitle,
  },
};
</script>
