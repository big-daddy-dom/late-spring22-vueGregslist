import { reactive } from 'vue'

// NOTE AppState is a reactive object to contain app level data
export const AppState = reactive({
  user: {},
  account: {},
  cars: [
    // NOTE fake data until you get data
    {make: 'honda', model: 'car', year: 2022, price: 50000, img: 'https://di-uploads-pod14.dealerinspire.com/hondaeastcincy/uploads/2020/12/21-accord-hybrid.jpg', color: '#fff', description: "it's a car yo, buy it.  I could really use the money to buy gas."},
    {make: 'honda', model: 'car', year: 2022, price: 50000, img: 'https://di-uploads-pod14.dealerinspire.com/hondaeastcincy/uploads/2020/12/21-accord-hybrid.jpg', color: '#fff', description: "it's a car yo, buy it.  I could really use the money to buy gas."},
    {make: 'honda', model: 'car', year: 2022, price: 50000, img: 'https://di-uploads-pod14.dealerinspire.com/hondaeastcincy/uploads/2020/12/21-accord-hybrid.jpg', color: '#fff', description: "it's a car yo, buy it.  I could really use the money to buy gas."}
  ],
  houses: [],
  jobs: [],

})
