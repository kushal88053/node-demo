const express = require('express');
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


const port = 3000;

let movies = [
    {
        id: '1',
        title: 'Ghost',
        discription: 'Ghost rider..',
        release_date: '2010-10-16'
    },
    {
        id: '2',
        title: 'Dhamal',
        discription: 'Dhamal Comedy..',
        release_date: '2010-10-30'
    },
    {
        id: '3',
        title: 'Ghost',
        discription: 'Ghost rider..',
        release_date: '2010-09-27'
    }
];

app.get('/', (req, res) => {

    res.json(movies);
})

app.post('/', (req, res) => {

    const data = req.body;

    console.log(data);

    //    res.json(req.body);

    if (!data.id || !data.title || !data.discription || !data.release_date) {
        return res.json({ msg: 'correct the data ...' });
    }

    movies.push(data);

    res.status(201).json({ msg: 'Successfully inserted new movie', movies });
})

app.get('/:id', (req, res) => {

    let found = movies.filter(movie => movie.id == parseInt(req.params.id))

    if (found.length == 0) {
        return res.json({ msg: `${req.params.id} not found` });

    }

    res.json(found);
})

app.put('/:id', (req, res) => {

    const { id } = req.params;
    const { title, discription, release_date } = req.body;

    let found = movies.find(movie => movie.id == parseInt(id))

    if (!found) {
        return res.json({ msg: `${id}  not  found` });
    }

    found.title = title || found.title; // Update title if provided in request body
    found.discription = discription || found.discription; // Update description if provided in request body
    found.release_date = release_date || found.release_date; // Update release_date if provided in request body

    res.json({msg : 'data updated', movies}) ;

})

app.delete('/:id', (req, res) => {

    const { id } = req.params;

    const index = movies.findIndex(movie => movie.id == parseInt(id));

     // If movie with the given ID is not found
     if (index === -1) {
        return res.status(404).json({ msg: `${id} not found` });
    }

    // Remove movie from array
    movies.splice(index, 1);


 

    res.json({msg : 'data deleted', movies}) ;

})





app.listen(port, () => {
    console.log('server run on ' + port);
})