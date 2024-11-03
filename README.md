# Send Files to Telegram from Terminal

This program helps you send files from your terminal to a Telegram chat.

## What It Does

- **Easy File Sending**: Just enter paths or drag&drop files to the terminal.
- **Multiple Files (non-blocking)**: It can send many files, one after the other.
- **Shows Progress**: Tells you how many files have been sent.
- **No Extra Stuff Needed**: Only needs Bun to run.

## What You Need

- **Bun**: Make sure Bun is on your computer. It's needed to run this program.

## How to Use It

1. **Get the Files**:
   ```bash
   git clone git@github.com:7flash/cli2tg.git
   cd cli2tg
   ```

2. **Run the Program**:
   Start the program with Bun:
   ```bash
   bun run index.ts
   ```

3. **Send Your Files**:
   - Type in file paths when the program asks.
   - Type "exit" to stop the program.

## Important Things

Set these environment variables:

- `TELEGRAM_BOT_TOKEN`: The token for your Telegram Bot.
- `TELEGRAM_CHAT_ID`: The ID of the chat to send files to.

## Notes

- You don't need to use `bun install` because there are no extra things to install.
- Make sure your Telegram bot can send files to the chat.

Now you can easily send files from your terminal to your Telegram chat without needing the Telegram app on your computer. Enjoy!
