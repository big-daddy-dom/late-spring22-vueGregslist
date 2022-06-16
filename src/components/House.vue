<template>
    <div class="col-md-3">
        <div class="bg-white elevation-2 rounded position-relative">
            <img :src="house.imgUrl" class="img-fluid" alt="">
            <div>
                <p class="text-center">
                    {{ house.bedrooms }} |{{ house.bathrooms }} |{{ house.levels }} |{{ house.year }} </p>
                <p>{{ house.description }}</p>
                <b>${{ house.price }}</b>
                <p class="mb-0">
                    <b class="text-info">{{ house.creator?.name }}</b>

                </p>
                <p class="mb-0">{{ formatDate(house.createdAt) }}</p>

            </div>
            <button v-show="house.creatorId == account.id" class="delete-button btn selectable" @click="deleteHouse">
                <i class="mdi mdi-delete-forever"></i>
            </button>
            <Modal v-if="house.creatorId == account.id" :id="'edit-house' + house.id">
                <template #header>Edit {{ house.bedrooms }} {{ house.bathrooms }}</template>
                <template #body>
                    <HouseForm :editHouse="house" />
                </template>
                <template #button>
                    <button type="button" class="btn btn-warning edit-button position-absolute" data-bs-toggle="modal"
                        :data-bs-target="'#edit-house' + house.id">
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
import { housesService } from "../services/HousesService";
export default {
    props: { house: { type: Object, required: true } },
    setup(props) {
        return {
            account: computed(() => AppState.account),
            async deleteHouse() {
                try {
                    // NOTE to access props in setup, the setup has to take props in
                    await housesService.deleteHouse(props.house.id);
                    Pop.toast("House deleted", "success");
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