import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'
// const express = require('express')
// const path = require('path')
const app = express()

// #############################################################################
// This configures static hosting for files in /public that have the extensions
// listed in the array.
var options = {
	dotfiles: 'ignore',
	etag: false,
	extensions: ['htm', 'html', 'css', 'js', 'ico', 'jpg', 'jpeg', 'png', 'svg'],
	index: ['index.html'],
	maxAge: '1m',
	redirect: false,
}
app.use(express.static('dist', options))

const port = process.env.PORT || 3000

app.listen(port, () => {
	console.log(`React app listening at http://localhost:${port}`)
})
