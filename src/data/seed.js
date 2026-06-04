export const CLIENTS = [
  {id:"FS0001",name:"Rashi Bhatia",trainer:"Abhishek Katiyar",pkg:"12 Months",daysLeft:257,gender:"F",paid:65000,bal:0,goal:"Fat Loss"},
  {id:"FS0002",name:"Vipul Bhatia",trainer:"Abhishek Katiyar",pkg:"12 Months",daysLeft:257,gender:"M",paid:65000,bal:0,goal:"Muscle Gain"},
  {id:"FS0003",name:"Ankush Thakur",trainer:"Abhishek Katiyar",pkg:"3 Months",daysLeft:87,gender:"M",paid:0,bal:25000,goal:"Powerlifting"},
  {id:"FS0010",name:"Ajeet Yadav",trainer:"Abhishek Katiyar",pkg:"3 Months",daysLeft:9,gender:"M",paid:7000,bal:18000,goal:"Strength"},
  {id:"FS0011",name:"Shivang Swarnkar",trainer:"Abhishek Katiyar",pkg:"3 Months",daysLeft:15,gender:"M",paid:25000,bal:0,goal:"Recomposition"},
  {id:"FS0060",name:"Ankit Gupta",trainer:"Abhishek Katiyar",pkg:"1 Month",daysLeft:16,gender:"M",paid:6000,bal:0,goal:"Fat Loss"},
  {id:"FS0061",name:"Renuka",trainer:"Abhishek Katiyar",pkg:"1 Month",daysLeft:16,gender:"F",paid:6000,bal:0,goal:"Fat Loss"},
  {id:"FS0062",name:"Rahul Rathore",trainer:"Abhishek Katiyar",pkg:"3 Months",daysLeft:64,gender:"M",paid:10000,bal:15000,goal:"Powerlifting"},
  {id:"FS0067",name:"Jay Singh",trainer:"Abhishek Katiyar",pkg:"1 Month",daysLeft:5,gender:"M",paid:10000,bal:0,goal:"Muscle Gain"},
  {id:"FS0033",name:"Stuti Yadav",trainer:"Rajat Katiyar",pkg:"4 Months",daysLeft:36,gender:"F",paid:28000,bal:0,goal:"Fat Loss"},
  {id:"FS0034",name:"Anjali Srivastava",trainer:"Rajat Katiyar",pkg:"3 Months",daysLeft:67,gender:"F",paid:10000,bal:15000,goal:"Toning"},
  {id:"FS0037",name:"Ratnam Yadav",trainer:"Rajat Katiyar",pkg:"3 Months",daysLeft:63,gender:"M",paid:25000,bal:0,goal:"Strength"},
  {id:"FS0039",name:"Ishan Tiwari",trainer:"Rajat Katiyar",pkg:"3 Months",daysLeft:15,gender:"F",paid:25000,bal:0,goal:"Recomposition"},
  {id:"FS0040",name:"Arti Tripathi",trainer:"Rajat Katiyar",pkg:"3 Months",daysLeft:15,gender:"F",paid:25000,bal:0,goal:"Fat Loss"},
  {id:"FS0041",name:"Abhishek Sharma",trainer:"Rajat Katiyar",pkg:"3 Months",daysLeft:16,gender:"M",paid:20000,bal:0,goal:"Muscle Gain"},
  {id:"FS0065",name:"Deepak Rathore",trainer:"Rajat Katiyar",pkg:"3 Months",daysLeft:73,gender:"M",paid:10000,bal:15000,goal:"Strength"},
  {id:"FS0046",name:"Neetu Singh",trainer:"Riya Singh",pkg:"3 Months",daysLeft:8,gender:"F",paid:25000,bal:0,goal:"Fat Loss"},
  {id:"FS0048",name:"Neelam Singh",trainer:"Riya Singh",pkg:"3 Months",daysLeft:54,gender:"F",paid:10000,bal:10000,goal:"Weight Loss"},
  {id:"FS0050",name:"Vaibhav",trainer:"Riya Singh",pkg:"3 Months",daysLeft:76,gender:"M",paid:9000,bal:20000,goal:"Muscle Gain"},
  {id:"FS0051",name:"Amit Shukla",trainer:"Riya Singh",pkg:"3 Months",daysLeft:68,gender:"M",paid:25000,bal:0,goal:"Recomposition"},
  {id:"FS0063",name:"Saurabh Singh",trainer:"Riya Singh",pkg:"3 Months",daysLeft:61,gender:"M",paid:25000,bal:0,goal:"Muscle Gain"},
  {id:"FS0064",name:"Aman Verma",trainer:"Riya Singh",pkg:"3 Months",daysLeft:39,gender:"M",paid:20000,bal:0,goal:"Fat Loss"},
  {id:"FS0066",name:"Tarang Gupta",trainer:"Riya Singh",pkg:"3 Months",daysLeft:77,gender:"M",paid:10000,bal:15000,goal:"Strength"},
];

