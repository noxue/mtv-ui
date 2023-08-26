import usersMe from './mock/users/me.js';
import usersRecents from './mock/users/follows.js';
import usersFollows from './mock/users/recents.js';
import movies1 from './mock/movies/1.js';
import moviesList from './mock/movies/list.js';
import moviesVideos from './mock/movies/videos.js';
import moviesWatch from './mock/movies/watch.js';

export default {
	'users/me': usersMe,
	'users/follows': usersFollows,
	'users/recents': usersRecents,
	'movies/1': movies1,
	'movies': moviesList,
	'movies/videos': moviesVideos,
	'movies/watch': moviesWatch,
}