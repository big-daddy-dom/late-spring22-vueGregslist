import {AppState} from '../AppState.js'
import {logger} from '../utils/logger.js'
import {api } from "./AxiosService.js"




class HousesService{
    async getAll(){
        const res = await api.get('api/houses')
        logger.log('housesget',res.data)
        AppState.houses = res.data
    }

    async createHouse(houseData){
        const res = await api.post('api/houses',houseData)
        logger.log('housecreate',res.data)
        AppState.houses.push(res.data)
    }
    async editHouse(houseData){
        const res = await api.put('api/houses/'+houseData.id, houseData)
        logger.log('houseedit',res.data)

}
    async deleteHouse(id){
        const res = await api.delete('api/houses/'+id)
        logger.log('housedelete',res.data)
        AppState.houses = AppState.houses.filter(h => h.id !== id)
}


}

export const housesService = new HousesService();