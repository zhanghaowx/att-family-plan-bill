<script>
export default {
  data: function () {
    return {
      indicatorConfig: {
        css: {
          border: 'none',
          padding: '2px',
          backgroundColor: 'none'
        },
        overlayCSS: {
          backgroundColor: '#fff',
          opacity: 0.25,
          cursor: 'wait'
        }
      }
    }
  },
  methods: {
    blockUI (el) {
      $(el).block({
        message: '<div class="fa fa-spin fa-circle-o-notch"></div>',
        css: this.indicatorConfig.css,
        overlayCSS: this.indicatorConfig.overlayCSS
      })
    },
    unblockUI (el) {
      $(el).unblock()
    }
  }
}
</script>
