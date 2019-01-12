<template>
<!-- BEGIN TOP NAVIGATION BAR -->
<div class="header navbar navbar-inverse">
    <div class="navbar-inner">
        <div class="header-quick-nav">
            <!-- BEGIN TOP NAVIGATION MENU -->
            <div class="pull-left">
                <ul class="nav quick-section">
                    <li class="quicklinks m-r-10">
                        <a href="#" @click="searchDelayed(query, 0)">
                            <i class="fa fa-spin material-icons" :class="refreshStyle">refresh</i>
                        </a>
                    </li>
                    <li class="quicklinks">
                        <span class="h-seperate"></span>
                    </li>
                    <li class="m-r-10 input-prepend inside search-form no-boarder">
                        <span class="add-on"><i class="material-icons">search</i></span>
                        <input type="text" class="no-boarder" style="width:250px;" placeholder="Search ..." v-model="query" autofocus>
                    </li>
                </ul>
            </div>
            <div class="pull-right">
                <ul class="nav quick-section">
                    <li class="quicklinks">
                        <a :href="optionsUrl" class="pull-right" target="_blank">
                            <i class="material-icons">settings</i>
                        </a>
                    </li>
                </ul>
            </div>
            <!-- END TOP NAVIGATION MENU -->
        </div>
        <!-- END TOP NAVIGATION MENU -->
    </div>
</div>
<!-- END TOP NAVIGATION BAR -->
</template>

<style scoped>
    .fa.fa-spin.fa-spin-pause {
        animation-play-state: paused
    }
</style>

<script>
import Search from '../../mixins/search.vue'
import { app } from 'src/app/app.js'
export default {
  data: function () {
    return {
      searchPool: app.searchPool,
      config: app.configuration.data,
      query: '',
      querying: false,
      timeout: null
    }
  },
  mixins: [Search],
  computed: {
    refreshStyle: function () {
      return this.querying ? '' : 'fa-spin-pause'
    },
    optionsUrl: function () {
      return chrome.extension.getURL('pages/options.html')
    }
  },
  watch: {
    query: function (val) {
      if (this.querying) return // prevent double query if search is triggered programmatically
      this.searchDelayed(val, this.config.searchSettings.limits.maxSearchDelayMs)
    }
  },
  methods: {
    saveQuery (keyword) {
      if (!keyword) return

      // only saves the recent 10 queries
      const searchSettings = this.config.searchSettings
      searchSettings.recentQueries.unshift(0)
      searchSettings.recentQueries = searchSettings.recentQueries.filter(key => key !== keyword)
      searchSettings.recentQueries[0] = keyword
      searchSettings.recentQueries = searchSettings.recentQueries.slice(0, 10)

      app.configuration.save()
    },
    onSearchStart (keyword) {
      // when search is triggered programmatically, update UI
      if (this.query !== keyword) {
        this.query = keyword
      }
      this.querying = true
    },
    onSearchEnd () {
      this.saveQuery(this.query)
      this.querying = false
    }
  },
  mounted () {
    this.eventHub.$on('search_start', this.onSearchStart)
    this.eventHub.$on('search_end', this.onSearchEnd)
  }
}
</script>
