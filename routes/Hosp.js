const express = require('express');
const router = express.Router();
const {createHospital,getHospital,getAllHospitals} = require("../controllers/HospitalCont")

router.post("/create/hospital",createHospital);

router.get("/getHospital/:lat/:long/:radius",getHospital);

router.get("/getAllHospitals",getAllHospitals)


module.exports = router