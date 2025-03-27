import express, { Request, Response } from 'express';
import { randomUUID } from 'crypto';

const app = express();
app.use(express.json());

type jobStatus = 'pending' | 'running' | 'completed';

interface jobData {
  status: jobStatus;
  message: string;
}

const jobMap = new Map<string, jobData>();

async function longRunningJob(job_id: string) {
  jobMap.set(job_id, { status: 'running', message: 'ingesting' });

  await new Promise((resolve) => setTimeout(resolve, 20000));

  jobMap.set(job_id, { status: 'completed', message: 'data ingested' });
}

app.post('/job', (req: Request, res: Response) => {
  const job_id = randomUUID();
  jobMap.set(job_id, { status: 'pending', message: 'job in queue' });
  longRunningJob(job_id);
  res.status(200).json({ job_id });
});

app.get('/job/:id/status', (req: any, res: any) => {
  const currentJob = jobMap.get(req.params.id);
  if (!currentJob) {
    return res.status(404).json({ error: 'Job not found' });
  }

  if (currentJob.status !== 'completed') {
    return res
      .status(202)
      .json({ status: currentJob.status, result: currentJob.message });
  }

  return res
    .status(200)
    .json({ status: currentJob.status, result: currentJob.message });
});

app.listen(3000, () => {
  console.log('Server running on port 3000');
});
