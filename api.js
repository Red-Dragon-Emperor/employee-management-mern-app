const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 3001;
app.use(cors()); // Enable CORS (frontend can access API  without error)
app.use(express.json()); //Parse JSON data in request body and put into req.body
//Connect to MongoDB
async function connectDB() {
    try {
        await mongoose.connect('mongodb://localhost:27017/company');
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
        process.exit(1); //Exit process if DB connection fails

    }
}
connectDB();

//Define Mongoose schema and model
const employeeSchema = new mongoose.Schema(
    {
        empNo: { type: Number, required: true },
        empName: { type: String, required: true, unique: true },
        empSal: { type: Number, required: true },
    },
    {
        timestamps: false,
        versionKey: false
    });
//create a model
const Employee = mongoose.model('Employee', employeeSchema);

app.post('/api/employees', async (req, res) => {

    try {
        const employee = new Employee(req.body);
        const savedEmployee = await employee.save();
        //res.status(201).json({ message: 'Employee added successfully'});
        res.status(201);
        res.json({ message: 'Employee added successfully' });

    } catch (error) {
        res.status(400).json({ message: error.message });

    }
});

app.get('/api/employees/', async (req, res) => {
    try {
        const employees = await Employee.find().sort({ empNo:1 });
        res.json(employees);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

app.get('/api/employees/:empNo', async (req, res) => {
    try {
        const empNo = parseInt(req.params.empNo);
        const employee = await Employee.findOne({ empNo });
        if (!employee)
            return res.status(404).json({ message: 'Employee not found' });

        res.json(employee);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});
//delete
app.delete('/api/employees/:empNo', async (req, res) => {
    try {
        const empNo = parseInt(req.params.empNo);
        const deletedEmployee = await Employee.deleteOne({ empNo });

        if (deletedEmployee.deletedCount === 0) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        res.json({ message: 'Employee deleted successfully' });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


//update
app.put('/api/employees/:empNo', async (req, res) => {
    try {
        const empNo = parseInt(req.params.empNo);
        const updatedEmployee = await Employee.findOneAndUpdate(
            { empNo: empNo },
            req.body, {
            new: true,// after update return updated document
            runValidators: true//enforce the rule of validater also at the time of update
        });
        if (!updatedEmployee)
            return res.status(404).json({ message: 'Employee not found' });
        res.json(updatedEmployee);

        // res.status(201).json({message:'Employee updated successfully'});
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});




app.listen(PORT, () => {
    console.log(`Server is Ready on http://localhost:${PORT}`);
});