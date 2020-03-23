import axios from 'axios'
import {SCORES_API} from '../config'

const findAll = () => axios.get(SCORES_API).then(response => response.data['hydra:member'])

const deleteScore = id => axios.delete(`${SCORES_API}/${id}`)

const find = id => axios.get(`${SCORES_API}/${id}`).then(response => response.data)

const update = (id, score) => axios.put(`${SCORES_API}/${id}`, {
    ...score,
    score: parseInt(score.score),
    book: `/api/books/${score.book}`
})

const create = score => axios.post(SCORES_API, {
    ...score,
    score: parseInt(score.score),
    book: `/api/books/${score.book}`
})

export default {
    findAll,
    find,
    create,
    update,
    delete: deleteScore
}