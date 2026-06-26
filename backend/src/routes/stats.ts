import { Router } from 'express';
import { Stats } from '../models/Stats.js';

export const statsRouter = Router();

// Helper to get or create the singleton stats document
async function getStatsDoc() {
  let stats = await Stats.findOne();
  if (!stats) {
    stats = await Stats.create({ visits: 0, downloads: 0 });
  }
  return stats;
}

statsRouter.get('/', async (_req, res) => {
  try {
    const stats = await getStatsDoc();
    res.json({ visits: stats.visits, downloads: stats.downloads });
  } catch (error) {
    console.error('Error fetching stats:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

statsRouter.post('/visit', async (_req, res) => {
  try {
    const stats = await Stats.findOneAndUpdate(
      {},
      { $inc: { visits: 1 } },
      { new: true, upsert: true }
    );
    res.json({ visits: stats.visits, downloads: stats.downloads });
  } catch (error) {
    console.error('Error incrementing visits:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

statsRouter.post('/download', async (_req, res) => {
  try {
    const stats = await Stats.findOneAndUpdate(
      {},
      { $inc: { downloads: 1 } },
      { new: true, upsert: true }
    );
    res.json({ visits: stats.visits, downloads: stats.downloads });
  } catch (error) {
    console.error('Error incrementing downloads:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
