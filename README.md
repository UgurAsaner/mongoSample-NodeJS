# mongoSample-NodeJS

A simple Express server to query MongoDB documents.

#### Install Dependencies

```
npm i
```

#### Start

```
npm run start
```


### Usage

Project has a single end-point that accepts only HTTP Post request with json formatted body.

#### Example

##### Request Body

```
{
	"startDate": "2017-01-01",
	"endDate": "2017-01-02",
	"minCount": 600,
	"maxCount": 900
}
```

##### Response

```
{
    "code": 0,
    "message": "Success",
    "records": [
        {
            "key": "wT4ct0s2Jwreysbc",
            "createdAt": "2017-01-01T05:15:54.219Z",
            "totalCount": 800
        },
        {
            "key": "THaMB8yZBwiL2f2q",
            "createdAt": "2017-01-01T18:17:55.614Z",
            "totalCount": 900
        },
        {
            "key": "WqgHAZqVR0Qayl5i",
            "createdAt": "2017-01-01T19:35:42.675Z",
            "totalCount": 900
        }
    ]
}
```


#### Request Parameters

| Parameter  |     Type    | Required | Default Value |
| ---------- | ----------- | -------- | ------------- |
| startDate  | Date String |    YES   |       -       |
|  endDate   | Date String |    YES   |       -       |
|  minCount  |   Integer   |    NO    |       0       |
|  maxCount  |   Integer   |    YES   |       -       |


#### Response Codes

| Code | Message |
| ---- | ------- |
|  0   |  Succes |
|  1   | Failed to get records |
|  2   | Missing parameter(s) |
|  3   | Invalid parameter |
|  4   | API not found |

