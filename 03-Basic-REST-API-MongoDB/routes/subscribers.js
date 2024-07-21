const express = require('express');
const router = express.Router();

const Subscriber = require('../models/subscriber');

router.get('/', async (req, res) => {
    try{
        const subscribers = await Subscriber.find();
        res.json(subscribers);
    } catch(error) {
        res.status(500).json({message: error.message});
    }
});

router.get('/:id', getSubscriber ,async (req, res) => {
    // const subscriber = await Subscriber.findById(req.params.id);
    // res.json(subscriber);
    res.json(res.subscriber.name);
});

router.post('/', async (req, res) => {
    const subscriber = new Subscriber({
        name: req.body.name,
        subscribedToChannel: req.body.subscribedToChannel,
    });
    try {
        await subscriber.save();
        res.status(201).json(subscriber);
    } catch (error) {
        res.status(400).json({message: error.message});
    }
});

router.put('/:id', getSubscriber, async (req, res) => {
    // const subscriber = await Subscriber.findById(req.params.id);
    const subscriber = res.subscriber;
    subscriber.name = req.body.name || subscriber.name;
    subscriber.subscribedToChannel = req.body.subscribedToChannel || subscriber.subscribedToChannel;
    await subscriber.save();
    res.json(subscriber);
});

router.patch('/:id', getSubscriber, async (req, res) => {
    const subscriber = res.subscriber;
    if(req.body.name != null) {
        subscriber.name = req.body.name;
    }
    if(req.body.subscribedToChannel != null) {
        subscriber.subscribedToChannel = req.body.subscribedToChannel;
    }
    const updatedSubsriber = await subscriber.save();
    res.json(updatedSubsriber);
});

router.delete('/:id', async (req, res) => {
    const subscriber = await Subscriber.findByIdAndDelete(req.params.id);
    // const subscriber = await Subscriber.delete(req.params.id);
    res.json(`Subscriber Deleted: ${subscriber.name}`);
});

async function getSubscriber(req, res, next) {
    let subscriber;
    try {
        subscriber = await Subscriber.findById(req.params.id);
        if(!subscriber) {
            return res.status(404).json({
                message: 'Subscriber not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: 'Error getting subscriber'
        })
    }

    res.subscriber = subscriber;
    next();
}

module.exports = router;