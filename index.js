const { response } = require('express');
const { request } = require('express');
const cors = require('cors')
const express = require('express')
const app = express();
const logger = require('./logger')
app.use(express.json())

app.use(cors())//para que funcione con cualquier puerto


app.use(logger)

let notes = [
    {
      id: 1,
      content: 'HTML is easy',
      date: '2019-05-30T17:30:31.098Z',
      important: true,
    },
    {
      id: 2,
      content: 'Browser can execute only JavaScript',
      date: '2019-05-30T18:39:34.091Z',
      important: false,
    },
    {
      id: 3,
      content: 'GET and POST are the most important methods of HTTP protocol',
      date: '2019-05-30T19:20:14.298Z',
      important: true,
    },
  ]

/*const app = http.createServer((request, response) => {//callback
  response.writeHead(200, { 'Content-Type': 'aplication/json' })
  response.end(JSON.stringify(notes))
})*/

app.get('/', (request, response)=>{
    response.send('<h1>Hello world</h1>')
})
app.get('/api/notes', (request,response)=>{
    response.json(notes)
})
app.get('/api/notes/:id', (request,response)=>{// este segmento devuelve la nota segun su id el :id es para utilizar recuperar datos desde la direccion dinamica
  const id = Number(request.params.id)
  console.log({id});
const note = notes.find(note => note.id === id)
if (note) {
  response.json(note)
}else {response.status(404).end()}
})

app.delete('/api/notes/:id', (request,response)=>{
  const id = Number(request.params.id)
  notes= notes.filter(note => note.id !== id)
  response.status(204).end()
})
app.post('/api/notes', (request, response)=>{
  const note = request.body;
  
  if (!note | !note.content) {
    return response.status(400).json({
       error: 'note.content is missing'
    })
  }

  const ids = notes.map(note => note.id) //guarda los ids
  const maxId= Math.max(...ids) //busca el id mas grande
  const newNote ={
    id: maxId+1,
    content: note.content,
    important : typeof  note.important !== 'undefined' ? note.important :false,// si esta indefinido este campo va a poner el valor por defecto falso
    date : new Date().toISOString()
  }
  notes = [...notes, newNote]
  response.json(newNote)
})

app.use((request, response)=>{
response.status(404).json({
Error: 'Not found'
})
})
 
const PORT = process.env.PORT ||3001
app.listen(PORT, ()=>{
  console.log(`Server running on port ${PORT}`)
})
