const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'Zokou-MD-WHATSAPP-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoia0VkazhsTlY2NUs1VGNrQzBvaGxwOWpmb0ExTWFEQlBXNkNWQkhPNzcxTT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiTEsvQ1JoMi9Kd3Mwbm1sOFVPY21oU1cvS0FYNG05bTk3azJpUHY5dnNVcz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJpRmUraUxFbTJaL2hOQm1kUlpSRHlkWHNDWnN0elJ3WDQrM25YNGVodmxjPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJONWlqQXRWUXlEOVd3NXY2cjFDdGd6S3RlQzYvM1VvNDdIVkxmWWNhd0g0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjJPdmpkWFJUekdyWVVrNXdFMTZrVkYzTzhYNUt4UEh4N1E2ZGxiN1FZMGs9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFucEZuOGxYeG85K3BCdDlUeXUvUWl2SzYxWDd4dENQeFVML3NQQmt3VlE9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiOEVYQzFVT0tTa3VBejFqT1BXT004RE55MzNmeTB5dkZkUDhseThBc2FHST0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiMS94YjQwSGdVdXl4S1JwUlYzazAzMmZSSWNRUGdPcXphdUd1Q2tEa1hqZz0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlFNdEJwZUtvaUFoSHJ1cFc1dkVsWTJqU1NrdExHNlUxcUYwWkgrYlVkT3ltbERHeVltdSs4RVpOaTNLbHZEakRtVklzNUk2U05UbHQxcG40SEUvbWlRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTYzLCJhZHZTZWNyZXRLZXkiOiJNZjM5eHc3N2NPZ2VOeDVuOXY1a0gvTHBoWW0wWjY4Y25qbElvSkRIaXNrPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W10sIm5leHRQcmVLZXlJZCI6MzEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjozMSwiYWNjb3VudFN5bmNDb3VudGVyIjowLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJjb0s4NU41TlRvdTFQUy1CZHctOUNBIiwicGhvbmVJZCI6IjBmYWNlYTcyLTA5MjQtNDhlNy04Njk0LWU4NWUzMjMxOWUzZSIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI1bEU3ZUp0SkRUUU13SHNVMzdudkpOWHZBK2c9In0sInJlZ2lzdGVyZWQiOmZhbHNlLCJiYWNrdXBUb2tlbiI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InVZYkFjUXJWTllFdXE0TlI2aFZIUlhTVHluQT0ifSwicmVnaXN0cmF0aW9uIjp7fSwiYWNjb3VudCI6eyJkZXRhaWxzIjoiQ0txTXJia0ZFSm5TcDdRR0dBUWdBQ2dBIiwiYWNjb3VudFNpZ25hdHVyZUtleSI6ImRCSCtnZ1U2YUtaSWZDSStWc1M1L2dZYUZIa2E4YW9Lc3hNMUx2Y3hoVFU9IiwiYWNjb3VudFNpZ25hdHVyZSI6IlAwVm0zV3JGcHBESnQxVDNoMitGQmxDaWRqR1NoVGg5ZHhrQVVhNC9JdUkwMWpTZnE0MHBva1IvSGQ0cFJOYmVFMkducG1ZQ0RyQ24xS3JzMUV3TUJ3PT0iLCJkZXZpY2VTaWduYXR1cmUiOiJ1eEZVbStKL1UxQXB1N0VLa3k2MXQ5Y3RyTDd0OVNubWptZlRJQmwvdE9lMThHMko2amV1L00rdFl5VXRjc243a2FOTFpyZUdXTW83ZEw5QytLN25nUT09In0sIm1lIjp7ImlkIjoiMjI1NDY2NjgzODk6MThAcy53aGF0c2FwcC5uZXQiLCJsaWQiOiI2NTYwMTMzMDU0MDU2ODoxOEBsaWQifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjI1NDY2NjgzODk6MThAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCWFFSL29JRk9taW1TSHdpUGxiRXVmNEdHaFI1R3ZHcUNyTVROUzczTVlVMSJ9fV0sInBsYXRmb3JtIjoiYW5kcm9pZCIsInJvdXRpbmdJbmZvIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQ0EwSURBPT0ifSwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzIwMzE0MTQwLCJsYXN0UHJvcEhhc2giOiIxeWhJUkEiLCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUVldiJ9',
     ETAT:process.env.ETAT,
    PREFIXE: process.env.PREFIXE, "!"
    NOM_OWNER: process.env.NOM_OWNER || "Zokou-Md",
    NUMERO_OWNER : process.env.NUMERO_OWNER,              
    LECTURE_AUTO_STATUS: process.env.LECTURE_AUTO_STATUS || "oui",
    TELECHARGER_AUTO_STATUS: process.env.TELECHARGER_AUTO_STATUS || 'oui',
    MODE: process.env.MODE_PUBLIC,
    PM_PERMIT: process.env.PM_PERMIT || 'non',
    BOT : process.env.NOM_BOT || 'Zokou_MD',
    URL : process.env.LIENS_MENU || 'https://static.animecorner.me/2023/08/op2.jpg',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    //GPT : process.env.OPENAI_API_KEY,
    DP : process.env.STARTING_BOT_MESSAGE || 'oui',
    ATD : process.env.ANTI_DELETE_MESSAGE || 'non',            
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9" : "postgres://db_7xp9_user:6hwmTN7rGPNsjlBEHyX49CXwrG7cDeYi@dpg-cj7ldu5jeehc73b2p7g0-a.oregon-postgres.render.com/db_7xp9",
    /* new Sequelize({
     dialect: 'sqlite',
     storage: DATABASE_URL,
     logging: false,
})
: new Sequelize(DATABASE_URL, {
     dialect: 'postgres',
     ssl: true,
     protocol: 'postgres',
     dialectOptions: {
         native: true,
         ssl: { require: true, rejectUnauthorized: false },
     },
     logging: false,
}),*/
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
