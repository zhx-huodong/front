<template>
  <div class="activity-setting">
    <setting-item :hide-publish="true"></setting-item>
  </div>
</template>

<script>
  import SettingItem from './settingItem';
  export default {
    components: { SettingItem },
    data() {
      return {};
    }
  };
</script>
