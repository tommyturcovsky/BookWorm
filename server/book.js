const express = require('express');
const router = express.Router();
const uuidv4 = require('uuid/v4');

const haveReadList = [];
        
const wantToReadList = [];

// '/haveReadList'
router.get('/haveReadList', (req, res) => res.send(haveReadList));

router.post('/haveReadList', (req, res) => {
    const body = req.body;
    const bookId = uuidv4();
    haveReadList.push({
        bookId: bookId,
        title: body.title,
        author: body.author,
        description: body.shape,
        thumbnail_link: body.thumbnail_link
    });
    res.status(200).send({message: 'Successfully added to haveReadList!', bookId: bookId});
});

router.delete('/haveReadList/:bookId', function (req, res) {
    const bookToDelete = req.params.bookId;
    
    const foundBook = haveReadList.find( ({ bookId }) => bookId === bookToDelete);
    let index = haveReadList.indexOf(foundBook);
    if (foundBook) {
        haveReadList.splice(index, 1);
        res.status(200).send(haveReadList);
    }

    res.status(404);
    res.send({error: 'Book not found in List'})
})

// '/wantToReadList'
router.get('/wantToReadList', (req, res) => res.send(wantToReadList));

router.post('/wantToReadList', (req, res) => {
    const body = req.body;
    const bookId = uuidv4();
    wantToReadList.push({
        bookId: bookId,
        title: body.title,
        author: body.author,
        description: body.shape,
        thumbnail_link: body.thumbnail_link
    });
    res.status(200).send({message: 'Successfully added to wantToReadList!', bookId: bookId});
});

router.delete('/wantToReadList/:bookId', function (req, res) {
    const bookToDelete = req.params.bookId;
    
    const foundBook = wantToReadList.find( ({ bookId }) => bookId === bookToDelete);
    let index = wantToReadList.indexOf(foundBook);
    if (foundBook) {
        wantToReadList.splice(index, 1);
        res.status(200).send(wantToReadList);
    }
    

    res.status(404);
    res.send({ error: 'Book not found in list' })
    
})

// router.get('/:foodId', function (req, res) {
//     const foodIdSearch = req.params.foodId;
//     const foundFood = foodList.find(foodItem => foodItem.foodId === foodIdSearch);
//     if (foundFood) {
//         return res.send(foundFood)
//     }

//     res.status(404);
//     res.send({error: 'No food found!'});
// });

// // Notice how we include the ID in the header
// // Because we are saying that this is REQUIRED
// // Same for delete
// router.put('/:foodId', (req, res) => {
//     const foodId = req.params.foodId;
//     const foodBody = req.body;
//     const foundFood = foodList.find((foodItem) => foodItem.foodId === foodId);
//     if (!foundFood) {
//         res.status(404);
//         return res.send({error: 'Food not found!'});
//     }

//     foundFood.name = foodBody.name;
//     foundFood.color = foodBody.color;
//     foundFood.shape = foodBody.shape;

//     res.status(200).send('Success!');
// });

// // DELETE requests can take a body, but we
// // can typically handle the request with
// // just the ID
// router.delete('/:foodId', function (req, res) {
//     const foodId = req.params.foodId;
//     for (var i = foodList.length - 1; i >= 0; i--) {
//         if (foodList[i].foodId === foodId) {
//             foodList.splice(i, 1);
//         }
//     }
//     // Note that DELETE requests are ALWAYS successful,
//     // even if the resource is already delete
//     res.status(200).send('Success!');
// });

module.exports = router;