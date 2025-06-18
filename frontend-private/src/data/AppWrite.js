import { Client, Account } from 'appwrite'

const client = new Client()
client
    .setEndpoint('https://fra.cloud.appwrite.io/v1') 
    .setProject('68519eb6000c99b6b42c')

export const account = new Account(client)
export { client }