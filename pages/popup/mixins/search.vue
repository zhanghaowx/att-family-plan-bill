<script>
  import { app } from 'src/app/app.js'
  export default {
    data: function () {
      return {
        searchPool: app.searchPool,
        timeout: null // for delayed search
      }
    },
    methods: {
      notifySearchStart (keyword) {
        this.eventHub.$emit('search_start', keyword)
      },
      notifySearchEnd (result) {
        this.eventHub.$emit('search_end', result)
      },
      notifySearchError (error) {
        this.eventHub.$emit('search_error', error)
      },
      search: function (keyword) {
        if (!keyword) return

        this.notifySearchStart(keyword)
        this.searchPool.search(keyword).then(result => {
          this.notifySearchEnd(result)
        }).catch(e => {
          this.notifySearchError(e)
        })
      },
      searchDelayed (keyword, delay = 1000) {
        if (!keyword) {
          this.notifySearchEnd({})
          return
        }

        clearTimeout(this.timeout)
        this.timeout = setTimeout(() => {
          this.search(keyword)
        }, delay)
      }
    }
  }
</script>