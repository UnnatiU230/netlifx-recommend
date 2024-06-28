const express = require('express');
const { users, relatedUsers, movies, userPreferences } = require('../utils/dataLoader');
const { calculateTimeDeltaScore, calculateGenrePreferenceScore, calculateRelatedUsersScore } = require('../utils/scorer');

const router = express.Router();

router.get('/recommendations/:userId', (req, res) => {
  const userId = req.params.userId;
  const user = users.find(u => u.user_id === userId);
  const userPrefs = userPreferences.filter(pref => pref.user_id === userId);
  const relatedUserIds = relatedUsers[userId];

  if (!user || userPrefs.length === 0) {
    return res.status(404).send('User or user preferences not found');
  }

  const movieScores = movies.map(movie => {
    const timeDeltaScore = calculateTimeDeltaScore(movie.release_date);
    const genrePreferenceScore = calculateGenrePreferenceScore(movie.genres, userPrefs);
    const relatedUsersScore = calculateRelatedUsersScore(relatedUserIds, movie, userPreferences);

    const totalScore = timeDeltaScore + genrePreferenceScore + relatedUsersScore;
    return { movie, score: totalScore };
  });

  movieScores.sort((a, b) => b.score - a.score);
  const topMovies = movieScores.slice(0, 10).map(ms => ms.movie);

  res.json(topMovies);
});

module.exports = router;
