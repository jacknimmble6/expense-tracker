import dotenv from 'dotenv'
import passport from 'passport'
import path from 'path'

dotenv.config()
const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
app.use('/transactions', expenseRoutes)

app.get('/', (req, res) => {
  res.send('Hello to Expense Tracker API')
})

const PORT = process.env.PORT|| 5000;

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => app.listen(PORT, () => console.log(`Server Running on Port: http://localhost:${PORT}`)))
  .catch((error) => console.log(`${error} did not connect`));
