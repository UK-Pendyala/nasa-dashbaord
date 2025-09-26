# NASA NEO Dashboard

A full-stack application that displays **Near-Earth Objects (NEOs)** retrieved from NASA’s [NeoWs API](https://api.nasa.gov/).

The backend (Fastify) acts as a proxy and normalizer for NASA’s raw data, while the frontend (React + TypeScript + Redux Toolkit Query) provides a responsive and interactive dashboard for end users.

---

## Tech Stack

- **React + TypeScript** – type-safe, component-driven UI development.  
- **Redux Toolkit Query (RTKQ)** – declarative data fetching, caching, and revalidation.  
- **Material UI (MUI)** – accessible, responsive UI components with modern styling.  
- **React Hook Form** – lightweight and performant form handling with validation.  
- **Fastify backend** – fast Node.js server that consumes NASA NeoWs API and exposes normalized endpoints.

---

## Caching Strategy (via RTK Query) (Client-Side)

- **Cache Duration** – keeps the cache for 5 minutes after the last use.  
- **Revalidation Triggers**:  
  - On window focus (`refetchOnFocus: true`).  
  - On reconnect (`refetchOnReconnect: true`).  
  - On mount or argument change (`refetchOnMountOrArgChange: true`).  
    This means that when a user fetches data for a specific date for the first time, a loading indicator is displayed on the screen. Once the data is fetched, it is cached by RTK in Redux internally. If the user fetches data for a different date for the first time, they will again see a loading indicator while that data is being fetched. However, if the user views dates they have previously accessed (i.e., the data is already cached), no loading indicator will be shown. Instead, the cached data is displayed immediately, and the data is silently refetched in the background and updated instantaneously.
- **Loading Indicator** – Shown only when no cached data exists (`!currentData && isLoading || isFetching`).  
  - If cached data exists, stale data is shown instantly while silently refetching in the background.  
- **Trade-off** – Avoids flickering spinners when cached data is available, while still ensuring data freshness.  
- **High-Frequency Auto Refresh** – Can be enabled using `pollingInterval` (commented in the code). 

---

## Features

- **Date Range Picker** – users can select a start and end date to fetch NEOs for a specific time window.  
- **Sorting** – Results can be sorted by size, closest approach to Earth, or relative velocity in ascending or descending order. 
- **Hazard Flagging** – potentially hazardous objects are visually flagged for quick identification.  
- **Responsive Design** – optimized for both desktop and mobile with Material UI.  
- **Error Handling** – clean error banner shown for API or network failures.  
- **Blocking Loader** – overlay loader prevents interaction during the *first uncached* request.

---

## Setup & Run

### Prerequisites
- Node.js (>= 18)  
- npm or yarn  

### 1. Clone & Install
```bash
git clone https://github.com/UK-Pendyala/nasa-dashbaord.git
cd nasa-neo-dashboard
npm install
```

### The frontend must run on port 3001. This is the only port currently allowed by the backend’s CORS configuration.

### 2. Configure Environment

Create a `.env` file in the root directory with the following variables:

```env
REACT_APP_API_BASE_URL=http://localhost:3000 #Base URL of the Fastify application
REACT_APP_API_ENDPOINT=/amex-challenge/api/nasa/near-earth-objects

```
These variables tell the frontend where to reach the Fastify backend.

### 3. Setting the port for windows (Not required for Mac/Linux)

The frontend must run on **port 3001**, since the backend only allows this origin in its **CORS configuration**.  
Trying to run on any other port will result in **CORS errors**.

#### Setting the Port if using windows

Use [`cross-env`](https://www.npmjs.com/package/cross-env) to make the setup work on all systems.

1. Install it as a dev dependency:
```bash
npm install --save-dev cross-env
```


### Update Your `package.json` Scripts

Add the following to the `scripts` section of your `package.json`:

```json
{
  "scripts": {
    "start": "cross-env PORT=3001 react-scripts start"
  }
}
```

### 4. Start the app
Execute this command your terminal
```bash
npm start
```
Now npm start will always run the frontend on http://localhost:3001, regardless of OS.


Once both are running, open [http://localhost:3001](http://localhost:3001) in your browser.  
The frontend will talk to the backend on port 3000, while itself runs on port 3001 due to CORS restrictions.

### Linting & Formatting

This project uses **ESLint** and **Prettier** with versions compatible with `react-scripts@5`.

#### Configurations:
1. **`.eslintrc.json`**:  
   - This file configures ESLint rules for the project, extending recommended settings for React, Jest, TypeScript, and Prettier to ensure code quality and consistent formatting.

2. **`.prettierrc`**:  
   - Defines formatting rules (e.g., quotes, line width, etc.).

#### Commands:
- `npm run lint` – Check for linting issues.  
- `npm run lint:fix` – Automatically fix linting issues.  
- `npm run format` – Format code using Prettier.  


### 5. Export for Production

To prepare the application for production, follow these steps:

#### 1. Build the Frontend
Run the following command to create an optimized production build of the React application:
```bash
npm run build
```
This will generate a build folder in the project root containing the static files for deployment.

#### 2. Serve the Build
```bash
npm install -g serve
```
Then serve the build:
```bash
serve -s build
```
By default, this will serve the app on [http://localhost:5000](http://localhost:5000).

Using a custom server (e.g., Nginx, Apache): Copy the contents of the build folder to your server's web root directory and configure the server to serve the index.html file for all routes.

#### 3. Configure Backend for Production
Ensure the backend is deployed and accessible at the URL specified in the REACT_APP_API_BASE_URL environment variable. Update this variable in the .env file before building the app.

#### 4. Configure Frontend for Production
Upload the contents of the build folder to any hosting provider (e.g., AWS EC2, Netlify, Vercel, etc.) and configure the hosting service to serve the app.

Once deployed, the application will be accessible in production.


 
## Developer Experience (DX)

- **TypeScript Everywhere** – static types reduce runtime bugs and improve IDE autocomplete.  
- **Redux Toolkit Query (RTKQ)** – declarative fetching with normalized caching; no need for hand-rolled thunks, reducers or actions.  
- **React Hook Form (RHF)** – minimal re-renders, simple validation.
- **Material UI (MUI)** – accessible and responsive components out of the box.  
- **Error Utilities (`toMessage`)** – consistent and human-readable error banner.  
- **Stable Sorting Helpers** – ensures predictable ordering of NEO rows.  

### Project Layout
```bash
frontend/
  src/
    features/neos/     # domain: slices, hooks, UI
    components/        # shared UI: ErrorBanner, LoadingOverlay
    pages/             # page-level containers
backend/
  src/
    routes/            # API routes (NEO feed)
    schemas/           # validation (e.g., Joi)
    lib/               # NASA client, mappers, utils
```

### Helpful Scripts
```bash
npm run lint         # Run ESLint to check for code quality issues
npm test             # Run Jest and React Testing Library tests
npm run build        # Create a production build
```

## Possible Enhancements

### 1. Pagination (Server-Side)
Implement page/limit query parameters in the backend and wire them to UI controls (e.g., MUI `TablePagination`).  
**Benefits:** Lower payload sizes, faster initial paint, smoother navigation through large datasets.  


### 2. Search Bar for NEO Rows
Add a client-side search filter by name and columns or ranges; for very large datasets, add a server-side `q` parameter for full-text search.  
**Benefits:** Enables easy identification of rows based on specific needs or defined ranges. 

### 3. Units Toggle (Metric ↔︎ Imperial)
Introduce a global toggle to convert and display values (meters ↔︎ feet, km ↔︎ miles, km/s ↔︎ mi/s).  
**Current State:** The app **only supports metric units**.  
**Benefits:** People who understand only imperial system can also consume and understand this data

### 4. CI/CD Pipeline with Tests
Add GitHub Actions (or similar) with separate jobs for:
- **Type Check & Lint:** Use TypeScript and ESLint to ensure code quality and consistency.
- **Tests:** 
  1. **Playwright Tests:** Perform end-to-end testing to simulate real user interactions in a browser and verify application behavior.
  2. **Unit Tests:** Ensure individual functions and components work as expected using Jest and React Testing Library.
**Benefits:** Continuous Integration and Continuous Deployment to staging without manual effort.

### 5. AI-Powered Data Analytics Chatbot
Enable natural-language querying of NEO data through a chat interface.
**Approach:**
1. **Chat Server with Agentic AI:** Build a small service on AWS EC2 that orchestrates multiple “tools/agents” (e.g., **OpenAI**, **Claude**) to parse user questions and plan actions.
2. **Tooling Layer:** Implement tools for:
   - Querying the normalized NEO API.
   - Performing aggregations (e.g., max velocity by date range, hazardous counts).
   - Formatting responses (tables, summaries).
3. **Server-Side Caching:** Cache API responses and analytics results keyed by normalized prompts/date ranges to reduce latency and external API calls.
4. **Query Translation:** Users feel like they are interacting with a real agent who has comprehensive knowledge about the queried data.
5. **UX:** Inline answers are displayed in a chat window, which can be positioned at the bottom-right corner of the screen.