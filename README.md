# Wynn tech challenge

Author: Kiran Earle

Project: Wynn resort tech challenge

Live version of the app on my netlify account (to see it working in prod): https://wynn-tech-task.netlify.app

Github: https://github.com/KiranEarle/wynn-tech-task

# Getting Started

First, run the development server:

```bash
# Run to install dependence's
npm install
# or
yarn

# To run locally on http://localhost:3000
npm run dev
# or
yarn dev

# To run unit tests
npm run test
# or
yarn test
# or for coverage report
npm run test:coverage
# or
yarn test:coverage
```

Runtime: Node@22.14.0

```bash
# has an .nvmrc file with the version there, run:
nvm use
```

# Technical decisions

The app is built using:

### NextJS

- Easy to build SSR single page applications
- It is a React framework
- Provides a lot of inbuilt features that make developing and deploying the application easy.

### React

- UI component library (obviously as part of NextJS).

### Styling

Because it was a small application I just went with CSS Modules. The reason for this is:

- Its a smaller app
- I wanted to showcase that I understand how to use CSS with without preprocessors.
- FYI, I have used Styled components, Tailwind and SCSS in other projects

### Test

Using Jest and React Testing Library write for unit tests.

# Endpoints

Using mockable.io as prescribed by the spec I create 4 simple endpoints. I created these endpoints just for the purpose of getting through the journey.

So they are quite superficial:

## POST /subscribe/news-letter

### POST {BASE_URL}/subscribe/news-letter

## **Description**

Submits an email address to the newsletter subscription service. This endpoint registers the given email for receiving newsletters and updates.

---

## **Request**

### **Headers**

| Header       | Value            | Required | Description                               |
| ------------ | ---------------- | -------- | ----------------------------------------- |
| Content-Type | application/json | Yes      | Indicates the request body is JSON format |

### **Body Parameters**

| Field | Type   | Required | Description                        |
| ----- | ------ | -------- | ---------------------------------- |
| email | string | Yes      | A valid email address to subscribe |

#### **Example**

```json
{
  "email": "user@example.com"
}
```

## **Response**

### Success (HTTP 200 OK / 201 Created)

```json
{
  "message": "Success"
}
```

### Error Responses

| Status Code | Description              | Example Response       |
| ----------- | ------------------------ | ---------------------- |
| 400         | Invalid email format     | `{ "error": "error" }` |
| 409         | Email already subscribed | `{ "error": "error" }` |
| 500         | Internal server error    | `{ "error": "error" }` |

## POST /register/submit-otp

### POST {BASE_URL}/register/submit-otp

## **Description**

Verifies a one-time password (OTP) sent to the user. This endpoint is used to confirm the user's identity during registration or login flows by validating a 4-digit OTP code.

---

## **Request**

### **Headers**

| Header       | Value            | Required | Description                               |
| ------------ | ---------------- | -------- | ----------------------------------------- |
| Content-Type | application/json | Yes      | Indicates the request body is JSON format |

### **Body Parameters**

| Field | Type   | Required | Description                    |
| ----- | ------ | -------- | ------------------------------ |
| code  | string | Yes      | The 4-digit OTP code to verify |

#### **Example**

```json
{
  "code": "1234"
}
```

## **Response**

### Success (HTTP 200 OK / 201 Created)

```json
{
  "message": "Success"
}
```

### Error Responses

| Status Code | Description                   | Example Response       |
| ----------- | ----------------------------- | ---------------------- |
| 400         | Missing or invalid type value | `{ "error": "error" }` |
| 500         | Internal server error         | `{ "error": "error" }` |

## POST /register/request-otp

### POST {BASE_URL}/register/request-otp

## **Description**

Sends a request to initiate an OTP (One-Time Password) delivery process. The delivery method can be either via phone or email, depending on the `type` specified in the request body.

---

## **Request**

### **Headers**

| Header       | Value            | Required | Description                                  |
| ------------ | ---------------- | -------- | -------------------------------------------- |
| Content-Type | application/json | Yes      | Indicates the request body is in JSON format |

---

### **Body Parameters**

| Parameter | Type   | Required | Description                                               |
| --------- | ------ | -------- | --------------------------------------------------------- |
| type      | string | Yes      | OTP request type. Accepted values: `"phone"` or `"email"` |

#### **Example**

```json
{
  "type": "phone"
}
```

## **Response**

### Success (HTTP 200 OK / 201 Created)

```json
{
  "message": "Success"
}
```

### Error Responses

| Status Code | Description                     | Example Response       |
| ----------- | ------------------------------- | ---------------------- |
| 400         | Missing or invalid `type` value | `{ "error": "error" }` |
| 500         | Internal server error           | `{ "error": "error" }` |

## POST /register/personal-details

### POST {BASE_URL}/register/personal-details

---

## **Description**

Submits personal details for a new user registration. This is typically the first step in a multi-step onboarding or verification flow.

---

## **Request**

### **Headers**

| Header       | Value            | Required | Description                                  |
| ------------ | ---------------- | -------- | -------------------------------------------- |
| Content-Type | application/json | Yes      | Indicates the request body is in JSON format |

---

### **Body Parameters**

| Parameter   | Type   | Required | Description                         |
| ----------- | ------ | -------- | ----------------------------------- |
| firstName   | string | Yes      | User's first name                   |
| lastName    | string | Yes      | User's last name                    |
| gender      | string | Yes      | Gender identity                     |
| email       | string | Yes      | Email address                       |
| phoneNumber | string | Yes      | Full phone number with country code |
| residency   | string | Yes      | User's residency (e.g., country)    |

#### **Example**

```json
{
  "firstName": "Jane",
  "lastName": "Doe",
  "gender": "female",
  "email": "jane.doe@example.com",
  "phoneNumber": "+1234567890",
  "residency": "USA"
}
```

## **Response**

### Success (HTTP 200 OK / 201 Created)

```json
{
  "message": "Success"
}
```

### Error Responses

| Status Code | Description                             | Example Response       |
| ----------- | --------------------------------------- | ---------------------- |
| 400         | Missing or invalid fields               | `{ "error": "error" }` |
| 409         | User already registered with this email | `{ "error": "error" }` |
| 500         | Internal server error                   | `{ "error": "error" }` |
