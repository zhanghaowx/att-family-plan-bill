<template>
  <div id="popup" class="full-height scrollbar-macosx">
    <!-- BEGIN CONTENT -->
    <div class="page-container row-fluid">
      <!-- BEGIN PAGE CONTAINER-->
      <div class="page-content no-sidebar no-topbar">
        <bill-summary></bill-summary>
        <monthly-bills></monthly-bills>
      </div>
      <!-- END PAGE CONTAINER -->
    </div>
  </div>
</template>

<style scoped>
.full-height {
  height: 100%;
}
</style>

<script>
export default {
  methods: {
    initPageSize() {
      document.body.style.width = "800px";
      document.body.style.height = "600px";
    },
    initMessager() {
      /* eslint-disable no-undef */
      Messenger.options = { theme: "flat" };
      /* eslint-enable no-undef */
    },
    initScrollbar() {
      $(".scrollbar-macosx").scrollbar();
    },
    initPopover() {
      $('[data-toggle="popover"]').popover({
        html: true,
        trigger: "focus",
        content: function() {
          return $("#" + $(this).attr("data-content-id")).html();
        }
      });
    },
    initInput() {
      $(".inside")
        .children("input")
        .blur(function() {
          $(this)
            .parent()
            .children(".add-on")
            .removeClass("input-focus");
        });

      $(".inside")
        .children("input")
        .focus(function() {
          $(this)
            .parent()
            .children(".add-on")
            .addClass("input-focus");
        });
    }
  },
  mounted() {
    this.initPageSize();
    this.initMessager();
    this.initScrollbar();
    this.initPopover();
    this.initInput();
  }
};
</script>
