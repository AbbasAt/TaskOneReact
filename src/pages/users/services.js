import axios from "axios";

export function getUsers(){
    return axios.get('https://dummyjson.com/users?select=firstName,lastName,maidenName,age,gender,email,username,birthDate,height,bloodGroup,eyeColor,university');
}

export function getLimitedUsers(limit,skip){
    return axios.get(`https://dummyjson.com/users?limit=${limit}&skip=${skip}&select=firstName,lastName,maidenName,age,gender,email,username,birthDate,height,bloodGroup,eyeColor,university`)
}

export function getFilteredUsers(filter,value,limit,skip){
    return axios.get(`https://dummyjson.com/users/filter?key=${filter}&value=${value}&limit=${limit}&skip=${skip}&select=firstName,lastName,maidenName,age,gender,email,username,birthDate,height,bloodGroup,eyeColor,university`)
}