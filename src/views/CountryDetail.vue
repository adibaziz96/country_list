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
            <div class="form-group col-sm-12">
                <div class="input-group mb-3">
                    <a v-on:click="goToMainPage()" class="col-sm-1 btn btn-outline-secondary"><i class="fas fa-arrow-left"></i> Back</a>
                </div>
            </div>
        </div>
    </div>

    <div class="row">
        <div class="col-md-5">
            <div class="text-left mt-5 ml-5" v-if="countryDetails.name">
                <img :src="countryDetails.flag" class="image card-img-top">
            </div>
        </div>

        
        <div class="col-md-5 mt-5 text-left">
            <table class="table table-borderless" width="100%">
                <thead>
                    <tr>
                        <th colspan="2"><h5 class="card-title font-weight-bold">{{countryDetails.name}}</h5></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <div class="row">
                                <b>Native Name:</b>
                                <div class="col">
                                    <p class="card-text">{{countryDetails.nativeName}}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <b>Top Level Domain:</b>
                                <div class="col">
                                    <p class="card-text">{{countryDetails.topLevelDomain[0]}}</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="row">
                                <b>Population:</b>
                                <div class="col">
                                    <p class="card-text">{{countryDetails.population.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <b>Currencies:</b>
                                <div class="col">
                                    <p class="card-text">{{countryDetails.currencies[0].name}}</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="row">
                                <b>Region:</b>
                                <div class="col">
                                    <p class="card-text">{{countryDetails.region}}</p>
                                </div>
                            </div>
                        </td>
                        <td>
                            <div class="row">
                                <b>Languages:</b>
                                <div class="col">
                                    <p class="badge badge-light" v-for="languages in countryDetails.languages" :key="languages.name">{{languages.name}}</p>
                                </div>
                            </div>
                        </td>
                    </tr>
                    <tr>
                        <td>
                            <div class="row">
                                <b>Sub Region:</b>
                                <div class="col">
                                    <p class="card-text">{{countryDetails.subregion}}</p>
                                </div>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>
                            <div class="row">
                                <b>Capital:</b>
                                <div class="col">
                                    <p class="card-text">{{countryDetails.capital}}</p>
                                </div>
                            </div>
                        </td>
                        <td></td>
                    </tr>
                </tbody>
                <tfoot>
                    <tr>
                        <td colspan="2">
                            <div class="row">
                                <b>Border Countries:</b>
                                <div class="col">
                                    <p class="btn btn-secondary ml-1" v-for="border in countryDetails.borders" :key="border"><a v-on:click="goToDetailsPage(border.toLowerCase())">{{border}}</a></p>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tfoot>
            </table>
        </div>
    </div>
</div>

</template>

<script>

import axios from 'axios'

export default {
    name: 'customerdetails',
    mounted() {
        axios({
            method: "GET",
            url: "https://restcountries.com/v3.1/alpha/"+this.$route.params.name
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
            this.$router.push("/country");
        },
        goToDetailsPage: function(name) {
            this.$router.push("/borderdetail/"+name);
        },
    }
}
</script>
