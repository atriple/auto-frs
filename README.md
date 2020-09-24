Warning :

- Since I use puppeteer, this will install Chromium with the size of >100 Mb to the node_modules.
- This script only handle your department courses

---

# Auto FRS

This script helps you to automate the process of "FRS-war", run `npm start` and all you need to do is sit down, drink a tea, relax or do something else... 🍵

## Working version

I can't guarantee that this script will be future proof.

- Version `1.x.x` works on Fall 2020/2021

## How to use

1. Install dependency -- `npm install`
2. Add your integra NRP & password to `.env` file, here're the formats :

   ```
   NRP="{NRP}"
   PASSWORD="{PASSWORD}"
   ```

   Make sure to type your NRP and password correctly, this program doesn't handle incorrect input that it will loop until you cancel the command.

3. Input the course at `COURSE_LIST` variable in `index.js` (I will make it more "elegant" to do with config file if I have time in later version).

   The format is the string value that you can find in `<option value="...">`. Example : `"KM4723|_|2018|12100|0|1|"`

4. Adjust delay duration if you want, I recommend around 1000-2000ms

5. Run `npm start`, sit back and relax ☕

To stop the script -- `npm run stop`. You need to do it manually.

### Extras

Use `npm run log` if you want to stream the output. You can show it to console using :

- `Get-Content {LOG_PATH} -Wait -Tail 1000` for Windows Powershell users.

- There are also one that you can do with bash.

### Suggestion

- Keep it secret to your friends, if you want to keep it easy.
  - Or just battle with them by random chance
- Consider to insert courses as few as possible to make it iterate more faster, if you want to increase the probability finding the course.
- This script really good to monitor currently full & in demand courses. Consider prioritizing this kind of courses instead of one that guaranteed available.

## Contributing

Feel free to fork it, update it, or whatever you like to do with it.

## Disclaimer

- Use it at your own risk.
- People will be sour at you if you use this 🤖

## License

MIT, made by atriple
