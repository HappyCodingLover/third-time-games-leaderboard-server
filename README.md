## Install

``bash
npm Install

## Start server

```
npm start
or
npm run mon
```

You can see `Server is running on PORT 8080...`

## Description

I have made mockup data as json file and saved it to `constants/Events.json`, `constants/Gamers.json`
There are 10 events and 1000 gamers.

```
[
  {
    "id": "63263605fc13ae349a000064",
    "name": "lacus"
  },
]
```

```
[
  {
    "id": "63263189fc13ae34aa0003d9",
    "name": "Pauly McGilbon",
    "avatar": "7.jpg",
    "email": "pmcgilbonrd@mit.edu",
    "gender": "Non-binary"
  },
]
```

I assumed each gamer can enter to each event and earn scores.

So I have made a constructor module (`constructor/index.js`) and update data per every 3 seconds. (`constructor/index.js`).
After running server, event data will be updated.

I have configured Mongodb, but didn't used it. It is just for future plan.

API has get method with event_name, view, page, sortOrder, size queries.
It will return the data of gamers who have entered to the event with name as event_name.
Data format:

```
{
  nextPage: 1,
  sortOrder: 1,
  entities: [
    {
      "id": "63263188fc13ae34aa000176",
      "name": "Harley Dunridge",
      "pic": "4.jpg",
      "score": 12600,
      "rank": 11
    },
  ]
}
```

Profile pictures are saved on frontend side (public/avatarts) for now.
Node server can upload images to frontend build path, so I used this path.

API also will return some error responses (ex. 400, 500, 429 errors)

It will return 500 errors if the query values are incorrect.

[http://localhost:8080/api/gamer?view=global&page=1&event_name=test&size=5&sortOrder=-1](http://localhost:8080/api/gamer?view=global&page=1&event_name=test&size=5&sortOrder=-1)

```
{
  status: 400,
  message: 'invalid event'
}
```

I have installed `express-rate-limit` module to prevent too many requests.

```
{
  status: 429,
  message: 'Too many requests'
}
```

If you want to see this error in the current frontend, please refresh the page by pressing 'F5' several times.

### Test case

[http://localhost:8080/api/gamer?view=global&page=1&event_name=lacus&size=5&sortOrder=-1](http://localhost:8080/api/gamer?view=global&page=1&event_name=lacus&size=5&sortOrder=-1)

[http://localhost:8080/api/gamer?view=global&page=1&event_name=eros&size=5&sortOrder=-1](http://localhost:8080/api/gamer?view=global&page=1&event_name=eros&size=5&sortOrder=-1)
