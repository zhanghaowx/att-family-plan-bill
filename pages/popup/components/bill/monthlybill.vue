<template>
    <div class="content" style="height: 100%">
        <!-- BEGIN PAGE TITLE -->
        <div class="page-title"></div>
        <!-- END PAGE TITLE -->

        <div class="grid-body no-border">
            <div class="row">
                <div class="col-md-6">
                    <h3>Recent <span class="semi-bold">Bill</span></h3>
                    <p>{{result.month}} - {{result.totalCharge}}</p>
                    <br>
                    <div v-for="user in result.users">
                        <div class="row-fluid">
                            <span>{{user}}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
    .content .row > div {
        min-height: 0;
    }
</style>

<script>
  import Search from '../../mixins/search.vue'
  import Indicator from '../../mixins/indicator.vue'
  import { app } from 'src/app/app.js'
  export default {
    data: function () {
      return {
        result: {}
      }
    },
    mixins: [Search, Indicator],
    methods: {
      readBill () {
        chrome.tabs.executeScript({
          file: 'js/inject.js'
        }, (results) => {
          this.result = results[0]
        })
      }
    },
    mounted () {
      this.readBill()
    }
  }
</script>