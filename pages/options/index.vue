<!-- Extension's Options Page -->

<template>
<div id="options" style="width: 100%; height: 100%;">
  <!-- BEGIN CONTENT -->
  <div class="page-container row-fluid">
      <!-- BEGIN PAGE CONTAINER-->
      <div class="page-content no-sidebar no-topbar">
          <div class="content">
              <div class="row">
                  <general-settings :generalSettings="config.generalSettings"></general-settings>
              </div>
          </div>
      </div>
      <!-- END PAGE CONTAINER -->
  </div>
</div>
</template>

<script>
  import { app } from 'src/app/app.js'
  export default {
    data: function () {
      return {
        config: app.configuration.data
      }
    },
    watch: {
      config: {
        handler () {
          app.configuration.save()
        },
        deep: true
      }
    },
    methods: {
      initGridController () {
        $('.grid .tools .collapse, .grid .tools .expand').on('click', function () {
          const el = $(this).parents('.grid').children('.grid-body')
          if ($(this).hasClass('collapse')) {
            $(this).removeClass('collapse').addClass('expand')
            el.slideUp(200)
          } else {
            $(this).removeClass('expand').addClass('collapse')
            el.slideDown(200)
          }
        })
      }
    },
    mounted () {
      this.initGridController()
    }
  }
</script>
