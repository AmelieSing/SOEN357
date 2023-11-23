const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
   
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user'
        },
        bio: {
            type: String,
            required: true
        },
    
        University: {
            type: String,
            default: 'Concordia University', // Set default value since this is only concordia 
            required: true

        },
        Field: {
            type: String,
            required: true
        },
    
    
    
        UserCreatedEvents: [
            {
                    type: mongoose.Schema.Types.ObjectId,
                    ref:'event',
                    
                    
                }
    
        ],
        SharedEvents:[
            {
                type: mongoose.Schema.Types.ObjectId,
                ref:'event',
                
                
            }
        ]
    
});

module.exports = Profile = mongoose.model('profile', ProfileSchema);