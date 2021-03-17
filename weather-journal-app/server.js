const app = require('./app');

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => console.log(`API running on /${PORT}/api/v1 \nApp running on /${PORT}/index.html`))
