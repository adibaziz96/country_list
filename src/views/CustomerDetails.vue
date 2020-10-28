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
    <div class="card-body">
        <a v-on:click="goToMainPage()" class="btn btn-primary"><span style="color:white">Back</span></a>
    </div>

    <div class="row row-cols-2">
        <div class="card text-left mt-5 ml-5" style="width: 18rem;" v-if="countryDetails.name">
            <img :src="countryDetails.flag" class="card-img-top">
        </div>
        <div class="card-body">
            <h5 class="card-title">{{countryDetails.name}}</h5>
            <p class="card-text">Native Name: {{countryDetails.nativeName}}</p>
            <p class="card-text">Population: {{countryDetails.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p>
            <p class="card-text">Region: {{countryDetails.region}}</p>
            <p class="card-text">Sub Region: {{countryDetails.subregion}}</p>
            <p class="card-text">Capital: {{countryDetails.capital}}</p>
            <p class="card-text">Top Level Domain: {{countryDetails.topLevelDomain[0]}}</p>
            <p class="card-text">Currencies: {{countryDetails.currencies[0].name}}</p>
            <p class="card-text" v-for="languages in countryDetails.languages" :key="languages.name">Languages: {{languages.name}}</p>
            <p class="card-text" v-for="border in countryDetails.borders" :key="border">Border Countries: {{border}}</p>
        </div>
    </div>
</div>

</template>

<script>

// @ is an alias to /src
import axios from 'axios'

export default {
    name: 'customerdetails',
    mounted() {
        axios({
            method: "GET",
            url: "https://restcountries.eu/rest/v2/alpha/"+this.$route.params.name
        }).then(response => {
            this.countryDetails = response.data;
            console.log(response.data);
        }, error => {
            console.error(error);
        });
    },
    data() {
        return {
            countryDetails: {}
        }
    },
    methods: {
        goToMainPage: function() {
            this.$router.push("/customers");
        }
    }
}

</script>
