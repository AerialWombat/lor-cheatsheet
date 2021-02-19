const https = require('https');
const fs = require('fs');
const path = require('path');
const unzipper = require('unzipper');
const Jimp = require('jimp');

const projectDir = path.resolve(__dirname, '..', './frontend');
const setDataDir = path.resolve(projectDir, './src/assets/set-data');
const cardArtDir = path.resolve(projectDir, './public/images/card-art');
const fullArtDir = path.resolve(projectDir, './public/images/full-art');

async function getSetAmount() {
  console.log('Checking how many sets to download...');
  let reachedLastSet = false;
  let setCounter = 1;
  let setAmount = 0;

  while (!reachedLastSet) {
    await new Promise((resolve) => {
      const request = https.get(
        `https://dd.b.pvp.net/latest/set${setCounter}-en_us.zip`,
        (response) => {
          if (response.statusCode > 299) {
            reachedLastSet = true;
            resolve();
          } else {
            setCounter++;
            setAmount++;
            resolve();
          }
        }
      );

      request.end();
    });
  }

  console.log(`${setAmount} sets to download...`);
  return setAmount;
}

async function getSetData(setNumber) {
  return new Promise((resolve, reject) => {
    console.log(`Downloading set ${setNumber} data...`);
    const request = https.get(
      `https://dd.b.pvp.net/latest/set${setNumber}-en_us.zip`,
      (response) => {
        // Check for successful response
        if (response.statusCode < 200 || response.statusCode > 299) {
          reject(
            new Error(
              `Request for set ${setNumber} data failed. Status code: ${response.statusCode}`
            )
          );
        }

        response.on('end', () => {
          console.log(`Set ${setNumber} files downloaded...`);
        });

        response
          .pipe(unzipper.Parse())
          .on('entry', (entry) => {
            const fileName = path.basename(entry.path);
            let filePath;

            // Set filePath for each entry unless it is unwanted file (README.md, COPYRIGHT, metadata.json)
            if (fileName.includes('set')) {
              filePath = setDataDir;
            } else if (fileName.includes('alt')) {
              entry.autodrain();
            } else if (fileName.includes('full')) {
              filePath = fullArtDir;
            } else if (fileName.includes('png')) {
              filePath = cardArtDir;
            }

            // Check if filePath was set or was unwanted file
            if (filePath) {
              fs.mkdir(filePath, { recursive: true }, (error) => {
                if (error) throw error;
                entry.pipe(
                  fs.createWriteStream(path.resolve(projectDir, filePath, `./${fileName}`))
                );
              });
            }
          })
          .on('close', () => {
            resolve(`Set ${setNumber} data extracted...`);
          })
          .on('error', (error) => {
            reject(`Error getting set ${setNumber} data... ${error}`);
          });
      }
    );

    request.on('error', (error) => {
      reject(`Error downloading set ${setNumber} data... ${error}`);
    });

    request.end();
  });
}

function filterSpellCards() {
  const spellCardCodes = [];

  try {
    let combinedSetData = [];
    const combinedSetDataPath = path.resolve(setDataDir, `./combined-set-data.json`);

    // Filter JSON data for only spell data
    fs.readdirSync(setDataDir).forEach((file) => {
      if (file === 'combined-set-data.json') return;

      //? [02-10] Unsure why setNumber was needed here. Going to use file string instead
      //   const setNumber = file.match(/\d+/g)[0];
      //   const setDataPath = path.resolve(setDataDir, `./set${setNumber}-en_us.json`);
      //? [02-10]

      const setDataPath = path.resolve(setDataDir, `./${file}`);

      const buffer = fs.readFileSync(setDataPath);
      const setData = JSON.parse(buffer);

      const filteredSetData = [];

      setData.forEach((card) => {
        if (card.supertype.toLowerCase)
          if (card.type.toLowerCase() === 'spell' && card.supertype.toLowerCase() !== 'champion') {
            const { regionRef, cost, name, cardCode, spellSpeedRef, type } = card;

            filteredSetData.push({
              region: regionRef,
              cost,
              name,
              code: cardCode,
              spellSpeed: spellSpeedRef,
              type,
            });

            spellCardCodes.push(cardCode);
          }
      });

      // Write filtered set data to its own JSON
      fs.writeFileSync(setDataPath, JSON.stringify(filteredSetData));

      // Append filtered set data to combined set data array
      combinedSetData = combinedSetData.concat(filteredSetData);

      console.log(`Set JSON updated at ${file}...`);
    });
    // Write combined set data to file
    fs.writeFileSync(combinedSetDataPath, JSON.stringify(combinedSetData));
    console.log('Combined set data written set data directory...');

    // Filter full art files for only spell art
    fs.readdirSync(fullArtDir).forEach((imageFile) => {
      let isSpell = false;

      spellCardCodes.forEach((cardCode) => {
        if (imageFile.includes(cardCode)) {
          isSpell = true;
          return;
        }
      });

      if (!isSpell) {
        fs.unlinkSync(path.resolve(fullArtDir, `./${imageFile}`), (error) => {
          if (error) throw error;
        });
      }
    });
    console.log('Full art folder updated...');

    // Filter card art files for only spell art
    fs.readdirSync(cardArtDir).forEach((imageFile) => {
      let isSpell = false;

      spellCardCodes.forEach((cardCode) => {
        if (imageFile.includes(cardCode)) {
          isSpell = true;
          return;
        }
      });

      if (!isSpell) {
        fs.unlinkSync(path.resolve(cardArtDir, `./${imageFile}`), (error) => {
          if (error) throw error;
        });
      }
    });
    console.log('Card art folder updated...');
  } catch (error) {
    console.log(error);
  }
}

async function processImages() {
  // Read art asset directories for filepaths
  const fullArtFiles = fs.readdirSync(fullArtDir);
  const cardArtFiles = fs.readdirSync(cardArtDir);

  for (const imageFile of fullArtFiles) {
    const pathToImage = path.resolve(fullArtDir, `./${imageFile}`);
    const image = await Jimp.read(pathToImage);
    image.resize(280, Jimp.AUTO).quality(60).write(pathToImage);
  }

  for (const imageFile of cardArtFiles) {
    const pathToImage = path.resolve(cardArtDir, `./${imageFile}`);
    const image = await Jimp.read(pathToImage);
    image.resize(340, Jimp.AUTO).quality(60).write(pathToImage);
  }

  console.log('Images processed...');
}

async function asyncInit() {
  // Check how many sets are available to download
  const setAmount = await getSetAmount();
  const setDataPromises = [];

  // Download set data
  for (let i = 1; i <= setAmount; i++) {
    setDataPromises.push(getSetData(i));
  }
  await Promise.allSettled(setDataPromises);

  // Filter set data JSON and image assets for spells only
  filterSpellCards();

  // Resize and compress image assets
  await processImages();
  console.log('Done processing set data and cards!');
}

asyncInit();
