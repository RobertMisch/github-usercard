/*data example
data:
login: "RobertMisch"
id: 24370208
node_id: "MDQ6VXNlcjI0MzcwMjA4"
avatar_url: "https://avatars3.githubusercontent.com/u/24370208?v=4"
gravatar_id: ""
url: "https://api.github.com/users/RobertMisch"
html_url: "https://github.com/RobertMisch"
followers_url: "https://api.github.com/users/RobertMisch/followers"
following_url: "https://api.github.com/users/RobertMisch/following{/other_user}"
gists_url: "https://api.github.com/users/RobertMisch/gists{/gist_id}"
starred_url: "https://api.github.com/users/RobertMisch/starred{/owner}{/repo}"
subscriptions_url: "https://api.github.com/users/RobertMisch/subscriptions"
organizations_url: "https://api.github.com/users/RobertMisch/orgs"
repos_url: "https://api.github.com/users/RobertMisch/repos"
events_url: "https://api.github.com/users/RobertMisch/events{/privacy}"
received_events_url: "https://api.github.com/users/RobertMisch/received_events"
type: "User"
site_admin: false
name: null
company: null
blog: ""
location: null
email: null
hireable: null
bio: null
public_repos: 25
public_gists: 0
followers: 8
following: 1
created_at: "2016-12-04T13:22:52Z"
updated_at: "2020-03-11T19:06:49Z"
*/

/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/<your name>
*/

// axios.get('https://api.github.com/users/RobertMisch')
// .then(response =>{
//   document.querySelector('.cards').append(cardCreator(response));
// })
// .catch(error => {
//   console.log('request to github failed ' + error)
// })

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/
axios.get('https://api.github.com/users/RobertMisch')
.then(response =>{
  document.querySelector('.cards').append(cardCreator(response));
})
.catch(error => {
  console.log('request to github failed ' + error)
})


/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

const followersArray = ['tetondan', 'dustinmyers', 'justsml', 'luishrd', 'bigknell'];

followersArray.forEach(item => {
  axios.get(`https://api.github.com/users/${item}`)
  .then(response =>{
    document.querySelector('.cards').append(cardCreator(response));
  })
  .catch(error => {
    console.log('request to github failed ' + error)
  })
})

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">{users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
function cardCreator(gitObj){
  //make our elements
  const card = document.createElement('div');
  const cardImg = document.createElement('img');
  const cardInfo = document.createElement('div');
  const cardName = document.createElement('h3');
  const cardUsername = document.createElement('p');
  const cardLocation = document.createElement('p');
  const cardProfileText = document.createElement('p');
  const cardProfileLink = document.createElement('a');
  const cardFollowers = document.createElement('p');
  const cardFollowing = document.createElement('p');
  const cardBio = document.createElement('p');

  //adding classes
  card.classList.add('card');
  cardInfo.classList.add('card-info');
  cardName.classList.add('name');
  cardUsername.classList.add('username');

  //adding content
  cardImg.src = `${gitObj.data.avatar_url}`;
  cardName.textContent = (`${gitObj.data.name}`);
  cardUsername.textContent = (`${gitObj.data.login}`);
  cardLocation.textContent = (`${gitObj.data.location}`);
  cardProfileText.textContent = (`Profile: `);
  cardProfileLink.textContent = (`${gitObj.data.url}`);
  cardFollowers.textContent = (`${gitObj.data.followers}`);
  cardFollowing.textContent = (`${gitObj.data.following}`);
  cardBio.textContent = (`${gitObj.data.bio}`);
  
  //binding the card together
  card.append(cardImg, cardInfo);
  // card.append(cardInfo);
  cardInfo.append(cardName, cardUsername, cardLocation, cardProfileText, cardFollowers, cardFollowing, cardBio);
  // cardInfo.append(cardUsername);
  // cardInfo.append(cardLocation);
  // cardInfo.append(cardProfileText);
  cardProfileText.append(cardProfileLink);
  // cardInfo.append(cardFollowers);
  // cardInfo.append(cardFollowing);
  cardInfo.append(cardBio);

  //roll out card
  return card
}

/* List of LS Instructors Github username's: 
  tetondan
  dustinmyers
  justsml
  luishrd
  bigknell
*/
