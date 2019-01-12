<script>
  import moment from 'moment'
  export default {
    filters: {
      calendar: function (value) {
        return moment(value).calendar()
      },
      capitalize: function (value) {
        if (!value) return ''
        value = value.toString()
        return value.charAt(0).toUpperCase() + value.slice(1)
      }
    }
  }
</script>
