<template>
    <!-- BEGIN CHECKBOX CONTROLS-->
    <div class="col-md-12">
        <div class="grid simple vertical" :class="color">
            <div class="grid-title no-border">
                <h4><span class="semi-bold">{{ title }}</span></h4>
                <div class="tools">
                    <a href="#disabled" class="collapse"></a>
                </div>
            </div>
            <div class="grid-body no-border">
                <slot></slot>
            </div>
        </div>
    </div>
    <!-- END CHECKBOX CONTROLS-->
</template>
<script>
  export default {
    props: ['title', 'color', 'data']
  }
</script>
