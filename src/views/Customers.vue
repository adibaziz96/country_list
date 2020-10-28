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
    <div class="row">
        <div class="col">
            <div class="form-group">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Search for a country" @keyup="searchCountry" v-model="country">
                </div>
            </div>
        </div>
        <div class="col">
            <select class="custom-select mr-sm-2" @change="filterRegion($event)">
                <option value="">Filter by Region</option>
                <option v-for="region in uniqueRegion" v-bind:key="region.value">
                    {{region}}
                </option>
            </select>
        </div>
    </div>

    <div class="row row-cols-2">
        <div class="card text-left mt-5 ml-5" style="width: 18rem;" v-for="country in countryList" :key="country.name">
            <a v-on:click="goToDetailsPage(country.alpha3Code.toLowerCase())">
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
            for (let i = 0; i < response.data.length; i++) {
                this.regionList.push(response.data[i].region);
            }
            console.log(response.data);
        }, error => {
            // eslint-disable-next-line
            console.error(error);
        });
    },
    data() {
        return {
            countryList: [],
            regionList: [],
            region: "",
            selectedCustomer: ""
        }
    },
    computed: {
        uniqueRegion() {
            return this.regionList.reduce((seed, current) => {
                return Object.assign(seed, {
                    [current]: current
                });
            }, {});
        }
    },
    components: {
        Display
    },
    methods: {
        setSelectedCustomer: function(name) {
            this.selectedCustomer = name;
        },
        goToDetailsPage: function(name) {
            this.$router.push("/customerdetails/"+name);
        },
        filterRegion: function filterRegion(event) {
            this.region = event.target.value;
            if(this.region != ''){
                axios({
                    method: "GET",
                    url: "https://restcountries.eu/rest/v2/region/"+this.region
                }).then(response => {
                    this.countryList = response.data;
                }, error => {
                    // eslint-disable-next-line
                    console.error(error);
                });
            }else{
                axios({
                    method: "GET",
                    url: "https://restcountries.eu/rest/v2/all"
                }).then(response => {
                    this.countryList = response.data;
                }, error => {
                    // eslint-disable-next-line
                    console.error(error);
                });
            }
            
        },
        searchCountry: function() {
            if(this.country != ''){
                axios({
                    method: "GET",
                    url: "https://restcountries.eu/rest/v2/name/"+this.country
                }).then(response => {
                    this.countryList = response.data;
                }, error => {
                    // eslint-disable-next-line
                    console.error(error);
                });
            }else{
                axios({
                    method: "GET",
                    url: "https://restcountries.eu/rest/v2/all"
                }).then(response => {
                    this.countryList = response.data;
                }, error => {
                    // eslint-disable-next-line
                    console.error(error);
                });
            }
        },
    }
}
</script>