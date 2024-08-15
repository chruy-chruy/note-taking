// tests/notes.test.js

const request = require('supertest');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('../src/routes/notes'); // Adjust the path if necessary
const Note = require('../src/models/Note');
const { verifyToken } = require('../src/middleware/auth');

const app = express();
app.use(bodyParser.json());
app.use('/api/notes', router);

// Mock dependencies
jest.mock('../src/models/Note');
jest.mock('../src/middleware/auth', () => ({
  verifyToken: jest.fn((req, res, next) => {
    req.user = { _id: 'user_id' }; // Mock the user object for tests
    next();
  })
}));

describe('Notes API', () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('GET /api/notes should retrieve all notes for the user', async () => {
    const mockNotes = [{ _id: '12345', title: 'Test Note', content: 'Test content.' }];
    Note.find.mockResolvedValue(mockNotes);

    const response = await request(app)
      .get('/api/notes')
      .set('Authorization', 'Bearer mocked_token');

    expect(response.status).toBe(200);
    expect(response.body).toEqual(mockNotes);
  });

  // test('GET /api/notes/:noteId should retrieve a specific note', async () => {
  //   const mockNote = { _id: '12345', title: 'Test Note', content: 'Test content.' };
  //   Note.findById.mockResolvedValue(mockNote);

  //   const response = await request(app)
  //     .get('/api/notes/12345')
  //     .set('Authorization', 'Bearer mocked_token');

  //   console.log('GET /api/notes/:noteId', response.body); // Debugging line
  //   expect(response.status).toBe(200);
  //   expect(response.body).toMatchObject(mockNote);
  // });

  // test('PUT /api/notes/:noteId should update a specific note', async () => {
  //   const mockNote = { _id: '12345', title: 'Updated Title', content: 'Updated content.' };
  //   Note.findById.mockResolvedValue(mockNote);
  //   Note.prototype.save.mockResolvedValue(mockNote);

  //   const response = await request(app)
  //     .put('/api/notes/12345')
  //     .set('Authorization', 'Bearer mocked_token')
  //     .send({ title: 'Updated Title', content: 'Updated content.' });

  //   expect(response.status).toBe(200);
  //   expect(response.body).toMatchObject(mockNote);
  // });

  test('DELETE /api/notes/:noteId should delete a specific note', async () => {
    Note.findOne.mockResolvedValue({ _id: '12345', title: 'Test Note', content: 'Test content.' });
    Note.deleteOne.mockResolvedValue({ deletedCount: 1 });

    const response = await request(app)
      .delete('/api/notes/12345')
      .set('Authorization', 'Bearer mocked_token');

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('message', 'Note deleted successfully');
  });

});
