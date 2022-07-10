# BookIIIT User Facing App & Serverless Backend

## User Facing App

The app checks for the presence of the osa_token and does auth, in case the auth isn't true, it redirects to the #login of the fh.iiitd.edu.in route.

The frontend just serves from the /spaces/:name route that'd dynamically create the spaces page based on the API responses from the serverless backend as described below.

On the homepage, the frontend makes three calls, one to get the spaces, the second to get the departments and contexts and the third to get the FAQs list.

## Serverless Backend

The app functions a serverless backend, using redis server as the database.

The following description are for the API routes:

`/api/admin_auth`: Checks for username as in the .env and password as in the .env to authenticate an admin user at /bookiitadmin/

`/api/contexts`: GETs and POSTs the list of contexts for the feedback form on the homepage

`/api/departments`: GETs and POSTs the list of departments for the feedback form on the homepage

`/api/faqs`: GETs and POSTs the FAQs for the list on the homepage

`/api/feedback`: GETs and POSTs the feedbacks

`/api/spaces`: GETs and POSTs the spaces to be shown on the homepage, and create page(s)

`/api/requests`: GETs and POSTs the requests added for the bookings

`/api/user_requests`: GETs the requests for the requested user email

## Deployment Steps

To deploy, use the following set of commands

```bash
npm run build
pm2 start "npm run start" --name "bookiiit-user"
sudo systemctl nginx restart
```

## Nginx Configuration for this app

```bash
server {

    listen 80;
    server_name booking.fh.iiitd.edu.in;

    location / {
        proxy_pass http://localhost:9015/;
    }

}


```
