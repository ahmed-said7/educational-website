let mongoose=require('mongoose');

let bcryptjs=require('bcryptjs');

let userSchema=new mongoose.Schema({

    name:{
        type:String,
        required:true,
        trim:true,
        minlength:[3,'too short'],
        maxlength:[22,'too long']
    },

    email:{
        required:true,
        type:String,
        unique:true,
        trim:true,
        lowercase:true,
    },

    password:{
        type:String,
        minlength:[7,'too short password'],
        maxlength:[2000,'too long password'],
        // required:true,
    },

    passwordChangedAt:Date,

    passwordResetCode:String,

    passwordResetCodeExpiredAt:Date,

    passwordVertifyCode:Boolean,

    role:{
        type:String,
        enum:['admin','student','lecturer'],
        default:'student'
    },

    level:{
        type:Number,
        enum:[0,1,2,3,4,'graduated','lecturer','none'],
        default:0
    },

    isGraduated:{
        type:Boolean,
        default:false
    },

    department:{
        type:String,
        enum:['electrical power','computer and control',
        'electronics and communications','level 0','mechanical power',
        'mechanical production'],
        default:"level 0"
    },
    profile:String,
    overRating:Number,
    quiz:[{type:mongoose.Schema.ObjectId,ref:"Quiz"},]
    },
    {
        timestamps:true
    }
    )
    ;



let userModel=mongoose.model('User',userSchema);

userSchema.pre('save',async function(next){
    if(!this.isModified('password')){
        return next();
    };
    this.password=await bcryptjs.hash(this.password,10);
});


module.exports=userModel;