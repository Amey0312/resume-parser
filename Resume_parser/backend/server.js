const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const resumeRoutes = require('./routes/resumeRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb+srv://new_user:TCKvLgTgaWrfVVCr@cluster0.obttjzs.mongodb.net/resume_parser?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use('/api/resumes', resumeRoutes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
