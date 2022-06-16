<template>
    <div class="col-md-3">
        <div class="bg-white elevation-2 rounded position-relative">
            <img :src="job.imgUrl" class="img-fluid" alt="">
            <div>
                <p class="text-center">
                    {{ job.company }} |{{ job.jobTitle }} |{{ job.rate }} </p>
                <p>{{ job.description }}</p>
                <b>${{ job.hours }}</b>
                <p class="mb-0">
                    <b class="text-info">{{ job.creator?.name }}</b>

                </p>
                <p class="mb-0">{{ formatDate(job.createdAt) }}</p>

            </div>
            <button v-show="job.creatorId == account.id" class="delete-button btn selectable" @click="deleteJob">
                <i class="mdi mdi-delete-forever"></i>
            </button>
            <Modal v-if="job.creatorId == account.id" :id="'edit-job' + job.id">
                <template #header>Edit {{ job.company }} {{ job.jobTitle }}</template>
                <template #body>
                    <JobForm :editJob="job" />
                </template>
                <template #button>
                    <button type="button" class="btn btn-warning edit-button position-absolute" data-bs-toggle="modal"
                        :data-bs-target="'#edit-job' + job.id">
                        <i class="mdi mdi-pencil"></i>

                    </button>
                </template>
            </Modal>

        </div>


    </div>


</template>




<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted } from "vue";
import Pop from "../utils/Pop";
import { logger } from "../utils/Logger";
import { jobsService } from "../services/JobsService";
export default {
    props: { job: { type: Object, required: true } },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            async deleteJob() {
                try {
                    // NOTE to access props in setup, the setup has to take props in
                    await jobsService.deleteJob(props.job.id);
                    Pop.toast("job deleted", "success");
                } catch (error) {
                    logger.error(error);
                    Pop.error(error.message);
                }
            },
            formatDate(rawDate) {
                return new Date(rawDate).toLocaleDateString();
            },
        };
    },
};
</script>

<style lang="scss" scoped>
.delete-button {
    position: absolute;
    top: 0.25em;
    right: 0.25em;
    width: 40px;
    height: 40px;
    border-radius: 50em;
    background: var(--bs-danger);
    color: var(--bs-light);
    border: 0;
}

.edit-button {
    position: absolute;
    top: 0.25em;
    left: 0.25em;
    width: 40px;
    height: 40px;
    border-radius: 50em;
    background: var(--bs-warning);
    color: var(--bs-dark);
    border: 0;
}
</style>