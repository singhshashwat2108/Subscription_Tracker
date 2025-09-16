 import mongoose from "mongoose";

 const subcriptionschema = new mongoose.Schema({
  name:{
    type:String,
    trim:true,
    minlength:2,
    maxlength:15
  },
  price:{
    type:Number,
    min:[0,'price must be greater than 0'],
    required:[true,'price of subscription is required']
  },
  currency:{
    type:String,
    enum:['USD','GBP','INR','EUR'],
    default:'USD'
  },
  frequency:{
    type:String,
    enum:['Daily','Monthly','Quarterly','Yearly'],
    required:true
  },
  category:{
    type:String,
    enum:['Sports','Entertainment','News','Kids','Technology','Lifestyle','Others'],
    required:true
  },
  paymentmethod:{
    type:String,
    required:true, 
    trim:true
   },
   status:{
    type:String,
    enum:['Active','Expired','Cancelled'],
    default:'Active'
   },
   startdate:{
    type:Date,
    required:true,
    validate:{
      validator: (value) => value <= new Date(),
      message:'start date must be in the past or today'
    }
   },
   enddate:{
    type:Date,
    validate:{
      validator: function(value){
        if(!value) return true;
        return value > this.startdate
      }
    }
   },
   user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user',
    required:true
   }
 }, {timestamps : true });

 //if enddate not given 
 subcriptionschema.pre('save', function (next) {

  if(!this.enddate){
    const periods ={
      Daily:1,
      Weekly:7,
      Monthly:30,
      Yearly:365
    };

    this.enddate = new Date(this.startdate);
    this.enddate.setDate(this.enddate.getDate() + periods[this.frequency]);
  };

  if(this.enddate < new Date()){
    this.status= 'Expired';
  };

  next();
 }
)

const Subscription = new mongoose.model('subcription' , subcriptionschema);

export default Subscription;