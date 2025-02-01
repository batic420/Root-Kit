# Root-Kit



### Definition

Root-Kit should be your starting point when setting up a new API or learning the basics of API's and Development. It provides a solid base and implements fundamentals like routing, security features, access on a database and so on. With Root-Kit your projects have a secure and working basic framework, so you can start building application code and top and create something big!

### Basics

I'm using `express.js` for routing purposes and `typeorm` for accessing a `mysql` database. To access protected endpoints (example provided inside the `routes.ts` file) you need to validate yourself with a `jwt-token`, here you also have two already existing endpoints, which let you create new users and also login with them to generate a fresh (1h valid) token to access your private and secure endpoints.

To ensure a secure password handling for Root-Kit i've implemented `bcrypt` to en- and decrypt passwords, so they will be never stored in plaintext.

### Vision

My vision for root-kit is that everybody who wants to start learing development (especially web- or backend-development) has a directly working, solid base and can focus on what motivates him, without having to care about routing or some other basic tasks which consume a lot of time (even for beginners).

### Conclusion

I hope you have a lot of fun playing around with my tool and have a great start in whatever achievement you want to accomplish!



## Have fun & stay consistent - you will achieve your goals!