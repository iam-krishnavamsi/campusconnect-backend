/**
 * Run: NODE_ENV=development npm run seed
 * Creates a sample college and default channels
 */
require('dotenv').config();
const mongoose = require('mongoose');
const College = require('./models/College');
const Channel = require('./models/Channel');

async function main() {
  await mongoose.connect(process.env.MONGO_URI);
  const col = await College.findOne({ code: 'TESTCOL' });
  if (col) {
    console.log('Seed already exists:', col);
    process.exit(0);
  }
  const college = await College.create({ name: 'Test College', code: 'TESTCOL' });
  await Channel.create({ college: college._id, name: 'announcements', isAnnouncement: true });
  await Channel.create({ college: college._id, name: 'general' });
  await Channel.create({ college: college._id, name: 'placements' });
  console.log('Seed complete. College code:', college.code);
  process.exit(0);
}

main().catch(err => { console.error(err); process.exit(1); });
