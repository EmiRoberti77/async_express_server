# Job Status API

This is a simple Express + TypeScript server that simulates long-running background jobs.  
Clients can submit a job, and then poll the status endpoint to get updates on progress or completion.

---

## 🚀 Features

- `POST /job`: Starts a new job and returns a unique `job_id`.
- `GET /job/:id/status`: Checks the status of a submitted job.
- Simulates long-running processing using `setTimeout`.
- Tracks job state (`pending`, `running`, `completed`) in memory using a `Map`.

---

## 📦 Tech Stack

- Node.js
- Express
- TypeScript
- UUID (from Node’s native `crypto` module)

---

## 📂 Project Structure

```
.
├── index.ts         # Main server file
├── package.json     # Project config and dependencies
├── tsconfig.json    # TypeScript configuration
└── README.md        # You're here!
```

---

## 🔧 Setup

1. **Install dependencies**

```bash
npm install
```

2. **Run the server**

With `ts-node`:

```bash
npx ts-node index.ts
```

Or compile + run:

```bash
tsc index.ts
node index.js
```

---

## 📬 API Endpoints

### 1. `POST /job`

Starts a new background job.

**Response:**

```json
{
  "job_id": "9af0f470-c6ef-4f17-97b3-6a4a3e5c1f4f"
}
```

---

### 2. `GET /job/:id/status`

Check the current status of a job.

**Responses:**

- ✅ **If job is completed (200 OK):**

```json
{
  "status": "completed",
  "result": "data ingested"
}
```

- ⏳ **If job is still in progress (202 Accepted):**

```json
{
  "status": "running",
  "result": "ingesting"
}
```

- ❌ **If job ID is invalid (404 Not Found):**

```json
{
  "error": "Job not found"
}
```

---

## 📝 Notes

- Jobs are stored **in memory only** using a `Map`, so they will be lost when the server restarts.
- Processing is simulated — you can modify `longRunningJob()` to perform actual async work.
- This is intended as a basic pattern for polling-based job tracking.

---

## 📌 License

MIT

## Author

Emi Roberti
