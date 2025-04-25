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
        <div class="col mt-5 ml-3">
            <div class="form-group col-sm-8">
                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <div class="input-group-text bg-white"><i class="fas fa-search"></i> </div>
                    </div>
                    
                    <input type="text" class="form-control" placeholder="Search for a country" @keyup="searchCountry" v-model="country">
                </div>
            </div>
        </div>
        <div class="col mt-5">
            <div class="form-group col-sm-4 float-right">
                <select class="form-control custom-select mr-sm-2" @change="filterRegion($event)">
                    <option value="">Filter by Region</option>
                    <option v-for="region in uniqueRegion" v-bind:key="region.value">
                        {{region}}
                    </option>
                </select>
            </div>
        </div>
    </div>

    <div class="row row-cols-12" style="justify-content:center;">
        <div class="card shadow-sm text-left mt-5 " style="width:18rem;margin-right: 20px;" v-for="country in countryList" :key="country.name">
            <a v-on:click="goToDetailsPage(country.alpha3Code.toLowerCase())">
                <img :src="country.flags.svg" class="card-img-top">
                <div class="card-body" v-on:click="setSelectedcountry(country.name)">
                    <h5 class="card-title">{{country.name.official}}</h5>
                    <p class="card-text"><b>Population:</b> {{country.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p>
                    <p class="card-text"><b>Region:</b> {{country.region}}</p>
                    <p class="card-text"><b>Capital:</b> {{country.capital}}</p>
                </div>
            </a>
        </div>
    </div>
    <Display v-if="selectedCountry!=''" :selectedCountry="selectedCountry" />
</div>

</template>

<script>
// @ is an alias to /src
import Display from '@/components/Display.vue'
import axios from 'axios'
export default {
    name: 'country',
    mounted() {
        axios({
            method: "GET",
            url: "https://restcountries.com/v3.1/all"
        }).then(response => {
            this.countryList = response.data;
            for (let i = 0; i < response.data.length; i++) {
                this.regionList.push(response.data[i].region);
            }
        }, error => {
            // eslint-disable-next-line
            console.error(error);
        });
    },
    data() {
        return {
            country: "",
            countryList: [],
            regionList: [],
            region: "",
            selectedCountry: ""
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
        setSelectedCountry: function(name) {
            this.selectedCountry = name;
        },
        goToDetailsPage: function(name) {
            this.$router.push("/countrydetail/"+name);
        },
        filterRegion: function filterRegion(event) {
            this.region = event.target.value;
            if(this.region != ''){
                axios({
                    method: "GET",
                    url: "https://restcountries.com/v3.1/region/"+this.region
                }).then(response => {
                    this.countryList = response.data;
                }, error => {
                    console.error(error);
                });
            }else{
                axios({
                    method: "GET",
                    url: "https://restcountries.com/v3.1/all"
                }).then(response => {
                    this.countryList = response.data;
                }, error => {
                    console.error(error);
                });
            }
            
        },
        searchCountry: function() {
            if(this.country != ''){
                axios({
                    method: "GET",
                    url: "https://restcountries.com/v3.1/name/"+this.country
                }).then(response => {
                    this.countryList = response.data;
                }, error => {
                    console.error(error);
                });
            }else{
                axios({
                    method: "GET",
                    url: "https://restcountries.com/v3.1/all"
                }).then(response => {
                    this.countryList = response.data;
                }, error => {
                    console.error(error);
                });
            }
        },
    }
}
</script>