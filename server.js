const app = require('./app')

const port = process.env.DEV_PORT || 8001
app.listen(port, () => {
  console.log(`Server Connected ${port}`);
})
