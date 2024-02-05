import _ from 'lodash';
import '../css/style.css';
import Earth from '../img/Earth.png'

const input = document.getElementById("research");
input.addEventListener("keyup", text)
input.addEventListener("keyup", autocomplete)
const result = document.getElementById("result")

let classeFetch;
const section = document.querySelector("section");
const select = document.getElementById("city");
const container = document.getElementById("container");
const btn = document.getElementById("button");

let citys

function autocomplete(input) {
    let value = input.target.value
    var city = value.replace(/ /g, '-').replace(/,/g, '').replace(/\s*\(.*?\)\s*/g, '').toLowerCase()

    fetch(`https://api.teleport.org/api/cities/?search=${input.target.value}&limit=5`)
        .then(response => {
            return response.json()
        })
        .then(data => {
            citys = data._embedded["city:search-results"]

            generaMatch(citys)

            function generaMatch(cityList) {
                const city = document.getElementById("result")
                while (city.firstChild) {
                    city.removeChild(city.firstChild)
                }

                cityList.forEach(citys => {
                    let match = `<li>${citys.matching_full_name}</li>`
                    city.insertAdjacentHTML("beforeend", match)


                    city.addEventListener("click", function lollo(event) {

                        const input = document.getElementById("research");
                        input.value = event.target.innerHTML

                        while (city.firstChild) {
                            city.removeChild(city.firstChild)
                        }

                        fetch(`https://api.teleport.org/api/cities/?search=${event.target.innerHTML}&limit=5`)
                            .then(response => {
                                return response.json()
                            })
                            .then(data => {
                                try {
                                    geonameId = data._embedded["city:search-results"][0]._links["city:item"].href

                                } catch (err) {

                                    const score = document.getElementById("error")
                                    while (score.firstChild) {
                                        score.removeChild(score.firstChild)
                                    }
                                    const card = `citta non trovata .`
                                    score.insertAdjacentHTML("beforeend", card)
                                    return console.clear()
                                }

                                fetch(geonameId)
                                    .then(response => {
                                        return response.json()
                                    })
                                    .then(data => {
                                        nameCity = data.name
                                        let value = nameCity
                                        var nameCity = value.replace(/ /g, '-').replace(/,/g, '').toLowerCase()

                                        btn.addEventListener("click", function () {

                                            imgUrl = `https://api.teleport.org/api/urban_areas/slug:${nameCity}/images/ `
                                            scoreUrl = `https://api.teleport.org/api/urban_areas/slug:${nameCity}/scores/`

                                            fetch(scoreUrl)
                                                .then(response => {
                                                    return response.json()
                                                })
                                                .then(data => {
                                                    try {
                                                        console.log(data)
                                                        dataset = data.categories
                                                        summary = data.summary
                                                        generaCards(dataset)
                                                        console.log(dataset)
                                                        console.log(data)
                                                    } catch (err) {

                                                        const score = document.getElementById("error")
                                                        while (score.firstChild) {
                                                            score.removeChild(score.firstChild)
                                                        }
                                                        const card = `citta non trovata .`
                                                        score.insertAdjacentHTML("beforeend", card)

                                                        return console.clear()
                                                    }
                                                })

                                            function generaCards(listScore) {
                                                const score = document.getElementById("score-container")

                                                while (score.firstChild) {
                                                    score.removeChild(score.firstChild)
                                                }

                                                listScore.forEach(dataset => {
                                                    const card = `<div class="container"><div class="container-bar"><div class="bar" style="background-color: ${dataset.color}; width: ${String(dataset.score_out_of_10).substring(0, 3) * 10}%;"></div></div><p class="score">${String(dataset.score_out_of_10).substring(0, 3)}/10</p><h3 class="score-name">${dataset.name}</h3></div>`
                                                    score.insertAdjacentHTML("beforeend", card)
                                                });

                                                const description = document.getElementById("description")
                                                while (description.firstChild) {
                                                    description.removeChild(description.firstChild)
                                                }
                                                const card = `<div class="container"><h2>${summary}</h2></div>`
                                                description.insertAdjacentHTML("afterbegin", card)

                                                fetch(imgUrl)
                                                    .then(response => {
                                                        return response.json();
                                                    })
                                                    .then(data => {
                                                        image = data.photos[0].image.web
                                                        generaImg(image)
                                                        console.log(data)
                                                    })
                                                function generaImg(image) {
                                                    const photo = document.getElementById("img")
                                                    while (photo.firstChild) {
                                                        photo.removeChild(photo.firstChild)
                                                    }
                                                    const card = `<div class="container"><img src="${image}"></div>`
                                                    photo.insertAdjacentHTML("afterbegin", card)
                                                }
                                            }
                                        })
                                    })
                            })
                    })
                })
            }
        })
}

function text(input) {

    let value = input.target.value
    var city = value.replace(/ /g, '-').replace(/,/g, '').toLowerCase()
    console.log(city)

    btn.addEventListener("click", function () {
        let value = input.target.value
        var city = value.replace(/ /g, '-').replace(/,/g, '').toLowerCase()

        imgUrl = `https://api.teleport.org/api/urban_areas/slug:${city}/images/ `
        scoreUrl = `https://api.teleport.org/api/urban_areas/slug:${city}/scores/`
        console.log(city)

        let dataset
        let summary
        fetch(scoreUrl)
            .then(response => {
                return response.json()
            })
            .then(datata => {
                dataset = datata.categories
                summary = datata.summary
                nameCity = dataset.name
                generaCards(dataset)
                console.log(dataset)
                console.log(datata)
            })

        function generaCards(listScore) {
            const score = document.getElementById("score")

            while (score.firstChild) {
                score.removeChild(score.firstChild)
            }

            listScore.forEach(dataset => {
                const card = `<div class="container"><div class="container-bar"><div class="bar" style="background-color: ${dataset.color}; width: ${String(dataset.score_out_of_10).substring(0, 3) * 10}%;"></div></div><p class="score">${String(dataset.score_out_of_10).substring(0, 3)}/10</p><h3 class="score-name">${dataset.name}</h3></div>`
                score.insertAdjacentHTML("beforeend", card)
            });

            const description = document.getElementById("description")
            while (description.firstChild) {
                description.removeChild(description.firstChild)
            }
            const card = `<div class="container"><h2>${summary}</h2></div>`
            description.insertAdjacentHTML("afterbegin", card)

            fetch(imgUrl)
                .then(response => {
                    return response.json()
                })
                .then(data => {
                    image = data.photos[0].image.web
                    generaImg(image)
                    console.log(data)
                })
            function generaImg(image) {
                const photo = document.getElementById("img")
                while (photo.firstChild) {
                    photo.removeChild(photo.firstChild)
                }
                const card = `<div class="container"><img src="${image}"></div>`
                photo.insertAdjacentHTML("afterbegin", card)
            }
        }
    })
}

// nav bar

const infoSection = document.getElementById("info")
const info = document.getElementById("infoPoint");
const home = document.getElementById("home");
const homePage = document.getElementById("homePage");
const earth = document.getElementById("earth");

infoSection.style.display = "none"
home.style.display = "none"

info.addEventListener("click", function () {
    home.style.display = "block"
    infoSection.style.display = "block"
    homePage.style.display = "none"
    info.style.display = "none"
    earth.style.display = "none"
})

home.addEventListener("click", function () {
    homePage.style.display = "block"
    infoSection.style.display = "none"
    info.style.display = "block"
    home.style.display = "none"
    earth.style.display = "block"

})
