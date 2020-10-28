<style scoped>
.addmargin {
    margin-top: 10px;
    margin-bottom: 10px;
}
.vue-logo-back {
    background-color: black;
}
</style>

<template>

<div class="home">
    <div class="vue-logo-back">
        <img src="../assets/logo.png" width="100px" height="100px">
    </div>
    <div class="row">
        <div class="col">
            <div class="form-group">
                <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Recipient's username" aria-label="Recipient's username" aria-describedby="button-addon2">
                    <div class="input-group-append">
                        <button class="btn btn-outline-secondary" type="button" id="button-addon2">Button</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="col">
            <select class="custom-select mr-sm-2" id="inlineFormCustomSelect">
                <option selected>Choose...</option>
                <option value="1">One</option>
                <option value="2">Two</option>
                <option value="3">Three</option>
            </select>
        </div>
    </div>

    <div class="row row-cols-2">
        <div class="card text-left mt-5 ml-5" style="width: 18rem;" v-for="country in countryList" :key="country.name">
            <a v-on:click="goToDetailsPage(country.cioc)">
                <img :src="country.flag" class="card-img-top">
                <div class="card-body" v-on:click="setSelectedcountry(country.name)">
                    <h5 class="card-title">{{country.name}}</h5>
                    <p class="card-text">Population: {{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p>
                    <p class="card-text">Region: {{country.region}}</p>
                    <p class="card-text">Capital: {{country.capital}}</p>
                </div>
            </a>
        </div>
    </div>
    <Display v-if="selectedCustomer!=''" :selectedCustomer="selectedCustomer" />
</div>

</template>

<script>
// @ is an alias to /src
import Display from '@/components/Display.vue'
import axios from 'axios'
export default {
    name: 'customers',
    mounted() {
        axios({
            method: "GET",
            url: "https://restcountries.eu/rest/v2/all"
        }).then(response => {
            this.countryList = response.data;
        }, error => {
            // eslint-disable-next-line
            console.error(error);
        });
    },
    data() {
        return {
            countryList: [],
            regionList: [],
            selectedCustomer: ""
        }
    },
    components: {
        Display
    },
    methods: {
        setSelectedCustomer: function(name) {
            this.selectedCustomer = name;
        },
        goToDetailsPage: function(id) {
            this.$router.push("/customerdetails/"+id);
        }
    }
}
</script>