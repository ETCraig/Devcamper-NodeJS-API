const mongoose = require('mongoose');
const slugify = require('slugify');
const geocoder = require('../utils/geocoder');

const BootcampSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please Add Name'],
        unique: true,
        trim: true,
        maxlength: [50, 'Name Cannot Be Longer Than 50 Characters']
    },
    slug: String,
    description: {
        type: String,
        required: [true, 'Please Add Description'],
        maxlength: [500, 'Description Cannot Be Longer Than 500 Characters']
    },
    website: {
        type: String,
        match: [
            /https?:\/\/(www.\.)?[-a-z-A-Z0-9@:%._\+~#=]{1,256}\.[a-zA-z0-9()]{1,6}\b([-a-z-A-Z0-9()@:%_\+.~#?&//=]*)/,
            'Please Enter a Valid URL'
        ]
    },
    phone: {
        type: String,
        maxlength: [20, 'Phone Cannot Be Longer Than 20 Characters']
    },
    email: {
        type: String,
        match: [
            /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
            'Please Enter A Valid Email'
        ]
    },
    address: {
        type: String,
        required: [true, 'Please Add An Address']
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            // required: true
        },
        coordinates: {
            type: [Number],
            // required: true,
            index: '2dsphere'
        },
        formattedAddress: String,
        Street: String,
        City: String,
        State: String,
        zipcode: String,
        country: String
    },
    careers: {
        type: [String],
        required: true,
        enum: [
            'Web Development',
            'Mobile Development',
            'UI/UX',
            'Data Science',
            'Business',
            'Other'
        ]
    },
    averageRating: {
        type: Number,
        min: [1, 'Rating Must be At Least One'],
        max: [10, 'Rating Can Not Be More Than 10']
    },
    averageCost: Number,
    photo: {
        type: String,
        default: 'no-photo.jpg'
    },
    housing: {
        type: Boolean,
        default: false
    },
    jobAssistance: {
        type: Boolean,
        default: false
    },
    jobGuarantee: {
        type: Boolean,
        default: false
    },
    acceptGi: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, {
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

BootcampSchema.pre('save', function (next) {
    this.slug = slugify(this.name, { lower: true });
    next();
});

BootcampSchema.pre('save', async function (next) {
    const loc = await geocoder.geocode(this.address);
    this.location = {
        type: 'Point',
        coordinates: [loc[0].longitude, loc[0].latitude],
        formattedAddress: loc[0].formattedAddress,
        street: loc[0].streetName,
        city: loc[0].city,
        state: loc[0].stateCode,
        zipcode: loc[0].zipcode,
        country: loc[0].countryCode
    }

    this.address = undefined;

    next();
});

BootcampSchema.pre('remove', async function (next) {
    await this.model('Course').deleteMany({ bootcamp: this._id });
    next();
});

BootcampSchema.virtual('courses', {
    ref: 'Course',
    localField: '_id',
    foriegnField: 'bootcamp',
    justOne: false
});

module.exports = mongoose.model('Bootcamp', BootcampSchema);