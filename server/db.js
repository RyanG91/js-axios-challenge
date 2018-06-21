const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/studentdb')

const Student = mongoose.model('Student', {
  id: String,
  name: String
})

// export default Student
module.exports = Student
