## SWIPE DEV API'S

# /authRouter

- POST /signup
- POST /login
- POST /logout

# /profileRouter

- GET /profile/view
- PATCH /profile/edit
- PATCH /profile/password

# interested, ignored

# accepted, rejected

# /connectionRequestRouter

- POST /request/send/:status/:userId --> either interested/ignored like left and right swipe
- POST /request/review/:status/:userId --> either accept/reject the request

# /userRouter

11. GET /connections
12. GET /requests/received
13. GET /feed -> gets you the profile of other users on the platform
