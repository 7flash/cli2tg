import * as fs from 'fs';
import * as path from 'path';
import { createInterface } from 'readline';

// Environment variables
const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '';
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || '';

// Simple queue implementation
class FileQueue {
  private queue: (() => Promise<void>)[] = [];
  private running = false;
  private totalFiles = 0;
  private uploadedFiles = 0;

  async add(task: () => Promise<void>) {
    this.queue.push(task);
    this.totalFiles++;
    if (!this.running) {
      this.running = true;
      await this.run();
      this.running = false;
    }
  }

  private async run() {
    while (this.queue.length) {
      const task = this.queue.shift();
      if (task) {
        await task();
        this.uploadedFiles++;
        this.displayProgress();
      }
    }
  }

  private displayProgress() {
    console.log(`Progress: ${this.uploadedFiles}/${this.totalFiles} files uploaded.`);
  }
}

const fileQueue = new FileQueue();

const rl = createInterface({
  input: process.stdin,
  output: process.stdout
});

function promptForFilePath() {
  rl.question('Enter the file path to send (or type "exit" to quit): ', async (filePath) => {
    if (filePath.toLowerCase() === 'exit') {
      rl.close();
      return;
    }

    const fullPath = path.resolve(filePath);

    if (!fs.existsSync(fullPath)) {
      console.error('File does not exist.');
    } else {
      fileQueue.add(() => sendFileToTelegram(fullPath));
    }

    promptForFilePath(); // Prompt again for the next file
  });
}

promptForFilePath();

async function sendFileToTelegram(filePath: string) {
  console.log(`Sending file ${path.basename(filePath)} to Telegram...`);

  const form = new FormData();
  form.append('chat_id', TELEGRAM_CHAT_ID);
  form.append('document', Bun.file(filePath), path.basename(filePath));

  try {
    const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendDocument`, {
      method: 'POST',
      body: form
    });

    if (response.ok) {
      console.log(`File ${path.basename(filePath)} sent successfully!`);
    } else {
      const errorData = await response.text();
      console.error(`Failed to send file ${path.basename(filePath)}:`, errorData);
    }
  } catch (error) {
    console.error(`Error sending file ${path.basename(filePath)}:`, error.message);
  }
}