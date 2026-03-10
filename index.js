const express = require("express");
const app=express();
const port =3000;
const morgan=require("morgan") 
const cors=require("cors")
const crypto = require("crypto")
app.use(cors())
app.use(morgan("combined")) 
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const path = require("path")
app.use(express.static(path.join(__dirname,"public")))
//create default api
app.get("/",(req,res)=>{
    res.send("Welcome to my server K234111E API")
})
app.get("/about",(req,res)=>{
    tbl="<table border='1'>"
    tbl+="<tr>"
    tbl+="<td>StudentID:</td>:<td>SV007</td>"
    tbl+="</tr>"
    tbl+="<tr>"
    tbl+="<td>Fullname:</td>:<td>MinhTri</td>"
    tbl+="</tr>"
    tbl+="<tr>"
    tbl+="<td coldspan='2'><img src='images/avatar.jpg' width='500' height='250'><td>"
    tbl+="</tr>"
    tbl+="</table>"
    res.send(tbl)
})

app.listen(port,()=>{
    console.log(`Server is running at ${port}`)
}) 
let  database=[ 
{"BookId":"b1","BookName":"Kỹ thuật lập trình cơ bản", 
"Price":70,"Image":"b1.png"}, 
{"BookId":"b2","BookName":"Kỹ thuật lập trình nâng cao", 
"Price":100,"Image":"b2.png"}, 
{"BookId":"b3","BookName":"Máy học cơ bản","Price":200,"Image":"b3.png"}, 
{"BookId":"b4","BookName":"Máy học nâng cao","Price":300,"Image":"b4.png"}, 
{"BookId":"b5","BookName":"Lập trình Robot cơ bản","Price":250,"Image":"b5.png"}, 
] 
app.get("/books",(req,res)=>{
    res.send(database)
})
app.get("/books/:id",cors(), (req,res)=>{
    id=req.params["id"]
    let p=database.find(x=>x.BookId==id)
    res.send(p)
})
app.post("/books",cors(),(req,res)=>{ 
console.log(req.body) 
res.send("Server received your data, Your data:"+JSON.stringify(req.body)) 
}) 
app.put("/books",cors(),(req,res)=>{ 
    let book=database.find(x=>x.BookId==req.body.BookId)
    if(book!=null)
    { 
        book.BookName=req.body.BookName
        book.Price=req.body.Price
        book.Image=req.body.Image
    }
    res.send(database)
}) 
app.delete("/books/:id",cors(),(req,res)=>{ 
    const id=req.params["id"]
    database = database.filter(x => x.BookId !== id)
    res.send(database)
}) 

// MoMo Create Payment (v2)
app.post("/payments/momo/create", cors(), async (req, res) => {
    try {
        const endpoint = process.env.MOMO_ENDPOINT || "https://test-payment.momo.vn/v2/gateway/api/create";
        const partnerCode = process.env.MOMO_PARTNER_CODE || "";
        const accessKey = process.env.MOMO_ACCESS_KEY || "";
        const secretKey = process.env.MOMO_SECRET_KEY || "";
        const redirectUrl = process.env.MOMO_REDIRECT_URL || "http://localhost:4200/payment-result";
        const ipnUrl = process.env.MOMO_IPN_URL || "http://localhost:3000/payments/momo/ipn";
        const requestType = process.env.MOMO_REQUEST_TYPE || "captureWallet";

        if (!partnerCode || !accessKey || !secretKey) {
            return res.status(400).send({
                message: "Missing MOMO_PARTNER_CODE, MOMO_ACCESS_KEY, MOMO_SECRET_KEY in environment variables.",
            });
        }

        const amount = String(req.body?.amount || "10000");
        const orderInfo = req.body?.orderInfo || "Thanh toan don hang";
        const extraData = req.body?.extraData || "";
        const orderGroupId = req.body?.orderGroupId || "";
        const autoCapture = req.body?.autoCapture !== undefined ? !!req.body.autoCapture : true;
        const lang = req.body?.lang || "vi";

        const requestId = `${partnerCode}-${Date.now()}`;
        const orderId = req.body?.orderId || requestId;

        const rawSignature =
            `accessKey=${accessKey}` +
            `&amount=${amount}` +
            `&extraData=${extraData}` +
            `&ipnUrl=${ipnUrl}` +
            `&orderId=${orderId}` +
            `&orderInfo=${orderInfo}` +
            `&partnerCode=${partnerCode}` +
            `&redirectUrl=${redirectUrl}` +
            `&requestId=${requestId}` +
            `&requestType=${requestType}`;

        const signature = crypto
            .createHmac("sha256", secretKey)
            .update(rawSignature)
            .digest("hex");

        const body = {
            partnerCode,
            partnerName: "Demo",
            storeId: "MomoTestStore",
            requestId,
            amount,
            orderId,
            orderInfo,
            redirectUrl,
            ipnUrl,
            lang,
            requestType,
            autoCapture,
            extraData,
            orderGroupId,
            signature,
        };

        const momoResponse = await fetch(endpoint, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(body),
        });

        const data = await momoResponse.json();
        return res.status(momoResponse.status).send(data);
    } catch (error) {
        return res.status(500).send({
            message: "Create MoMo payment failed.",
            error: error.message,
        });
    }
});

// IPN callback endpoint (for logging/demo)
app.post("/payments/momo/ipn", cors(), (req, res) => {
    console.log("MoMo IPN:", req.body);
    res.status(200).send({ message: "IPN received" });
});
