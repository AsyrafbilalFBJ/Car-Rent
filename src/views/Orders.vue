<template lang="">
    <div class="m-5">
        <p class="font-bold text-center mb-5">Orders</p>
        <button class="btn btn-success mb-5" v-on:click="openCreateModal">Create Order</button>
        <div class="overflow-x-auto">
            <table class="table border-2">
                <!-- head -->
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Car ID</th>
                        <th>Order Data</th>
                        <th>Pickup Date</th>
                        <th>Dropoff Date</th>
                        <th>Pickup Location</th>
                        <th>Dropoff Location</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                <!-- row 1 -->
                <tr v-for="order in orders" :key="order.id">
                    <td class="">{{ order.id }}</td>
                    <td class="">{{ order.car_id }}</td>
                    <td class="">{{ order.order_date }}</td>
                    <td class="">{{ order.pickup_date }}</td>
                    <td class="">{{ order.dropoff_date }}</td>
                    <td class="">{{ order.pickup_location }}</td>
                    <td class="">{{ order.dropoff_location }}</td>
                    <td class="">
                        <button class="btn btn-info mr-2" v-on:click="openUpdateModal">Edit</button>
                        <button class="btn btn-error" v-on:click="openDeleteModal">Delete</button>

                        <div v-if="isModalUpdateOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                            <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
                                <h2 class="text-xl font-bold mb-4 text-center">Edit Order</h2>
                                <div class="w-full">
                                    <div class="flex flex-col mb-3">
                                        <label>Car</label>
                                        <select class="select select-bordered w-full" v-model="selectedCar">
                                            <option :value=order.car_id selected>{{order.car_id}}</option>
                                            <option v-for="car in cars" :key="car.id" :value=car.id>{{car.name}}</option>
                                        </select>
                                    </div>
                                    <div class="mb-3">
                                        <label>Order Date</label>
                                        <input type="date" class="input input-bordered w-full" :value="order.order_date"
                                        @input="event => order.order_date = event.target.value"/>
                                    </div>
                                    <div class="mb-3">
                                        <label>Pickup Date</label>
                                        <input type="date" class="input input-bordered w-full" :value="order.pickup_date"
                                        @input="event => order.pickup_date = event.target.value"/>
                                    </div>
                                    <div class="mb-3">
                                        <label>Dropoff Date</label>
                                        <input type="date" class="input input-bordered w-full" :value="order.dropoff_date"
                                        @input="event => order.dropoff_date = event.target.value"/>
                                    </div>
                                    <div class="mb-3">
                                        <label>Pickup Location</label>
                                        <input type="text" placeholder="Type here" class="input input-bordered w-full" :value="order.pickup_location"
                                        @input="event => order.pickup_location = event.target.value"/>
                                    </div>
                                    <div class="mb-3">
                                        <label>Dropoff Location</label>
                                        <input type="text" placeholder="Type here" class="input input-bordered w-full" :value="order.dropoff_location"
                                        @input="event => order.dropoff_location = event.target.value"/>
                                    </div>
                                </div>
                                
                                <button class="btn btn-info mr-2" v-on:click="updateOrder(order.id)">Submit</button>
                                <button class="btn" v-on:click="closeUpdateModal">Cancel</button>
                            </div>
                        </div>
                        
                        <div v-if="isModalDeleteOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                            <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
                                <h2 class="text-xl font-bold mb-4">Are you sure?</h2>
                                <button class="btn btn-error mr-2" v-on:click="deleteOrder(order.id)">Yes</button>
                                <button class="btn" v-on:click="closeDeleteModal">No</button>
                            </div>
                        </div>
                    </td>
    
                    
                </tr>
                </tbody>
            </table>
        </div>
    </div>
    <div v-if="isModalCreateOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
            <h2 class="text-xl font-bold mb-4 text-center">Create Order</h2>
            <div class="w-full">
                <div class="flex flex-col mb-3">
                    <label>Car</label>
                    <select class="select select-bordered w-full" v-model="selectedCar">
                        <option v-for="car in cars" :key="car.id" :value=car.id>{{car.name}}</option>
                    </select>
                </div>
                <div class="mb-3">
                    <label>Order Date</label>
                    <input type="date" class="input input-bordered w-full" v-model="orderDate"/>
                </div>
                <div class="mb-3">
                    <label>Pickup Date</label>
                    <input type="date" class="input input-bordered w-full" v-model="pickupDate"/>
                </div>
                <div class="mb-3">
                    <label>Dropoff Date</label>
                    <input type="date" class="input input-bordered w-full" v-model="dropoffDate"/>
                </div>
                <div class="mb-3">
                    <label>Pickup Location</label>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full" v-model="pickup"/>
                </div>
                <div class="mb-3">
                    <label>Dropoff Location</label>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full" v-model="dropoff"/>
                </div>
            </div>
            
            <button class="btn btn-info mr-2" v-on:click="createOrder">Submit</button>
            <button class="btn" v-on:click="closeCreateModal">Cancel</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';
