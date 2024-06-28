const moment = require('moment');
const gaussian = require('./guassian'); // Ensure this path is correct

const calculateTimeDeltaScore = (releaseDate) => {
  const today = moment();
  const release = moment(releaseDate);
  const timeDelta = today.diff(release, 'days');
  return gaussian(timeDelta, 0, 365); // Assuming 1 year variance for the Gaussian function
};

const calculateGenrePreferenceScore = (movieGenres, userPreferences) => {
  let score = 0;
  movieGenres.forEach(genre => {
    const preference = userPreferences.find(pref => pref.genre === genre);
    if (preference) {
      score += preference.preference_score;
    }
  });
  return score;
};

const calculateRelatedUsersScore = (relatedUserIds, movie, userPreferences) => {
  let totalScore = 0;
  let count = 0;

  relatedUserIds.forEach(userId => {
    const userPreference = userPreferences.find(pref => pref.user_id === userId);
    if (userPreference) {
      totalScore += calculateGenrePreferenceScore(movie.genres, userPreference.genres);
      count++;
    }
  });

  return count > 0 ? totalScore / count : 0;
};

module.exports = { calculateTimeDeltaScore, calculateGenrePreferenceScore, calculateRelatedUsersScore };

