<template lang="">
  <div class="m-5">
      <p class="font-bold text-center mb-5">Cars</p>
      <button class="btn btn-success mb-5" v-on:click="openCreateModal">Add Car</button>
      <div class="overflow-x-auto">
          <table class="table border-2">
              <!-- head -->
              <thead>
                  <tr>
                      <th>Car ID</th>
                      <th>Name</th>
                      <th>Image</th>
                      <th>Month Rate</th>
                      <th>Day Rate</th>
                      <th>Action</th>
                  </tr>
              </thead>
              <tbody>
              <!-- row 1 -->
              <tr v-for="car in cars" :key="car.id" class="hover">
                  <td class="">{{ car.id }}</td>
                  <td class="">{{ car.name }}</td>
                  <td class="">
                    <div class="avatar">
                      <div class="w-20 rounded">
                        <img class="" v-bind:src="car.image" alt="">
                      </div>
                    </div>
                  </td>
                  <td class="">{{ car.month_rate }}</td>
                  <td class="">{{ car.day_rate }}</td>
                  <td class="">
                      <button class="btn btn-info mr-2" v-on:click="openUpdateModal">Edit</button>
                      <button class="btn btn-error" v-on:click="openDeleteModal">Delete</button>

                      <div v-if="isModalUpdateOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                        <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
                            <h2 class="text-xl font-bold mb-4 text-center">Edit Car</h2>
                            <div class="w-full">
                                <div class="mb-3">
                                    <label>Name</label>
                                    <input type="text" placeholder="Type here" class="input input-bordered w-full" v-model="name"/>
                                </div>
                                <div class="mb-3">
                                    <label>Image</label>
                                    <input type="text" placeholder="Type here" class="input input-bordered w-full" v-model="image"/>
                                </div>
                                <div class="mb-3">
                                    <label>Month Rate</label>
                                    <input type="number" placeholder="Type here" class="input input-bordered w-full" v-model="mr"/>
                                </div>
                                <div class="mb-3">
                                    <label>Day Rate</label>
                                    <input type="number" placeholder="Type here" class="input input-bordered w-full" v-model="dr"/>
                                </div>
                            </div>
                            
                            <button class="btn btn-info mr-2" v-on:click="updateCar(car.id)">Submit</button>
                            <button class="btn" v-on:click="closeUpdateModal">Cancel</button>
                        </div>
                    </div>

                      <div v-if="isModalDeleteOpen" class="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50">
                          <div class="bg-white p-6 rounded-lg shadow-lg w-1/3">
                              <h2 class="text-xl font-bold mb-4">Are you sure?</h2>
                              <button class="btn btn-error mr-2" v-on:click="deleteCar(car.id)">Yes</button>
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
                <div class="mb-3">
                    <label>Name</label>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full" v-model="name"/>
                </div>
                <div class="mb-3">
                    <label>Image</label>
                    <input type="text" placeholder="Type here" class="input input-bordered w-full" v-model="image"/>
                </div>
                <div class="mb-3">
                    <label>Month Rate</label>
                    <input type="number" placeholder="Type here" class="input input-bordered w-full" v-model="mr"/>
                </div>
                <div class="mb-3">
                    <label>Day Rate</label>
                    <input type="number" placeholder="Type here" class="input input-bordered w-full" v-model="dr"/>
                </div>
            </div>
            
            <button class="btn btn-info mr-2" v-on:click="createCar">Submit</button>
            <button class="btn" v-on:click="closeCreateModal">Cancel</button>
        </div>
    </div>
</template>
<script>
import axios from 'axios';

export default {
  name: 'Orders',
  data() {
      return {
        isModalCreateOpen: false,
        isModalDeleteOpen: false,
        isModalUpdateOpen: false,
          cars: [], // Menyimpan data yang diambil
          name: "",
          image: "",
          mr: "",
          dr: ""
      };
  }, 
  methods: {
      async getCars(){
          try {
              const response = await axios.get('https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars'); // Ganti URL ini dengan URL API Anda
              this.cars = response.data;
              console.log(this.cars[1].car_id);
          } catch (error) {
              console.error("Error fetching cars:", error);
          }
      },
        openCreateModal() {
            this.isModalCreateOpen = true;
        },
        closeCreateModal() {
            this.isModalCreateOpen = false;
        },
        async createCar(){
            try {
                const response = await axios.post('https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars', {
                    name: this.name,
                    image: this.image,
                    month_rate: this.mr,
                    day_rate: this.dr
                });
                // this.orders = response.data;
                this.closeCreateModal();
                location.reload(); 
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
        async deleteCar(id){
            try {
                const response = await axios.delete(`https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars/${id}`); // Ganti URL ini dengan URL API Anda
                // this.cars = response.data;
                this.closeDeleteModal();
                location.reload(); 
            } catch (error) {
                console.error("Error fetching cars:", error);
            }
        },
        openUpdateModal() {
            this.isModalUpdateOpen = true;
        },
        closeUpdateModal() {
            this.isModalUpdateOpen = false;
        },
        async updateCar(id){
            // console.log(id);
            try {
                const response = await axios.put(`https://67037f39bd7c8c1ccd41a62e.mockapi.io/rent-car/api/v1/cars/${id}`, {
                  name: this.name,
                    image: this.image,
                    month_rate: this.mr,
                    day_rate: this.dr
                });
                // this.order = response.data;
                console.log(response.data);
                this.closeUpdateModal();
                location.reload(); 
            } catch (error) {
                console.error("Error fetching orders:", error);
            }
        }
  },
  mounted() {
      this.getCars(); // Ambil data saat komponen dirender
  },
}
</script>
<style lang="">
  
</style>