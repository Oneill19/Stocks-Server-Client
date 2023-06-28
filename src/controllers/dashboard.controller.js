const axios = require('axios');

const viewFolder = require('../views/path').viewFolder;
const path = require('path');
const User = require('../models/user');

const apiKey = process.env.API_KEY;

exports.getDashboardPage = async function (req, res, next) {
  try {
    return res.sendFile(path.join(viewFolder + '/html/dashboard.html'));
  } catch (err) {
    next(err);
  }
}

exports.getSymbolsData = async function (req, res, next) {
  try {
    const favorites = JSON.parse(req.query.favorites);

    if (!favorites) {
      return res.json({ favorites: [] });
    }

    
    const promises = favorites.map(async (symbol) => {
      const response = await axios.get(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=${apiKey}`);
      const data = response.data['Global Quote'];

      return {
        symbol: data['01. symbol'],
        stockPrice: data['05. price'],
        change: data['10. change percent'],
      };
    });

    const result = await Promise.all(promises);

    return res.json({ favorites: result });
  } catch (err) {
    next(err);
  }
}

exports.getDaySymbolData = async function (req, res, next) {
  try {
    const { symbol } = req.params;

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=60min&apikey=${apiKey}`

    const response = await axios.get(url);
    const data = response.data;
    const timeSeries = data['Time Series (60min)'];

    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    let dates = Object.keys(timeSeries);
    dates = dates.filter(date => {
      const dateObj = new Date(date.replace(' ', 'T'));
      return dateObj >= yesterday && dateObj < today;
    });
    const prices = dates.map(date => timeSeries[date]['4. close']);

    // reverse the arrays to make the oldest date first
    dates.reverse();
    prices.reverse();

    // send the dates and prices as the response
    return res.send({ dates, prices });
  } catch (err) {
    next(err);
  }
}

exports.getMonthSymbolData = async function (req, res, next) {
  try {
    const { symbol } = req.params;

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${symbol}&apikey=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;
    const timeSeries = data['Time Series (Daily)'];

    let today = new Date();

    const dates = Object.keys(timeSeries)
      .filter(dateTimeString => {
        const datePart = dateTimeString.split(' ')[0];  // get date part of timestamp
        const comparisonDate = new Date(datePart);  // parse date string to Date object
        return comparisonDate.getMonth() === today.getMonth() && comparisonDate.getFullYear() === today.getFullYear();
      });
    const prices = dates.map(date => timeSeries[date]['4. close']);

    // reverse the arrays to make the oldest date first
    dates.reverse();
    prices.reverse();

    // send the dates and prices as the response
    return res.send({ dates, prices });
  } catch (err) {
    next(err);
  }
}

exports.getYearSymbolData = async function (req, res, next) {
  try {
    const { symbol } = req.params;

    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${symbol}&apikey=${apiKey}`;

    const response = await axios.get(url);
    const data = response.data;
    const timeSeries = data['Monthly Time Series'];

    let dates = Object.keys(timeSeries);
    let prices = dates.map(date => timeSeries[date]['4. close']);

    // reverse the arrays to make the oldest date first
    dates.reverse();
    prices.reverse();

    // Get the current date
    let today = new Date();

    // Calculate the date one year ago
    let oneYearAgo = new Date();
    oneYearAgo.setFullYear(today.getFullYear() - 1);

    // Filter the arrays to keep only the data for the last 12 months
    dates = dates.filter(date => new Date(date) >= oneYearAgo);
    prices = prices.slice(0, dates.length);

    // send the dates and prices as the response
    return res.send({ dates, prices });
  } catch (err) {
    next(err);
  }
}

exports.addToFavorites = async function (req, res, next) {
  try {
    const { uuid } = req.params;
    const { symbol } = req.body;

    const user = await User.findOneAndUpdate(
      { token: uuid },
      { $addToSet: { favorites: symbol } },
      { new: true }
    );

    if (!user) {
      throw new Error('No user found with this token');
    }

    return res.send({ response: 'OK' });
  } catch (err) {
    next(err);
  }
}

exports.removeFromFavorites = async function (req, res, next) {
  try {
    const { uuid } = req.params;
    const { symbol } = req.body

    const user = await User.findOneAndUpdate(
      { token: uuid },
      { $pull: { favorites: symbol } },
      { new: true }
    );

    if (!user) {
      throw new Error('No user found with this token');
    }

    return res.send({ response: 'OK' });
  } catch (err) {
    next(err);
  }
}