export const TRAINERS = [
  {name:"Abhishek Katiyar",initials:"AK",color:"#c9a84c",clients:9,revenue:1023667,commission:511833,specialty:"Powerlifting · Strength",rating:4.9},
  {name:"Riya Singh",initials:"RS",color:"#e05c5c",clients:8,revenue:463000,commission:231500,specialty:"Fat Loss · Toning",rating:4.7},
  {name:"Rajat Katiyar",initials:"RK",color:"#5c7de0",clients:6,revenue:342000,commission:171000,specialty:"Bodybuilding · Hypertrophy",rating:4.8},
];

export const MONTHLY_REVENUE = [
  {month:"Apr '25",total:0,abhishek:0,riya:0,rajat:0},
  {month:"May '25",total:7000,abhishek:7000,riya:0,rajat:0},
  {month:"Jun '25",total:77333,abhishek:77333,riya:0,rajat:0},
  {month:"Jul '25",total:78667,abhishek:70333,riya:8334,rajat:0},
  {month:"Aug '25",total:79667,abhishek:71333,riya:8334,rajat:0},
  {month:"Sep '25",total:152000,abhishek:108000,riya:35667,rajat:8333},
  {month:"Oct '25",total:176667,abhishek:102667,riya:47333,rajat:26667},
  {month:"Nov '25",total:204333,abhishek:96667,riya:65333,rajat:42333},
  {month:"Dec '25",total:201333,abhishek:86333,riya:65000,rajat:50000},
  {month:"Jan '26",total:202500,abhishek:108833,riya:46667,rajat:47000},
  {month:"Feb '26",total:209167,abhishek:115000,riya:52000,rajat:42167},
  {month:"Mar '26",total:210500,abhishek:118000,riya:54000,rajat:38500},
];

export const CRM_LEADS = [
  {name:"Priya Mehta",stage:"Trial Session",source:"Instagram",trainer:"Abhishek Katiyar",days:2,value:25000},
  {name:"Rohan Verma",stage:"Consultation",source:"Walk-in",trainer:"Riya Singh",days:5,value:25000},
  {name:"Suresh Kumar",stage:"Proposal Sent",source:"Referral",trainer:"Rajat Katiyar",days:1,value:30000},
  {name:"Nisha Agarwal",stage:"Contacted",source:"Instagram",trainer:"Abhishek Katiyar",days:8,value:40000},
  {name:"Karan Singh",stage:"Lead",source:"Google",trainer:"Riya Singh",days:14,value:25000},
  {name:"Meena Tiwari",stage:"Converted",source:"Referral",trainer:"Abhishek Katiyar",days:0,value:65000},
  {name:"Vikram Joshi",stage:"Trial Session",source:"Instagram",trainer:"Rajat Katiyar",days:3,value:25000},
  {name:"Alka Sharma",stage:"Lead",source:"Walk-in",trainer:"Riya Singh",days:20,value:20000},
];

export const CRM_STAGES = ["Lead","Contacted","Trial Session","Consultation","Proposal Sent","Converted"];

export const ATT_DATA = [
  {day:"Mon",present:19,absent:4},{day:"Tue",present:21,absent:2},{day:"Wed",present:17,absent:6},
  {day:"Thu",present:22,absent:1},{day:"Fri",present:20,absent:3},{day:"Sat",present:23,absent:0},{day:"Sun",present:12,absent:11},
];

export const PL_CLIENTS = [
  {name:"Ankush Thakur",squat:160,bench:100,deadlift:180,total:440,bw:83,wc:"83kg",meet:"Oct 2026"},
  {name:"Rahul Rathore",squat:140,bench:90,deadlift:160,total:390,bw:74,wc:"74kg",meet:"Nov 2026"},
  {name:"Abhishek K.",squat:220,bench:130,deadlift:240,total:590,bw:82,wc:"83kg",meet:"Dec 2026"},
];

export const PROGRAMS = [
  {name:"5/3/1 Powerlifting Block",client:"Ankush Thakur",trainer:"Abhishek Katiyar",weeks:12,phase:"Accumulation",days:4,progress:38},
  {name:"Push Pull Legs Hypertrophy",client:"Rahul Rathore",trainer:"Abhishek Katiyar",weeks:8,phase:"Volume",days:6,progress:62},
  {name:"Fat Loss Circuit Program",client:"Rashi Bhatia",trainer:"Abhishek Katiyar",weeks:16,phase:"Cutting",days:5,progress:55},
  {name:"Strength Foundation",client:"Shivang S.",trainer:"Abhishek Katiyar",weeks:12,phase:"Base",days:4,progress:25},
  {name:"Body Recomposition",client:"Stuti Yadav",trainer:"Rajat Katiyar",weeks:16,phase:"Recomp",days:5,progress:44},
  {name:"Classic Bodybuilding",client:"Abhishek S.",trainer:"Rajat Katiyar",weeks:12,phase:"Volume",days:5,progress:70},
];

export const TODAY_PRESENT = ["FS0001","FS0002","FS0003","FS0011","FS0033","FS0037","FS0039","FS0040",
  "FS0041","FS0046","FS0048","FS0050","FS0051","FS0060","FS0061","FS0062","FS0063","FS0065","FS0066"];
