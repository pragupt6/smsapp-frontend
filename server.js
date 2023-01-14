// create a web server
import express from 'express'
import path from 'path'
import dotenv from 'dotenv'
import colors from 'colors'

const app = express()
app.use(express.json())
dotenv.config()

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

const __dirname = path.resolve()

if (process.env.NODE_ENV === 'production') {
	app.use(express.static(path.join(__dirname, '/dist')))

	app.get('*', (req, res) =>
		res.sendFile(path.resolve(__dirname, 'dist', 'index.html'))
	)
} else {
	app.get('/', (req, res) => {
		res.send('API is running....')
	})
}
const port = process.env.PORT || 3000
app.listen(
	port,
	console.log(
		`Server running in ${process.env.NODE_ENV} on port ${port}`.yellow.bold
	)
)
