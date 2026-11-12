import type { MenuItem } from '../lib/supabase'

export const fallbackMenu: MenuItem[] = [
  { id:'1', name:'Italian Pizza', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', price:2.90, image_url:'/images/pizza-1.jpg', category:'pizza', featured:true },
  { id:'2', name:'Greek Pizza', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', price:2.90, image_url:'/images/pizza-2.jpg', category:'pizza', featured:true },
  { id:'3', name:'Caucasian Pizza', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', price:2.90, image_url:'/images/pizza-3.jpg', category:'pizza', featured:true },
  { id:'4', name:'American Pizza', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', price:2.90, image_url:'/images/pizza-4.jpg', category:'pizza', featured:true },
  { id:'5', name:'Tomatoe Pie', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', price:2.90, image_url:'/images/pizza-5.jpg', category:'pizza', featured:true },
  { id:'6', name:'Margherita', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia', price:2.90, image_url:'/images/pizza-6.jpg', category:'pizza', featured:true },
  { id:'d1', name:'Lemonade Juice', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', price:2.90, image_url:'/images/drink-1.jpg', category:'drinks' },
  { id:'d2', name:'Pineapple Juice', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', price:2.90, image_url:'/images/drink-2.jpg', category:'drinks' },
  { id:'d3', name:'Soda Drinks', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', price:2.90, image_url:'/images/drink-3.jpg', category:'drinks' },
  { id:'b1', name:'Italian Burger', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', price:2.90, image_url:'/images/burger-1.jpg', category:'burgers' },
  { id:'b2', name:'Cheese Burger', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', price:2.90, image_url:'/images/burger-2.jpg', category:'burgers' },
  { id:'b3', name:'Bacon Burger', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', price:2.90, image_url:'/images/burger-3.jpg', category:'burgers' },
  { id:'p1', name:'Italian Pasta', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', price:2.90, image_url:'/images/pasta-1.jpg', category:'pasta' },
  { id:'p2', name:'Creamy Pasta', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', price:2.90, image_url:'/images/pasta-2.jpg', category:'pasta' },
  { id:'p3', name:'Seafood Pasta', description:'Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.', price:2.90, image_url:'/images/pasta-3.jpg', category:'pasta' },
]

export const siteDefaults = {
  brand: 'Pizza',
  brandSub: 'Delicous',
  phone: '000 (123) 456 7890',
  address: '198 West 21th Street',
  address2: 'Suite 721 New York NY 10016',
  hours: 'Open Monday-Friday',
  hours2: '8:00am - 9:00pm',
}