import { ref } from 'vue'
export default {
    name: 'Orders',
    data() {
        return {
            isModalCreateOpen: false,
            isModalDeleteOpen: false,
            isModalUpdateOpen: false,
            orders: [], // Menyimpan data yang diambil
            cars: [], // Menyimpan data yang diambil
            pickup: "",
            dropoff: "",
            orderDate: "",
            pickupDate: "",
            dropoffDate: "",
            selectedCar: ref(''),
            order: {
                car_id: 0,
                order_date: "",
                pickup_date: "",
                dropoff_date: "",
                pickup_location: "", // Nilai awal
                dropoff_location: "", // Nilai awal
            },
        };
    }, 
    methods: {
        async getOrders(){
            try {
                const response = await axios.get('https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders'); // Ganti URL ini dengan URL API Anda
                this.orders = response.data;
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        },
        async getCars(){
            try {
                const response = await axios.get('https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars'); // Ganti URL ini dengan URL API Anda
                this.cars = response.data;
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        },
        openDeleteModal() {
            this.isModalDeleteOpen = true;
        },
        closeDeleteModal() {
            this.isModalDeleteOpen = false;
        },
        async deleteOrder(id){
            try {
                const response = await axios.delete(`https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders/${id}`); // Ganti URL ini dengan URL API Anda
                this.orders = response.data;
                this.closeDeleteModal();
                location.reload(); 
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        },
        openCreateModal() {
            this.isModalCreateOpen = true;
        },
        closeCreateModal() {
            this.isModalCreateOpen = false;
        },
        async createOrder(){
            try {
                const response = await axios.post('https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders', {
                    car_id: this.selectedCar,
                    order_date: this.orderDate,
                    pickup_date: this.pickupDate,
                    dropoff_date: this.dropoffDate,
                    pickup_location: this.pickup,
                    dropoff_location: this.dropoff
                });
                this.orders = response.data;
                this.closeCreateModal();
                location.reload(); 
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        },
        openUpdateModal() {
            this.isModalUpdateOpen = true;
        },
        closeUpdateModal() {
            this.isModalUpdateOpen = false;
        },
        async updateOrder(id){
            // console.log(id);
            try {
                const response = await axios.put(`https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/orders/${id}`, {
                    car_id: this.order.car_id,
                    order_date: this.order.order_date,
                    pickup_date: this.order.pickup_date,
                    dropoff_date: this.order.dropoff_date,
                    pickup_location: this.order.pickup_location,
                    dropoff_location: this.order.dropoff_location
                });
                // this.order = response.data;
                console.log(response.data);
                this.closeUpdateModal();
                // location.reload(); 
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
    },
    mounted() {
        this.getOrders(); // Ambil data saat komponen dirender
        this.getCars();
    },
}
</script>
<style lang="">
    
</style>