const express = require('express');
const fsPromises = require('fs').Promises;
const { send } = require('process');
const datafile = 'server/data/clothing.json';
const router = express.Router();

/* GET all clothing */
router.route('/').get(async function (req, res) {
  try {
    let data = await getClothingData();
    console.log('Returning async data');
    res.send(data);
  } catch (error) {
    res.status(500).send(error);
  }

  // getClothingData()
  //   .then((data) => {
  //     console.log('Returnint clothing data to browser');
  //     res.send(data);
  //   })
  //   .catch((error) => {
  //     res.status(500).send(error);
  //   })
  //   .finally(() => {
  //     console.log('All done procesing the promise');
  //   }); // for both cases

  // console.log('Doing more work');
});

async function getClothingData() {
  let rawData = await fsPromises.readFile(datafile, 'utf8');
  let clothingData = JSON.parse(rawData);

  console.log(clothingData);

  return clothingData;
  //   return new Promise((resolve, reject) => {
  //   //   fs.readFile(datafile, 'utf8', (err, data) => {
  //   //     if (err) {
  //   //       reject(err);
  //   //     } else {
  //   //       let clothingData = JSON.parse(data);
  //   //       resolve(clothingData);
  //   //     }
  //   //   });
  // });
}

module.exports = router;
