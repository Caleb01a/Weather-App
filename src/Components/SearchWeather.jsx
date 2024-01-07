import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaSearch } from "react-icons/fa"
import './SearchWeather.css'

function SearchWeather() {

const [search, setSearch] = useState("Lagos")
const [dataOne, setDataOne] = useState([])
const [dataTwo, setDataTwo] = useState([])
const [dataThree, setDataThree] = useState([])
const [dataFour, setDataFour] = useState([])
const [input, setInput] = useState("")

useEffect(() => {
    axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=6b66957d8a53bc36bf3292cdc75d9c14`)
    .then((result) => {
        setDataOne(result.data)
        setDataTwo(result.data.main)
        setDataThree(result.data.wind)
        setDataFour(result.data.weather[0])
        console.log(result.data)
    })
    .catch(error => console.log(error))
}, [search])

var currentDate = new Date();
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"]

//Time
let hours = currentDate.getHours()
let minutes = currentDate.getMinutes()
let seconds = currentDate.getSeconds()
let time = null

if(hours > 12) {
    hours = hours - 12
    time = `${hours}:${minutes}:${seconds} PM`
} else {
    hours = hours
    time = `${hours}:${minutes}:${seconds} AM`
}

//Search with button
const handleSearch = (e) => {
    e.preventDefault()
    setSearch(input)
}

//Search with enter key
const enterSearch = (e) => {
    e.preventDefault()
    if(e.key == "Enter") {
        setSearch(input)
    }
}


 return (
    <div className='slider'>
        <div className='bg'>
            <div className='content_container'>
                <div className='card'>
                    <div className='search'>
                        <input type="text" className='search_bar' value={input} onChange={(e) => setInput(e.target.value)} onKeyUp={enterSearch}/>
                        <FaSearch size={20} className='search_icon' onClick={handleSearch}/>
                    </div>
                    <div className='weather'>
                        <h2 className='city'>Weather in {dataOne.name}</h2>
                        <h1 className='temp'>{dataTwo.temp}<sup>o</sup>C </h1>
                        <h2 className='description'>{dataFour.main}</h2>
                        <h2 className='humidity'>Humidity: {dataTwo.humidity}%</h2>
                        <h2 className='wind'>{dataThree.speed} km/hr</h2>
                    </div>
                </div>

                <p className='date'>{days[currentDate.getDay()]}, {currentDate.getDate()}th of {currentDate.toLocaleString("default", {month: "long"})}, {currentDate.getFullYear()}
                <br />
                {time}
                </p>
            </div>
        </div>
    </div>
  )
}

export default SearchWeather