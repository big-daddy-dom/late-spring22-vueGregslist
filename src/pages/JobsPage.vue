<template>
  <div class="container-fluid">
    <div class="row ">
      <Job v-for="j in jobs" :key="j.id" :job="j" />
    </div>
  </div>
 <Modal id="job-form">
    <template #header> Job stuff</template>
    <template #body>
      <JobForm />
    </template>
    </Modal>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { jobsService } from "../services/JobsService";

export default {
  setup() {
    onMounted(async () => {
      try {
        await jobsService.getAll();
      } catch (error) {
        logger.error(error);
        Pop.error(error.message);
      }
    });
    return {
      jobs: computed(() => AppState.jobs),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>
