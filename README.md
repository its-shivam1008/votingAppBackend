
# Voting App

The backend of the voting application is developed using Node.js, Express, MongoDB, Mongoose, Bcrypt, JWT, and Body-Parser.
## Features

- Users can cast a vote for a candidate from a predefined list of candidates.
- Users must sign in or sign up to participate.
- Each user is allowed to vote for only one candidate.
- Voting is limited to one instance per user.
- A live vote count, sorted by the number of votes received, is available through a specific route.
- User data must contain their one unique government id proof (Adhaar number in this project).
- There is only Admin who will maintain the data of candidates.
- Admin cannot able to vote at all.
- Admin will register new candidates, can be able to update them (but not there vote count and votes) or remove a candidate.
- only one Admin is allowed in the database.
- User can update there information like password.
- User can only login with his Adhaar number and Password.



## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`PORT`

`JWT_KEY`

`mongoUrl`


## Deployment
This app is deployed on render here its live link
[Deployment](https://votingappbackend-iuns.onrender.com)

## End points

### User

#### Post 

```bash
  /user/signup
```
#### Post 

```bash
  /user/login
```
#### GET 

```bash
  /user/profile
```
#### Put 

```bash
  /user/profile/:nameOfFieldToUpdate
```
#### GET 

```bash
  /user/candidates
```


### Admin

#### Post 

```bash
  /admin/candidate
```
#### Get 

```bash
  /admin/candidates
```
#### Put 

```bash
  /admin/candidate/:nameOfFieldToUpdate/:candidateId
```
#### Delete 

```bash
  /admin/candidate/:candidateId
```

### Voting

#### Put

```bash
  /vote/:candidateId
```
#### Get 

```bash
  /vote/count
```
