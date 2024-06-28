const fs = require('fs');
const path = require('path');

const loadData = (filename) => {
  const filePath = path.join(__dirname, '../../data', filename);
  const rawData = fs.readFileSync(filePath);
  return JSON.parse(rawData);
};

const users = loadData('users.json');
const relatedUsers = loadData('related_users.json');
const movies = loadData('movies.json');
const userPreferences = loadData('user_preferences.json');

module.exports = { users, relatedUsers, movies, userPreferences };
